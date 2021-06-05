import React from 'react'
import { getRndHex } from '../getRndHex'

export const renderDivSlide = (item: any, index: number) => {
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
