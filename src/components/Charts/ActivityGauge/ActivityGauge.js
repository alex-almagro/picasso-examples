// Adapted from: https://observablehq.com/@miralemd/picasso-js-bar-chart?collection=@miralemd/picasso-js

import React, { useEffect, useState } from "react";
import "./ActivityGauge.scss";
import picasso from "picasso.js";
import { getStyle } from "../../../utils/utils";

const ActivityGauge = (props) => {
  // -1 to show all metrics, 0 to filter only "Move", 1 for "Exercise" and 2 for "Stand"
  const [type, setType] = useState(-1);
  const getType = () => [
    { label: "All metrics", value: -1 },
    { label: "Move", value: 0 },
    { label: "Exercise", value: 1 },
    { label: "Stand", value: 2 },
  ];

  const getData = () => [
    ["Type", "Value", "Goal"],
    ["Move", 400, 600],
    ["Exercise", 13, 30],
    ["Stand", 7, 12],
  ];

  const getLabel = () => {
    const units = { Move: "Cals", Exercise: "Mins", Stand: "Hours" };
    const data = getData();
    return {
      type: "labels",
      layout: {
        displayOrder: 2,
      },
      settings: {
        sources: [
          {
            component: "back-0",
            selector: "path",
            strategy: {
              type: "rows",
              settings: {
                fontFamily: "Helvetica",
                fill: "#fff",
                justify: 0.5,
                align: 0.5,
                labels: [
                  {
                    fontSize: 64,
                    label: () => data[1 + +type][1],
                  },
                  {
                    fontSize: 24,
                    label: () =>
                      `of ${data[1 + +type][2]} ${
                        units[data[1 + +type][0]]
                      }`.toUpperCase(),
                  },
                ],
              },
            },
          },
        ],
      },
    };
  };

  const renderArc = (data, index, color, background) => ({
    key: background ? `back-${index}` : `arc-${index}`,
    type: "pie",
    data: data,
    settings: {
      slice: {
        cornerRadius: 10,
        outerRadius: 0.95 - index * 0.2,
        innerRadius: 0.95 - (index + 0.9) * 0.2,
        fill: (v, i) => (i ? "transparent" : color),
        strokeWidth: 0,
        opacity: background ? 0.2 : 1,
      },
    },
  });

  const getSettings = () => {
    const colors = { Move: "#f93885", Exercise: "#d8ff00", Stand: "#02ffa9" };
    return {
      components: [
        ...getData()
          .slice(type === -1 ? 1 : 1 + +type, type === -1 ? 4 : 2 + +type)
          .map((row, i, a) => [
            renderArc([1], i, colors[row[0]], true),
            renderArc([row[1], row[2] - row[1]], i, colors[row[0]]),
          ])
          .reduce((a, v) => a.concat(v), []),
        type === -1 ? false : getLabel(),
      ].filter(Boolean),
    };
  };

  const renderChart = () => {
    picasso({ style: getStyle() }).chart({
      element: document.querySelector("#activityGauge"),
      data: getData(),
      settings: getSettings(),
    });
  };

  useEffect(renderChart, [type]);

  return (
    <div className="actGaugeWrapper">
      <div id="activityGauge"></div>
      <div>
        {getType().map((metric) => {
          return (
            <button key={metric.label} onClick={() => setType(metric.value)}>
              Show: {metric.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityGauge;
