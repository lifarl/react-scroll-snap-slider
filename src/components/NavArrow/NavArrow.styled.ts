import { styled } from 'styled-system/jsx'

export const StyledNavWrapper = styled('div', {
  base: {
    position: 'absolute',
    cursor: 'pointer',
    transition: 'all 0.1s ease-in-out',
    backgroundColor: 'white',
    padding: '0.5em',
    borderRadius: '4px',
    zIndex: 1,
    _active: {
      transform: 'scale(0.9)'
    },
    '@media (max-width: 512px)': {
      display: 'none !important'
    }
  },
  variants: {
    direction: {
      next: { right: '5%' },
      prev: { left: '5%' }
    }
  }
})

export const StyledArrow = styled('svg', {
  base: {
    width: '22px',
    height: '22px',
    fill: '#676767'
  }
})
