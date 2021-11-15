import React, { useRef, useEffect } from 'react';
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Filler,
  Legend,
  Title,
} from 'chart.js';
import { Parser } from 'expr-eval';
import isNumber from 'lodash/isNumber';

import { formatNumber } from '../NumberFormat';
import styles from './styles.module.scss';


export type Equation = {
  latex: string;
  plot: string;
  type: 'decay' | 'exponential' | 'uniform';
}

type IonChannelPlotProps = {
  name: string;
  equation: Equation;
}

Chart.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Filler,
  Legend,
  Title,
);

function formatPlotTitle(title) {
  if (isNumber(title)) return formatNumber(title);

  return Array.from(title.matchAll(/\d+\.?\d*/g))
    .map(match => match[0])
    .reduce((formattedTitle, num) => formattedTitle.replace(num, formatNumber(parseFloat(num))), title);
}

const IonChannelPlot: React.FC<IonChannelPlotProps> = ({ name, equation }) => {
  const canvasEl = useRef<HTMLCanvasElement>(null);

  const createPlot = () => {
    const plotLength = 9;
    let maxValue = 0.012;
    let textBottom = '';

    return new Chart(canvasEl?.current, {
      type: 'line',
      data: {
        datasets: [{
          fill: 'origin',
          data: getData(equation),
          label: equation.type,
          backgroundColor: 'rgba(255, 177, 193, 0.5)',
        }],
        labels: getXAxes(),
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
            suggestedMax: maxValue * 1.6,
            suggestedMin: 0,
          },
          x: {
            title: {
              display: true,
              text: 'µm',
            },
          },
        },
        plugins: {
          title: {
            font: {
              size: 12,
              weight: 'normal',
            },
            text: textBottom,
            position: 'bottom',
            display: true,
            padding: 6,
          },
          legend: {
            labels: {
              boxWidth: 0,
              font: {
                size: 12,
              },
            },
          },
        },
      },
    });

    function getXAxes () {
      // generate scale with steps
      return Array.apply(null, {
        length: plotLength,
      }).map(Function.call, x => x * 100);
    }

    function getData (data) {
      let arrayValues = [];
      switch (data.type) {
      case 'uniform':
        arrayValues = new Array(plotLength).fill(data.latex);
        maxValue = data.latex;
        break;
      case 'exponential':
      case 'decay':
        let parser = new Parser();
        let expr = parser.parse(data.plot);
        arrayValues = getXAxes().map(xVal => expr.evaluate({ x: xVal }));
        maxValue = Math.max.apply(null, arrayValues);
        break;
      }
      textBottom = formatPlotTitle(data.plot);
      return arrayValues;
    }
  };

  useEffect(() => {
    if (!canvasEl) return;

    const plot = createPlot();

    return () => {
      if (plot) plot.destroy();
    };
  }, [canvasEl]);

  return (
    <div className={styles.plotContainer}>
      <span>{name}</span>
      <canvas ref={canvasEl} width="320" height="220" />
    </div>
  );
};


export default IonChannelPlot;
