function tipTextBar(values) {
  return `<span class='quit'>x</span><div class="tooltip-container">
  <div>American homeowners spent $${values.spending}B on home improvements and repairs in the year that ended during ${values.quarter} ${values.year}</div>
  </div>`
}

function tipTextLine(values) {
  return `<span class='quit'>x</span><div class="tooltip-container">
  <div>American homeowners spent <strong>$${values.spending}B</strong> on home improvements and repairs in the year that ended during <strong>${values.quarter} ${values.year}</strong>.<br/><br/>
  That's a <strong style="color:green;">${values.rate}% increase</strong> from the same timeframe one year prior.</div>
  </div>`
}

var bisectDate = d3.bisector(function(d) {
  return xScale(new Date(d.date)) - margin.left;
}).left

function mouseoverLine(data, index) {
  var rightMargin = margin.right
  var leftMargin = margin.left

  var x0 = d3.mouse(event.target)[0],
    i = bisectDate(data, x0, 1)

  var d0 = data[i - 1] !== 'dummy' ? data[i - 1] : data[i],
    d1 = i < data.length ? data[i] : data[i - 1]

  var d = (x0 + leftMargin) - xScale(new Date(d0.date)) > xScale(new Date(d1.date)) - (x0 + leftMargin) ? d1 : d0;

  var html = tipTextLine(d)

  linesG.selectAll(`.dot`)
    .attr('r', 5)

  d3.selectAll(`.quarterlabel, .yearlabel`)
    .style('font-weight', 'normal')

  d3.selectAll(`text.${d.quarter.toLowerCase()}.yr-${d.year}, .yearlabel.yr-${d.year}`)
    .style('font-weight', 'bold')

  barsG.selectAll(`.rect`)
    .attr('stroke-width', 0)
  // .lower()

  // d3.selectAll(`#chart-${index} .lines-${i}`)
  //   .raise()

  d3.selectAll(`#chart-${index} .dot.date-${d.quarter.toLowerCase()}-${d.year}`)
    .attr('r', 10)
    .raise()

  d3.selectAll(`#chart-${index} .rect.date-${d.quarter.toLowerCase()}-${d.year}`)
    .attr('stroke-width', 2)

  d3.select(`#tooltip-${index}`)
    .html(html)
    .attr('display', 'block')
    .style("visibility", "visible")
    .style('top', topTT(index))
    .style('left', leftTT(index))

  d3.selectAll(`#tooltip-${index} .quit`)
    .on('click', () => {
      d3.selectAll(`.quarterlabel, .yearlabel`)
        .style('font-weight', 'normal')

      linesG.selectAll('.dot')
        .attr('r', 5)
        .raise()

      barsG.selectAll(`.rect`)
        .attr('stroke-width', 0)

      d3.select(`#tooltip-${index}`)
        .html("")
        .attr('display', 'none')
        .style("visibility", "hidden")
        .style("left", null)
        .style("top", null);
    })
}

function mouseover(d, i) {
  var html = i == 1 ? tipTextLine(d) : tipTextBar(d)

  d3.select(`#tooltip-${i}`)
    .html(html)
    .attr('display', 'block')
    .style("visibility", "visible")
    .style('top', () => {
      return topTT(i)
    })
    .style('left', () => {
      return leftTT(i)
    })

  d3.selectAll('text')
    .raise()

  d3.select(`#tooltip-${i} .quit`)
    .on('click', () => {
      d3.select(`#tooltip-${i}`)
        .html("")
        .attr('display', 'none')
        .style("visibility", "hidden")
        .style("left", null)
        .style("top", null);
    })
}

function mouseout(i) {
  if (window.innerWidth > 767) {
    linesG.selectAll('.dot')
      .attr('r', 5)

    barsG.selectAll(`.rect`)
      .attr('stroke-width', 0)

    d3.select(`#tooltip-${i}`)
      .html("")
      .attr('display', 'none')
      .style("visibility", "hidden")
      .style("left", null)
      .style("top", null);

    d3.selectAll('.' + event.target.classList[0])
      .style('stroke-width', '0.5')

    d3.selectAll(`.quarterlabel, .yearlabel`)
      .style('font-weight', 'normal')

    // d3.selectAll(`#chart-${i} .lines-${i}`)
    //   .raise()

    // d3.selectAll(`#chart-${i} .line`)
    //   .raise()

    // d3.selectAll(`#chart-${i} .dot`)
    //   .lower()
  }
}

function topTT(i) {
  var offsetParent = document.querySelector(`#chart-${i} .chart`).offsetParent
  var offY = offsetParent.offsetTop
  var cursorY = 5

  var windowWidth = window.innerWidth
  var ch = document.querySelector(`#tooltip-${i}`).clientHeight
  var cy = d3.event.pageY - offY
  var windowHeight = window.innerHeight
  if (windowWidth > 767) {
    // if (ch + cy >= windowHeight) {
    //   return cy - (ch / 2) + "px"
    // } else {
    return cy - 28 + "px"
    // }
  }
}

function leftTT(i) {
  var offsetParent = document.querySelector(`#chart-${i} .chart`).offsetParent
  var offX = offsetParent.offsetLeft
  var cursorX = 5

  var windowWidth = window.innerWidth
  var cw = document.querySelector(`#tooltip-${i}`).clientWidth
  var cx = d3.event.pageX - offX
  var bodyWidth = document.querySelector(`#chart-${i} .chart`).clientWidth

  if (windowWidth > 767) {
    if (cw + cx >= bodyWidth) {
      document.querySelector(`#tooltip-${i}`).className = 'my-tooltip box-shadow-left'
      return cx - cw - cursorX + "px"
    } else {
      document.querySelector(`#tooltip-${i}`).className = 'my-tooltip box-shadow-right'
      return cx + cursorX + "px"
    }
  }
}