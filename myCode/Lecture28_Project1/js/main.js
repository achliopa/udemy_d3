/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

var canvasWidth = 600;
var canvasHeight = 400;
var margin = { left: 100, right: 10, top: 10, bottom: 100 };
var width = canvasWidth - margin.left - margin.right;
var height = canvasHeight - margin.top - margin.bottom;
var g = d3.select("#chart-area")
    .append("svg")
        .attr("width",canvasWidth)
        .attr("height",canvasHeight)
    .append("g")
        .attr("transform",`translate(${margin.left},${margin.top})`);
        
// X label
g.append("text")
    .attr("class","x axis-lable")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom)
    .attr("font-size","20px")
    .attr("text-anchor","middle")
    .text("Month");

// Y Label
g.append("text")
    .attr("class","y axis-label")
    .attr("x", -(height/2))
    .attr("y", - (margin.left - 20))
    .attr("font-size","20px")
    .attr("text-anchor","middle")
    .attr("transform","rotate(-90)")
    .text("Revenue");

d3.json("data/revenues.json").then(data=>{
    console.log(data);
    data.forEach(d=>{
       d.revenue = +d.revenue;
    });
    
    var x = d3.scaleBand()
        .domain(data.map(d=>d.month))
        .range([0,width])
        .paddingInner(0.3)
        .paddingOuter(0.3);
    
    var y = d3.scaleLinear()
        .domain([0,d3.max(data,d=>d.revenue)])
        .range([height,0]);
        
    var rects = g.selectAll("rect")
        .data(data);
    
    var xAxisCall = d3.axisBottom(x);
    g.append("g")
        .attr("class","x axis")
        .attr("transform",`translate(0,${height})`)
        .call(xAxisCall);
    
    var yAxisCall = d3.axisLeft(y)
        .ticks(10)
        .tickFormat(d=>`$${d}`);
    g.append("g")
        .attr("class","y-axis")
        .call(yAxisCall);
    
    rects.enter()
        .append("rect")
        .attr("y",d=>y(d.revenue))
        .attr("x",d=>x(d.month))
        .attr("width",x.bandwidth)
        .attr("height",d=>(height-y(d.revenue)))
        .attr("fill","grey");
});