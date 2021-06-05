import React from 'react'

export const renderImgSlide = (item: any, index: number) => {
  return (
    <img
      style={{ width: '100%', maxWidth: '300px' }}
      src={item.src}
      key={index}
    ></img>
  )
}
