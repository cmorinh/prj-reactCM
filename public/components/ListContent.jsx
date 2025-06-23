import { useEffect, useState } from "react";
import { Container,Row,Col,Card, Button, Stack } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useFakeStoreApi } from "../contexts/FakeStoreApiContext";

function ListContent(props) {
    const { getFakeProducts } = useFakeStoreApi();
    const navigate = useNavigate();
    const [content, setContent] = useState([]);

    useEffect(() => {  
        const fetchProducts = async () => {
            const data = await getFakeProducts();

            if(props.filter){
                const products = data.filter((item) => item.category.includes(props.filter.category));
                setContent(products);
            } else {
                setContent(data);
            }  
        };

        fetchProducts();    
    }, []);

    const detail = (id, origin) => {
        navigate(`/detail/${id}/${origin}`);
    };

    return (
        <Container className="container d-flex justify-content-center">
            <Row className="w-100 g-4">
            {content.map(item=> (
                <Col key={item.id} xs={6} md={4} lg={3}>
                    <Card className="h-100">
                        <Card.Img variant="top" src={item.image} style={{ height: '200px', objectFit: 'contain', padding: '1rem' }} />
                        <Card.Body className="d-flex flex-column">
                            <Card.Title className="text-truncate">{item.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-primary">Price: ${item.price}</Card.Subtitle>
                            <Card.Text className="flex-grow-1">
                                {item.description.substring(0, 100)}...
                            </Card.Text>
                            <Button variant="primary" onClick={() => detail(item.id, item.origin)}>Detail</Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            </Row>
        </Container>
    )
}

export default ListContent;