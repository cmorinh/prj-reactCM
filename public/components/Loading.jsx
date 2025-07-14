import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';

const ContainerLoading = styled.div`
    height: 100vh;
    z-index: 9999;
    position: absolute;
    top: 0px;
    width: 100vw;
`;

function Loading() {
    return (
        <ContainerLoading className="d-flex justify-content-center align-items-center bg-dark">
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
        </ContainerLoading>
    ) 
}
  
export default Loading;