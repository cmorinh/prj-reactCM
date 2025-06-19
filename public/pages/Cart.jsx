import { Container, Table, Button } from 'react-bootstrap';
import { useCart } from "../contexts/CartContext";
import Swal from 'sweetalert2';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';

function Cart() {
    const { cart, content, removeFromCart, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const totalPrice = content.reduce((acc, item) => acc + item.price, 0);

    const handleRemoveFromCart = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this product!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                removeFromCart(id);
            }
        });
    };

    const handleCheckout = () => {
        Swal.fire({
            title: 'Checkout',
            text: 'Are you sure you want to checkout?',
            icon: 'warning',
        }).then((result) => {            
            if (result.isConfirmed) {   
                setLoading(true);
                clearCart();

                setTimeout(() => {
                    Swal.fire({
                        title: 'Checkout',
                        text: 'Thank you for your purchase!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    }).then(() => {                        
                        navigate('/');
                    });
                }, 4000);                
            }
        });
    };   

    return (
        <>
            {loading 
                ? <Loading /> 
                : (
                    <Container className="py-4">
                        {content.length === 0 ? (
                            <div className="text-center text-white font-weight-bold">
                                <h3>Your cart is empty</h3>
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
                                            <td className="text-center">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.title}
                                                    style={{ 
                                                        width: '20vw',
                                                        maxWidth: '150px',
                                                        height: 'auto',
                                                        objectFit: 'contain'
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <div>
                                                    <p className="text-muted mb-1 fs-6">ID: {item.id}</p>
                                                    <h5 className="mb-2 fs-6">{item.title}</h5>                                        
                                                    <p className="text-primary fw-bold mb-0 fs-6">Price: ${item.price}</p>
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
                                <tfoot>
                                    <tr>
                                        <td colSpan="3" className="text-end align-middle">
                                            <h5 className="fw-bold">Total: ${totalPrice}</h5>
                                        </td>
                                        <td colSpan="1" className="text-center">
                                            <Button variant="primary" size="sm" onClick={() => handleCheckout()}>Checkout</Button>
                                        </td>
                                    </tr>
                                </tfoot>
                            </Table>
                        )}
                    </Container>
            )}
        </>
        
    );
}

export default Cart;