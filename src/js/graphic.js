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

 let basePixelPosition
 let currentPixelPosition
 let totalSeconds

 let allow1800s = false;
 let allow2000bc = false;


 let clickedButton;

 function show2000bc() {
   d3.select('.slide-2000bc-intro').classed('hidden', false)
   d3.select('.slides-container-2000bc').classed('hidden', false)
 }


 function startScrollListening(e) {

   currentPixelPosition = document.documentElement.scrollTop || document.body.scrollTop;
   totalSeconds = parseInt(currentPixelPosition - basePixelPosition)

   const timeToDisplay = new Date(totalSeconds * 1000).toISOString().substr(11, 8)
   $seconds.text(timeToDisplay)

   if (clickedButton === 'begin-2000s') {

     if (totalSeconds >= 2) {
       win2000s()
     } else if (totalSeconds < 2) {
       unWin2000s()
     }

   } else if (clickedButton === 'begin-1800s') {
     if (totalSeconds >= (21600 - displayHeight * 0.75)) {
       win1800s()
       show2000bc()
     }
   }


   handleTimerEnd(clickedButton, totalSeconds)
 }


 function win2000s() {
   light.onWinning2020()

   $firstCheckpointTitle.transition().style('opacity', 0)
   $firstCheckpointText.transition().style('opacity', 0)
   $win2000Text.transition().style('opacity', 1)

   // stop listening to scroll to freeze timer
   document.removeEventListener('scroll', startScrollListening)

   allow1800s = true

 }


 function unWin2000s() {

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
   allow2000bc = true

   // allow1800s = true

 }


 function unWin1800s() {
   //    console.log('stopping scroll listening')
   light.offWinning1800()

   // $firstCheckpointTitle.transition().style('opacity', 0)
   // $firstCheckpointText.transition().style('opacity', 0)
   // $win2000Text.transition().style('opacity', 1)

   // // stop listening to scroll to freeze timer
   document.addEventListener('scroll', startScrollListening)

   // allow1800s = true

 }




 function handleTimerEnd(section, totalSeconds) {

   if (section === 'begin-2000s' && totalSeconds >= 2) {

     //  timer.stopTimer()
   } else if (section === 'begin-2000s' && totalSeconds < 2) {
     unWin2000s()
   } else if (section === 'begin-1800s' && totalSeconds === 216000) {
     win1800s()
   } else if (section === 'begin-1800s' && totalSeconds === 216000) {
     unWin1800s()
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

       basePixelPosition = document.documentElement.scrollTop || document.body.scrollTop

       startTimerCount(clickedButton)


     } else if (clickedButton === 'begin-1800s') {

       allow1800s = false
       //show timer
       timer.resetTimer()
       timer.showTimer()

       //hide button
       d3.select(this).style('visibility', 'hidden')

       //restart scroll
       $html.classed('stop-scrolling', false)

       //show slides underneath and re-enable scroll
       d3.selectAll('.slide-1800s').style('display', 'flex').classed('hidden', false)
       $html.classed('stop-scrolling', false)

       basePixelPosition = document.documentElement.scrollTop || document.body.scrollTop

       startTimerCount(clickedButton)

       d3.select('.slides-container-1800s')
         .style('display', 'flex')
         .style('height', '21600px')
         .classed('hidden', false)


     } else if (clickedButton === 'begin-2000bc') {

       allow2000bc = false
       //show timer
       timer.resetTimer()
       timer.showTimer()

       //hide button
       d3.select(this).style('visibility', 'hidden')

       light.offStart1800()

       //restart scroll
       $html.classed('stop-scrolling', false)

       //show slides underneath and re-enable scroll
       d3.selectAll('.slide-2000bc').style('display', 'flex').classed('hidden', false)
       $html.classed('stop-scrolling', false)

       basePixelPosition = document.documentElement.scrollTop || document.body.scrollTop

       startTimerCount(clickedButton)

       d3.select('.slides-container-2000bc')
         .style('display', 'flex')
         .style('height', '205200px')
         .classed('hidden', false)
     }
   })
 }





 function updateScrollDown(slide) {
   if (slide === 'slide1') {
     light.onIntroSlide()

   }
   if (slide === 'slide5') {
     light.offStart2020()
   }
   if (slide === 'slide6') {
     //  console.log('slide 6')
   }
 }




 function updateScrollUp(slide) {
   if (slide === 'slide1') {
     light.offIntroSlide()
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






   //setting up 2020 start/win

   enterView({
     selector: '.slide-start-2020',
     enter(el) {

       light.offStart2020()

     },
     exit(el) {
       const thisSlide = d3.select(el).attr('data-step')
       console.log(`exit: ${thisSlide}`)
       light.onStart2020()


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



   // Setting up 1800s start


   enterView({
     selector: '.begin-screen-1800',
     enter(el) {
       if (allow1800s) {
         light.offStart1800()
       }


     },
     exit(el) {
       const thisSlide = d3.select(el).attr('data-step')



     },
     progress: function (el, progress) {
       console.log(`progress: ${progress}`)
       console.log(progress)
       if (progress >= 0.59 && allow1800s) {
         const order = Promise.resolve()
         order.then(() => {

             $html.classed('stop-scrolling', true)
           })
           .then(() => {
             d3.select('#begin-1800s').style('visibility', 'visible')
           })
       } else {
         console.log('hiding timer')
         //  timer.hideTimer()
       }



     },
     offset: 0.4, // enter at top of viewport
     once: false, // trigger just once
   });






   // Setting up 2000bc start


   enterView({
     selector: '.begin-screen-2000bc',
     enter(el) {
       if (allow2000bc) {
         light.offStart2000bc()
       }


     },
     exit(el) {
       const thisSlide = d3.select(el).attr('data-step')



     },
     progress: function (el, progress) {
       console.log(`progress: ${progress}`)
       console.log(progress)
       if (progress >= 0.6 && allow2000bc) {
         const order = Promise.resolve()
         order.then(() => {
             console.log('2000BC stop scrolling')
             $html.classed('stop-scrolling', true)
           })
           .then(() => {
             d3.select('#begin-2000bc').style('visibility', 'visible')
           })
       } else {
         console.log('hiding timer')
         //  timer.hideTimer()
       }



     },
     offset: 0.4, // enter at top of viewport
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
