import styled from "styled-components"
import Box, { TBoxProps } from "./Box"

export type TFlexProps = TBoxProps

const Flex = styled(Box)<TFlexProps>({
  display: "flex",
})

export default Flex
