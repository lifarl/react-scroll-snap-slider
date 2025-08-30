import { styled } from 'styled-system/jsx'

export const StyledCarousel = styled('div', {
  base: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center'
  }
})

export const StyledSlider = styled('div', {
  base: {
    '&::-webkit-scrollbar': {
      display: 'none'
    },
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
    scrollSnapType: 'x mandatory',
    scrollBehavior: 'smooth',
    overflowX: 'scroll',
    width: '100%'
  }
})

export const StyledUl = styled('ul', {
  base: {
    display: 'flex',
    flexWrap: 'nowrap',
    whiteSpace: 'nowrap',
    listStyle: 'none',
    width: '100%',
    padding: 0,
    margin: 0
  }
})
