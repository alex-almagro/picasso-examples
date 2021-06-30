import React, { useState } from "react";
import ActivityGauge from "../Charts/ActivityGauge/ActivityGauge";
import BarChart from "../Charts/BarChart/BarChart";
import LinearChart from "../Charts/LinearChart/LinearChart";
import PieChart from "../Charts/PieChart/PieChart";
import ScatterPlot from "../Charts/ScatterPlot/ScatterPlot";
import "./Layout.scss";

const Layout = (props) => {
  const [chart, setChart] = useState(<BarChart />);
  const getChart = () => [
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
        {getChart().map((c) => (
          <button onClick={() => setChart(c.component)}>{c.label}</button>
        ))}
      </div>
      <div className="chartDisplay">
        {chart}
      </div>
    </div>
  );
};

export default Layout;
