//Create SVG element
var svg2 = d3.select("#chart-2 .chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

var tooltip2 = d3.select("#chart-2")
  .append('div')
  .style('visibility', 'hidden')
  .attr('class', 'my-tooltip')
  .attr('id', 'tooltip-2')

//Load in data
d3.csv("https://assets.law360news.com/1470000/1470334/data-2.csv")
  .then(function(csv) {
    // Add X scale
    var xScale = d3.scaleBand()
      .range([margin.left, width - margin.right])
      .domain(['1st', '2nd', '3rd', '4th', '5th', '6th', '7th',
        '8th', '9th', '10th', '11th', 'D.C.', 'Fed.'
      ])
      .padding(.25);

    // Define X axis
    var xAxis = d3.axisBottom(xScale)
    // .tickFormat((d) => {
    //   return d.substring(0, 3);
    // })

    // Add Y scale
    var yScale = d3.scaleLinear()
      .domain([22, 0])
      .range([0, height - (margin.top + margin.bottom)])

    // Define Y axis and format tick marks
    var yAxis = d3.axisLeft(yScale)
      .ticks(tickNums)

    var yGrid = d3.axisLeft(yScale)
      .tickSize(-width + margin.right + margin.left, 0, 0)
      .tickFormat("")
      .ticks(tickNums)

    // Render Y grid
    svg2.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .attr("class", "grid")
      .style('color', 'black')
      .style('opacity', '0.2')
      .call(yGrid)

    svg2.selectAll("bars")
      .data(csv)
      .enter()
      .append("rect")
      .attr('class', (d) => {
        return `circuit circuit-${d.circuit.replaceAll('.', '').toLowerCase()}`
      })
      .attr("y", function(d) {
        return (height - margin.bottom) - yScale(22 - d.count);
      })
      .attr("x", function(d) {
        return xScale(d.circuit)
      })
      .attr("height", function(d) {
        return yScale(22 - d.count);
      })
      .attr("width", xScale.bandwidth())
      .attr("fill", '#6ba292')
      .on("mouseover mousemove", (d) => {
        return mouseover(d, 2)
      })
      .on('mouseout', () => {
        return mouseout(2)
      })

    svg2.selectAll("bars")
      .data(csv)
      .enter()
      .append('text')
      .text(d => d.count)
      .attr('class', (d) => {
        return `circuit circuit-${d.circuit.replaceAll('.', '').toLowerCase()}`
      })
      .attr("y", function(d) {
        return (height - margin.bottom) - yScale(22 - d.count) - 5;
      })
      .attr("x", function(d) {
        return xScale(d.circuit) + xScale.bandwidth() / 2;
      })
      .data(csv)
      .on("mouseover mousemove", (d) => {
        return mouseover(d, 2)
      })
      .on('mouseout', () => {
        return mouseout(2)
      })

    svg2.selectAll("svg text")
      .attr("font-family", "sans-serif")
      .attr("font-size", "9pt")
      .attr("text-anchor", "middle")


    // Render Y axis
    svg2.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .attr('class', 'y-axis')
      .call(yAxis)
      .style('color', 'black')
      .selectAll("text")
      .attr("font-size", "9pt")
      .style("text-anchor", "end")

    //Render X axis
    svg2.append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .attr('class', 'x-axis')
      .style('color', 'black')
      .call(xAxis)
      .selectAll("text")
      .attr("font-size", "9pt")
      .attr("transform", () => {
        return winWidth > 767 ? null : `translate(-5, 0) rotate(-45)`
      })
      .style("text-anchor", () => {
        return winWidth > 767 ? `middle` : `end`
      })
      .data(csv)
      .on("mouseover mousemove", (d) => {
        return mouseover(d, 2)
      })
      .on('mouseout', () => {
        return mouseout(2)
      })
  });