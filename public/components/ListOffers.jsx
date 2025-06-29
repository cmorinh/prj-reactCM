import { useEffect, useState } from "react";
import { Container,Row,Col,Card, Button, Stack } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useMockupApi } from "../contexts/MockupApiContext";

function ListOffers(props) {
    const navigate = useNavigate();
    const { getProducts } = useMockupApi();
    const [content, setContent] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();

            if(props.filter && props.filter.top !== undefined){
                const randomProducts = data.slice(0, props.filter.top);
                setContent(randomProducts); 
                
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
                <Col key={item.id} xs={6} md={3} lg={3}>
                    <Card className="h-100 card-list" onClick={() => detail(item.id, item.origin)}>
                        <Card.Img variant="top" src={item.image} style={{ height: '200px', objectFit: 'contain', padding: '1rem' }} alt={item.title} />
                        <Card.Body className="d-flex flex-column">
                            <Card.Title className="text-truncate">{item.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-primary">Price: ${item.price}</Card.Subtitle>
                            <Card.Text className="flex-grow-1" style={{fontSize: '0.8rem', }}>
                                {item.description.substring(0, 100)}...
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            </Row>
        </Container>
    )
}	

export default ListOffers;