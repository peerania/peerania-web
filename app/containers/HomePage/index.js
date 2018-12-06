/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';

import Landing from './Landing';
import Header from './Header';
import Footer from './Footer';
import FirstScreen from './FirstScreen';
import SecondScreen from './SecondScreen';
import ThirdScreen from './ThirdScreen';
import FourthScreen from './FourthScreen';
import FifthScreen from './FifthScreen';

import { HEADER_ID, LANDING_ID } from './constants';

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {
  componentDidMount() {
    const banner = window.$(`#${LANDING_ID}`);

    if (banner.length) {
      const patterns = banner.find('.pattern');

      let x = 0;
      let y = 0;

      /*
       * Event @mousemove - @x, @y, coord. writing
       */

      window.$(window).on('mousemove', event => {
        x = event.pageX;
        y = event.pageY;
      });

      /*
       * Header animation
       */

      window.$(window).on('scroll', event => {
        const { scrollY } = event.currentTarget;
        const { innerHeight } = window;

        const show = window.$(`#${HEADER_ID}`).hasClass('scroll');

        if (scrollY > innerHeight * 0.9 && !show) {
          window.$(`#${HEADER_ID}`).addClass('scroll');
        } else if (scrollY < 100 && show) {
          window.$(`#${HEADER_ID}`).removeClass('scroll');
        }
      });

      /*
       * Parallax animation
       */

      window.requestAnimationFrame(function animation() {
        patterns.each(function() {
          const modifier = 50;
          window.$(this).css({
            transform: `translate(${x / modifier}px, ${y / modifier}px)`,
          });
        });

        window.requestAnimationFrame(animation);
      });
    }
  }

  render() {
    return (
      <Landing id={LANDING_ID}>
        <Header />
        <FirstScreen />
        <SecondScreen />
        <ThirdScreen />
        <FourthScreen />
        <FifthScreen />
        <Footer />
      </Landing>
    );
  }
}

export default HomePage;
