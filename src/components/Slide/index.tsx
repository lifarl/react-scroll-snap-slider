import React from 'react'
import { SlideProps } from './Slide.interface'
import { StyledSlide } from './Slide.styled'

const Slide = React.forwardRef(
  (
    { slideIndex, slidesPerPageSettings, slideWidth, className, slideCount, children }: SlideProps,
    ref: React.Ref<HTMLLIElement>
  ) => {
    const baseMinWidth = slidesPerPageSettings
      ? `${100 / slidesPerPageSettings.mobileSmall}%`
      : slideWidth
      ? `${slideWidth}px`
      : '100%'


    return (
      <StyledSlide
        data-index-number={slideIndex}
        key={slideIndex}
        className={className}
        role="group"
        aria-roledescription="slide"
        aria-label={`Slide ${slideIndex + 1}${slideCount ? ` of ${slideCount}` : ''}`}
        ref={ref}
      >
        {children}
      </StyledSlide>
    )
  }
)

Slide.displayName = 'Slide'

export default Slide
