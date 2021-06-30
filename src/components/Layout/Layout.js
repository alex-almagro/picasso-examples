import React, { useState } from "react";
import ActivityGauge from "../Charts/ActivityGauge/ActivityGauge";
import BarChart from "../Charts/BarChart/BarChart";
import LinearChart from "../Charts/LinearChart/LinearChart";
import PieChart from "../Charts/PieChart/PieChart";
import ScatterPlot from "../Charts/ScatterPlot/ScatterPlot";
import "./Layout.scss";

const Layout = (props) => {
  const [chartIndex, setChartIndex] = useState(0);
  const chartsArr = [
    { label: "Bar chart", component: <BarChart /> },
    { label: "Line chart", component: <LinearChart /> },
    { label: "Scatter plot", component: <ScatterPlot /> },
    { label: "Pie chart", component: <PieChart /> },
    { label: "Activity gauge", component: <ActivityGauge /> },
  ];

  return (
    <div>
      <h1>Types of picasso.js charts</h1>
      <div className="chartPicker">
        {chartsArr.map((c, i) => (
          <button
            key={i}
            disabled={chartIndex === i}
            onClick={() => setChartIndex(i)}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="chartDisplay">{chartsArr[chartIndex].component}</div>
    </div>
  );
};

export default Layout;
