import React from 'react'

export const renderImgSlide = (item: any, index: number) => {
  return (
    <img
      style={{ width: '100%', height: 'auto', display: 'block' }}
      src={item.src}
      alt={`Slide ${index + 1}`}
      key={index}
    />
  )
}
