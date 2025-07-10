import { useEffect, useState } from "react";
import { Container,Row,Col,Card, Button, Stack } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useFakeStoreApi } from "../contexts/FakeStoreApiContext";
import styled from 'styled-components';

const CardList = styled(Card)`
    &:hover {
        box-shadow: 0 0 10px 0 rgba(117, 112, 112, 0.1);
        -webkit-filter: brightness(1.07);
        filter: brightness(1.07);
        transform: translate(0, -5px);
    }
    `;

function ListContent(props) {
    const { getFakeProducts } = useFakeStoreApi();
    const navigate = useNavigate();
    const [content, setContent] = useState([]);

    useEffect(() => {  
        const fetchProducts = async () => {
            const data = await getFakeProducts();

            if(props.filter){
                const products = data.filter((item) => item.category.includes(props.filter.category));	

                if(props.filter.top !== undefined){    
                    const randomProducts = products.slice(0, props.filter.top);
                    setContent(randomProducts); 
                } else {
                    setContent(products);
                }
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
                    <CardList className="h-100" onClick={() => detail(item.id, item.origin)}>
                        <Card.Img variant="top" src={item.image} style={{ height: '200px', objectFit: 'contain', padding: '1rem' }} alt={item.title} />
                        <Card.Body className="d-flex flex-column">
                            <Card.Title className="text-truncate">{item.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-primary">Price: ${item.price}</Card.Subtitle>
                            <Card.Text className="flex-grow-1" style={{fontSize: '0.8rem', }}>
                                {item.description.substring(0, 100)}...
                            </Card.Text>
                        </Card.Body>
                    </CardList>
                </Col>
            ))}
            </Row>
        </Container>
    )
}

export default ListContent;