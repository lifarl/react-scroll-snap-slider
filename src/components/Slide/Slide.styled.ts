import styled from 'styled-components'
import { StyledSlideProps } from './Slide.interface'

export const StyledSlide = styled.li<StyledSlideProps>`
  scroll-snap-align: center;
  display: flex;
  justify-content: center;
  ${(props: StyledSlideProps) =>
    props.slidesPerPageSettings
      ? `min-width: ${100 / props.slidesPerPageSettings.mobile}%`
      : ''};
  :not(:last-child) {
    margin-right: 8px;
  }

  @media (min-width: 512px) {
    ${(props: StyledSlideProps) =>
      props.slidesPerPageSettings
        ? `min-width: ${100 / props.slidesPerPageSettings.tablet}%`
        : ''};
  }

  @media (min-width: 753px) {
    ${(props: StyledSlideProps) =>
      props.slidesPerPageSettings
        ? `min-width: ${100 / props.slidesPerPageSettings.desktop}%`
        : ''};
  }
`
