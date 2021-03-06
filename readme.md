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
    .tickFormat(d3.format(",.0f"));

d3.axisBottom(x)
    .tickFormat(d=><TICK TEXT>);
```
* we can explicitly pass in tick values (we can use map on dataset if needed)
```
d3.axisBottom(x)
    .tickValues([1,2,3,4,5,6,11,12]);
```
* we use groups to apply transformation on axis for correct placement
* real life example
```
var xAxisCall = d3.axisBottom(x);
g.append("g")
    .attr("class","x axis")
    .attr("transform",`translate(0,${height})`)
    .call(xAxisCall)
    .selectAll("text")
        .attr("y","10")
        .attr("x","-5")
        .attr("text-anchor","end")
        .attr("transform","rotate(-40)")
        
var yAxisCall = d3.axisLeft(y)
    .ticks(3)
    .tickFormat(d=>d+"m");
g.appeng("g")
    .attr("class","y axis")
    .call(yAxisCall);
```
* to add a label on X axis
```
g.append("text")
    .attr("class","x axis-label")
    .attr("x", width/2)
    .attr("y", height * 140)
    .attr("font-size","20px")
    .attr("text-anchor","middle")
    .text("The world's tallest buildings")
```
* for a Y axis label we do the same bt apply rotate transformation also we swap x and y position

### Lecture 26. Making a bar chart

* we need to reverse the y-scale so that y axis works ok (bottom up bars)
* we need to mess with SVG coord system
* to revers a scale we need to pass a range as [MAX,MIN] and not [MIN,MAX]
* this does not cut it. bars will float in canvas. its fucked up. 
* what we want is the Total height - the reverse y-scale
* still we have a problem. bars hang on top. we need to translate them by y(d.heiht) (reverse yscale)
```
var y = d3.scaleLiear()
    .domain(0,d3.max(data,d=>d.height))
    .range([height,0]);
```
* when we draw them
```
rects.enter()
    .append("rect")
        .attr("y",d=>y(d.height))
        .attr("x",d=>x(d.name))
        .attr("width",x.bandwidth)
        .attr("height",d=> height - y(d.height))
        .attr("fill","gray");
