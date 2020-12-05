 /* global d3 */

 import enterView from 'enter-view'

 import timer from './timer'
 import light from './light'

 let displayHeight;
 let displaywidth;

 const $html = d3.select('html')
 const $firstCheckpointTitle = $html.select('[data-step="slide5"]').select('.story-large-text')
 const $firstCheckpointText = $html.select('[data-step="slide5"]').select('.story-text')
 const $win2000Text = $html.select('.win-2000s')

 const $seconds = d3.select('.time')



 function win2000s() {
   console.log('WON')
   light.on()

   $firstCheckpointTitle.transition().style('opacity', 0)
   $firstCheckpointText.transition().style('opacity', 0)
   $win2000Text.transition().style('opacity', 1)

 }


 function changeText2000(changeType) {

   if (changeType === 'changeForward') {
     $firstCheckpointTitle
       .text('Easy, there!')
       .classed('black-text', true)

     $firstCheckpointText
       .text('If the one pixel you just scrolled through were equal to the wages you’d earn for a second of your time, you’d already have 3 hours of sweet illumination.')

       .classed('black-text', true)

     light.on()
   } else if (changeType === 'changeBack') {
     $firstCheckpointTitle
       .text('Let’s try working for your light.')
       .classed('black-text', true)

     $firstCheckpointText
       .text('Each pixel you scroll through is the equivalent to a second of work for an average waged worker in America. Let’s see how long it takes you to afford an hour’s worth of light in 2020.')
       .classed('black-text', true)
     light.off()
   }
 }

 function handleTimerEnd(section, totalSeconds) {
   console.log(section)
   console.log(totalSeconds)
   if (section === 'begin-2000s' && totalSeconds >= 2) {
     win2000s()
     //  timer.stopTimer()
   }
 }




 function startTimerCount(section) {

   const basePixelPosition = document.documentElement.scrollTop || document.body.scrollTop

   document.addEventListener('scroll', e => {
     const currentPixelPosition = document.documentElement.scrollTop || document.body.scrollTop;
     const totalSeconds = parseInt(currentPixelPosition - basePixelPosition)

     const timeToDisplay = new Date(totalSeconds * 1000).toISOString().substr(11, 8)

     $seconds.text(timeToDisplay)
     //  console.log(`section ${section}`)

     handleTimerEnd(section, totalSeconds)

   })
 }






 function setupBeginButton(timer) {
   d3.selectAll('.button-begin').on('click', function () {

     const clickedButton = this.id

     if (clickedButton === 'begin-2000s') {

       timer.showTimer()
       d3.select(this).style('visibility', 'hidden')
       d3.select('.slide-success-2000').style('display', 'block')
       $html.classed('stop-scrolling', false)

       startTimerCount(clickedButton)


     } else if (clickedButton === 'begin-1800s') {

     } else if (clickedButton === 'begin-4000bc') {

     }
   })
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






   //setting up win screens

   enterView({
     selector: '.slide-pre',
     enter(el) {

       light.off()

     },
     exit(el) {
       const thisSlide = d3.select(el).attr('data-step')
       console.log(`exit: ${thisSlide}`)
       //    changeText2000('changeBack')


     },
     progress: function (el, progress) {
       if (progress === 1) {
         const order = Promise.resolve()
         order.then(() => {

             $html.classed('stop-scrolling', true)
           })
           .then(() => {
             d3.select('#begin-2000s').style('visibility', 'visible')
           })
       } else {
         timer.hideTimer()
       }



     },
     offset: 0, // enter at top of viewport
     once: false, // trigger just once
   });





   //setting up win screens

   //    enterView({
   //      selector: '.slide-1800s',
   //      enter(el) {

   //        console.log('nice')
   //      },
   //      exit(el) {},
   //      progress: function (el, progress) {

   //      },
   //      offset: 0.0, // enter at bottom of viewport
   //      once: false, // trigger just once
   //    });





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

   d3.selectAll('.slide-pre')
     .style('height', `${displayHeight}px`)

   d3.selectAll('.slide-1800s-intro')
     .style('height', `${displayHeight}px`)


   //    d3.select('[data-step="slide6"]')
   //      .style('height', `1px`)
 }

 function init() {

   const order = Promise.resolve()

   order.then(() => {
       resize()
     })
     .then(() => {
       setupEnterView()
     })
     .then(() => {
       setupBeginButton(timer)
     })





 }

 export default {
   init,
   resize
 };
