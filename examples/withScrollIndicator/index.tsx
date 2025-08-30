import React, { useRef, useState, useMemo } from 'react'
import { Slider } from '../../src'
import { styled } from 'styled-system/jsx'
import { getRndHex } from '../getRndHex'

interface ScrollSnapSliderRef {
  scrollToSlide: Function
  sliderRef: React.RefObject<HTMLDivElement>
}

interface StyledPaginationBulletProps {
  isActive: boolean
}

const StyledPagination = styled('div', {
  base: {
    listStyle: 'none',
    width: '50%',
    padding: '0 0 20 0',
    margin: '0 auto',
    textAlign: 'center',
    zIndex: 10,
  },
})

const StyledPaginationBullet = styled('span', {
  base: {
    display: 'inline-block',
    width: '12px',
    height: '12px',
    cursor: 'pointer',
    margin: '0 7px',
    borderRadius: '50%',
    transitionProperty: 'transform, opacity, background-color',
    transitionDuration: '0.3s',
  },
  variants: {
    isActive: {
      true: { backgroundColor: '#000' },
      false: { backgroundColor: '#b6b6b6' },
    },
  },
})

export const renderFullWidthSlide = (index: number) => {
  return (
    <div key={index} style={{ width: '100%' }}>
      <div
        style={{
          height: '300px',
          width: '100%',
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

export const SliderWithScrollToIndex: React.FC<any> = (props) => {
  const gallerySliderRef = useRef<ScrollSnapSliderRef>(null)
  const [slideIndex, setIndex] = useState(0)

  const changeGalleryIndex = (index: number) => {
    gallerySliderRef.current?.scrollToSlide(index)
    setIndex(index)
  }

  const onGallerySlidesVisibilityChange = (index: number) => {
    setIndex(index)
  }

  const items = useMemo(
    () => props.items.map((item, index) => renderFullWidthSlide(index)),
    []
  )

  return (
    <div style={{ width: '100%', height: '350px' }}>
      <Slider
        ref={gallerySliderRef}
        onSlidesVisibilityChange={onGallerySlidesVisibilityChange}
      >
        {items}
      </Slider>
      <StyledPagination>
        {props.items.map((item, index) => {
          return (
            <StyledPaginationBullet
              key={index}
              onClick={() => changeGalleryIndex(index)}
              isActive={slideIndex === index}
            ></StyledPaginationBullet>
          )
        })}
      </StyledPagination>
    </div>
  )
}
