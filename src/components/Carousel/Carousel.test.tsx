import React from 'react'
import { Carousel } from './index'
import { render, screen, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

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

  it('fires scroll start and end callbacks', () => {
    jest.useFakeTimers()

    const onScrollStart = jest.fn()
    const onScrollEnd = jest.fn()

    const { container } = render(
      <Carousel onScrollStart={onScrollStart} onScrollEnd={onScrollEnd}>
        {items.map((item, index) => (
          <img key={index} src={item.src}></img>
        ))}
      </Carousel>
    )

    const slider = container.querySelector('div[tabindex="0"]') as HTMLDivElement
    expect(slider).toBeTruthy()

    act(() => {
      fireEvent.scroll(slider, { target: { scrollLeft: 100 } })
    })

    expect(onScrollStart).toHaveBeenCalledTimes(1)
    expect(onScrollStart).toHaveBeenCalledWith(0)

    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(onScrollEnd).toHaveBeenCalledTimes(1)
    expect(onScrollEnd).toHaveBeenCalledWith(0)

    jest.useRealTimers()
  })
})
