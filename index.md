## Resume

### Projects

- Visualizations in D3.js

<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/5.16.0/d3.min.js"></script>

<div class="bar-chart"></div>

<script type="text/javascript">

  var n = 10,
    random = function() { return Math.floor(Math.random() * 100); },
    data = d3.range(n).map(random); 

var barChart = {
  init: function() {
    this.height = 315;
    this.width = 560;
    this.padding = 20;
    this.el = ".bar-chart"; 

    barWidth = Math.floor((this.width - (this.padding * (data.length - 1))) / data.length);
    barHeight = this.height - 20;

    this.svg = d3.select(this.el).insert('svg', ':first-child')
      .attr('width', this.width)
      .attr("height", this.height);
    
    this.draw();
  },
    draw: function() {
    this.meters = this.svg
      .append("g")
        .attr("class", "meter")
        .selectAll("rect")
          .data(data)
          .enter()
          .append('g')
            .attr("class", "bar");

    this.drawBar().attr("class", "background").attr("y", 0).attr("height", barHeight);
    this.drawBar().attr("class", "foreground").attr("y", barHeight).attr("height", 0);
  },

    drawBar: function () {
    var self = this;

    return this.meters.append("rect")
      .attr("x", function (d, i) {
        return i * (barWidth + self.padding);
      })
      .attr("width", barWidth);
  }
}

barChart.init();

</script>

- [Prototyped website design for Taga Lab at Berkeley](https://chaconine.github.io/research.html)
    - HTML/CSS available in [github repo](https://github.com/Chaconine/TagaLabWebsite)
    - Hosted on Github Pages

- [3D computer vision tracking with the Microsoft Kinect](https://github.com/Chaconine/Depth-tracking)
    - Developed 3D visualizer for Python with package pptk that renders 2 million points from the Microsoft Kinect
    - Tested unsupervised methods for understanding social behaviors
    - Worked on various models for inferring 3d kinematics from 2d images

<iframe width="560" height="315" src="https://www.youtube.com/embed/pSL2Q0v8fgA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


<iframe width="560" height="315" src="https://www.youtube.com/embed/Ib26lk4dvck" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- Training graph neural networks 
    - Non-Euclidean relationships between data, (i.e. social graphs, citation networks) require unique approaches to embedding data so they can be visualized 
    - Working through Stanford's CS224w, focused primarily on various implementations and architectures of graph neural nets in PyTorch

### Hobbies

- Animating math with manim, initial package developed by 3b1b

<iframe width="560" height="315" src="https://www.youtube.com/embed/QMzvg8Z4-fc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- [Elementary Differential Geometry](https://netmath.illinois.edu/college/math-423), Math 423 at UIUC, inspired parametric curve tracing on unit sphere in D3.js

- NCAA D1 volleyball statistics

<select name="Stats" id="stats">
  <option value="Aces" selected>Aces</option>
  <option value="Assists">Assists</option>
  <option value="Hitting">Hitting</option>
</select>

<div id="my_dataviz"></div>

<script type="text/javascript">

// set the dimensions and margins of the graph
var margin = {top: 0, right: 0, bottom: 0, left: 0},
    width = 560,
    height = 315;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .insert("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var datasets = {Aces: "data/aces.csv",
                Assists: "data/assists.csv",
                Hitting: "data/hitting.csv"};

var path = datasets[document.getElementById("stats").value];

//Read the data
d3.csv(path).then(function(data) {

    // List of groups (here I have one group per column)
    var allGroup = data[0]

    d3.select("#selectButton")
      .selectAll('myOptions')
     	.data(allGroup)
      .enter()
    	.append('option')
      .text(function (d) { return d; }) // text shown in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button

    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
      .domain(d3.extent(data, function(d) { return d.School; }))
      .range([ 0, width ]);
    svg.append("g")
      .call(d3.axisBottom(x).ticks(42));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.Per_Set; })])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    console.log("test")
})

</script>

- [Blogging about neuroscience](https://sonichedgehogs.com/)


### Education
**UC Berkeley**<br/>
Bachelor of Science in Microbial Biology<br/>
GPA 3.71/4.00<br/>


