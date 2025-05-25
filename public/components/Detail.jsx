import { useEffect, useState } from "react";
import { Container,Row,Col,Card, Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";

function Detail() {
    const {id} = useParams();
    const [content, setContent] = useState({});
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
        console.log("Cart actualizado:", cart);
    }, []);

    const addToCart = (id) => {
        setCart(prevCart => {
            if (!prevCart.includes(id)) {
                const updatedCart = [...prevCart, id];
                localStorage.setItem("cart", JSON.stringify(updatedCart)); // Guardar en localStorage
                return updatedCart;
            }
            return prevCart; // Evita duplicados
        });

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
        <Container className="container d-flex justify-content-center">
            <Row className="w-75">
                <Col key={content.id} className="col-sm-4 col-lg-3">
                    <Card>
                        <Card.Img variant="top" src={content.image} />
                        <Card.Body>
                            <Card.Title>{content.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Price: {content.price}</Card.Subtitle>
                            <Card.Text>
                                {content.description}
                            </Card.Text>
                            <Button id="btn-card" variant="primary" onClick={() => addToCart(content.id)}>Add Cart</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Detail;