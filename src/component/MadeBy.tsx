import styled from "styled-components";

const Container = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 12px;
    font-style: italic;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;
    z-index: 1;
`;

const MadeBy = () => {
    return (
        <Container>
            Made with fun by <a href="https://twitter.com/emilien_bidet">Emilien Bidet</a> and{" "}
            <a href="https://www.linkedin.com/in/ma%C3%ABl-suard-143b83197/">Mael Suard</a>
        </Container>
    );
};

export default MadeBy;
