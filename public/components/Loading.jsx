import { Spinner } from 'react-bootstrap';

function Loading() {
    return (
        <div className="d-flex justify-content-center align-items-center bg-dark" style={{ height: '100vh' }}>
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
        </div>
    ) 
}
  
export default Loading;