```

### Lecture 27. Project 1: StarBreak Coffee

* plot sales data as bar chart
* anchor svg in #chart-area id
* data in JSON

### Lecture 28. Activity: Project 1

* For any project in D3, it makes sense to “Divide and Conquer” a complex task like this into manageable chunks. 
* Follow along with these instructions, and make sure that you understand how each step works:
    * Load the data into your main.js  file using the d3.csv()  function. Make sure that you format the data, so that you can work with values as integers. Make a console log so that you can see the output of the data in the browser.
    * Add an SVG canvas to the #chart-area  div element with a width of 600px and a height of 400px. Add a group for our SVG elements, and define some suitable margins for an x and y axis.
    * Create the scales for our visualization. The x-axis should be an band scale, whilst our y-axis will be a linear scale.
    * Using D3 selectAll with the data, enter, and append methods, add a rectangle for each month of data that we have. 
    * Scale the rectangles to have the correct width and height. Choose the right y-values so that they sit at the bottom of the visualization area.
    * Add in axes and labels, so that we can tell what the visualization is showing us.
* solution
```
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
```

## Section 4: The basics of design

### Lecture 31. Designing for clarity

* make the data easy to interpret
* build credible visualization
* keep focus on important factors
* Tufte design principles
    * graphical integrity => scale limits
    * lie factor => tilted graphics
    * chart junk => distraction by elements not adding info
    * data-to-ink ratio => the larger the better

### Lecture 32. Subjectivity in design

* Goals
    * grab users attention
    * encourage exploration
    * build new interesting types of visualizations
* Infographics are fun

### Lecture 33. Activity: Critiquing visualizations

* [coffe infographic](https://i.udemycdn.com/redactor/raw/2018-02-20_16-04-31-62ceea612d647cb38fbdfdb8da3f8f72.png)
* [bingo infographic](https://i.udemycdn.com/redactor/raw/2018-02-20_16-05-28-808acf3e35db9dd4b7b293514e7b8942.jpg)
* [hiphop word usage](https://pudding.cool/projects/vocabulary/)

### Lecture 34. The design toolkit

* Design channels
    * position
    * size
    * value
    * texture
    * color
    * orientation
    * shape
* shapes: points,lines,areas
* some channels are more intuitive than others
* pick right channel for right type of data
* data categories
    * quantitative (numerical) : position => length => slope angle
    * categorical (categories) : area => intensity
    * ordinal (rankings) = categorical with order : color , shape
* dont use more than 5-8 colrs
* dont use diverging color scale for quantitative data
* consider color blind users
* [colorbrewer](https://colorbrewer2.org) a tool to select color schemes

### Lecture 35. An introduction to sketching

* wireframe site before programming it
* think various options to communicate data
* use wireframes to talk to clients or peers
* Rules of sketching
    * use paper
    * sketch big (A% or larger)
    * go for general points dont bother with details
* use pen and paper
* sunburst plot for popultation: continent => country => region (GDP as intensity)
* legend

### Lecture 37. The Bootstrap grid system

* everything needs to be surrounded by a div with a "container" class
* use div with "row" class for rows
* BS supports an 12 column grid use divs with class "col-md-X" where X = 1 to 12
* if adding cols results with >12 BS will wrap the cols
* we can use class"col-xs-" for phones "col-sm-" for tablets "col-md-" for desktop screens "con-lg-" for large screens
* with "col-md-4" "col-offset-3" we add 3 coll padding before collumn of size 4

## Section 5: Make it dynamic

### Lecture 40. Looping with intervals

* we will use intervals to add loops in the code (async)
* interval() is a d3 method (like setInterval) `d3.interval(()=>{},500)`
* vanilla JS equivalent
```
var myInterval = setInterval(()=>{},500);
clearInterval(myInterval);
```
* do sthing in the callback (periodically)

### Lecture 41. Adding an update function

* we will structure the updates with an update function we call in the loop
* scales and axes need to change if data changes
* if axes and scales change we need to reposition our shapes
* sample update method
```
const update = (data) => {
    x.domain(data.map(d=>d.month));
    y.domain([0,d3.max(data,d=>d.revenue)]);

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
    
};
```
* we need to update the domain as new revenues will come
* the code above is wrong as we keep drawing axes on top of each other on each update
* this is because we append a new group each time the code runs
* we append the crop externally and just mod the atributes
* we just run the call methods in the update method
* anothe rissue is that we have no acces in first interval till callback fires. to fix it we call teh update outside the interval once

### Lecture 42. The D3 update pattern

* update pattern is one of the hardest patterns in D3.
* we will edit the size and position of our rectangles in theupdate method
* to understand the update pattern remeber the data join pattern we used to pass data in the shapes
* it was async..
* when we bind the data to the rect tags (not wet drawn) we see that d3 attaches 3 fields
    * _enter
    * _exit
    * _groups
```
var rects = g.selectAll("rect")
    .data(data);
console.log(rects);
```
* _enter represents all elemets in the data array not yet appearing ion page (need to be added)
* _exit contains all elements on page that d not wexist in the data array (need be removed)
* _groups contains all elements currently on screen
* if we run `rects.enter()...` the elements move from _enter to _groups
* The D3 Update Pattern
    * Data Join - select all matching elements on the screen with selectAll, and update the data we use
```
var text = g.selectAll("text")
    .data(data);
```
    * Exit - use the exit() selector to remove the elements that dont exist in our new array of data `text.exit().remove()`
    * Update - set attributes for existing elements on the screen
```
text.attr("class","update")
    .attr("fill","red");
