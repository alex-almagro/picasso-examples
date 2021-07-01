// Adapted from: https://observablehq.com/collection/@miralemd/picasso-js

import React, { useEffect } from "react";
import picasso from "picasso.js";
import { getStyle } from "../../../utils/utils";

const AreaChart = (props) => {
  const getData = () => {
    const arr = [["Year", "Sales"]];
    for (let i = 0; i < 12; i++) {
      arr.push([
        String(2000 + i),
        parseFloat((Math.random() * 1000).toFixed(0)),
      ]);
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
        min: 0,
      },
      t: { data: { extract: { field: "Year" } } },
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
            curve: "monotone",
            line: {
              show: false,
            },
            area: {},
          },
        },
      },
    ],
  });

  const renderChart = () => {
    picasso({ style: getStyle() }).chart({
      element: document.querySelector("#areaChart"),
      data: getData(),
      settings: getSettings(),
    });
  };

  useEffect(renderChart, []);

  return <div id="areaChart"></div>;
};

export default AreaChart;
