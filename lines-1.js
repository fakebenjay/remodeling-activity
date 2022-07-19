//Create svg1 element
var svg1 = d3.select("#chart-1 .chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

var tooltip1 = d3.select("#chart-1")
  .append('div')
  .style('visibility', 'hidden')
  .attr('class', 'my-tooltip')
  .attr('id', 'tooltip-1')

// Render lines g
var linesG = svg1.append("g")
  .attr('class', 'lines')

var barsG = svg1.append("g")
  .attr('class', 'bars')

var proj = textures.lines()
  .orientation("diagonal")
  .size(12)
  .strokeWidth(5)
  .stroke("#6ba292")
  .background("white");

svg1.call(proj);

// Add X scale
var xScale = d3.scaleTime()
  .range([margin.left, width - margin.right])
  .domain([new Date('August 15, 2019'), new Date('May 15, 2023')])
// .tickFormat((d) => {
//   debugger
// })

// Define X axis
var xAxis1 = d3.axisBottom(xScale)
  .ticks(8)
  .tickFormat((d) => {
    var year = d.toLocaleString().split('/')[0] == 1 || (d.toLocaleString().split('/')[0] == 7 && d.toLocaleString().split('/')[2].includes('2020')) ? d.toLocaleString().split('/')[2].split(',')[0].slice(2, 4) : ''
    year = d.toLocaleString().split('/')[2].split(',')[0] === '2019' ? '19' : year
    var monthFormat = window.innerWidth > 767 ? 'short' : 'short'
    var apostrophe = year !== '' ? " '" : ""
    var month = d.toLocaleString('default', {
      month: monthFormat
    })
    var quarter = month === 'Jan' ? 'Q1' : month === 'Apr' ? 'Q2' : month === 'Jul' ? 'Q3' : 'Q4'
    quarter = window.innerWidth < 376 ? quarter.replaceAll('Q', '') : quarter
    return quarter
  })

// Add Y scale
var yScale1 = d3.scaleLinear()
  .domain([550, 250])
  .range([0, height - (margin.top + margin.bottom)])

var yScale3 = d3.scaleLinear()
  .domain([19, -11])
  .range([0, height - (margin.top + margin.bottom)])

// Define Y axis and format tick marks
var yAxis1 = d3.axisLeft(yScale1)
  .ticks(10)
  .tickFormat(d => '$' + d + "B")


var yAxis3 = d3.axisRight(yScale3)
  .ticks(15)
  .tickFormat(d => d + '%')

var yGrid1 = d3.axisLeft(yScale1)
  .tickSize(-width + margin.right + margin.left, 0, 0)
  .tickFormat("")
  .ticks(10)

// Render Y grid
svg1.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`)
  .attr("class", "grid")
  .style('color', '#777777')
  .style('opacity', '0.3')
  .call(yGrid1)

// Render Y axis
var yRender3 = svg1.append("g")
  .attr("transform", `translate(${width - margin.right},${margin.top})`)
  .attr('class', 'y-axis')
  .call(yAxis3)

yRender3.selectAll(".tick")
  .style('color', d => d > 0 ? 'green' : d < 0 ? 'red' : 'black')

yRender3.selectAll("text")
  .style('font-size', () => {
    return window.innerWidth > 767 ? '9pt' : '8pt'
  })
  .attr("transform", `translate(15,0)`)
  .style("text-anchor", "middle")
  .style('fill', d => d > 0 ? 'green' : d < 0 ? 'red' : 'black')

svg1.append('line')
  .attr('class', 'zero')
  .attr('y1', yScale3(-1))
  .attr('y2', yScale3(-1))
  .attr('x1', margin.left)
  .attr('x2', width - margin.right)
  .attr('stroke', 'black')
  .attr('stroke-width', 2)

svg1.append("text")
  .attr("class", "y-label")
  .attr("text-anchor", "middle")
  .attr("transform", `translate(${16},${(height-margin.bottom)/2}) rotate(-90)`)
  .style('font-size', '11pt')
  .style('fill', '#6ba292')
  .text("Homeowner improvements & repairs");


svg1.append("text")
  .attr("class", "y-label")
  .attr("text-anchor", "middle")
  .attr("transform", `translate(${32},${(height-margin.bottom)/2}) rotate(-90)`)
  .style('font-size', '11pt')
  .style('fill', '#6ba292')
  .text("(Four quarter moving totals)");

svg1.append("text")
  .attr("class", "y-label")
  .attr("text-anchor", "middle")
  .attr("transform", `translate(${width - 16},${(height-margin.bottom)/2}) rotate(-270)`)
  .style('font-size', '11pt')
  .style('fill', '#ed6a5a')
  .text("Four quarter moving rate of change");


svg1.append("text")
  .attr("class", "y-label")
  .attr("text-anchor", "middle")
  .attr("transform", `translate(${width - 32},${(height-margin.bottom)/2}) rotate(-270)`)
  .style('font-size', '11pt')
  .style('fill', '#ed6a5a')
  .text("(Year over year)");

svg1.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`)
  .attr('class', 'y-axis')
  .call(yAxis1)
  .selectAll("text")
  .style('font-size', () => {
    return window.innerWidth > 767 ? '9pt' : '8pt'
  })
  .attr("transform", `translate(-20,0)`)
  .style("text-anchor", "middle")

