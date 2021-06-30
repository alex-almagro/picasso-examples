// Adapted from: https://observablehq.com/collection/@miralemd/picasso-js

import React, { useEffect } from "react";
import picasso from "picasso.js";
import { getStyle } from "../../../utils/utils";

const HeatMap = (props) => {
  const getData = () => {
    const arr = [["Day", "Hour", "Density"]];
    for (let i = 0; i < 10; i++) {
      const d = new Date(2018, 1, i + 1);
      for (let m = 0; m < 24; m++) {
        arr.push([
          d.toLocaleString("en-US", { day: "numeric", month: "long" }),
          String(m),
          Math.random() * 30,
        ]);
      }
    }
    return [
      {
        type: "matrix",
        data: arr,
      },
    ];
  };

  const getSettings = () => ({
    scales: {
      days: {
        data: {
          extract: { field: 'Day' }
        }
      },
      hours: {
        data: {
          extract: { field: 'Hour' }
        }
      },
      col: {
        data: { field: 'Density' },
        type: 'color',
        range: ['#304D2A','#53763E','#7DA050','#AECC61','#E6F871', '#eee'].reverse(),
        nice: true,
        type: 'threshold-color'
      }
    },
    components: [{
      type: 'legend-cat',
      dock: 'top',
      scale: 'col'
    },{
      key: 'y-axis',
      type: 'axis',
      scale: 'days',
      dock: 'left'
    }, {
      key: 'x-axis',
      type: 'axis',
      scale: 'hours',
      dock: 'bottom'
    }, {
      key: 'p',
      type: 'point',
      data: {
        extract: {
          field: 'Hour',
          props: {
            d: { field: 'Density' },
            group: { field: 'Day' }
          }
        }
      },
      settings: {
        x: { scale: 'hours' },
        y: { scale: 'days', ref: 'group' },
        fill: { scale: 'col', ref: 'd' },
        shape: 'square'
      }
    }]
  });

  const renderChart = () => {
    picasso({ style: getStyle() }).chart({
      element: document.querySelector("#heatMap"),
      data: getData(),
      settings: getSettings(),
    });
  };

  useEffect(renderChart, []);

  return <div id="heatMap"></div>;
};

export default HeatMap;
