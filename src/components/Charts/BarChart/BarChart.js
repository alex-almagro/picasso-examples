// Adapted from: https://observablehq.com/collection/@miralemd/picasso-js

import React, { useEffect } from "react";
import picasso from "picasso.js";
import { getMonths, getStyle } from "../../../utils/utils";

const BarChart = (props) => {
  const getData = () => {
    const arr = [["Month", "Sales"]];
    const months = getMonths();
    for (let m = 0; m < months.length; m++) {
      arr.push([months[m], parseFloat((Math.random() * 10000).toFixed(0))]);
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
      y: {
        data: { field: "Sales" },
        invert: true,
        include: [0],
      },
      c: {
        data: { field: "Sales" },
        type: "color",
      },
      t: { data: { extract: { field: "Month" } }, padding: 0.3 },
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
        key: "bars",
        type: "box",
        data: {
          extract: {
            field: "Month",
            props: {
              start: 0,
              end: { field: "Sales" },
            },
          },
        },
        settings: {
          major: { scale: "t" },
          minor: { scale: "y" },
          box: {
            fill: { scale: "c", ref: "end" },
          },
        },
      },
    ],
  });

  const renderChart = () => {
    picasso({style: getStyle()}).chart({
      element: document.querySelector("#barchart"),
      data: getData(),
      settings: getSettings(),
    });
  };

  useEffect(renderChart, []);

  return (
    <div id="barchart"></div>
  );
};

export default BarChart;
