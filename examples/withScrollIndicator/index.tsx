import React, { useRef, useState, useMemo } from 'react'
import { Slider } from '../../src'
import { getRndHex } from '../getRndHex'

interface ScrollSnapSliderRef {
  scrollToSlide: Function
  sliderRef: React.RefObject<HTMLDivElement>
}

const Pagination: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  style,
  ...rest
}) => (
  <div
    style={{
      listStyle: 'none',
      width: '50%',
      padding: '0 0 20px 0',
      margin: '0 auto',
      textAlign: 'center',
      zIndex: 10,
      ...(style || {}),
    }}
    {...rest}
  />
)

const PaginationBullet: React.FC<{
  isActive: boolean
  onClick?: () => void
}> = ({ isActive, onClick }) => (
  <span
    onClick={onClick}
    style={{
      display: 'inline-block',
      width: '12px',
      height: '12px',
      cursor: 'pointer',
      margin: '0 7px',
      borderRadius: '50%',
      transitionProperty: 'transform, opacity, background-color',
      transitionDuration: '0.3s',
      backgroundColor: isActive ? '#000' : '#b6b6b6',
    }}
  />
)

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
      <Pagination>
        {props.items.map((item, index) => {
          return (
            <PaginationBullet
              key={index}
              onClick={() => changeGalleryIndex(index)}
              isActive={slideIndex === index}
            />
          )
        })}
      </Pagination>
    </div>
  )
}
