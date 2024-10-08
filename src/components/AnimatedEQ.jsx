/* eslint-disable react/prop-types */
/* 
  Credit and thanks to Peter Hraska for sharing
  his work for this animated svg on Code Pen 
  https://codepen.io/virpo/pen/YzKWWPW
*/

import './animatedEq.scss'

const AnimatedEq = (props) => {
  const { style } = props

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='white'
      style={style}
    >
      <rect className='eq-bar eq-bar--1' x='4' y='4' width='3.7' height='8' />
      <rect
        className='eq-bar eq-bar--2'
        x='10.2'
        y='4'
        width='3.7'
        height='16'
      />
      <rect
        className='eq-bar eq-bar--3'
        x='16.3'
        y='4'
        width='3.7'
        height='11'
      />
    </svg>
  )
}

export default AnimatedEq

