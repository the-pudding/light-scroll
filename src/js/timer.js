function showTimer() {
  // d3.select('.timer-container').classed('hidden', false)
  d3.select('.timer-container').transition().style('opacity', 1)
}

function hideTimer() {
  d3.select('.timer-container').transition().style('opacity', 0)
  // d3.select('.timer-container').classed('hidden', true)
}


export default {
  showTimer,
  hideTimer
};
