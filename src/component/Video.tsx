import {useMemo} from "react";
import styled from "styled-components";
import Flex from "./Flex";
import CountUp from "react-countup";
import {TVideo} from "../typings";

type VideoCardState = "buttons" | "loading" | "views" | "empty";

type VideoCardProps = {
    video: TVideo;
    initialState: VideoCardState;
    onClick?: () => void;
    onAnimationEnd?: () => void;
};

const Video = ({video, initialState, onClick, onAnimationEnd}: VideoCardProps) => {
    const {title, channelTitle, viewCount, thumbnailUrl} = video;

    const formattedViews = useMemo(
        () => viewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
        [viewCount]
    );

    // Trim the title to fit the space and add "..." if it's too long
    const trimmedTitle = useMemo(
        () => (title.length > 60 ? `${title.substring(0, 60)}...` : title),
        [title]
    );

    return (
        <Container backgroundUrl={thumbnailUrl} justifyContent={"center"} onClick={onClick}>
            <Flex justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
                <Flex flexDirection={"column"} marginBottom={4}>
                    <VideoTitle>{trimmedTitle}</VideoTitle>
                    <ChannelTitle>{channelTitle}</ChannelTitle>
                </Flex>

                {initialState == "views" && (
                    <Flex flexDirection={"column"}>
                        <ViewsText>{formattedViews}</ViewsText>
                        <ViewText>vues</ViewText>
                    </Flex>
                )}

                {initialState == "loading" && (
                    <Flex flexDirection={"column"}>
                        <CountUp
                            end={viewCount}
                            duration={1.5}
                            separator=" "
                            delay={0}
                            onEnd={onAnimationEnd}
                        >
                            {({countUpRef}) => <ViewsText ref={countUpRef} />}
                        </CountUp>
                        <ViewText>vues</ViewText>
                    </Flex>
                )}
            </Flex>
        </Container>
    );
};

type TContainerProps = {
    backgroundUrl: string;
};

const Container = styled(Flex)<TContainerProps>`
    flex: 1;
    padding: 2rem;
    overflow: hidden;
    background-position: center;
    background-size: cover;
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
        url("${(props) => props.backgroundUrl}");
`;

const VideoTitle = styled.h1`
    text-align: center;
    font-size: 1rem;
    margin-bottom: 0.5rem;

    @media screen and (min-width: 800px) {
        font-size: 1.5rem;
    }
`;

const ChannelTitle = styled.h2`
    text-align: center;
    font-size: 0.8rem;
    text-decoration: underline;

    @media screen and (min-width: 800px) {
        font-size: 1rem;
    }
`;

const ViewsText = styled.span`
    font-size: 2rem;
    color: #fff989;
    white-space: nowrap;

    @media screen and (min-width: 800px) {
        font-size: 3rem;
    }
`;

const ViewText = styled.p`
    font-size: 0.5rem;
    text-align: center;
    font-family: Varela Round;

    @media screen and (min-width: 800px) {
        font-size: 0.8rem;
    }
`;

export default Video;
