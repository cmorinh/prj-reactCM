import { Container, Table, Button } from 'react-bootstrap';
import { useCart } from "../contexts/CartContext";
import Swal from 'sweetalert2';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import Seo from "../components/Seo";

function Cart() {
    const { cart, content, removeFromCart, clearCart } = useCart();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); 

    const totalPrice = content.reduce((acc, item) => acc + item.price, 0);

    const handleRemoveFromCart = (id, origin) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this product!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                removeFromCart(id, origin);
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
            <Seo title="Store - Cart" />
            {loading 
                ? (
                    <>
                        <Loading />
                        {setTimeout(() => {
                            setLoading(false);
                        }, 2000)}
                    </>
                ) 
                : (
                    <Container className="py-4">
                        {content.length === 0 ? (
                            <div className="text-center text-black font-weight-bold">
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
                                                    {cart.filter(cartItem => cartItem.id === item.id).length}
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <div onClick={() => handleRemoveFromCart(item.id, item.origin)} title='Delete'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash-fill text-muted" viewBox="0 0 16 16" style={{cursor: 'pointer'}}>
                                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                                    </svg>
                                                </div>                                                
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