// Adapted from: https://observablehq.com/collection/@miralemd/picasso-js

import React, { useEffect } from "react";
import picasso from "picasso.js";
import { getStyle } from "../../../utils/utils";

const LinearChart = (props) => {
  const getData = () => {
    const arr = [["Year", "Sales"]];
    let sales = 0.5;
    let currentDate = new Date();
    for (let i = 0; i < 500; i++) {
      currentDate.setDate(currentDate.getDate() + 1);
      sales = sales - 2 + 4 * Math.random();
      arr.push([currentDate.valueOf(), 10000 + sales * 10000]);
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
        expand: 0.2,
      },
      t: {
        data: {
          extract: { field: "Year" },
        },
      },
    },
    components: [
      {
        type: "axis",
        dock: "left",
        scale: "y",
        formatter: {
          type: "d3-number",
          format: "$,.1r",
        },
      },
      {
        type: "axis",
        dock: "bottom",
        scale: "t",
        formatter: {
          type: "d3-time",
          format: "%Y-%m",
        },
      },
      {
        key: "lines",
        type: "line",
        data: {
          extract: {
            field: "Year",
            props: {
              v: { field: "Sales" },
            },
          },
        },
        settings: {
          coordinates: {
            major: { scale: "t" },
            minor: { scale: "y", ref: "v" },
          },
          layers: {
            line: {},
          },
        },
      },
    ],
  });

  const renderChart = () => {
    picasso({style: getStyle()}).chart({
      element: document.querySelector("#linearchart"),
      data: getData(),
      settings: getSettings(),
    });
  };

  useEffect(renderChart, []);

  return <div id="linearchart"></div>;
};

export default LinearChart;