```
    * Enter - use the enter() selector to set attributes for new items in our data array
```
text.enter().append("text")
    .attr("class","enter")
    .attr("x",(d,i)=>i*32)
    .attr("y",20)
    .attr("fill","green")
    .text(d=>d);
```

### Lecture 43. Making our chart dynamic

* we ll make our data flick between various sources and move the update method in the d3.interval()
* we ll move between profit and revenue
* we ll use a global flag to choose between revenue or profit
* we use ES2015 interpolation passing object attribute name as var
```
var value = flag ? "revenue":"profit";
y.domain([0,d3.max(data,d=>d[value])])
```

### Lecture 44. D3 Transitions

* transitions add smoothness to updates
* to add transition in the enter() where we add components we pass it with attributes
```
rects.enter().append("rect")
    .attr("height",d=>(height-y(d.revenue)))
    .attr("x",d=>x(d.month))
    .attr("width",x.bandwidth)
    .attr("fill","gray")
    .attr("y",y(0))
    .attr("fill-opacity",0)
    .transition(d3.transition().duration(500))
        .attr("y",d=>y(d[value]))
        .attr("fill-opacity",1);
```
* atrs applied before transition are applied instantly
* attrs applied after transition are applied gradually
* we define the transition as a global var `var t = d3.transition().duration(750);`
* to add transition to elements (axis) we put the call before the call method `xAxisGroup.transition(t).call(xAxisCall);`
* we use transition even on exit
* we can use d3.merge() to pass in attribute of enter and update togeteher and keep code DRY
* we use merge after ener and pass in the selection we want to merge it with (eg the rects that is the update selection)
* everything before the merge() is applied in enter() selection
* everything after .merge() is applied on both selections (enter and update in our case)
* we slice the array to remove an element to showcase exit
* we can miss the order. we better pass a callback in .data() join as second arg to pass in keys to associate to data elements
```
.data(data,d=>d.month)
```

### Lecture 45. Scatter plots in D3

* to convert a bar chart to a scatter plot
    * switch rectangles to circles
    * x to cx
    * get rid of width
    * fixed radius
    * convert height to cy
* for correct placement on ticks add half badwidth to cx
* for bubble chart make radius proportional to rect height
```
var rects  = g.selectAll("circle")
    .data(data,d=>d.month);
rects.exit()
    .attr("fill","red")
.transition(t)
    .attr("cy",y(0))
    .remove();

