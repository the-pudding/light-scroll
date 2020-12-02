function off() {
  console.log('OFF')
  d3.select('.intro1')
    .style('background-color', '#353535') //TODO remove needless color changes here 
    .style('color', )

  d3.selectAll('.slide')
    .style('background-color', '#353535')

  d3.select('.lightbulb-off').classed('hidden', false)
  d3.select('.lightbulb-on').classed('hidden', true)

}

function on() {
  console.log('ON')
  d3.select('.intro1')
    .style('background-color', 'white')

  d3.selectAll('.slide')
    .style('background-color', 'white')

  d3.select('[data-step="slide1"]')
    .style('background-color', 'white') //TODO remove needless color changes here 

  d3.select('.lightbulb-off').classed('hidden', true)
  d3.select('.lightbulb-on').classed('hidden', false)
}


export default {
  off,
  on
}
