import React from 'react'

export const styled: any = (tag: any, _def?: any) => {
  const Comp = React.forwardRef<any, any>((props, ref) => {
    const { children, ...rest } = props
    const Tag: any = tag
    return React.createElement(Tag, { ref, ...rest }, children)
  })
  Comp.displayName = typeof tag === 'string' ? tag : 'Styled'
  return Comp as any
}

