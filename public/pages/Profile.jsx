import Image from 'react-bootstrap/Image';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import Swal from 'sweetalert2';

function Profile() {
    const {user, token} = useAuth();

    const randomNumber = () => {
        return Math.floor(Math.random() * 100);
    }; 

    const handleEditPassword = () => {
        Swal.fire({
            title: 'New Password',
            input: 'password',
            confirmButtonText: 'Save',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Success',
                    text: 'Your password has been updated :)',
                    icon: 'success',
                });
            } else {
                Swal.fire({
                    title: 'Canceled',
                    text: 'Your password has not been updated :(',
                    icon: 'error',
                });
            }
        });
    }

    return (
        <Container>
            <Row>
                <Col xs={12} md={4} className="text-center mb-3">
                    <Image src={`https://picsum.photos/200/200?random=${randomNumber()}`} roundedCircle />
                </Col>
                <Col xs={12} md={5} className="text-black font-weight-bold mb-3">
                    <h1>Information</h1>                    
                    <p>Email: {user}</p>
                    <p>Token: {token}</p>
                    <p>Rol: Admin</p>
                    <p>
                        <Button variant="primary" onClick={() => handleEditPassword()}>Edit Password</Button>
                    </p>
                </Col>
            </Row>
        </Container>
    )
}

export default Profile;