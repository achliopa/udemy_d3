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
d3.csv("data/ages.csv").then((data)=>{
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
```
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
```

## Section 3: Scales and Axes

### Lecture 18. Linear Scales

* scales solve the roblem of shape overshooting out of the canvas
* scales map from an input domain to an output range
* range can be a number or a colour
* a linear scale in d3 uses a domain and a range
```
var y = d3.scaleLinear()
    .domain([0,828])
    .range([0,400]);
console.log(y(100)); // 48.3
console.log(y(414)); // 200
console.log(y.invert(200)); //414
```
* we use invert to g from range to domain
* a convention in d3 is to use a scale var name the name of the axis it applies to
* usually as domain we use the max val in data set + margin
* the height of our shapes is generated by our scale rather than precomputed off line (SWEET)

### Lecture 19. Logarithmic Scales

* log scales are used for vals that increase rapidly (e.g exponentially) so we lose detail
* log scale in d3 is similar to linear (domain and range using min max vals) 
* we also give the log base num (default is 10) (factors of 10 are equally spaced)
* log scale with base of 1 is a linear scale
* the domain must be strictly positive or negative. log(0) is undefined
```
var x = d3.scaleLog()
    .domain([300,150000])
    .range([0,400])
    .base(10);
console.log(x(500)); // 32,9
console.log(x.invert(32.9)); //500
```

### Lecture 20. Time Scales

* a linear scale where the domain accepts JS Date objects `new Date(2001,0,0)` and range is a value range
```
var x = d3.scaleTime()
    .domain([new Data(2000,0,1),new Date(2001,0,1)])
    .range([0,400]);
console.log(x(new Date(2000,7,1))); //199
console.log(x.invert(232.8)); // Tue Aug 01 2000
```

### Lecture 21. Ordinal Scale

* ordinal scales for assigning color schemes to categorical data
* using D3 handy nbuilt color schemes in our visualizations
    * domain ["AFRICA","N.AMERICA","EUROPE","S.AMERICA","ASIA","AUSTRALASIA"]
    * range ["RED","ORANGE","YELLOW","GREEN","BLUE","INDIGO","GREY"]
* we can map any strigns with each other based on their position in the array of strings
* if we pt a value that has no map d3 generates one for us with next avail value. 
* if we put more unmapped vals d3 loops back assigning range vals
* in [github](https://github.com/d3/d3-scale-chromatic) we can find inbuilt color schemes
```
var color = d3.scaleOrdinal()
    .domain(["AFRICA","N.AMERICA","EUROPE","S.AMERICA","ASIA","AUSTRALASIA"])
    .range(d3.schemeCategory10);
console.log(color("AFRICA")); // #1f77b4
```
* we cannot use invert in ordinalscale

### Lecture 22. Band Scales

* used in bar charts
* with what we know so far if we want to add one more bars in a chart we need to reposition all
* we use bandscales to space out different categories in a bar chart
* band scale uses
    * range
    * step (range / elements)
    * step * paddingInner = inner space between bars
    * step * paddingOuter = outer space between bar and canvas limit
    * bandwith = width of bar
    * step = bandwidth + step * paddingInner
* paddingInner and paddingOuter is [0,1]
* if we put an element that does not exist in scale we get undefined
* we dont care about domain values just how many there are
```
var x = d3.scaleBand()
    .domain(["AFRICA","N.AMERICA","EUROPE","S.AMERICA","ASIA","AUSTRALASIA"])
    .range([0,400])
    .paddingInner(0.3)
    .paddingInner(0.2);
console.log(x("S.AMERICA")); // 209 = "x" position
console.log(x.bandwidth()); // 45.9 = "width"
```

### Lecture 23. D3 min, max, and extent

* we need to set the domains of the scales automatically baed on the data we are looking at
    * using the d3.min(),d3.max() d3.extent()
    * using mapping functions to provide an array of category names to ordinal/band scales
* we need adaptive domains to data
* we use callbacks to get the data from dataset and se the vals
```
var data = [
    { grade: "A", value: 4 },
    { grade: "B", value: 3 },
    { grade: "C", value: 2 }
];

var min = d3.min(data,d=>d.value);
console.log(min); // 2
var max = d3.max(data,d=>d.value);
console.log(max); // 4
var val_extent = d3.extent(data,d=>d.value);
console.log(val_extent) // [2,4]
var grade_map = data.map(d=>d.grade);
console.log(grade_map) // ["A","B","C"]
```
* a real example of building a bar chart
```
var y = d3.scaleLinear()
    .domain([
        d3.min(data,d=>d.value),
        d3.max(data,d=>d.value)
    ])
    .range([0,400]);

var y = d3.scaleLinear()
    .domain([d3.extent(data,d=>d.value)])
    .range([0,400]);

var x = d3.scaleBand()
    .domain(data.map(d=>d.grade))
    .range([0,400])
    .paddingInner(0.3)
    .paddingInner(0.3);
```
* with this approach we dont have to hardcode domain params.

### Lecture 24. Margins and groups

* SVG goups are used to structure elements together on page
* we can use transformations to alter SVG position
* we folow the D3 margin convention to give us space for the axes
* SVG Groups `<g transform="translate(200,0)"></g>`
    * invisible containers for structuring SVGs
    * with transmation attributes for moving multiple SVGs at once
* we put shapes in groups by wrapping them in their tags
* a standard setup for svg camvas
```
var margin = {top: 20, right: 10, bottom: 20, left: 10};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;
var g = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.left)
    .attr("height", width + margin.top + margin.bottom)
.append("g")
    * attr("transform",`translate(${margin.left},${margin.top})`);
```
* we use the transform to move our shapes in the margin frame to give space for axes

### Lecture 25. Axes and labels

* we ll use axis generators in our bar chart to show the scale
* also axis labels to tell what we look at
* left axis
```
var leftAxis = d3.axisLeft(<Y-SCALE>);
g.append("g")
    .attr("class","left axis")
    .call(leftAxis)
```
* topAxis
```
var topAxis = d3.axisTop(<X-SCALE>);
g.append("g")
    .attr("class","top axis")
    .call(topAxis)
```
* right axis
```
var rightAxis = d3.axisRight(<Y-SCALE>);
g.append("g")
    .attr("class","right axis")
    .attr("transform",`translate(${width},0)`)
    .call(rightAxis)
```
* bottomAxis
```
var topAxis = d3.axisBottom(<X-SCALE>);
g.append("g")
    .attr("class","bottom axis")
    .attr("transform",`translate(0,${height})`)
    .call(bottomAxis)
```
* axis re rendered related to the canvas origin
* we can size and space the axis ticks
```
d3.axisBottom(x)
    .tickSizeOuter(<VALUE>) /* outer ticks vertical size */
    .tickSizeInner(<VALUE>) /* inner ticks vertical size */
    .tickSize(<VALUE>) /* ALL ticks vertical size. it overrides the above methods*/
```
* how many ticks to draw??? `.ticks(<VALUE>)`
* to format text we can use d3.format() or custom callaback
```
d3.axisBottom(x)
    .tickFormat(d3.format(""))
```