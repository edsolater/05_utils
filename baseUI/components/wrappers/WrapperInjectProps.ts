import { DivProps } from '../Div'
import { AttachClickableInjectProps } from './AttachClickable'
import { AttachHoveableInjectProps } from './AttachHoverable'

type WrapperInjectProps = DivProps & AttachHoveableInjectProps & AttachClickableInjectProps
export default WrapperInjectProps

export const wrapperInjectProps: (keyof WrapperInjectProps)[] = ['isHovered', 'isActive']
