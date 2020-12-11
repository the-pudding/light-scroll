 /* global d3 */

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

 let allow2000s = false;
 let allowReset2000 = false;


 let allow1800s = false
 let allowReset1800s = false;
 let allow2000bc = false;


 let clickedButton;




 function setupScrollShortcut() {
   d3.select('.button-scroll-shortcut').on('click', () => {
     d3.select('.slide-2000bc-final').classed('hidden', false)

     jump('.slide-2000bc-final', {
       duration: 5000,
       offset: 0.5
     })


   })
 }

 function show2000bc() {
   d3.select('.slide-2000bc-intro').classed('hidden', false)
   d3.select('.slides-container-2000bc').classed('hidden', false)
 }


 function startScrollListening(e) {

   currentPixelPosition = document.documentElement.scrollTop || document.body.scrollTop;
   totalSeconds = parseInt(currentPixelPosition - basePixelPosition)

   console.log(totalSeconds)

   const timeToDisplay = new Date(totalSeconds * 1000).toISOString().substr(11, 8)
   $seconds.text(timeToDisplay)

   if (clickedButton === 'begin-2000s') {

     if (totalSeconds >= 2) {
       win2000s()
       allow2000s = true
     } else if (totalSeconds < 2 && allow2000s) {
       unWin2000s()
     }

   } else if (clickedButton === 'begin-1800s') {
     if (totalSeconds >= (21600 - displayHeight * 0.75)) {
       win1800s()
       show2000bc()
     } else if (totalSeconds < 0) {
       timer.hideTimer()
       timer.resetTimer()
     }
   } else if (clickedButton === 'begin-2000bc') {
     //  if (totalSeconds >= (205200)) {
     //    light.onWinning2000bc()
     //  } else if (totalSeconds < (205200 - displayHeight * 0.75)) {
     //    light.offWinning2000bc()
     //  } else 
     if (totalSeconds < 0) {
       timer.hideTimer()
       timer.resetTimer()
     }
   }


   handleTimerEnd(clickedButton, totalSeconds)
 }


 function win2000s() {
   light.onWinning2020()
   allowReset2000 = true
   $firstCheckpointTitle.transition().style('opacity', 0)
   $firstCheckpointText.transition().style('opacity', 0)
   $win2000Text.transition().style('opacity', 1)

   // stop listening to scroll to freeze timer
   document.removeEventListener('scroll', startScrollListening)

   allow1800s = true

 }


 function unWin2000s() {


   console.log('unwinning')
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
   } else if (section === 'begin-1800s' && totalSeconds >= 216000) {
     win1800s()
   }
   //    else if (section === 'begin-1800s' && totalSeconds >= 216000) {
   //     unWin1800s()
   //   }

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
       } else if (allowReset2000) {
         light.offResetStart2020()
         $firstCheckpointTitle.transition().style('opacity', 1)
         $firstCheckpointText.transition().style('opacity', 1)
         $win2000Text.transition().style('opacity', 0)
         d3.select('.slide-1800s-intro').classed('hidden', true)


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
       light.onStart1800()



     },
     progress: function (el, progress) {
       console.log(progress)

       if (progress >= 0.59 && allow1800s) {
         const order = Promise.resolve()
         order.then(() => {

             $html.classed('stop-scrolling', true)
           })
           .then(() => {
             d3.select('#begin-1800s').style('visibility', 'visible')
             allowReset1800s = true
           })
       } else if (progress < 0.59 && allowReset1800s) {
         timer.hideTimer()
         d3.select('#begin-1800s').style('visibility', 'visible')
         $html.classed('stop-scrolling', true)
         allowReset1800s = false
         console.log('hiding timer')

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
       if (progress >= 0.59 && allow2000bc) {
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



   enterView({
     selector: '.slide-2000bc-final',
     enter(el) {
       light.onWinning2000bc()
     },
     exit(el) {
       console.log('exiting!!')
       light.offWinning2000bc()
     },
     offset: 0.4, // enter at top of viewport
     once: false, // trigger just once
   });




 }


 function calculateChainBackgroundHeight(width) {


   // at 300px, 45.5%
   // at 400px, 44.5%
   // at 500px, 43%
   // at 600px, 42%
   // at 700px, 41%
   // at 800px, 39.5%
   // at 900px, 38%
   // at 1000px, 36.5%
   // at 1100px, 35%,
   // at 1200px, 33.5%
   // at 1300px, 32%
   // at 1300px, 30.5%


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

   d3.selectAll('.slide-2000bc')
     .style('height', `${displayHeight}px`)


   d3.selectAll('.slide-2000bc-final')
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
       setupScrollShortcut()
     })





 }

 export default {
   init,
   resize
 };
