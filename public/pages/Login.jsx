import { useNavigate } from "react-router-dom";
import { useState, useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Col } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

function Login() {
    const { login } = useAuth();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setMessage('');

        if(login(email, password)) {
            navigate('/');
        } else {
            setMessage('The email address or password entered is not validated.');
        }
    };

    return (
        <Container className="d-flex justify-content-center">
            <Col className="col-10 col-md-4">
                <Form onSubmit={(e) => handleLogin(e)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-black fw-bold">Email</Form.Label>
                        <Form.Control type="email" className="text-center" placeholder="address@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <Form.Text className="text-black" style={{fontSize:"0.6rem"}}>
                            We'll never share your email with anyone else
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="text-black fw-bold">Password</Form.Label>
                        <Form.Control type="password" className="text-center" placeholder="8 digits" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>
                    <div className="text-danger fw-bold mb-3 text-center" style={{fontSize:"0.8rem"}}>{message}</div>
                    <Form.Group className="mb-3 d-flex justify-content-center" controlId="formBasicPassword">
                        <Button variant="success" type="submit" className="w-50" >
                            Enter
                        </Button>
                    </Form.Group>                    
                </Form>
            </Col>
        </Container>
    )
}

export default Login;