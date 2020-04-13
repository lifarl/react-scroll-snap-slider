import ReactDOM from 'react-dom'
import React from 'react'
import { Carousel } from './src'
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
  const itemNumber = 12
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
    mobile: 1.5,
    tablet: 2.5,
    desktop: 5,
  }
  return (
    <>
      <div style={{ width: '100%', height: '400px' }}>
        <Carousel
          onSlideVisible={onSlideVisible}
          CustomArrow={NavArrow}
          showMultiItem
        >
          {items.map((item, index) => renderDivSlide(item, index))}
        </Carousel>
      </div>
      <div style={{ width: '100%', height: '400px' }}>
        <Carousel
          onSlideVisible={onSlideVisible}
          CustomArrow={NavArrow}
          showMultiItem
          slidesPerPageSettings={slidesPerPageSettings}
        >
          {items.map((item, index) => renderImgSlide(item, index))}
        </Carousel>
      </div>
    </>
  )
}

ReactDOM.render(App(), document.getElementById('app'))
