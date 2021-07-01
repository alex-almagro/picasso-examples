// Adapted from: https://observablehq.com/collection/@miralemd/picasso-js

import React, { useEffect } from "react";
import picasso from "picasso.js";
import { getMonths, getStyle } from "../../../utils/utils";

const StackedBarChart = (props) => {
  const getData = () => {
    const arr = [["Year", "Month", "Sales"]];
    const months = getMonths();
    for (let i = 0; i < 8; i++) {
      for (let m = 0; m < months.length; m++) {
        arr.push([
          String(2010 + i),
          months[m],
          parseFloat((Math.random() * 10000).toFixed(0)),
          parseFloat((Math.random() * 100).toFixed(0)),
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
    collections: [
      {
        key: "stacked",
        data: {
          extract: {
            field: "Month",
            props: {
              series: { field: "Year" },
              end: { field: "Sales" },
            },
          },
          stack: {
            stackKey: (d) => d.value,
            value: (d) => d.end.value,
          },
        },
      },
    ],
    scales: {
      y: {
        data: {
          collection: {
            key: "stacked",
          },
        },
        invert: true,
        expand: 0.2,
        min: 0,
      },
      t: { data: { extract: { field: "Month" } }, padding: 0.3 },
      color: { data: { extract: { field: "Year" } }, type: "color" },
    },
    components: [
      {
        type: "axis",
        dock: "left",
        scale: "y",
      },
      {
        type: "axis",
        dock: "bottom",
        scale: "t",
      },
      {
        type: "legend-cat",
        scale: "color",
        dock: "top",
      },
      {
        key: "bars",
        type: "box",
        data: {
          collection: "stacked",
        },
        settings: {
          major: { scale: "t" },
          minor: { scale: "y", ref: "end" },
          box: {
            fill: { scale: "color", ref: "series" },
          },
        },
      },
    ],
  });

  const renderChart = () => {
    picasso({ style: getStyle() }).chart({
      element: document.querySelector("#stackedBarChart"),
      data: getData(),
      settings: getSettings(),
    });
  };

  useEffect(renderChart, []);

  return <div id="stackedBarChart"></div>;
};

export default StackedBarChart;
