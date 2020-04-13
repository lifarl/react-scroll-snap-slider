import styled from 'styled-components'
import { StyledSlideProps } from './Slide.interface'

export const StyledSlide = styled.li<StyledSlideProps>`
  scroll-snap-align: center;
  ${(props: StyledSlideProps) => !props.showMultiItem && 'flex: 1 0 100%;'}
  ${(props: StyledSlideProps) =>
    props.slidesPerPageSettings
      ? `min-width: ${100 / props.slidesPerPageSettings.mobile}%`
      : ''};
  padding-left: 8px;
  padding-right: 8px;

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
