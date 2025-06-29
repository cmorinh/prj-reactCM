import { useEffect, useState } from "react";
import { Container,Row,Col,Card, Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import Swal from 'sweetalert2';
import Loading from './Loading';
import { useFakeStoreApi } from "../contexts/FakeStoreApiContext";
import { useMockupApi } from "../contexts/MockupApiContext";

function Detail() {
    const { getFakeProduct } = useFakeStoreApi();
    const { getProduct } = useMockupApi();
    const { id, origin } = useParams();
    const { addToCart } = useCart(); 
    const [ content, setContent ] = useState({});
    const [ loading, setLoading ] = useState(true);
    
    const handleAddToCart = (id, origin) => {
        addToCart(id, origin);
        btnDisable();
        Swal.fire({
            title: 'Success',
            text: 'Your product has been added to the cart :)',
            icon: 'success',
        });
    };

    const btnDisable = () => {
        const button = document.getElementById('btn-card');
        button.classList.add('d-none');
    }

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            let content = null;

            if(origin === 'oulet'){
                content = await getProduct(id);
                setContent(content);
            } else {
                content = await getFakeProduct(id);
                setContent(content);
            }                 
            setLoading(false);
        };

        fetchProduct();
    }, [id, origin]);

    return (
        <>
            {loading ? <Loading /> : (
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
                                               Price: ${content.price}
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
                                               onClick={() => handleAddToCart(content.id, content.origin)}
                                           >
                                               Add to Cart
                                           </Button>
                                       </div>
                                   </Card.Body>
                               </Col>
                           </Row>
                       </Card>
                   </Container> 
            )}
        </>
    )
}

export default Detail;