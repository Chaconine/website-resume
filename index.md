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

<div id="graph"></div>

<script>

var width = 560,
    height = 315;

var force = d3.forceSimulation()
    .nodes([{}]) // initialize with a single node
    .force("link", d3.forceLink().distance(linkDistance).strength(0.1))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2))
    .on("tick", tick);

function linkDistance(d) {
    return d.distance;
};

var svg = d3.select("#graph").append("svg")
    .attr("width", width)
    .attr("height", height)
    .on("mousemove", mousemove)
    .on("mousedown", mousedown);

svg.append("rect")
    .attr("width", width)
    .attr("height", height);

var nodes = force.nodes(),
    links = force.links(),
    node = svg.selectAll(".node"),
    link = svg.selectAll(".link");

var cursor = svg.append("circle")
    .attr("r", 30)
    .attr("transform", "translate(-100,-100)")
    .attr("class", "cursor");

restart();

function mousemove() {
  cursor.attr("transform", "translate(" + d3.mouse(this) + ")");
}

function mousedown() {
  var point = d3.mouse(this),
      node = {x: point[0], y: point[1]},
      n = nodes.push(node);

  // add links to any nearby nodes
  nodes.forEach(function(target) {
    var x = target.x - node.x,
        y = target.y - node.y;
    if (Math.sqrt(x * x + y * y) < 30) {
      links.push({source: node, target: target});
    }
  });

  restart();
}

function tick() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
}

function restart() {
  link = link.data(links);

  link.enter().insert("line", ".node")
      .attr("class", "link");

  node = node.data(nodes);

  node.enter().insert("circle", ".cursor")
      .attr("class", "node")
      .attr("r", 5)
      .call(force.drag);

  force.start();
}

</script>


### Hobbies

- Animating math with manim, initial package developed by 3b1b

<iframe width="560" height="315" src="https://www.youtube.com/embed/QMzvg8Z4-fc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- [Elementary Differential Geometry](https://netmath.illinois.edu/college/math-423), Math 423 at UIUC

- NCAA D1 volleyball statistics

<select name="Stats" id="stats">
  <option value="Aces" selected>Aces</option>
  <option value="Assists">Assists</option>
  <option value="Hitting">Hitting</option>
</select>

<div id="volleyball"></div>

<script type="text/javascript">
    var margin = { top: 0, right: 0, bottom: 80, left: 80 };
    var width = 622 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#volleyball")
    .insert("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var datasets = {Aces: "data/aces.csv",
                Assists: "data/assists.csv",
                Hitting: "data/hitting.csv"};

// A function that updates the chart
function update() {
        console.log(d.Per_Set)
        document.getElementById("volleyball").innerHTML="";

        // append the svg object to the body of the page
        var svg = d3.select("#volleyball")
            .insert("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var path = datasets[document.getElementById("stats").value];

        //Read the data
        d3.csv(path).then(function(data) {

        //Set Ranges for X and Y scales
        var xScale = d3
            .scaleBand()
            .range([0, width])
            .padding(0.2);
        var yScale = d3
            .scaleLinear()
            .range([height, 0]);

        //Adding domain values to X and Y Scale
        xScale.domain(
            data.map(function (d) {
                return d.School;
            })
        );
        yScale.domain([
            0,
            d3.max(data, function (d) {
                return d.Per_Set;
            })
        ]);
            

        //X axis
        svg.append("g")
            .attr("class", "x axis")
            .call(d3.axisBottom(xScale))
            .attr("transform", "translate(0," + height + ")")


        //Y axis
        svg
            .append("g")
            .call(d3.axisLeft(yScale))
            .attr("transform", "translate(10,0)")
            .append("text")
            .text("Per Set")


        //Bars
        svg
            .selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function (d) {
                return xScale(d.School);
            })
            .attr("width", xScale.bandwidth())
            .attr("y", function (d) {
                return height;
            })
            .attr("height", function (d) {
                return height - yScale(d.Per_Set);
            });
    })
}

update()

// When the button is changed, run the updateChart function
d3.select("#stats").on("change", function(d) {
    update()
})
    
console.log("test")

</script>

- [Blogging about neuroscience](https://sonichedgehogs.com/)


### Education
**UC Berkeley**<br/>
Bachelor of Science in Microbial Biology<br/>
GPA 3.71/4.00<br/>


