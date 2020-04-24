import styled from 'styled-components'

export const StyledNavWrapper = styled.div<{
  direction: 'prev' | 'next'
}>`
  position: absolute;
  ${(props) => props.direction === 'next' && 'right: 5%;'}
  ${(props) => props.direction === 'prev' && 'left: 5%;'}
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  background-color: white;
  padding: 0.5em;
  border-radius: 4px;
  z-index: 1;
  :active {
    transform: scale(0.9);
  }

  @media (max-width: 512px) {
    display: none !important;
  }
`

export const StyledArrow = styled.svg`
  width: 22px;
  height: 22px;
  fill: #676767;
`
