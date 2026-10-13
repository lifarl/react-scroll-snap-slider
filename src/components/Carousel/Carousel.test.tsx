import React from 'react'
import { Carousel } from './index'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

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
      </Carousel>,
    )
    expect(screen.getAllByRole('img')).toHaveLength(3)
  })

  it('fires scroll start and end callbacks', () => {
    vi.useFakeTimers()

    const onScrollStart = vi.fn()
    const onScrollEnd = vi.fn()

    const { container } = render(
      <Carousel onScrollStart={onScrollStart} onScrollEnd={onScrollEnd}>
        {items.map((item, index) => (
          <img key={index} src={item.src}></img>
        ))}
      </Carousel>,
    )

    const slider = container.querySelector(
      'div[tabindex="0"]',
    ) as HTMLDivElement
    expect(slider).toBeTruthy()

    act(() => {
      fireEvent.scroll(slider, { target: { scrollLeft: 100 } })
    })

    expect(onScrollStart).toHaveBeenCalledTimes(1)
    expect(onScrollStart).toHaveBeenCalledWith(0)

    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(onScrollEnd).toHaveBeenCalledTimes(1)
    expect(onScrollEnd).toHaveBeenCalledWith(0)

    vi.useRealTimers()
  })

  it('keeps the imperative handle stable across rerenders', () => {
    const ref = vi.fn()
    const renderCarousel = () => (
      <Carousel ref={ref}>
        {items.map((item, index) => (
          <img key={index} src={item.src}></img>
        ))}
      </Carousel>
    )
    const { rerender } = render(renderCarousel())

    expect(ref).toHaveBeenCalledTimes(1)

    rerender(renderCarousel())

    expect(ref).toHaveBeenCalledTimes(1)
  })
})
