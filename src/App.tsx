import styled from "styled-components";
import Game from "./component/Game";

function App() {
    return (
        <Container>
            <Game />
        </Container>
    );
}

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

export default App;
