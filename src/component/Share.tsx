import {FunctionComponent, useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import {ReactComponent as ShareLogo} from "../assets/image/share.svg";
import {ReactComponent as FacebookLogo} from "../assets/image/facebook.svg";
import {ReactComponent as TwitterLogo} from "../assets/image/twitter.svg";
import Flex from "./Flex";
import {SHARED_URL} from "../utils/constants";

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.5rem;
    z-index: 1;
`;
type ShareProps = {
    highScore: number;
};

const Share: FunctionComponent<ShareProps> = ({highScore}) => {
    const [canShare, setCanShare] = useState<any | undefined>(undefined);
    const sharedMessage = useMemo(
        () =>
            "Je viens de jouer à la vidéo la plus vue !\nMon meilleur score c'est " +
            highScore +
            ".\nPersonne ne peut me battre...",
        [highScore]
    );

    const handleShareClick = () => {
        if (navigator.share) {
            navigator.share({
                title: "La vidéo la plus vue",
                text: sharedMessage,
                url: SHARED_URL,
            });
        }
    };

    useEffect(() => {
        setCanShare(navigator.share);
    }, []);

    return (
        <Container>
            {canShare && <ShareLogo onClick={handleShareClick} />}
            {!canShare && (
                <Flex style={{gap: "0.75rem"}}>
                    <a
                        target="_blank"
                        href={"https://www.facebook.com/sharer/sharer.php?u=" + SHARED_URL}
                    >
                        <FacebookLogo />
                    </a>
                    <a
                        target="_blank"
                        href={
                            "https://twitter.com/share?url=" +
                            SHARED_URL +
                            "&text=" +
                            encodeURI(sharedMessage)
                        }
                    >
                        <TwitterLogo />
                    </a>
                </Flex>
            )}
        </Container>
    );
};

export default Share;
