import { useEffect, useState } from "react";
import { Container,Row,Col,Card, Button, Stack } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function ListContent() {
    const navigate = useNavigate();
    const [content, setContent] = useState([]);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then(response => response.json())
            .then(data => {
                    console.log(data); 
                    setContent(data);
            })
            .catch(error => {
                console.error(error)
            });
    }, []);

    const detail = (id) => {
        navigate(`/detail/${id}`);
    };

    return (
        <Container className="container d-flex justify-content-center">
            <Row className="w-75">
            {content.map(item=> (
                <Col key={item.id} className="col-sm-4 col-lg-3">
                    <Card>
                        <Card.Img variant="top" src={item.image} />
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Price: {item.price}</Card.Subtitle>
                            <Card.Text>
                                {item.description}
                            </Card.Text>
                            <Button variant="primary" onClick={() => detail(item.id)}>Detail</Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            </Row>
        </Container>
        )
}

export default ListContent;