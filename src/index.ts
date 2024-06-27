/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import 'swiper/css';

import barba from '@barba/core';
import { restartWebflow } from '@finsweet/ts-utils';
import { gsap } from 'gsap'';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import Swiper from 'swiper';

gsap.registerPlugin(ScrollTrigger, SplitText);

document.addEventListener('DOMContentLoaded', () => {
  const lenis = new Lenis();

  lenis.on('scroll', (e) => {
    //scrolling code here
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  barba.hooks.after(() => {
    restartWebflow();
  });

  barba.init({
    transitions: [
      {
        name: 'default',
        async leave(data) {
          await gsap.to(data.current.container, {
            opacity: 0,
            duration: 0.5,
            ease: 'power1.inOut',
          });
        },
        async enter(data) {
          await gsap.from(data.next.container, {
            opacity: 0,
            duration: 0.5,
            ease: 'power1.inOut',
          });
        },
      },
    ],
    views: [
      {
        namespace: 'homepage',
        afterEnter() {
          console.log('entered homepage');
        },
      },
    ],
  });
});
