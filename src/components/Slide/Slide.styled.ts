import styled from 'styled-components'
import { StyledSlideProps } from './Slide.interface'

export const StyledSlide = styled.li<StyledSlideProps>`
  scroll-snap-align: center;
  display: flex;
  justify-content: center;
  min-width: ${(props: StyledSlideProps) =>
    props.slidesPerPageSettings
      ? `${100 / props.slidesPerPageSettings.mobileSmall}%`
      : props.slideWidth
      ? `${props.slideWidth}px`
      : '100%'};
  :not(:last-child) {
    margin-right: 8px;
  }

  @media (min-width: 512px) {
    ${(props: StyledSlideProps) =>
      props.slidesPerPageSettings
        ? `min-width: ${100 / props.slidesPerPageSettings.mobileBig}%`
        : ''};
  }

  @media (min-width: 753px) {
    ${(props: StyledSlideProps) =>
      props.slidesPerPageSettings
        ? `min-width: ${100 / props.slidesPerPageSettings.tablet}%`
        : ''};
  }

  @media (min-width: 1232px) {
    ${(props: StyledSlideProps) =>
      props.slidesPerPageSettings
        ? `min-width: ${100 / props.slidesPerPageSettings.desktop}%`
        : ''};
  }
`
