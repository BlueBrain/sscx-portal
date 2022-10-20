import chunk from 'lodash/chunk';
import throttle from 'lodash/throttle';
import { mergeBufferGeometries } from 'three145/examples/jsm/utils/BufferGeometryUtils';
import { TrackballControls } from 'three145/examples/jsm/controls/TrackballControls';
import {
  AmbientLight,
  Box3,
  Color,
  DoubleSide,
  Fog,
  Material,
  Mesh,
  MeshLambertMaterial,
  Object3D,
  PerspectiveCamera,
  PointLight,
  Scene,
  SphereGeometry,
  Vector3,
  WebGLRenderer
} from 'three145';

import {
  createSomaGeometryFromPoints,
  deserializeBufferGeometry,
  RendererCtrl,
  quatFromArray3x3,
} from './utils';
import { saveAs } from 'file-saver';
import { Pool } from '@/services/threads';
import { color, NeuriteType } from './constants';
import { ConnectionViewerData } from './types';


const FOG_COLOR = 0xffffff;
const FOG_NEAR = 1;
const FOG_FAR = 50000;

const AMBIENT_LIGHT_COLOR = 0x555555;
const CAMERA_LIGHT_COLOR = 0x888888;

const BACKGROUND_COLOR = 0x02041b;

const secTypeMap = [
  'soma',
  'axon',
  'dend',
  'dend',
];

const CellType = {
  PRE: 0,
  POST: 1,
}

function parseCssColor(colorStr) {
  return parseInt(colorStr.replace('#', ''), 16);
}

type SectionPts = number[][];

type MorphologySecData = {
  [extendedSecType: string]: SectionPts[],
};

export default class ConnectionViewer {
  private data: ConnectionViewerData = null;

  private container: HTMLDivElement = null;
  private resizeObserver: ResizeObserver = null;
  private canvas: HTMLCanvasElement = null;
  private renderer: WebGLRenderer = null;
  private scene: Scene = null;
  private camera: PerspectiveCamera = null;
  private controls: TrackballControls = null;
  private ctrl: RendererCtrl = new RendererCtrl();
  private onUserInteract: EventListener = null;

  private material: Record<string, Material>;

  private secMesh: { [neuriteType: string]: Mesh } = {};
  private preSomaMesh: Mesh = null;
  private postSomaMesh: Mesh = null;
  private synMesh: Mesh = null;

  private geometryWorkerPool: Pool = null;
  private morphologySecData: MorphologySecData = {};

  constructor(container: HTMLDivElement) {
    this.container = container;
  }

  // TODO: add type decrlaration for `data`
  public async init(data: any) {
    this.data = data;

    this.initCanvas();
    this.initRenderer();
    this.initScene();
    this.initCamera();
    this.initControls();
    this.initEvents();
    this.initObservers();

    this.initMaterials();

    this.initGeometryWorkerPool();
    this.indexSecData();
    await this.createSynMesh();
    await this.createSomaMesh();
    await this.createSecMeshes();
    this.disposeGeometryWorkerPool();

    this.alignCamera();

    this.cleanup();

    this.startRenderLoop();
  }

  public resize() {
    const { clientWidth, clientHeight } = this.container;
    this.camera.aspect = clientWidth / clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(clientWidth, clientHeight);

    this.ctrl.renderOnce();
  }

  public setNeuriteVisibility(visibility) {
    Object.entries(visibility).forEach(([neuriteType, visible]) => {
      if(!this.secMesh[neuriteType]) {
        throw new Error(`Mesh for ${neuriteType} is not found}`);
      }

      const { material } = this.secMesh[neuriteType];
      material.visible = visible;
    });

    this.ctrl.renderOnce();
  }

