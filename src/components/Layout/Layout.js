import React, { useState } from "react";
import ActivityGauge from "../Charts/ActivityGauge/ActivityGauge";
import AreaChart from "../Charts/AreaChart/AreaChart";
import BarChart from "../Charts/BarChart/BarChart";
import HeatMap from "../Charts/HeatMap/HeatMap";
import LinearChart from "../Charts/LinearChart/LinearChart";
import PieChart from "../Charts/PieChart/PieChart";
import ScatterPlot from "../Charts/ScatterPlot/ScatterPlot";
import StackedBarChart from "../Charts/StackedBarChart/StackedBarChart";
import "./Layout.scss";

const Layout = (props) => {
  const [chartIndex, setChartIndex] = useState(0);
  const chartsArr = [
    { label: "Bar chart", component: <BarChart /> },
    { label: "Stacked bar chart", component: <StackedBarChart /> },
    { label: "Line chart", component: <LinearChart /> },
    { label: "Area chart", component: <AreaChart /> },
    { label: "Scatter plot", component: <ScatterPlot /> },
    { label: "Pie chart", component: <PieChart /> },
    { label: "Heat map", component: <HeatMap /> },
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
