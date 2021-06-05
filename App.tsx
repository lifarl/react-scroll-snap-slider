import ReactDOM from 'react-dom'
import React from 'react'
import { Slider } from './src'
import NavArrow from './src/components/NavArrow'
import { getRndHex } from './examples/getRndHex'
import { renderDivSlide } from './examples/withFixedDivs'
import { renderImgSlide } from './examples/withImages'
import { SliderWithScrollToIndex } from './examples/withScrollIndicator'

const App = () => {
  const itemNumber = 24
  const items = []
  const onSlideVisible = (index: number) => {
    console.log(`Slide number ${index} is visible`)
  }
  for (let i = 0; i <= itemNumber; i++) {
    const hex = getRndHex()
    items.push({
      src: `https://via.placeholder.com/300/${hex}/808080/`,
    })
  }
  const slidesPerPageSettings = {
    mobileSmall: 1.5,
    mobileBig: 2.5,
    tablet: 4,
    desktop: 6,
  }
  const renderCustomArrow = ({ direction, ref, onClick }) => (
    <NavArrow
      ref={ref}
      direction={direction}
      onClick={() => onClick(direction)}
    />
  )
  const onSlidesVisibilityChange = () => {
    console.log('slides visibility changed')
  }
  const onScrollStart = () => {
    console.log('scrolling started')
  }
  const onScrollEnd = () => {
    console.log('scrolling ended')
  }
  return (
    <>
      <h2>With Images:</h2>
      <div style={{ width: '100%', height: '300px' }}>
        <Slider
          onSlideVisible={onSlideVisible}
          renderCustomArrow={renderCustomArrow}
          slidesPerPageSettings={slidesPerPageSettings}
          onScrollStart={onScrollStart}
          onSlidesVisibilityChange={onSlidesVisibilityChange}
          onScrollEnd={onScrollEnd}
        >
          {items.map((item, index) => renderImgSlide(item, index))}
        </Slider>
      </div>
      <h2>With Fixed Divs:</h2>
      <div style={{ width: '100%', height: '350px' }}>
        <Slider slideWidth={200}>
          {items.map((item, index) => renderDivSlide(item, index))}
        </Slider>
      </div>
      <h2>With Indicator:</h2>
      <SliderWithScrollToIndex
        items={items.slice(0, 5)}
      ></SliderWithScrollToIndex>
    </>
  )
}

ReactDOM.render(App(), document.getElementById('app'))
