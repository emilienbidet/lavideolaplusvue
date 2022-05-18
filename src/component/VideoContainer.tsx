import styled, {css, keyframes} from "styled-components";
import Flex from "./Flex";

type VideoContainerProps = {
    isSlidingOut?: boolean;
};

const VideoContainer = styled(Flex)<VideoContainerProps>`
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    height: 150%;
    ${({isSlidingOut}) => isSlidingOut && animation()};

    @media screen and (min-width: 800px) {
        flex-direction: row;
        width: 150%;
        height: 100%;
    }
`;

const slideOutX = keyframes`
0% {
    transform: translateX(0);
}
100% {
    transform: translateX(-33.33333333333%);
}
`;

const slideOutY = keyframes`
0% {
    transform: translateY(0);
}
100% {
    transform: translateY(-33.33333333333%);
}
`;

const animation = () =>
    css`
        animation: ${slideOutY} 1s linear;

        @media screen and (min-width: 800px) {
            animation: ${slideOutX} 1s linear;
        }
    `;

export default VideoContainer;
