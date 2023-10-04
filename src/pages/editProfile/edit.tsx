import * as React from 'react'
import { SVGProps, Ref, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" ref={ref} {...props}>
    <path
      fill="#fff"
      d="M12.67 13.33H3.33a.67.67 0 1 0 0 1.34h9.34a.67.67 0 1 0 0-1.34ZM3.33 12h.06l2.78-.25c.3-.03.6-.17.81-.38l6-6a1.28 1.28 0 0 0-.05-1.81l-1.82-1.83a1.33 1.33 0 0 0-1.78-.04l-6 6c-.21.21-.35.5-.38.8l-.28 2.78a.67.67 0 0 0 .66.73Zm6.85-9.33L12 4.49l-1.33 1.3L8.88 4l1.3-1.33ZM4.25 8.6 8 4.88l1.8 1.8-3.73 3.73-2 .19.18-2Z"
    />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const Edit = memo(ForwardRef)
