import styled from 'styled-components'

export const StyledCarousel = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`

export const StyledSlider = styled.ul`
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  white-space: nowrap;
  list-style: none;
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
  margin: 0;
`
