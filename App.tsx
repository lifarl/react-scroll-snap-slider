import ReactDOM from 'react-dom'
import React from 'react'
import { Slider } from './src'
import NavArrow from './src/components/NavArrow'

const getRndHex = () => {
  return Math.floor(Math.random() * 16777215).toString(16)
}

const renderDivSlide = (item: any, index: number) => {
  return (
    <div key={index}>
      <div
        style={{
          height: '300px',
          width: '200px',
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          backgroundColor: getRndHex(),
        }}
      >
        <p>Slide {index}</p>
      </div>
    </div>
  )
}

const renderImgSlide = (item: any, index: number) => {
  return (
    <img
      style={{ width: '100%', maxWidth: '300px' }}
      src={item.src}
      key={index}
    ></img>
  )
}

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
    desktop: 8,
  }
  const renderCustomArrow = ({ direction, ref, onClick }) => (
    <NavArrow
      ref={ref}
      direction={direction}
      onClick={() => onClick(direction)}
    />
  )
  const onScroll = () => {
    console.log('scrolling')
  }
  const afterScroll = () => {
    console.log('scrolling finished')
  }
  return (
    <>
      <div style={{ width: '100%', height: '400px' }}>
        <Slider slideWidth={200}>
          {items.map((item, index) => renderDivSlide(item, index))}
        </Slider>
      </div>
      <div style={{ width: '100%', height: '400px' }}>
        <Slider
          onSlideVisible={onSlideVisible}
          renderCustomArrow={renderCustomArrow}
          slidesPerPageSettings={slidesPerPageSettings}
          onScroll={onScroll}
          afterScroll={afterScroll}
        >
          {items.map((item, index) => renderImgSlide(item, index))}
        </Slider>
      </div>
    </>
  )
}

ReactDOM.render(App(), document.getElementById('app'))
