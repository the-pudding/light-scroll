
 function showTimer() {
    d3.select('.timer-container').classed('hidden', false)
  }
 
  function hideTimer() {
    d3.select('.timer-container').classed('hidden', true)
  }


 export default {
    showTimer,
    hideTimer
  };
 