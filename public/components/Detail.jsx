import { useEffect, useState } from "react";
import { Container,Row,Col,Card, Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

function Detail() {
    const {id} = useParams();
    const {addToCart} = useCart();
    const [content, setContent] = useState({});
    
    const handleAddToCart = (id) => {
        addToCart(id);
        btnDisable();
    };

    const btnDisable = () => {
        const button = document.getElementById('btn-card');
        button.setAttribute('disable', true);
        button.classList.remove('btn-primary');
        button.classList.add('btn-secondary');   
        button.innerText = 'Added';     
    }

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(response => response.json())
            .then(data => {                    
                    setContent(data);
                    console.log(data); 
            })
            .catch(error => {
                console.error(error)
            });
    }, [id]);

    return (
        <Container className="container d-flex justify-content-center py-3">
            <Card className="w-100">
                <Row className="g-0">
                    <Col md={4} className="d-flex align-items-center justify-content-center">
                        <Card.Img 
                            src={content.image} 
                            style={{ 
                                maxHeight: '150px', 
                                width: 'auto', 
                                objectFit: 'contain' 
                            }} 
                        />
                    </Col>
                    <Col md={8}>
                        <Card.Body className="h-100 d-flex flex-column">
                            <div className="flex-grow-1">
                                <Card.Title className="h2 mb-3">{content.title}</Card.Title>
                                <Card.Subtitle className="h4 mb-4 text-primary">
                                    ${content.price}
                                </Card.Subtitle>
                                <Card.Text className="mb-4">
                                    {content.description}
                                </Card.Text>
                            </div>
                            <div className="d-flex justify-content-end">
                                <Button 
                                    id="btn-card" 
                                    variant="primary" 
                                    size="lg"
                                    onClick={() => handleAddToCart(content.id)}
                                >
                                    Add to Cart
                                </Button>
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Container>
    )
}

export default Detail;