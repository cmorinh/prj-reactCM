import { useNavigate } from "react-router-dom";
import { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Col } from "react-bootstrap";

function Login() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const isEmailValid = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const isPasswordValid = (password) => {
        return password === password;
    };

    const login = (e) => {
        e.preventDefault();
        setMessage('');

        if(!isEmailValid(email)) {
            setMessage('The email address entered is not validated.');
            return;
        }

        if(!isPasswordValid) {
            setMessage('The password entered is not validated');
            return;  
        }

        localStorage.setItem('auth','true');
        navigate('/');
    }

    return (
        <Container className="d-flex justify-content-center">
            <Col className="col-10 col-md-4">
                <Form onSubmit={login}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-white">Enter Email</Form.Label>
                        <Form.Control type="email" className="text-center" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <Form.Text className="text-white" style={{fontSize:"0.6rem"}}>
                            We'll never share your email with anyone else
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="text-white">Enter Password</Form.Label>
                        <Form.Control type="password" className="text-center" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>
                    <div className="text-danger fw-bold mb-3 text-center" style={{fontSize:"0.8rem"}}>{message}</div>
                    <Form.Group className="mb-3 d-flex justify-content-center" controlId="formBasicPassword">
                        <Button variant="success" type="submit">
                            Enter
                        </Button>
                    </Form.Group>                    
                </Form>
            </Col>
        </Container>
    )
}

export default Login;