rects.enter()
    .append("circle")
        .attr("fill","gray")
        .attr("cy",y(0))
        .attr("cx",d=>(x(d.month+x.vandwidth()/2))
        .attr("r",5)
        .merge(rects)
        .transition(t)
            .attr("cx",d=>(x(d.month+x.vandwidth()/2))
            .attr("cy",d=>y(d[value]))
```

### Lecture 46. Project 2: Gapminder Clone

* bubble chart to show how population per capita and life expectancy have changed in different countries over the past 2 centuries
* we have an array of objects for each continent and year
* ordinal and log scale is used

### Lecture 47. Activity: Project 2

* Take a look at the data that we're working with in your browser console. If there are any null values for one of the countries in one of the years, use a filter on the array to exclude that country-year data point from the dataset.
* Make a static scatter plot for the first year in our data.
    * Set up some sensible dimensions for your visualization, and make it conform to the D3 margin convention.
    * Write scales for each axis (GDP-per-capita on the x-axis, life expectancy on the y-axis)
        * Suggested domains: x – [300, 150000] ; y – [0, 90] .
        * The x scale should be a logarithmic scale.
    * Append both axes with D3's axis generators.
        * Use TickValues() to manually set our x-axis values of 400, 4,000, and 40,000.
    * Append circles for each country in one year (e.g. the first year of our data)
* Write an update()  function that makes use of the JOIN/EXIT/UPDATE/ENTER pattern discussed in this section.
    * The data join needs to contain a key function linking it to individual countries, or else it won’t work.
    * Put a transition on the update function of 100ms (it can’t be larger than the d3.interval time).
* Add a loop with d3.interval() , calling the update()  function on each iteration of the loop.
    * On each run of the update()  function, you should be passing in a different array of countries.
    * The visualization should go from 1800 to 2015, then reset itself – how could you achieve this with something like our “flag” variable?
* Change the radius dynamically so that it represents the population of the given country in a given year.
    * You’ll need to use another scale for this (the range should be [5, 25]).
    * Make sure to associate population with the area, rather than the radius of the circle! You might need to play around with this scale to find the right transformation to use. (Hint: Area = PI * Radius^2)
* Change the fill of the circles to associate them to their continent.
    * You’ll need to write an ordinal scale to do this. Use one of the D3 color schemes to make things simpler.
* Add axis labels to the x and y axis, and a year marker that updates with every run of the update loop.
```
var margin = { left: 80, right: 20, top: 50, bottom: 100 };
var height = 500 - margin.top - margin.bottom,
	width = 800 - margin.left - margin.right;

var g = d3.select("#chart-area")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left +
		", " + margin.top + ")");

var time = 0;

// Scales
var x = d3.scaleLog()
	.base(10)
	.range([0, width])
	.domain([142, 150000]);
var y = d3.scaleLinear()
	.range([height, 0])
	.domain([0, 90]);
var area = d3.scaleLinear()
	.range([25 * Math.PI, 1500 * Math.PI])
	.domain([2000, 1400000000]);
var continentColor = d3.scaleOrdinal(d3.schemePastel1);

// Labels
var xLabel = g.append("text")
	.attr("y", height + 50)
	.attr("x", width / 2)
	.attr("font-size", "20px")
	.attr("text-anchor", "middle")
	.text("GDP Per Capita ($)");
var yLabel = g.append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", -40)
	.attr("x", -170)
	.attr("font-size", "20px")
	.attr("text-anchor", "middle")
	.text("Life Expectancy (Years)")
var timeLabel = g.append("text")
	.attr("y", height - 10)
	.attr("x", width - 40)
	.attr("font-size", "40px")
	.attr("opacity", "0.4")
	.attr("text-anchor", "middle")
	.text("1800");

// X Axis
var xAxisCall = d3.axisBottom(x)
	.tickValues([400, 4000, 40000])
	.tickFormat(d3.format("$"));
g.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxisCall);

// Y Axis
var yAxisCall = d3.axisLeft(y)
	.tickFormat(function (d) { return +d; });
g.append("g")
	.attr("class", "y axis")
	.call(yAxisCall);

d3.json("data/data.json").then(function (data) {
	console.log(data);

	// Clean data
	const formattedData = data.map(function (year) {
		return year["countries"].filter(function (country) {
			var dataExists = (country.income && country.life_exp);
			return dataExists
		}).map(function (country) {
			country.income = +country.income;
			country.life_exp = +country.life_exp;
			return country;
		})
	});

	// Run the code every 0.1 second
	d3.interval(function () {
		// At the end of our data, loop back
		time = (time < 214) ? time + 1 : 0
		update(formattedData[time]);
	}, 100);

	// First run of the visualization
	update(formattedData[0]);

})

function update(data) {
	// Standard transition time for the visualization
	var t = d3.transition()
		.duration(100);

	// JOIN new data with old elements.
	var circles = g.selectAll("circle").data(data, function (d) {
		return d.country;
	});

	// EXIT old elements not present in new data.
	circles.exit()
		.attr("class", "exit")
		.remove();

	// ENTER new elements present in new data.
	circles.enter()
		.append("circle")
		.attr("class", "enter")
		.attr("fill", function (d) { return continentColor(d.continent); })
		.merge(circles)
		.transition(t)
		.attr("cy", function (d) { return y(d.life_exp); })
		.attr("cx", function (d) { return x(d.income) })
		.attr("r", function (d) { return Math.sqrt(area(d.population) / Math.PI) });

	// Update the time label
	timeLabel.text(+(time + 1800))
}
```

## Section 6: Make it interactive

### Lecture 50. Adding a legend

* we add a group for the whole legend, a group to contain the legend rows
* we hardcode the continets as array of strings
* we shift the legent with transaltion to the bottom right corner 
* we use forEach to iterate and add rows
```
var continents = ["europe","asia","americas","africa"]];

