import { Container, Table, Button } from 'react-bootstrap';
import { useCart } from "../contexts/CartContext";

function Cart() {
    const { cart, content, removeFromCart } = useCart();

    const handleRemoveFromCart = (id) => {
        removeFromCart(id);
    };

    return (
        <Container className="py-4">
            {content.length === 0 ? (
                <div className="text-center">
                    <h3>El carrito está vacío</h3>
                </div>
            ) : (
                <Table responsive hover className="align-middle">
                    <thead>
                        <tr className="text-center">
                            <th>Products</th>
                            <th>Details</th>
                            <th>Count</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {content.map(item => (
                            <tr key={item.id}>
                                <td style={{ width: '150px' }}>
                                    <img 
                                        src={item.image} 
                                        alt={item.title}
                                        style={{ 
                                            maxWidth: '150px',
                                            height: 'auto',
                                            objectFit: 'contain'
                                        }}
                                    />
                                </td>
                                <td>
                                    <div>
                                        <h5 className="mb-2">{item.title}</h5>
                                        <p className="text-muted mb-1">ID: {item.id}</p>
                                        <p className="text-primary fw-bold mb-0">${item.price}</p>
                                    </div>
                                </td>
                                <td className="text-center">
                                    <span className="badge bg-secondary fs-6">
                                        {cart.filter(cartItem => cartItem === item.id).length}
                                    </span>
                                </td>
                                <td className="text-center">
                                    <Button 
                                        variant="danger" 
                                        size="sm"
                                        onClick={() => handleRemoveFromCart(item.id)}
                                    >
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
}

export default Cart;