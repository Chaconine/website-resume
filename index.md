<link rel="shortcut icon" type="image/png" href="{{ "/assets/favicon.png" | prepend: site.baseurl }}" >

## Resume

### Projects

- Visualizations in D3.js

<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js"></script>

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

<script>
    var dataset = [
        {date: "01/01/2016", pizzas: 10000},
        {date: "01/02/2016", pizzas: 20000},
        {date: "01/03/2016", pizzas: 40000},
        {date: "01/04/2016", pizzas: 30000},
        {date: "01/05/2016", pizzas: 30000},
        {date: "01/06/2016", pizzas: 50000},
        {date: "01/07/2016", pizzas: 30000},
        {date: "01/08/2016", pizzas: 50000},
        {date: "01/09/2016", pizzas: 60000},
        {date: "01/10/2016", pizzas: 20000},
        {date: "01/11/2016", pizzas: 10000},
        {date: "01/12/2016", pizzas: 90000},
    ];

    // Calculate Margins and canvas dimensions
    var margin = {top: 40, right: 40, bottom: 40, left: 60},
        width = 700 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    //Parsers and Formaters
    var parseTime = d3.timeParse("%d/%m/%Y");
    var formatTime = d3.timeFormat("%a/%b/%Y");

    // Scales
    var x = d3.scaleTime()
        .range([0, width]);

    var y = d3.scaleLinear()
        .range([height, 0]);

    // Line
    var line = d3.line()
        .x(function(d) { return x(this.parseTime(d.date)); })
        .y(function(d) { return y(d.pizzas/1000); })


    var svg = d3.select("body").append("svg")
        .style("background-color", '#888')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    //Arguments for axes : Ranges for X, y  
    x.domain(d3.extent(dataset, function(d) { return parseTime(d.date); }));
    y.domain(d3.extent(dataset, function(d) { return d.pizzas/1000; }));

    // Axes
    svg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    svg.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y));
    // Labels
    svg.append("text")
                .attr("text-anchor", "middle")
                .style("font-size", "14px")
                .attr("transform", "translate("+ (margin.left - 94 ) +","+(height/2)+")rotate(-90)")  
                .text("Pizzas ( Thousands ) ");

    svg.append("text")
                .style("font-size", "14px")
                .attr("text-anchor", "middle") 
                .attr("transform", "translate("+ (width/2) +","+(height-(margin.bottom -74))+")")
                .text("Date");

    //  Chart Title
    svg.append("text")
            .attr("x", (width / 2))             
            .attr("y", 20 - (margin.top / 2))
            .attr("text-anchor", "middle")  
            .style("font-size", "16px") 
            .text("Pizza consumption");

    // Data Lines:

    svg.append("path")
        .datum(dataset)
        .attr("class", "line")
        .attr("d", line);

    // See also :
    //https://github.com/d3/d3-shape/blob/master/README.md#lines
    //https://bl.ocks.org/mbostock/02d893e3486c70c4475f
</script>

- [Blogging about neuroscience](https://sonichedgehogs.com/)


### Education
**UC Berkeley**<br/>
Bachelor of Science in Microbial Biology<br/>
GPA 3.71/4.00<br/>


