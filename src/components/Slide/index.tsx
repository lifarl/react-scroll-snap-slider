import React from 'react'
import { SlideProps } from './Slide.interface'
import { StyledSlide } from './Slide.styled'

const Slide = React.forwardRef(
  (
    { slideIndex, showMultiItem, slidesPerPageSettings, children }: SlideProps,
    ref: React.Ref<HTMLLIElement>
  ) => {
    return (
      <StyledSlide
        showMultiItem={showMultiItem}
        slidesPerPageSettings={slidesPerPageSettings}
        data-index-number={slideIndex}
        key={slideIndex}
        ref={ref}
      >
        {children}
      </StyledSlide>
    )
  }
)

Slide.displayName = 'Slide'

export default Slide