// Render Y grid
svg1.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`)
  .attr("class", "grid")
  .style('color', '#777777')
  .style('opacity', '0.3')
  .call(yGrid1)

//Render X axis
var xRender = svg1.append("g")
  .attr("transform", `translate(0,${height-margin.bottom})`)
  .attr('class', 'x-axis')
  .style('color', 'black')
  .call(xAxis1)

xRender.selectAll(".tick")
  .style('color', (d) => {
    var year = d.toLocaleString().split('/')[2].split(',')[0]
    return year % 2 === 1 ? '#6C6868' : 'black'
  })
xRender.selectAll(".tick text")
  .style('font-size', () => {
    return window.innerWidth > 767 ? '9pt' : '8pt'
  })
  .style('fill', (d) => {
    var year = d.toLocaleString().split('/')[2].split(',')[0]
    return year % 2 === 1 ? '#6C6868' : 'black'
  })
  .attr('class', (d) => {
    var quarter = d.toLocaleString().split('/')[0] < 4 ? 'q1' : d.toLocaleString().split('/')[0] < 7 ? 'q2' : d.toLocaleString().split('/')[0] < 10 ? 'q3' : 'q4'
    var year = d.toLocaleString().split('/')[2].split(',')[0]
    return 'quarterlabel ' + quarter + ' yr-' + year
  })
  .raise()

svg1.append("text")
  .attr("transform", `translate(${xScale(new Date('October 1, 2019'))},${height})`)
  .attr('class', 'yearlabel yr-2019')
  .style('fill', '#6C6868')
  .style('font-size', '10pt')
  .text(d => window.innerWidth < 360 ? "'19" : '2019')
  .style('text-anchor', 'middle')

svg1.append("text")
  .attr("transform", `translate(${xScale(new Date('May 15, 2020'))},${height})`)
  .attr('class', 'yearlabel yr-2020')
  .style('color', 'black')
  .style('font-size', '10pt')
  .text(d => window.innerWidth < 360 ? "'20" : '2020')
  .style('text-anchor', 'middle')

svg1.append("text")
  .attr("transform", `translate(${xScale(new Date('May 15, 2021'))},${height})`)
  .attr('class', 'yearlabel yr-2021')
  .style('fill', '#6C6868')
  .style('font-size', '10pt')
  .text(d => window.innerWidth < 360 ? "'21" : '2021')
  .style('text-anchor', 'middle')

svg1.append("text")
  .attr("transform", `translate(${xScale(new Date('May 15, 2022'))},${height})`)
  .attr('class', 'yearlabel yr-2022')
  .style('color', 'black')
  .style('font-size', '10pt')
  .text(d => window.innerWidth < 360 ? "'22" : '2022')
  .style('text-anchor', 'middle')

svg1.append("text")
  .attr("transform", `translate(${xScale(new Date('February 15, 2023'))},${height})`)
  .attr('class', 'yearlabel yr-2023')
  .style('fill', '#6C6868')
  .style('font-size', '10pt')
  .text(d => window.innerWidth < 360 ? "'23" : '2023')
  .style('text-anchor', 'middle')

d3.csv("data-1.csv")
  .then(function(csv) {
    var spending = d3.line()
      .x(function(d) {
        return xScale(new Date(d.date))
      })
      .y(function(d) {
        return (height - margin.bottom) - yScale3(-d.rate + 8);
      });

    svg1.select('.lines')
      .data([csv])
      .append("path")
      .attr("class", "line numbers")
      .attr("d", (d) => {
        return spending(d)
      })
      .style('stroke', '#ed6a5a')

    // csv.unshift('dummy')

    linesG.selectAll(".lines")
      .data(csv)
      .enter()
      .append("circle") // Uses the enter().append() method
      .attr("class", d => `dot rate date-${d.quarter.toLowerCase()}-${d.year}`) // Assign a class for styling
      .attr("cy", function(d) {
        return (height - margin.bottom) - yScale3(-d.rate + 8);
      })
      .attr("cx", function(d) {
        return xScale(new Date(d.date))
      })
      .attr("r", 5)
      .style('fill', (d) => {
        return d.date.split('/')[2] > 22 || d.date.split('/')[2] == 22 && d.date.split('/')[0] > 6 ? 'white' : '#ed6a5a'
      })
      .style('stroke', (d) => {
        return '#ed6a5a'
      })
      .style('stroke-width', 1.5)
      .style('pointer-events', 'none')

    barsG.selectAll("bars")
      .data(csv)
      .enter()
      .append("rect")
      .attr("class", d => `rect spending date-${d.quarter.toLowerCase()}-${d.year}`)
      .attr("y", function(d) {
        return yScale1(d.spending) + margin.top;
      })
      .attr("x", function(d) {
        return xScale(new Date(d.date)) - ((width - margin.left - margin.right) / 40)
      })
      .attr("height", function(d) {
        return yScale1(-d.spending + 550 + 250);
      })
      .attr("width", (width - margin.left - margin.right) / 20)
      .attr("fill", d => d.date.split('/')[2] > 22 || (d.date.split('/')[2] == 22 && d.date.split('/')[0]) > 6 ? proj.url() : '#6ba292')
      // .style('opacity', (d) => {
      //   return d.date.split('/')[2] > 22 || d.date.split('/')[2] == 22 && d.date.split('/')[0] > 6 ? .7 : 1
      // })
      .attr("stroke", 'black')
      .attr("stroke-width", 0)
      .on('mouseover mousemove', (d) => {
        var text = tipText(d)
        return mouseover(text)
      })
      .on('mouseout', mouseout)

    svg1.append("rect")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .attr("class", "hover-overlay")
      .attr("width", width - margin.right - margin.left)
      .attr("height", height - margin.bottom - margin.top)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .data([csv])
      .on("mouseover mousemove touchstart touchmove", function(d) {
        return mouseoverLine(d, 1)
      })
      .on("mouseout", () => {
        mouseout(1)
      });

    linesG.raise()
    barsG.raise()
    d3.selectAll('.hover-overlay')
      .raise()
  })