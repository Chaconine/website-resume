var n = 10, // how many bars?
    random = function () { return Math.floor(Math.random() * 100); }, // randomize some numbers for data
    data = d3.range(n).map(random); // an array of randomized datapoints

var barChart = {
    init: function () {
        this.height = 315;
        this.width = 560;
        this.padding = 0;
        this.el = ".bar-chart"; // where we'll put our svg 

        // calculate the bar width from the total chart width
        barWidth = Math.floor((this.width - (this.padding * (data.length - 1))) / data.length);
        barHeight = this.height - 20;


        this.svg = d3.select(this.el).insert('svg', ':first-child')
            .attr('width', this.width)
            .attr("height", this.height);

        this.draw();
    },
    draw: function () {
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
    // this actually draws a bar
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