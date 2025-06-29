import { useMockupApi } from '../contexts/MockupApiContext';
import { useEffect, useState } from 'react';
import { Button, Table, Container, Row, Col, Form } from 'react-bootstrap';
import Loading from '../components/Loading';
import Swal from 'sweetalert2';

function Admin() {
    const { products, getProducts, addProduct, updateProduct, deleteProduct } = useMockupApi();
    const [loading, setLoading] = useState(false);
    //const [newProduct, setNewProduct] = useState({id: 0, title: '', description: '', category: '', price: 0, image: '' });
    const [isNewProduct, setIsNewProduct] = useState(false);
    const [isEditProduct, setIsEditProduct] = useState(false);
    const [id, setId] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');

    useEffect(() => {
        getProducts();
    }, []);

    const handleAddProduct = () => {
        setLoading(true);
        setTimeout(() => {
            setIsNewProduct(true);
            setIsEditProduct(false);
            setTitle('');
            setDescription('');
            setCategory('');
            setPrice(0);
            setImage('');
            setLoading(false);
        }, 2000);        
    }

    const handleCancelProduct = () => {
        setIsNewProduct(false);
        setIsEditProduct(false);
        setTitle('');
        setDescription('');
        setCategory('');
        setPrice(0);
        setImage('');
    }

    const handleSaveProduct = () => {
        if (!validateForm()) {
            Swal.fire({
                title: 'Error',
                text: 'The data entered is not valid',
                icon: 'error'
            });
            return;
        }

        setLoading(true);

        const productData = {
            id: isEditProduct ? id : null,
            title: title,
            description: description,
            category: category,
            price: parseFloat(price),
            image: image
        };
        
        setTimeout(() => {
            let result = false;

            if(isNewProduct){
              result = addProduct(productData);
            }
            
            if(isEditProduct){
              result = updateProduct(productData);
            }

            setLoading(false);

            if(result){
                Swal.fire({
                    title: 'Success',
                    text: 'Product saved successfully',
                    icon: 'success'
                });
                setIsNewProduct(false);
                setIsEditProduct(false);                
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Error saving product',
                    icon: 'error'
                });
            }
        }, 2000);
    }

    const handleUpdateProduct = (product) => {
        setLoading(true);
        setTimeout(() => {
            setIsNewProduct(false);
            setIsEditProduct(true);
            setId(product.id);
            setTitle(product.title);
            setDescription(product.description);
            setCategory(product.category);
            setPrice(product.price);
            setImage(product.image);
            setLoading(false);
        }, 2000);  
    }

    const handleDeleteProduct = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                setTimeout(() => {
                    deleteProduct(id);
                    setLoading(false);
                }, 3000);
            }
        });
    }

    const createImage = () => {
        const inputImage = `https://picsum.photos/400/400?random=${Math.floor(Math.random() * 100)}`;
        setImage(inputImage);
    }

    const validateForm = () => {
        if (title.trim() === '' || description.trim() === '' || category.trim() === '' || price <= 0 || image === '') {
            return false;
        }
        return true;
    }

    return (
        <>
            {loading ? <Loading /> : (  
            <Container>
                {(isNewProduct || isEditProduct) && (
                    <>
                        <Row className='d-flex justify-content-center'>
                            <Col col={12} md={6}>
                                <Form>
                                    <Form.Group className='mb-2'>
                                        <Form.Label className='text-black'>Title</Form.Label>
                                        <Form.Control type="text" placeholder="Enter title" required value={title} onChange={(e) => setTitle(e.target.value)} minLength={3} maxLength={100} />
                                    </Form.Group>
                                    <Form.Group className='mb-2'>
                                        <Form.Label className='text-black'>Description</Form.Label>
                                        <Form.Control as="textarea" rows={3} placeholder="Enter description" required value={description} onChange={(e) => setDescription(e.target.value)} minLength={10} maxLength={200} />
                                    </Form.Group>
                                    <Form.Group className='mb-2'>
                                    <Form.Label className='text-black'>Category</Form.Label>
                                    <Form.Select required value={category} onChange={(e) => setCategory(e.target.value)}>
                                        <option value="">Select a category</option>                                    
                                        <option value="jewelry">Jewelry</option>
                                        <option value="electronics">Electronics</option>
                                        <option value="men's clothing">Men's clothing</option>
                                        <option value="women's clothing">Women's clothing</option>
                                    </Form.Select>
                                    </Form.Group>
                                    <Form.Group className='mb-2'>
                                        <Form.Label className='text-black'>Price</Form.Label>
                                        <Form.Control type="number" placeholder="Enter price" required value={price} onChange={(e) => setPrice(e.target.value)} min={1} />
                                    </Form.Group>
                                    <Form.Group className='mb-2'>
                                        <Form.Label className='text-black d-block'>Image</Form.Label>
                                        <Form.Control id="inputImage" type="text" placeholder="Enter url image" required value={image} onChange={(e) => setImage(e.target.value)} className='d-inline-block' style={{width: '85%'}} />
                                            <span title='Generate image' className='text-black p-2 ml-2' style={{cursor: 'pointer'}} onClick={createImage}>
                                                <svg onClick={createImage} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-image text-black mx-1" viewBox="0 0 16 16">
                                                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                                                    <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z"/>
                                                </svg>
                                            </span>                                           
                                    </Form.Group>
                                    <Form.Group className='d-flex justify-content-end'>
                                        <Button variant="success" type="button" onClick={handleSaveProduct} className='mx-2'>Save</Button>
                                        <Button variant="secondary" onClick={handleCancelProduct}>Cancel</Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>                        
                    </>
                )}            
                {!isNewProduct && !isEditProduct && (
                    <>
                        <Row>
                            <Col className='d-flex justify-content-end'>
                                <button size='sm' className="btn btn-link text-black p-2 rounded-3 cursor-pointer" onClick={() => handleAddProduct()}>
                                    Add Product
                                </button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Table striped bordered hover className='w-100 mx-2'>
                                    <thead>
                                        <tr>
                                            <th className='text-center'>Id</th>
                                            <th className='text-center'>Title</th>
                                            <th className='text-center'>Description</th>
                                            <th className='text-center'>Category</th>
                                            <th className='text-center'>Price</th>
                                            <th className='text-center'>Image</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product) => (
                                            <tr key={product.id}>
                                                <td className='text-center' style={{fontSize: '0.8rem'}}>{product.id}</td>
                                                <td style={{fontSize: '0.8rem'}}>{product.title}</td>
                                                <td style={{fontSize: '0.8rem'}}>{product.description}</td>
                                                <td style={{fontSize: '0.8rem'}} className='text-capitalize'>{product.category}</td>
                                                <td className='text-center text-primary' style={{fontSize: '0.8rem'}}>${product.price}</td>
                                                <td className='text-center'>
                                                    <img src={product.image} alt={product.title} width={100} height={100} className='rounded' />
                                                </td>
                                                <td className='text-center' style={{verticalAlign: 'middle'}}>
                                                    <div onClick={() => handleUpdateProduct(product)} className='d-inline-block mx-2' title='Edit'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square text-muted" viewBox="0 0 16 16" style={{cursor: 'pointer'}}>
                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                                        </svg>
                                                    </div>
                                                    <div onClick={() => handleDeleteProduct(product.id)} className='d-inline-block mx-2' title='Delete'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash-fill text-muted" viewBox="0 0 16 16" style={{cursor: 'pointer'}}>
                                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                                        </svg>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </>
                )}
            </Container>    
            )}
        </>
    )
}

export default Admin;