import React from 'react'
import { SlideProps } from './Slide.interface'
import { StyledSlide } from './Slide.styled'
import { css } from 'styled-system/css'

const Slide = React.forwardRef(
  (
    { slideIndex, slidesPerPageSettings, slideWidth, children }: SlideProps,
    ref: React.Ref<HTMLLIElement>
  ) => {
    const baseMinWidth = slidesPerPageSettings
      ? `${100 / slidesPerPageSettings.mobileSmall}%`
      : slideWidth
      ? `${slideWidth}px`
      : '100%'

    const responsiveClass = css({
      minWidth: baseMinWidth,
      '@media (min-width: 512px)': {
        minWidth: slidesPerPageSettings
          ? `${100 / slidesPerPageSettings.mobileBig}%`
          : undefined,
      },
      '@media (min-width: 753px)': {
        minWidth: slidesPerPageSettings
          ? `${100 / slidesPerPageSettings.tablet}%`
          : undefined,
      },
      '@media (min-width: 1232px)': {
        minWidth: slidesPerPageSettings
          ? `${100 / slidesPerPageSettings.desktop}%`
          : undefined,
      },
    })

    return (
      <StyledSlide
        className={responsiveClass}
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
