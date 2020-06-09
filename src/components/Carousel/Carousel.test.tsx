import React from 'react'
import { Carousel } from './index'
import { render, screen } from '@testing-library/react'

const items = [
  {
    src: '',
  },
  {
    src: '',
  },
  {
    src: '',
  },
]

describe('Carousel basic tests', () => {
  it('renders the Carousel with 3 items', () => {
    render(
      <Carousel>
        {items.map((item, index) => (
          <img key={index} src={item.src}></img>
        ))}
      </Carousel>
    )
    expect(screen.getAllByRole('img')).toHaveLength(3)
  })
})
