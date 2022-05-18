import styled from "styled-components"
import {
  compose,
  border,
  BorderProps,
  space,
  SpaceProps,
  layout,
  LayoutProps,
  typography,
  TypographyProps,
  color,
  ColorStyleProps,
  flexbox,
  FlexboxProps,
  BackgroundColorProps,
  shadow,
  ShadowProps,
  position,
  PositionProps,
} from "styled-system"

export type TBoxProps = { "data-testid"?: string; tracking?: string } & BorderProps &
  SpaceProps &
  LayoutProps &
  TypographyProps &
  ColorStyleProps &
  BackgroundColorProps &
  ShadowProps &
  PositionProps &
  FlexboxProps

const Box = styled("div")<TBoxProps>(
  {
    boxSizing: "border-box",
    margin: 0,
    minWidth: 0,
  },
  compose(border, space, layout, typography, color, flexbox, shadow, position)
)

export default Box
