function setupBeginButton(timer) {
  d3.selectAll('.button-begin').on('click', function () {
    const clickedButton = this.id

    if (clickedButton === 'begin-2000s') {
      timer.showTimer()
      d3.select(this).style('visibility', 'hidden')
      d3.select('.slide-success-2000').style('display', 'block')

    } else if (clickedButton === 'begin-1800s') {

    } else if (clickedButton === 'begin-4000bc') {

    }
  })
}

export default {
  setupBeginButton
}
