import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';
import { Parser } from 'expr-eval';
import { isNumber } from 'lodash';

import { formatNumber } from '../NumberFormat';
import styles from './styles.module.scss';


export type Equation = {
  latex: string;
  plot: string;
  type: 'exponential' | 'uniform';
}

type IonChannelPlotProps = {
  name: string;
  equation: Equation;
}

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
          yAxes: [{
            ticks: {
              beginAtZero: false,
              suggestedMax: maxValue * 1.6,
              suggestedMin: 0,
            },
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'µm',
            },
          }],
        },
        title: {
          fontSize: 12,
          text: textBottom,
          position: 'bottom',
          display: true,
          fontWeight: 'normal',
          padding: 6,
        },
        legend: {
          labels: {
            boxWidth: 0,
            fontSize: 12,
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
