import { styled } from 'styled-system/jsx'

export const StyledSlide = styled('li', {
  base: {
    scrollSnapAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    '&:not(:last-child)': {
      marginRight: '8px'
    }
  }
})
