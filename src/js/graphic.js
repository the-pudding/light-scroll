 /* global d3 */

 import enterView from 'enter-view'

 import timer from './timer'
 import light from './light'
 //  import buttons from './buttons'

 let successAllowed = false


 let displayHeight
 let displaywidth

 const $secondsTens = d3.select('span.seconds-tens')
 const $secondsOnes = d3.select('span.seconds-ones')

 const $minutesTens = d3.select('span.minutes-tens')
 const $minutesOnes = d3.select('span.minutes-ones')

 const $hoursTens = d3.select('span.hours-tens')
 const $hoursOnes = d3.select('span.hours-ones')



 function setupBeginButton(timer) {
   d3.selectAll('.button-begin').on('click', function () {

     const clickedButton = this.id

     if (clickedButton === 'begin-2000s') {

       timer.showTimer()
       d3.select(this).style('visibility', 'hidden')
       d3.select('.slide-success-2000').style('display', 'block')
       successAllowed = true

     } else if (clickedButton === 'begin-1800s') {

     } else if (clickedButton === 'begin-4000bc') {

     }
   })
 }


 function updateTimer(progress) {
   const pixelProgress = progress * displayHeight

   if (pixels < 60) {

   }
 }


 function updateScrollDown(slide) {
   if (slide === 'slide1') {
     light.on()

   }
   if (slide === 'slide5') {
     light.off()
   }
   if (slide === 'slide6') {
     //  console.log('slide 6')
   }
 }

 function updateScrollUp(slide) {
   if (slide === 'slide1') {
     light.off()
   }
   if (slide === 'slide5') {
     light.on()
   }
 }


 //  function winText(el)


 //  enterView({
 //     selector: '.slide-success-2000',
 //     enter(el) {

 //     },
 //     exit(el) {
 //       const thisSlide = d3.select(el).attr('class')

 //       handleSuccessExit(thisSlide)
 //     },
 //     progress: function (el, progress) {
 //       const thisSlide = d3.select(el).attr('class')
 //       if (thisSlide === 'slide-success-2000' && successAllowed) {
 //         handleSuccessEnter(thisSlide, progress)
 //       }
 //     },
 //     offset: 0.0001, // enter at middle of viewport
 //     once: false, // trigger just once
 //   });

 //  function handleSuccessEnter(slide, progress) {
 //    if (slide === 'slide-success-2000' && progress > 0.01) {

 //      const $editedSlide = d3.select('[data-step="slide5"]')

 //      $editedSlide
 //        .select('.story-large-text')
 //        .text('Easy, there!')

 //      $editedSlide
 //        .select('.story-text')
 //        .text('If the pixels you just scrolled through were equal to the wages you’d earn for a second of your time, you’d already have 3 hours of sweet illumination.')


 //      light.on()
 //    }
 //    if (slide === 'slide-success-2000' && progress < 0.01) {
 //      console.log('exiting 2000s')
 //      const $editedSlide = d3.select('[data-step="slide5"]')

 //      $editedSlide
 //        .select('.story-large-text')
 //        .text('Let’s try working for your light.')

 //      $editedSlide
 //        .select('.story-text')
 //        .text('Each pixel you scroll through is the equivalent to a second of work for an average waged worker in America. Let’s see how long it takes you to afford an hour’s worth of light in 2020.')


 //      light.off()
 //    }
 //  }


 //  function handleSuccessExit(slide) {
 //    if (slide === 'slide-success-2000') {
 //      light.off()
 //    }
 //  }







 function handleProgress(slide, progress) {
   if (slide === 'slide5') {

     console.log(progress)
     if (progress >= 0.499) {
       d3.select('#begin-2000s').style('visibility', 'visible')
     } else if (progress < 0.499) {
       d3.select('#begin-2000s').style('visibility', 'hidden')
       d3.select('.slide-success-2000').style('display', 'none')
       timer.hideTimer()
     }
   }

 }

 function setupEnterView() {

   // enter-view for introductory slides
   enterView({
     selector: '.slide',
     enter(el) {

       const thisSlide = d3.select(el).attr('data-step')
       console.log(thisSlide)
       updateScrollDown(thisSlide)
     },
     exit(el) {
       const thisSlide = d3.select(el).attr('data-step')
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







 }

 function resize() {




   displayHeight = window.innerHeight;
   displaywidth = window.innerWidth;

   d3.select('.lightbulb-container')
     .style('height', `${displayHeight}px`)

   d3.select('.slide')
     .style('background-color', '#353535')


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


   d3.select('[data-step="slide6"]')
     .style('height', `1px`)
 }

 function init() {

   resize()
   setupEnterView()
   setupBeginButton(timer)


 }

 export default {
   init,
   resize
 };
