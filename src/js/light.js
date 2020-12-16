// Intro slide on/off functions


const black = '#0D0F2A'
const yellow = '#FFF9E2'

// helpers


// Hide formerly black text in white slides that turn dark
function hideTextOnLightOff(slideNum) {
  d3.select(`.${slideNum}`).selectAll('p').style('color', '#0D0F2A')
}

// show previously-hidden white text on slides that turn white 
function showTextOnLightOn(slideNum) {
  d3.select(`.${slideNum}`).selectAll('p').style('color', 'rgba(13,15,42,0.5)')
}


// turning timer font white when bulb is off and black when on


// turning the lightbulb on and off
function bulbOn() {
  d3.select('.lightbulb-off').classed('hidden', true)
  d3.select('.lightbulb-on').classed('hidden', false)

  d3.select('.timer-title').classed('white-text', false)
  d3.select('.timer-labels').classed('white-text', false)
}


function bulbOff() {
  d3.select('.lightbulb-off').classed('hidden', false)
  d3.select('.lightbulb-on').classed('hidden', true)

  d3.select('.timer-title').classed('white-text', true)
  d3.select('.timer-labels').classed('white-text', true)
}





// INTRO: turn light on and off when moving from and back to the intro slide

function offIntroSlide() {

  console.log('offIntroSlide')

  d3.select('.intro1')
    .style('background-color', black)
    .style('color', 'white')

  d3.selectAll('.slide')
    .style('background-color', black)

  bulbOff()

}



function onIntroSlide() {

  console.log('onIntroSlide')

  d3.select('.intro1')
    .style('background-color', yellow)

  d3.selectAll('.slide')
    .style('background-color', yellow)

  d3.select('.slide1')
    .style('background-color', yellow)

  bulbOn()

}



// ENTERING 2020s SECTION: turn light on and off when moving into and back from the "Begin working" screen in 2020
function offStart2020() {

  console.log('offStart2020')

  d3.select('.slide4')
    .style('background-color', black)


  hideTextOnLightOff('slide4')
  bulbOff()
}

function onStart2020() {

  console.log('onStart2020')

  d3.selectAll('.slide4')
    .style('background-color', yellow)
  showTextOnLightOn('slide4')
  bulbOn()
}


function offResetStart2020() {

  console.log('offResetStart2020')

  d3.select('.slide-start-2020')
    .style('background-color', black)

  d3.select('.slide4')
    .style('background-color', black)



  d3.select('.slide5').select('p.story-large-text').style('color', 'white')
  d3.select('.slide5').select('p.story-text').style('color', 'white')

  bulbOff()
}



// WINNING 2020s SECTION
function onWinning2020() {

  console.log('onWinning2020')

  d3.select('.slide-start-2020').style('background-color', yellow)
  d3.select('.slide4').style('background-color', yellow)
  d3.select('p.win-2000s').style('color', '#0F0E2C')

  bulbOn()
}


function offWinning2020() {

  console.log('offWinning2020')

  d3.select('.slide-start-2020').style('background-color', black)
  d3.select('.slide4').style('background-color', black)

  bulbOff()
}


function offStart1800() {

  console.log('offStart1800')

  d3.select('.slide-1800s-intro').style('background-color', black)
  d3.select('.slide-1800s-intro').select('p.story-text').style('color', 'white')

  d3.select('.slide-start-2020').style('background-color', black)
  d3.select('.slide4').style('background-color', black)

  bulbOff()
}

function onStart1800() {

  console.log('onStart1800')

  d3.select('.slide-1800s-intro').style('background-color', yellow)
  d3.select('.slide-start-2020').style('background-color', yellow)
  d3.select('.slide4').select('.story-text').style('color', yellow)
  d3.select('.slide4').style('background-color', yellow)

  bulbOn()
}


//WINNING 1800S SECTION

function onWinning1800() {

  console.log('onWinning1800')

  d3.select('.slides-container-1800s').style('background-color', yellow)
  d3.select('.win-1800s').style('background-color', yellow)
  d3.select('.win-1800s').select('p').style('color', black)

  bulbOn()
}



function offWinning1800() {

  console.log('offWinning1800')

  d3.select('.slides-container-1800s').style('background-color', black)
  d3.select('.win-1800s').style('background-color', black)
  // d3.select('.win-1800s').select('p').style('color', 'white')

  bulbOff()
}



//2000BC SECTION

function offStart2000bc() {

  console.log('offStart2000bc')

  d3.select('.slide-2000bc-intro').style('background-color', black)
  d3.select('.slides-container-1800s').style('background-color', black)
  d3.select('.slide-2000bc-intro').select('p.story-text').style('color', 'white')
  d3.select('.slide-start-2020').style('background-color', black)
  d3.select('.win-1800s').style('background-color', black)

  bulbOff()
}



function onStart2000bc() {

  console.log('onStart2000bc')

  d3.select('.slide-2000bc-intro').style('background-color', yellow)
  d3.select('.slides-container-1800s').style('background-color', yellow)
  d3.select('.slide-2000bc-intro').select('p.story-text').style('color', black)
  d3.select('.slide-start-2020').style('background-color', black)
  d3.select('.win-1800s').style('background-color', yellow)

  bulbOff()
}


function onWinning2000bc() {

  console.log('onWinning2000bc')

  d3.select('.slides-container-2000bc').style('background-color', yellow)
  d3.select('.slide-2000bc-final').style('background-color', yellow)
  d3.select('.slide-2000bc-final').select('p').style('color', black)

  bulbOn()
}


function offWinning2000bc() {

  console.log('offWinning2000bc')

  d3.select('.slides-container-2000bc').style('background-color', black)
  d3.select('.slide-2000bc-final').style('background-color', black)

  //   d3.select('.slide-2000bc-final').select('p').style('color', 'white')

  bulbOff()
}

//   function onStart1800() {
//     d3.select('.slide-1800s-intro').style('background-color', 'white')
//     d3.select('.slide-start-2020').style('background-color', 'white')
//     bulbOn()
//   }



export default {
  bulbOff,
  bulbOn,

  offIntroSlide,
  onIntroSlide,

  offStart2020,
  onStart2020,

  offResetStart2020,

  onWinning2020,
  offWinning2020,

  offStart1800,
  onStart1800,

  onWinning1800,
  offWinning1800,

  onStart2000bc,
  offStart2000bc,

  onWinning2000bc,
  offWinning2000bc
}
