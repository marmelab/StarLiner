import 'whatwg-fetch';

import d3 from 'd3';

const width = 800;
const height = 640;

const colors = d3.scale.category10();

const x = d3.time.scale()
    .range([0, width - 40])
    .domain([new Date(), new Date(new Date().getTime() + 60 * 1000)]);

const xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom');

const y = d3.scale.linear()
    .range([height - 40, 20])
    .domain([400, 500]);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

const data = [];
setInterval(() => {
    fetch('http://localhost:3000/')
        .then(response => response.json())
        .then(stats => {
            stats.forEach((stat, index) => {
                if (!data[index]) {
                    data[index] = {
                        name: stat.name,
                        values: []
                    };
                }

                data[index].values.push({
                    date: new Date(),
                    stars: stat.stars
                });
            });

            draw();
        });
}, 1000);

const svg = d3.select('#chart').append('svg')
    .attr('height', height)
    .attr('width', width);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(50, ${height - 40})`)
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .attr('transform', `translate(50, 0)`)
    .call(yAxis);

const line = d3.svg.line()
    .x(d => x(d.date))
    .y(d => y(d.stars));

const draw = () => {
    const lines = svg.selectAll('.line')
        .data(data, d => d.name);

    lines.enter()
        .append('path')
        .attr('transform', `translate(30, 40)`)
        .attr('stroke', d => colors(d.name))
        .attr('class', 'line')
        .attr('data-label', d => d.name);

    lines.exit().remove();

    lines.each(function (currentData) {
        const starLine = d3.select(this).datum(currentData.values);

        starLine.attr('d', line);
    });
}