var legend = g.append("g")
    .attr("transform",`translate(${width-10},${height-125})`);

continents.forEach((continent,i)=>{
    var legendRow = legend.append("g")
        .attr("transform",`translate(0,${i+20})`);
    legendRow.append("rect")
        .attr("width",10)
        .attr("height",10)
        .attr("fill",conetinentColor(continent));
    
    legendRow.append("text")
        .attr("x", -10)
        .attr("y", 10)
        .attr("text-anchor","end")
        .style("text-transform","capitalize")
        .text(continent);
});
```
* styles is for CSS attributes
* attr might be CSS attribute but maybe not

### Lecture 51. Formatting and parsing in D3

* D3 Format for number formats
* Using how to use sting specifier strings in Format to format hard to read numbers
* D3 TimeFormat and TimeParse to convert dates between strings and JS Date obj
```
d3.format(".0%")(0.1233); // rounded percentage, "12%"
d3.format("($.2f)")(-3.5); // localized fixed point currency "Ε3.50"
d3.format("+10")(42); // space-filled and signed, "          +42"
d3.format(".^10")(42); // dote-filled and centered, "....42...."
d3.format(".2s")(42e6); // SI-prefix with 2 significant digits, "42M"
d3.format("#x")(48879); // prefixed lowercase hexadecimal, "0xbeef"
d3.format(",.2r")(4200); // grouped thousands with 2 significant digits, "4,200"
```
* reusable formatter
```
var formatter = d3.format(".2f");
formatter(1000); // 1000.00
```
* to build a format specifier `d3.format(specifier)`we need to use correct syntax and order
* sign, symbol,comma,precision, type
* all fields are optional 
* syntax `[[fill]align][sign][symbol][0][width][,][.precision][type]`
* sign can be
    * - : nothing for zero or positive and a minus sign for negative (default)
    * + : a plus sign for zero or positive and minus for negative
    * ( : nothing for zero or positive, minus and parenthesis for negative
    *   : (space) for  zero or positive minus for negative
* symbol can be:
    * $ : local currency symbol per locale
    * #X : #b for binary, #o octal or #x hex. use X for capital hex
* adding a , adds thousands group separator
* .precision : a number following a decimal point signals num of decimal digits
* for types consul docs
* d3.timeFormat() and d3.timeParse() also needs a parser string
* Formatting: Date obj => String
```
var formatTime = d3.timeFormat("%B %d, %Y");
formatTime(new Date); // "June 30, 2015"
```
* Parsing: String => Date Object
```
var parseTime = d3.timeParse("%B %d, %Y");
parseTime("June 30, 2015"); // Tue Jun 30 2015 00:00:00 GMT-0700 (PDT)
```
* for formatting options check the docs

### Lecture 52. Introducing Tooltips

* adding tooltips to let user see data a SVG represents
* using the first plugin to powerup d3 (d3-tip)
* use d3 formatting to render text
* step1 : initialize the tooltip `tip = d3.tip().attr('class','d3-tip').html(d=>d);`
* step 2 : calling the tip in the context of the visualization `vis.call(tip)`
* step 3 : add event listeners
```
vis.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('width',()=>x.rangeBand())
    .attr('height',d=>(h-y(d)))
    .attr('y',d=>y(d))
    .attr('x',(d,i)=>x(i))
    .on('mouseover',tip.show)
    .on('mouseout',tip.hide)
```