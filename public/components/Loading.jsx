import { Spinner } from 'react-bootstrap';

function Loading() {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
        </div>
    ) 
}
  
export default Loading;