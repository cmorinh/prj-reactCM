import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFakeStoreApi } from "../contexts/FakeStoreApiContext";
import  Modal from 'react-bootstrap/Modal';
import { Container, Row, Col } from 'react-bootstrap';

export default function searchContent() {
    const { searchFakeProducts } = useFakeStoreApi();
    const [show, setShow] = useState(true);
    const [textValue, setTextValue] = useState('');
    const [productsFound, setProductsFound] = useState([]);
    const navigate = useNavigate();

    useEffect(()=> {
        if(textValue.length > 2) {            
            let data = searchFakeProducts(textValue);
            setProductsFound(data);
        } else {

            setProductsFound([]);
        }
    }, [textValue]);

    const detail = (id, origin) => {
        setTextValue('');
        setShow(false);
        navigate(`/detail/${id}/${origin}`);
    };

    return (
        <>
            <Modal size="lg" show={show} onHide={() => setShow(false)} aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        <input value={textValue} onChange={(e) => setTextValue(e.target.value)} placeholder="Search" style={{ width: '300px', height: '30px', fontSize: '0.8rem' }} />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {productsFound.length > 0 ? (
                         <Container>
                            {productsFound.map(product => (
                            
                                    <Row key={product.id}>
                                        <Col xs={3} md={2}>
                                            <img src={product.image} alt={product.title} style={{ width: '80px' }} />       
                                        </Col>
                                        <Col xs={7} md={6}>
                                            <span onClick={() => detail(product.id, product.origin)}>{product.title}</span> 
                                        </Col>
                                    </Row>
                                
                            ))}
                        </Container>    
                    ) : (
                        <p>No article found</p>
                    )}
                </Modal.Body>
            </Modal>
        </>
    )
};
