import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import styles from './index.module.scss';


const IMAGE_INTERVAL = 9000;
const IMAGE_TRANSITION = 1600;

type ImageProp = {
  src: string;
  alt: string;
};

type ImageSliderProps = {
  images: ImageProp[],
};

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentImgIdx, setCurrentImgIdx] = useState<number>(0);
  const [nextImgIdx, setNextImgIdx] = useState<number | null>(null);
  const [transitionActive, setTransitionActive] = useState(false);

  const currentImage = images[currentImgIdx];

  const nextImage = nextImgIdx !== null
    ? images[nextImgIdx]
    : null;

  useEffect(() => {
    let transitionTimer;
    let transitionEndTimer;

    const initTimer = setTimeout(() => {
      requestAnimationFrame(() => {
        const nextIdx = currentImgIdx + 1 === images.length
          ? 0
          : currentImgIdx + 1;

        setNextImgIdx(nextIdx);

        transitionTimer = setTimeout(() => setTransitionActive(true), IMAGE_INTERVAL - IMAGE_TRANSITION - 100);

        transitionEndTimer = setTimeout(() => {
          setCurrentImgIdx(nextIdx);
          setTransitionActive(false);
          setNextImgIdx(null);
        }, IMAGE_INTERVAL - 100);
      });
    }, 1000);

    return () => {
      clearTimeout(initTimer);
      transitionTimer && clearTimeout(transitionTimer);
      transitionEndTimer && clearTimeout(transitionEndTimer);
    };
  }, [currentImgIdx]);

  return (
    <div className={styles.container}>
      <div
        className={styles.currentImage}
        style={{ opacity: transitionActive ? 0 : 1 }}
        key={currentImage.src}
      >
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          objectFit="cover"
          layout="fill"
          priority
        />
      </div>
      {nextImage && currentImage !== nextImage && (
        <div
          className={styles.nextImage}
          style={{ opacity: transitionActive ? 1 : 0 }}
          key={nextImage.src}
        >
          <Image
            src={nextImage.src}
            alt={nextImage.alt}
            objectFit="cover"
            layout="fill"
          />
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
