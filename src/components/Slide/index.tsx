import React from 'react'
import { SlideProps } from './Slide.interface'
import { StyledSlide } from './Slide.styled'

const Slide = React.forwardRef(
  (
    { slideIndex, className, slideCount, children }: SlideProps,
    ref: React.Ref<HTMLLIElement>,
  ) => {
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
  },
)

Slide.displayName = 'Slide'

export default React.memo(Slide)
