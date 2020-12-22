 /* global d3 */

 import {
   disableBodyScroll,
   enableBodyScroll,
   clearAllBodyScrollLocks
 } from 'body-scroll-lock';
 import enterView from 'enter-view'
 import jump from 'jump.js'

 import timer from './timer'
 import light from './light'

 let displayHeight;
 let displaywidth;

 const $html = d3.select('html')
 const $firstCheckpointTitle = $html.select('[data-step="slide5"]').select('.story-large-text')
 const $firstCheckpointText = $html.select('[data-step="slide5"]').select('.story-text')
 const $win2000Text = $html.select('.win-2000s')

 const $seconds = d3.select('.time')

 let basePixelPosition
 let currentPixelPosition
 let totalSeconds

 let allowWin2000 = false
 let allow2000sStart = false;
 let allowReset2000 = false;


 let allow1800sStart = false
 let allow1800sWin = false
 let allowReset1800s = false;


 let allow2000bcStart = false
 let allowReset2000bc = false;
 let allowWin2000bc = false;
 let allowFooter = false

 let clickedButton;

 let allowTimerUpdate = true


 const STOPTHRESHOLD = 0.595


 //  Helper functions

 function log(el) {
   console.log(el)
 }

 function secondsToString(seconds) {
   if (seconds >= 0) {
     let hrsTens = Math.floor(seconds / 3600 / 10).toString()
     let hrsOnes = Math.floor(seconds / 3600 % 10).toString()

     let minsTens = Math.floor(((seconds % 3600) / 60 / 10)).toString()
     let minsOnes = Math.floor(((seconds % 3600) / 60 % 10)).toString()

     let secsTens = Math.floor(((seconds % 86400) % 3600) % 60 / 10).toString()
     let secsOnes = Math.floor(((seconds % 86400) % 3600) % 60 % 10).toString()


     return (hrsTens + hrsOnes + ':' + minsTens + minsOnes + ':' + secsTens + secsOnes)
   } else {
     return '00:00:00'
   }

 }

 function getTimeToDisplay() {
   currentPixelPosition = document.documentElement.scrollTop || document.body.scrollTop;
   totalSeconds = parseInt(currentPixelPosition - basePixelPosition)
   const timeToDisplay = secondsToString(totalSeconds)
   return timeToDisplay
 }

 function show2000bc() {
   d3.select('.slide-2000bc-intro').classed('hidden', false)
   d3.select('slide-2000bc-intro').style('display', 'flex')
   d3.select('.slides-container-2000bc').classed('hidden', false)
 }

 function hide2000bc() {
   d3.select('.slide-2000bc-intro').classed('hidden', true)
   d3.select('.slides-container-2000bc').classed('hidden', true)
   //    console.log('hiding 2000 b÷c')
 }

 function setupScrollShortcut() {
   d3.select('.button-scroll-shortcut').on('click', () => {
     d3.select('.slide-2000bc-final').classed('hidden', false)

     allowFooter = true
     jump('#final-para', {
       duration: 5000,
       offset: 0.5
     })


   })
 }


 function startScrollListening(e) {

   if (clickedButton === 'begin-2000s') {
     allowTimerUpdate = true

     if (allowTimerUpdate) {
       $seconds.text(getTimeToDisplay())
     }

     //  if (totalSeconds >= 1) {
     //    win2000s()
     //    allow2000s = true
     //  } else if (totalSeconds < 1 && allow2000s) {

     //  }

   } else if (clickedButton === 'begin-1800s') {
     allowTimerUpdate = true




     if (allowTimerUpdate) {
       $seconds.text(getTimeToDisplay())
     }
     if (totalSeconds < 0) {
       timer.hideTimer()
       timer.resetTimer()
       allow1800sWin = false
     }
     if (totalSeconds > 2) {
       allow1800sWin = true
     }
   } else if (clickedButton === 'begin-2000bc') {
     //  console.log(totalSeconds)
     allowTimerUpdate = true
     d3.select('.slide-2000bc-final').classed('hidden', false)
     if (allowTimerUpdate) {
       $seconds.text(getTimeToDisplay())
     }

     if (totalSeconds < 0) {
       timer.hideTimer()
       timer.resetTimer()
     }
     if (totalSeconds > 2) {
       allowWin2000bc = true
     }
   }


   handleTimerEnd(clickedButton, totalSeconds)
 }


 function win2000s() {
   light.onWinning2020()
   log('nice')
   //    allowReset2000 = true
   $firstCheckpointTitle.transition().style('opacity', 0)
   $firstCheckpointText.transition().style('opacity', 0)
   $win2000Text.transition().style('opacity', 1)

   allowTimerUpdate = false
   // stop listening to scroll to freeze timer
   document.removeEventListener('scroll', startScrollListening)

   allow1800sStart = true

 }


 function unWin2000s() {

   allow1800sStart = false
   light.offWinning2020()

   $firstCheckpointTitle.transition().style('opacity', 1)
   $firstCheckpointText.transition().style('opacity', 1)
   $win2000Text.transition().style('opacity', 0)

   //    d3.select('.')

 }



 function win1800s() {

   light.onWinning1800()
   // // stop listening to scroll to freeze timer
   document.removeEventListener('scroll', startScrollListening)
   allow2000bcStart = true

   // allow1800s = true

 }


 function unWin1800s() {

   light.offWinning1800()
   d3.select('.slide-2000bc-intro').style('display', 'none')
   d3.select('.slide-container-2000bc').style('display', 'none')
   allow2000bcStart = false

   // // stop listening to scroll to freeze timer
   document.addEventListener('scroll', startScrollListening)

   // allow1800s = true

 }




 function handleTimerEnd(section, totalSeconds) {

   if (section === 'begin-2000s' && totalSeconds >= 2) {

     //  timer.stopTimer()  
     win2000s()
   } else if (section === 'begin-2000s' && totalSeconds < 2) {
     unWin2000s()
   }

 }




 function startTimerCount(section) {
   document.addEventListener('scroll', startScrollListening)

 }






 function setupBeginButton(timer) {
   d3.selectAll('.button-begin').on('click', function () {

     clickedButton = this.id

     if (clickedButton === 'begin-2000s') {

       //show timer
       timer.resetTimer()
       timer.showTimer()

       //hide button
       d3.select(this).style('visibility', 'hidden')

       //show slides underneath and re-enable scroll
       d3.select('.slide-1800s-intro').style('display', 'flex').classed('hidden', false)
       $html.classed('stop-scrolling', false)
       enableBodyScroll($html.node)

       basePixelPosition = document.documentElement.scrollTop || document.body.scrollTop
       allow2000sStart = false
       allowWin2000 = true

       startTimerCount(clickedButton)
       console.log(`allow2000sStart: ${allow2000sStart}`)



     } else if (clickedButton === 'begin-1800s') {

       allow1800sWin = false
       allowReset1800s = true
       //show timer
       timer.resetTimer()
       timer.showTimer()

       //hide button
       d3.select(this).style('visibility', 'hidden')

       //restart scroll
       $html.classed('stop-scrolling', false)
       enableBodyScroll($html.node)

       //show slides underneath and re-enable scroll
       d3.selectAll('.slide-1800s').style('display', 'flex').classed('hidden', false)
       $html.classed('stop-scrolling', false)

       basePixelPosition = document.documentElement.scrollTop || document.body.scrollTop

       startTimerCount(clickedButton)

       d3.select('.slides-container-1800s')
         .style('display', 'flex')
         .style('height', '19400px')
         .classed('hidden', false)


     } else if (clickedButton === 'begin-2000bc') {
       d3.select('.slide-2000bc-final').style('display', 'flex')

       allowReset2000bc = true
       allowWin2000bc = false
       //show timer
       timer.resetTimer()
       timer.showTimer()

       //hide button
       d3.select(this).style('visibility', 'hidden')

       light.offStart2000bc()

       //restart scroll
       $html.classed('stop-scrolling', false)
       enableBodyScroll($html.node)

       //show slides underneath and re-enable scroll
       d3.selectAll('.slide-2000bc').style('display', 'flex').classed('hidden', false)
       $html.classed('stop-scrolling', false)

       basePixelPosition = document.documentElement.scrollTop || document.body.scrollTop

       startTimerCount(clickedButton)

       d3.select('.slides-container-2000bc')
         .style('display', 'flex')
         .style('height', '208800px')
         .classed('hidden', false)
     }
   })
 }





 function updateScrollDown(slide) {
   if (slide === 'slide1') {
     light.onIntroSlide()

   }
   if (slide === 'slide2') {
     light.bulbOn()
   }
   if (slide === 'slide3') {
     light.bulbOn()
   }
   if (slide === 'slide4') {
     light.bulbOn()
     //  d3.select('.trigger-win-2020').style('display', 'none')
   }
   if (slide === 'slide5') {

   }
   if (slide === 'slide6') {
     //  console.log('slide 6')
   }
 }




 function updateScrollUp(slide) {
   if (slide === 'slide1') {
     light.offIntroSlide()
     timer.hideTimer()
     timer.resetTimer()
     $html.classed('stop-scrolling', false)
   } else if (slide === 'slide4') {
     light.bulbOn()
     //  d3.select('.trigger-win-2020').style('display', 'block')
   } else if (slide === 'slide5') {
     light.bulbOn()
   }
 }








 function handleProgress(slide, progress) {
   if (slide === 'slide5') {


   }

 }

 function setupEnterView() {

   // enter-view for introductory slides
   enterView({
     selector: '.slide',
     enter(el) {

       const thisSlide = d3.select(el).attr('data-step')
       console.log(`enter: ${thisSlide}`)
       updateScrollDown(thisSlide)
     },
     exit(el) {
       const thisSlide = d3.select(el).attr('data-step')
       console.log(`exit: ${thisSlide}`)
       updateScrollUp(thisSlide)
     },
     progress: function (el, progress) {
       const thisSlide = d3.select(el).attr('data-step')

       if (thisSlide === 'slide5') {
         handleProgress(thisSlide, progress)
       }
     },
     offset: 0.5, // enter at middle of viewport
     once: false, // trigger just once
   });






   //setting up 2020 start/win

   enterView({
     selector: '.slide-start-2020',
     enter(el) {
       const thisSlide = d3.select(el).attr('data-step')
       console.log(`enter: ${thisSlide}`)
       light.offStart2020()
       allow2000sStart = true
     },
     exit(el) {
       const thisSlide = d3.select(el).attr('data-step')
       console.log(`exit: ${thisSlide}`)
       light.onStart2020()
     },
     progress: function (el, progress) {
       //    console.log(progress)
       if (progress === 1) {

       } else if (allowReset2000) {

       }

     },
     offset: 0,
     once: false,
   });













   //    2020s 

   function updateIntroTriggerDown(el) {
     if (el === 'trigger-begin-button-freeze-2020') {

       if (allow2000sStart) {
         console.log('handling allow 2020 to start')
         const order = Promise.resolve()
         order.then(() => {
             $html.classed('stop-scrolling', true)
             console.log('stop scrolling triggered')
             disableBodyScroll($html.node)
           })
           .then(() => {
             d3.select('#begin-2000s').style('visibility', 'visible')
             d3.select('.trigger-win-2020').style('display', 'block')
           })
       }

     } else if (el === 'trigger-win-2020') {
       log('yup entering win screen 2020')
       if (allowWin2000) {
         console.log('handling trigger win 2020')
         win2000s()
         allow2000sStart = false
         allowWin2000 = false
       }

     }
   }



   function updateIntroTriggerUp(el) {
     if (el === 'trigger-begin-button-freeze-2020') {
       console.log('exit trigger')

       allow1800sStart = false
       allow1800sWin = false
       allow2000bcStart = false

       d3.select('.slide-1800s-intro').style('display', 'none')
       d3.select('.slides-container-1800s').style('display', 'none')

       d3.select('.slide-2000bc-intro').style('display', 'none')
       d3.select('.slides-container-2000bc').style('display', 'none')
       d3.select('.slide-2000bc-final').style('display', 'none')
       light.offResetStart2020()

       $firstCheckpointTitle.transition().style('opacity', 1)
       $firstCheckpointText.transition().style('opacity', 1)
       $win2000Text.transition().style('opacity', 0)

       d3.select('.slide4').select('.story-text').style('color', '#0D0F2A')

       timer.hideTimer()
     } else if (el === 'trigger-win-2020') {
       unWin2000s()
       allowWin2000 = false
       allow2000sStart = false
       allow1800sStart = false
       allow1800sWin = false
       allow2000bcStart = false
     }
   }


   enterView({
     selector: '.trigger',
     enter(el) {
       const thisSlide = d3.select(el).attr('data-step')
       console.log(`enter ${thisSlide}`)
       updateIntroTriggerDown(thisSlide)
     },
     exit(el) {

       const thisSlide = d3.select(el).attr('data-step')
       console.log(`exit ${thisSlide}`)
       updateIntroTriggerUp(thisSlide)
     },
     offset: 0,
     once: false,
   });



   // Setting up 1800s start

   // Set up intro screen functionality
   function enterIntroScreen(screen) {
     if (screen === 'slide6') {
       if (allow1800sStart) {
         allow1800sWin = false
         light.offStart1800()

         d3.select('.slides-container-1800s').style('display', 'none')
       }
       d3.select('.slide-1800s-intro').style('background-color', '#0D0F2A')
       d3.select('.slide-start-2020').style('background-color', '#0D0F2A')
       light.bulbOff()
     } else if (screen === 'slide19') {
       if (allow2000bcStart) {
         light.offStart2000bc()
       }
     }
   }

   function exitIntroScreen(screen) {
     if (screen === 'slide6') {
       allow1800sWin = false

       light.onStart1800()
       d3.select('.slides-container-1800s').style('display', 'none')
       d3.select('.slide-2000bc-intro').style('display', 'none')
     } else if (screen === 'slide19') {
       light.onStart2000bc()
       light.bulbOn()
       allow2000bcStart = true
       allowWin2000bc = false
     }
   }

   function handleIntroProgress(screen, progress) {
     if (screen === 'slide6') {
       //    console.log(progress)
       if (progress >= STOPTHRESHOLD && allow1800sStart) {
         const order = Promise.resolve()
         order.then(() => {
             $html.classed('stop-scrolling', true)
             disableBodyScroll($html.node)
           })
           .then(() => {
             d3.select('#begin-1800s').style('visibility', 'visible')
             allowReset1800s = true
             allow1800sStart = false
           })
       } else if (progress < STOPTHRESHOLD && allowReset1800s) {
         d3.select('.slides-container-1800s').style('display', 'none')
         //  d3.select('#begin-1800s').style('visibility', 'visible')
         allowReset1800s = false
         allow1800sWin = false
         allow1800sStart = true
         timer.hideTimer()
       }
     } else if (screen === 'slide19') {
       if (progress >= STOPTHRESHOLD && allow2000bcStart) {
         const order = Promise.resolve()
         order.then(() => {
             d3.select('.slide-2000bc-final').classed('hidden', true)
             $html.classed('stop-scrolling', true)
             disableBodyScroll($html.node)
           })
           .then(() => {
             d3.select('#begin-2000bc').style('visibility', 'visible')
             allowFooter = true
             allowReset2000bc = true
             allow2000bcStart = false
           })
       } else if (progress < STOPTHRESHOLD && allowReset2000bc) {
         d3.select('.slides-container-2000bc').style('display', 'none')
         d3.select('.slide-2000bc-final').style('display', 'none')
         allowFooter = false
         allowReset2000bc = false
         allowWin2000bc = false
         allow2000bcStart = true
         timer.hideTimer()
         timer.hideTimer()
       }

     }
   }

   enterView({
     selector: '.begin-screen',
     enter(el) {
       //    console.log(`begin-screen enter`)
       const thisSlide = d3.select(el).attr('data-step')
       console.log(`enter ${thisSlide}`)
       enterIntroScreen(thisSlide)

     },
     exit(el) {
       //    console.log(`begin-screen exit`)
       const thisSlide = d3.select(el).attr('data-step')
       console.log(`exit ${thisSlide}`)
       exitIntroScreen(thisSlide)
     },
     progress: function (el, progress) {
       const thisSlide = d3.select(el).attr('data-step')
       handleIntroProgress(thisSlide, progress)
     },
     offset: 0.4, // enter at top of viewport
     once: false, // trigger just once
   });




















   function enterWinScreen(screen) {
     if (screen === 'step18') {

       if (allow1800sWin) {
         //  console.log('running enter step18')
         light.onWinning1800()
         d3.select('.slide-2000bc-intro').style('display', 'flex')
         win1800s()
         show2000bc()
         allow2000bcStart = true


       }
     } else if (screen === 'step39') {
       if (allowWin2000bc) {
         light.onWinning2000bc()
         if (allowFooter)
           d3.select('.pudding-footer').style('display', 'block')
       }
     }
   }

   function exitWinScreen(screen) {
     if (screen === 'step18') {

       if (allow1800sWin) {
         //  console.log('running exit step18')
         d3.select('.slide-2000bc-intro').style('display', 'none')
         light.offWinning1800()
         unWin1800s()
         hide2000bc()
       }


     } else if (screen === 'step39') {

       light.offWinning2000bc()
       d3.select('.pudding-footer').style('display', 'none')

     }
   }

   enterView({
     selector: '.win-screen',
     enter(el) {
       //    console.log(`win-screen enter`)
       //    console.log(el)
       const thisSlide = d3.select(el).attr('data-step')
       enterWinScreen(thisSlide)
       console.log(`enter ${thisSlide}`)
       //    console.log(`allowTimerUpdate: ${allowTimerUpdate}`)
     },
     exit(el) {
       //    console.log(`win-screen exit`)
       //    console.log(el)
       const thisSlide = d3.select(el).attr('data-step')
       console.log(`exit ${thisSlide}`)
       exitWinScreen(thisSlide)
     },
     progress: function (el, progress) {},
     offset: 0, // enter at top of viewport
     once: false, // trigger just once
   });



   //    Hide/show footer on scroll
   enterView({
     selector: 'footer',
     enter(el) {
       timer.hideTimer()
     },
     exit(el) {
       timer.showTimer()
     },
     progress: function (el, progress) {},
     offset: 0.05, // enter at top of viewport
     once: false, // trigger just once
   });


 }

 function calculateChainBackgroundHeight(width) {

   if (width <= 200) {
     return '47%'
   } else if (width > 200 && width <= 350) {
     return '45.5%'
   } else if (width > 350 && width <= 450) {
     return '44.5%'
   } else if (width > 450 && width <= 550) {
     return '43%'
   } else if (width > 550 && width <= 650) {
     return '42%'
   } else if (width > 650 && width <= 750) {
     return '41%'
   } else if (width > 750 && width <= 850) {
     return '39.5%'
   } else if (width > 850 && width <= 950) {
     return '38%'
   } else if (width > 950 && width <= 1050) {
     return '36.5%'
   } else if (width > 1050 && width <= 1150) {
     return '35%'
   } else if (width > 1150 && width <= 1250) {
     return '33.5%'
   } else if (width > 1200 && width <= 1350) {
     return '32%'
   } else if (width > 1350 && width <= 1450) {
     return '30.5%'
   } else if (width > 1450 && width <= 1550) {
     return '29%'
   } else if (width > 1550 && width <= 1650) {
     return '27.5%'
   } else if (width > 1650 && width <= 1750) {
     return '26%'
   } else if (width > 1750 && width <= 1850) {
     return '24.5%'
   } else if (width > 1750 && width <= 1850) {
     return '24.5%'
   }
 }

 function resize() {

   displayHeight = window.innerHeight;
   displaywidth = window.innerWidth;

   d3.select('.lightbulb-container')
     .style('height', `${displayHeight}px`)


   d3.select('.chain-background')
     .style('height', `${calculateChainBackgroundHeight(displaywidth)}`)
     .style('background-color', 'white')

   //    d3.select('.slide')
   //      .style('background-color', '#353535')


   d3.select('.lightbulb-off')
     .select('img')
     .style('height', `${displayHeight}px`)

   d3.select('.lightbulb-on')
     .select('img')
     .style('height', `${displayHeight}px`)

   d3.select('.intro1')
     .style('height', `${displayHeight}px`)

   d3.selectAll('.slide')
     .style('height', `${displayHeight}px`)

   d3.selectAll('.slide-pre')
     .style('height', `${displayHeight}px`)

   d3.selectAll('.slide-1800s-intro')
     .style('height', `${displayHeight}px`)

   d3.selectAll('.slide-1800s')
     .style('height', `${displayHeight}px`)

   d3.selectAll('.win-1800s')
     .style('height', `${displayHeight}px`)


   d3.selectAll('.slide-2000bc-intro')
     .style('height', `${displayHeight}px`)

   d3.selectAll('.slide-2000bc')
     .style('height', `${displayHeight}px`)


   d3.selectAll('.slide-2000bc-final')
     .style('height', `${displayHeight}px`)


 }

 function init() {

   const order = Promise.resolve()

   order.then(() => {

       resize()

       light.bulbOff()
     })
     .then(() => {
       setupEnterView()
     })
     .then(() => {
       setupBeginButton(timer)
       setupScrollShortcut()
     })
     .then(() => {
       light.offIntroSlide()
     })





 }

 export default {
   init,
   resize
 }