  public downloadRender(filename) {
    const { clientWidth, clientHeight } = this.renderer.domElement.parentElement;

    const renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      physicallyCorrectColors: true,
    });

    renderer.setSize(clientWidth * 3, clientHeight * 3);

    renderer.render(this.scene, this.camera);

    renderer.domElement.toBlob(blob => saveAs(blob, `${filename}.png`));
    renderer.dispose();
  }

  public destroy() {
    Object.values(this.secMesh).forEach(mesh => mesh.geometry.dispose());

    Object.values(this.material).forEach(material => material.dispose());

    this.synMesh?.geometry.dispose();
    this.preSomaMesh?.geometry.dispose();
    this.postSomaMesh?.geometry.dispose();

    this.renderer.domElement.removeEventListener('wheel', this.onUserInteract);
    this.renderer.domElement.removeEventListener('mousemove', this.onUserInteract);
    this.renderer.domElement.removeEventListener('touchmove', this.onUserInteract);
    this.renderer.domElement.removeEventListener('pointermove', this.onUserInteract);

    this.resizeObserver.unobserve(this.container);

    this.controls.dispose();
    this.renderer.dispose();

    this.container.removeChild(this.canvas);
  }

  private initCanvas() {
    this.canvas = document.createElement('canvas');
    this.container.appendChild(this.canvas);
  }

  private initRenderer() {
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    const { clientWidth, clientHeight } = this.container;
    this.renderer.setSize(clientWidth, clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio || 1);
  }

  private initScene() {
    this.scene = new Scene();
    this.scene.background = new Color(BACKGROUND_COLOR);
    this.scene.fog = new Fog(FOG_COLOR, FOG_NEAR, FOG_FAR);
    this.scene.add(new AmbientLight(AMBIENT_LIGHT_COLOR));
  }

  private initCamera() {
    const { clientWidth, clientHeight } = this.container;
    this.camera = new PerspectiveCamera(45, clientWidth / clientHeight, 1, 3000);
    this.scene.add(this.camera);
    this.camera.add(new PointLight(CAMERA_LIGHT_COLOR, 0.9));
  }

  private initControls() {
    this.controls = new TrackballControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.zoomSpeed = 0.5;
    this.controls.rotateSpeed = 0.8;
    this.controls.maxDistance = 2600;
  }

  private initEvents() {
    this.onUserInteract = throttle(() => this.ctrl.renderFor(4000), 100).bind(this);

    this.canvas.addEventListener('wheel', this.onUserInteract, { capture: false, passive: true });
    this.canvas.addEventListener('mousemove', this.onUserInteract, { capture: false, passive: true });
    this.canvas.addEventListener('touchmove', this.onUserInteract, { capture: false, passive: true });
    this.canvas.addEventListener('pointermove', this.onUserInteract, { capture: false, passive: true });
  }

  private initObservers() {
    // postponing resize as Firefox for some reason detects wrong container size when executed synchronously
    this.resizeObserver = new ResizeObserver(() => setTimeout(() => this.resize(), 0));

    this.resizeObserver.observe(this.container);
  }

  private initMaterials() {
    this.material = {
      PRE_SOMA: new MeshLambertMaterial({ color: parseCssColor(color.PRE_SOMA) }),

      PRE_DEND: new MeshLambertMaterial({
        color: parseCssColor(color.PRE),
        side: DoubleSide,
        transparent: true,
        opacity: 0.25
      }),

      PRE_SP_AXON: new MeshLambertMaterial({ color: parseCssColor(color.PRE), side: DoubleSide }),
      PRE_NSP_AXON: new MeshLambertMaterial({ color: parseCssColor(color.PRE), side: DoubleSide }),

      POST_SOMA: new MeshLambertMaterial({ color: parseCssColor(color.POST_SOMA) }),

      POST_SP_DEND: new MeshLambertMaterial({ color: parseCssColor(color.POST), side: DoubleSide }),
      POST_NSP_DEND: new MeshLambertMaterial({ color: parseCssColor(color.POST), side: DoubleSide }),

      POST_AXON: new MeshLambertMaterial({
        color: parseCssColor(color.POST),
        side: DoubleSide,
        transparent: true,
        opacity: 0.25
      }),

      SYNAPSE: new MeshLambertMaterial({ color: parseCssColor(color.SYNAPSE) }),
    }
  }

  private initGeometryWorkerPool() {
    const conf = { name: 'geometry-worker' };
    const geometryWorkerFactory = () => new Worker(new URL('./workers/neuron-geometry.ts', import.meta.url), conf);
    this.geometryWorkerPool = new Pool(geometryWorkerFactory, 2);
  }

  private disposeGeometryWorkerPool() {
    this.geometryWorkerPool.terminate();
    this.geometryWorkerPool = null;
  }

  private async indexSecData() {
    this.extractMorphologySecData(CellType.PRE, this.data.pre.morph);
    this.extractMorphologySecData(CellType.POST, this.data.post.morph);
  }

  private extractMorphologySecData(cellType: number, sections) {
    const morphSecData = this.morphologySecData;
    sections.forEach((section) => {
      const secTypeStr = secTypeMap[section[0]];
      const isSynPathSec = Boolean(section[1]);

      const ptsFlat = section.slice(-(section.length - 2));

      const secDataKey = `${cellType === CellType.PRE ? 'pre' : 'post'}_${isSynPathSec ? 'sp' : 'nsp'}_${secTypeStr}`;

      if (!morphSecData[secDataKey]) {
        morphSecData[secDataKey] = [ptsFlat];
      } else {
        morphSecData[secDataKey].push(ptsFlat);
      }
    });
  }

  private createSomaMesh() {
    const preSomaGeometry = createSomaGeometryFromPoints(chunk(this.morphologySecData.pre_nsp_soma[0], 4));
    this.preSomaMesh = new Mesh(preSomaGeometry, this.material.PRE_SOMA);

    const postSomaGeometry = createSomaGeometryFromPoints(chunk(this.morphologySecData.post_nsp_soma[0], 4));
    this.postSomaMesh = new Mesh(postSomaGeometry, this.material.POST_SOMA);
    this.scene.add(this.preSomaMesh);
    this.scene.add(this.postSomaMesh);
  }

  private createSecMeshes() {
    const preDendGeometryPromise = this.geometryWorkerPool
      .queue(thread => thread.createNeuriteGeometry(this.morphologySecData.pre_nsp_dend))
      .then(deserializeBufferGeometry);

    const preSynPathAxonGeometryPromise = this.geometryWorkerPool
      .queue(thread => thread.createNeuriteGeometry(this.morphologySecData.pre_sp_axon))
      .then(deserializeBufferGeometry);

    const preNonSynPathAxonGeometryPromise = this.geometryWorkerPool
      .queue(thread => thread.createNeuriteGeometry(this.morphologySecData.pre_nsp_axon))
      .then(deserializeBufferGeometry);

    const postSynPathDendGeometryPromise = this.geometryWorkerPool
      .queue(thread => thread.createNeuriteGeometry(this.morphologySecData.post_sp_dend))
      .then(deserializeBufferGeometry);

    const postNonSynPathDendGeometryPromise = this.geometryWorkerPool
      .queue(thread => thread.createNeuriteGeometry(this.morphologySecData.post_nsp_dend))
      .then(deserializeBufferGeometry);

    const postAxonGeometryPromise = this.geometryWorkerPool
      .queue(thread => thread.createNeuriteGeometry(this.morphologySecData.post_nsp_axon))
      .then(deserializeBufferGeometry);

    console.time('genMesh');

    return Promise.all([
      preDendGeometryPromise,
      preSynPathAxonGeometryPromise,
      preNonSynPathAxonGeometryPromise,
      postSynPathDendGeometryPromise,
      postNonSynPathDendGeometryPromise,
      postAxonGeometryPromise
    ]).then(([
      preDendGeometry,
      preSynPathAxonGeometry,
      preNonSynPathAxonGeometry,
      postSynPathDendGeometry,
      postNonSynPathDendGeometry,
      postAxonGeometry
    ]) => {
      console.timeEnd('genMesh');

      const preDendMesh = new Mesh(preDendGeometry, this.material.PRE_DEND);
      this.secMesh[NeuriteType.PRE_NSP_DEND] = preDendMesh;
      this.scene.add(preDendMesh);

      const preSynPathAxonMesh = new Mesh(preSynPathAxonGeometry, this.material.PRE_SP_AXON);
      this.secMesh[NeuriteType.PRE_SP_AXON] = preSynPathAxonMesh;
      this.scene.add(preSynPathAxonMesh);

      const preNonSynPathAxonMesh = new Mesh(preNonSynPathAxonGeometry, this.material.PRE_NSP_AXON);
      this.secMesh[NeuriteType.PRE_NSP_AXON] = preNonSynPathAxonMesh;
      this.scene.add(preNonSynPathAxonMesh);

      const postSynPathDendMesh = new Mesh(postSynPathDendGeometry, this.material.POST_SP_DEND);
      this.secMesh[NeuriteType.POST_SP_DEND] = postSynPathDendMesh;
      this.scene.add(postSynPathDendMesh);

      const postNonSynPathDendMesh = new Mesh(postNonSynPathDendGeometry, this.material.POST_NSP_DEND);
      this.secMesh[NeuriteType.POST_NSP_DEND] = postNonSynPathDendMesh;
      this.scene.add(postNonSynPathDendMesh);

      const postAxonMesh = new Mesh(postAxonGeometry, this.material.POST_AXON);
      this.secMesh[NeuriteType.POST_NSP_AXON] = postAxonMesh;
      this.scene.add(postAxonMesh);
    });
  }

  private createSynMesh() {
    const geometries = this.data.synapses.map(synapse => {
      const geometry = new SphereGeometry(3.4, 32, 16);
      geometry.translate(...synapse.slice(0, 3));

      return geometry;
    });

    const geometry = mergeBufferGeometries(geometries);
    this.synMesh = new Mesh(geometry, this.material.SYNAPSE);
    this.scene.add(this.synMesh);
  }

  private cleanup() {
    this.data = null;
    this.morphologySecData = null;
  }

  private alignCamera() {
    const preQuat = quatFromArray3x3(this.data.pre.orientation);
    const postQuat = quatFromArray3x3(this.data.post.orientation);

    const preOrientationVec = new Vector3(0, 1, 0).applyQuaternion(preQuat);
    const postOrientationVec = new Vector3(0, 1, 0).applyQuaternion(postQuat);

    const preSomaPts = this.data.pre.morph.find(section => secTypeMap[section[0]] === 'soma').slice(2, 6);
    const postSomaPts = this.data.post.morph.find(section => secTypeMap[section[0]] === 'soma').slice(2, 6);

    const prePostVec = new Vector3(
      preSomaPts[0] - postSomaPts[0],
      preSomaPts[1] - postSomaPts[1],
      preSomaPts[2] - postSomaPts[2],
    );

    const orientationMeanVec = new Vector3()
      .addVectors(preOrientationVec, postOrientationVec)
      .divideScalar(2)
      .normalize();

    const preSomaPos = new Vector3(preSomaPts[0], preSomaPts[1], preSomaPts[2]);
    const postSomaPos = new Vector3(postSomaPts[0], postSomaPts[1], postSomaPts[2]);

    const somaMeanPos = new Vector3().addVectors(preSomaPos, postSomaPos).divideScalar(2);

    const camVector = new Vector3().crossVectors(orientationMeanVec, prePostVec);

    const dendriteObj3D = new Object3D();
    dendriteObj3D.add(this.secMesh[NeuriteType.PRE_NSP_DEND]);
    dendriteObj3D.add(this.secMesh[NeuriteType.POST_SP_DEND]);
    dendriteObj3D.add(this.secMesh[NeuriteType.POST_NSP_DEND]);
    this.scene.add(dendriteObj3D);

    const dendriteBBox = new Box3();
    dendriteBBox.expandByObject(dendriteObj3D);

    const center = new Vector3();
    dendriteBBox.getCenter(center);

    const bSize = new Vector3();
    dendriteBBox.getSize(bSize);

    const radius = Math.max(bSize.x, bSize.y, bSize.z) / 2;

    const distance = radius / Math.tan(Math.PI * this.camera.fov / 360) * 1.05;
    camVector.setLength(distance);

    const controlsTargetVec = center.clone();
    const cameraPositionVec = somaMeanPos.clone().add(camVector);

    this.camera.position.copy(cameraPositionVec);
    this.controls.target.copy(controlsTargetVec);
    this.camera.up.copy(orientationMeanVec);

    this.ctrl.renderOnce();
  }

  private startRenderLoop() {
    if (this.ctrl.stopped) return;

    if (this.ctrl.render) {
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    }

    requestAnimationFrame(this.startRenderLoop.bind(this));
  }
}
