# picasso.js: Types of charts

Go to the [./components/Charts/](Charts folder) to see the different examples. Take into account that, to render a picasso.js chart, you need to define the following elements:
`picasso.chart({
    element: < html element that will encapsulate the chart > ,
    data: < the data that will be shown in the chart >,
    settings: < javascript object defining the type of chart, the format and theme, the scale,... >,
});`
Additionally, you can add an style property directly in the picasso object, which CSS properties like `font-size`, `font-family`,...
`picasso({
    style: {...}
}).chart({...});`

In this project you will find the following types of charts:
* Bar chart
* Linear chart
* Scatter plot

You can find more information on qlik.dev, in [https://qlik.dev/libraries-and-tools/picassojs]("Libraries & tools") and [https://qlik.dev/apis/javascript/picassojs]("JavaScript APIs").