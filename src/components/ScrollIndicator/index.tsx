import React from 'react'

import { CarouselProps } from '../Carousel/Carousel.interface'

const ScrollIndicator: React.FC<{ ScrollIndicatorComponent: CarouselProps['ScrollIndicatorComponent'], sliderRef: React.RefObject<HTMLDivElement> }> = ({ ScrollIndicatorComponent, sliderRef }) => {
  const [handlePositionLeft, setHandlePositionLeft] = React.useState('0%')
  const [handleWidth, setHandleWidth] = React.useState('0%')
  const [isSliderScrollable, setIsSliderScrollable] = React.useState(false)

  React.useEffect(() => {
    const onSliderScroll = async () => {
      const clientWidth = sliderRef.current?.clientWidth || 0
      const scrollLeft = sliderRef.current?.scrollLeft || 0
      const scrollWidth = sliderRef.current?.scrollWidth || 0

      const newHandleWidth = `${100 * (clientWidth / (scrollWidth || 1))}%`

      if (handleWidth !== newHandleWidth) {
        setHandleWidth(newHandleWidth)
      }

      setHandlePositionLeft(`${100 * (scrollLeft / (scrollWidth || 1))}%`)

      if (!isSliderScrollable && scrollWidth > clientWidth + 1) {
        setIsSliderScrollable(true)
      } else if (isSliderScrollable) {
        setIsSliderScrollable(false)
      }
    }

    sliderRef.current?.addEventListener('scroll', onSliderScroll)
    onSliderScroll()

    return () => sliderRef.current?.removeEventListener('scroll', onSliderScroll)
  }, [sliderRef])

  if (!ScrollIndicatorComponent) return null

  return <ScrollIndicatorComponent handlePositionLeft={handlePositionLeft} handleWidth={handleWidth} isSliderScrollable={isSliderScrollable} />
}

ScrollIndicator.displayName = 'ScrollIndicator'

export default ScrollIndicator
