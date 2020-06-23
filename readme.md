 Udemy Course: Mastering data visualization in D3.js

* [Course Link](https://www.udemy.com/course/masteringd3js/)
* [Course Repo](https://github.com/adamjanes/udemy-d3)

## Section 1: Introduction

### Lecture 2. What is a data visualization?

* Types of visualization
    * exploring data - find an unknown
    * analyzing data - test a hypothesis
    * presenting data - tell a story

### Activity: Your favorite visualization

* Visualization resources
    * [Reddit](https://reddit.com/r/dataisbeautiful)
    * [Flowing Data](https://FlowingData.com)
    * [Climate Change](https://intelligence.weforum.org/topics/a1Gb0000000LHVfEAO?tab=data)
    * [Germany Import](https://oec.world/en/visualize/tree_map/hs92/import/deu/isr/show/2017/)
    * [Arms Import Export](https://armsglobe.chromeexperiments.com/)

### Lecture 4. The power of D3

* D3 alternatives
    * Fusion Charts
    * Chart.js
    * highcharts
    * google developers charts
* D3: Data Driven Documents
    * Flexibility - make unique visualizations
    * Elegance - build beautiful visualizations with ease
    * Community - find pre-written code to do anything
* Flexibility:
    * load  own data from any source
    * D3 patches data to shapes on screen
    * make completely new visuals that have never existed before
* Elegance
    * D3 handles huge volumes of data efficiently
    * Easily add smooth transitions for updating elements
    * Work with clean well designed code
* Community
    * find pre-built code to use in our own projects
    * everything is Open Source no licencing
    * wide user base. easy to collaborate 

## Section 2: Getting started with D3

### Lecture 9. Setting up your environment

* Chrome browser
* Sublime text editor
* D3 and template files
* Python HTTP server
* fire up python http server `python3 -m http.server`. it listens on port 8000 serving the folder the command is run from

### Lecture 10. Understanding SVGs

* SVGs
    * draw shapes with computer code
    * rects, circles,elipses,lines,texts paths
    * markup code similar to HTML
    * small file size. dont lose quality if resized
* the parent element is the svg canvas wi the dimensions `<svg width="400" height="60"></svg>`
* dimension origi n is top left
* for a rectangle we need origin coordinates width heigh and fill `<rect x="0" y="0" width="50" height="50" fill="green"></rect>` we put the tag in the parent svg tag
* if shape coordinates fall outside of canvas they do not appear on screen
* to add outine to shapes we add the stroke attribute `stroke="gray" stroke-width="5px"` outline pixels are added externally to to shape
* for circular shapes `<circle cx="90" cy="25" r="25" fill="red"></circle>`
* for elipse shapes `<ellipse cx="145" cy="25" rx="25" ry="15" fill="grey"></ellipse>`
* for lines give 2 endpoints and a stroke `<line x1="165" y1="5" x2="230" y2="40" stroke="blue" stroke-width="5"></line>`
* to render text `<text x="260" y="25" font-size="20px" fill="orange">Hello World</text>` x,y text achor position is top-left by default
* if we want to place the anchor in middle we add an attribute `<text x="260" y="25" font-size="20px" fill="orange" text-anchor="middle">Hello World</text>`
* the path is the most powerfull svg feature `<path d="M10 80 C 40 10, 65 10, 95 80 S 150,180 80" stroke="black" fill="transparent"/>` it can be used to create lines, arcs,shapes,curves
    * the d attribute gives the shape
    * d3 has path generators that generate the d
* we d3 we add svg shapes and attributes with javascript

### Lecture 11. Adding SVGs with D3

* D3 Select - use D3 to grab hold of elements on the screen
* D3 Append - add SVGs on the selection
* D3 Attr - set attributes of SVG to make them appear on screen
* Method chaining in D3
* we include the js file in HTML
* D3.js uses CSS selectors or HTML tags to select elements from html
* D3 Select
```
<svg width="400" height="300">
    <rect class="outside" x="0" y="0" width="50" height="50" fill="green"></rect>
    <rect id="center" x="60" y="0" width="50" height="50" fill="red"></rect>
    <rect class="outside" x="120" y="0" width="50" height="50" fill="green"></rect>
</svg>
```
    * select by HTML tag (by default only first encounter) `d3.select("rect")`
    * select by CSS ID (unique) `d3.select("#center")`
    * select by  HTML tag (all) `d3.selectAll("rect")`
    * select by  CSS Class (all) `d3.selectAll(".outside")`
* D3 Append `<svg id="canvas" width="400" height="60"></svg>`
    * select SCG canvas `var svg = d3.select("#canvas")`
    * append rectangle `var rect = svg.append("rect")`
    * set rectangle attributes
```
rect.attr("x", 25)
rect.attr("y", 0)
rect.attr("width", 150)
rect.attr("height", 60)
rect.attr("fill","blue")
```
* in D3 we can chain methods
```
var rect = d3.select("#canvas")
    .append("rect")
        .attr("x", 25)
        .attr("y", 0)
        .attr("width", 150)
        .attr("height", 60)
        .attr("fill","blue")
```
* or as an 1 liner chain `var rect = d3.select("#canvas").append("rect").attr("x", 25).attr("y", 0).attr("width", 150).attr("height", 60).attr("fill","blue")`
* we can chain methods because they return the element they are altering
* we can append an svg element to an HTML tag and set its attributes
```
var svg = d3.select("#chart-area").append("svg")
    .attr("width",400)
    .attr("height",400)
var circle = svg.append("circle")
    .attr("cx", 200)
    .attr("cy", 200)
    .attr("r", 100)
    .attr("fill","blue")
```

### Lecture 12. Activity: Adding SVGs to the screen

```
var svg = d3.select("#chart-area")
    .append("svg")
    .attr("width",500)
    .attr("height",400);

var line = svg.append("line")
    .attr("x1", 10)
    .attr("y1", 10)
    .attr("x2", 100)
    .attr("y2", 300)
    .attr("stroke","blue")
    .attr("stroke-width", 4);

var circle = svg.append("circle")
    .attr("cx", 200)
    .attr("cy", 100)
    .attr("r", 100)
    .attr("fill", "red")

var ellipse = svg.append("ellipse")
    .attr("cx", 350)
    .attr("cy", 250)
    .attr("rx", 100)
    .attr("ry", 50)
    .attr("fill", "yellow")
```

### Lecture 13. Selections and data joins

* tying SVGs on screen with data gives Data Driven Docs
* we use D3 data join and D3 Enter to add multiple svgs at once
```
var data = [25,20,10,12,15];

var svg = d3.select("#chart-area").append("svg")
    .attr("width",400)
    .attr("height",400);
    
/* we select all circles on screen and associate them with the data array using .data*/
var circles = svg.selectAll("circle")
    .data(data);
    
circles.enter()
    .append("circle")
        .attr("cx",200)
        .attr("cy",200)
        .attr("r",100)
        .attr("fill","red");
```
* in the code above we select all circles on screen and associate them with the data array using `.data()`
* the `data()` method can be used even if the circles are not yet drawn on screen
* we use `.enter()` async to enter and draw the actual circles
* the result of hte 2 method combo is that we get a new circle for each array element
* we showcase the async behaviour by passing in callbacks which get called for each array element
```
circles.enter()
    .append("circle")
        .attr("cx",(d,i)=>{
            console.log(`Item: ${d},Index: ${i}`);
            return (i*50)+25;
        })
        .attr("cy",200)
        .attr("r",d=>{
            console.log(`Item: ${d}`);
            return 25;
        })
        .attr("fill","red");
```
* we can use the callbacks to pass as attribute array elements

### Lecture 14. Loading external data

* Loading external data from CSV,TSV, JSON files
* Using map functions to format our raw text data
* Setting attributes of our SVGs with anonymous functions
* load from CSV `d3.csv("data/ages.csv").then((data)=>{})`
* load from TSV `d3.tsv("data/ages.tsv").then((data)=>{})`
* load from JSON `d3.json("data/ages.json").then((data)=>{})`
* D3 v5 uses promises
* we alter the previous code to use the csv data
```
d3.csv("data/ages/csv").then((data)=>{
   console.log(data); 
   data.forEach(d=>{
       d.age = +d.age;
   });
   
   var svg = d3.select("#chart-area").append("svg")
    .attr("width",400)
    .attr("height",400);
    
    var circles = svg.selectAll("circle")
        .data(data);
        
    circles.enter()
        .append("circle")
            .attr("cx",(d,i)=>{
                console.log(`Item: ${d},Index: ${i}`);
                return (i*50)+25;
            })
            .attr("cy",200)
            .attr("r",d=>{
                console.log(`Item: ${d}`);
                return d.age +2;
            })
            .attr("fill",d=>{
                if(d.name=="Tony"){
                    return "blue";
                }
                return "red";
            });
}).catch(err=>{
    console.log(err);
});
```
* load data methods return JS objects

### Lecture 15. Activity: Your first visualization!

* Use D3 to read in the data from the buildings.json  file into your main.js  file. Log the data out to your console, and take a look at the format of your array.
* Write a forEach() loop for your data array to convert the height values from strings to numbers.
* Add an SVG to the #chart-area  div in the index.html file. Give it a width of 500px and a height of 500px.
* Use a data join to add a rectangle for each building in the dataset to your SVG.
* Stagger the rectangles by their x-coordinates, and make their heights equal to the “height” values from your JSON file.