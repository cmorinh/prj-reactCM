import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function Cart() {
    const [content, setContent] = useState([]);
    const [cart, setCart] = useState([]);

    // Cargar el carrito desde localStorage al iniciar
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    // Actualizar `content` cada vez que `cart` cambie
    useEffect(() => {
        fetch('https://fakestoreapi.com/products/')
            .then(response => response.json())
            .then(data => {
                const products = data.filter(item => cart.includes(item.id));
                setContent(products);
            })
            .catch(error => {
                console.error("Error al obtener los productos:", error);
            });
    }, [cart]); // Dependencia cart: actualiza la lista cuando se modifica el carrito

    // Función para eliminar productos del carrito
    const removeCart = (id) => {
        setCart(prevCart => {
            const updatedCart = prevCart.filter(cartItem => cartItem !== id);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    return (
        <Container className="container d-flex justify-content-center">
            <Row className="w-75">
                {content.length === 0 ? (
                    <p>El carrito está vacío</p>
                ) : (
                    content.map(item => (
                        <Col key={item.id} className="col-sm-4 col-lg-3">
                            <Card>
                                <Card.Img variant="top" src={item.image} />
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Precio: ${item.price}</Card.Subtitle>
                                    <Card.Text>
                                        {item.description}
                                    </Card.Text>
                                    <Button variant="danger" onClick={() => removeCart(item.id)}>Delete</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
}

export default Cart;