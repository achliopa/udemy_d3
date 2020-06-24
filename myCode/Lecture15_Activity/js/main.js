/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

var svg = d3.select("#chart-area").append("svg")
    .attr("width",400)
    .attr("height",400);

d3.json("data/buildings.json").then(data=>{
    console.log(data);
    
    data.forEach(d=>{
        d.height = +d.height;
    });
    
    var rects = svg.selectAll("rect").data(data);
    
    rects.enter()
        .append("rect")
        .attr("x",(d,i)=>{
            return 10 + (i*40); 
        })
        .attr("y",10)
        .attr("width",30)
        .attr("height",d=>{
            return d.height;
        })
        .attr("fill","gray");
}).catch(err=>{
    console.log(err);
});