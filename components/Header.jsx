import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import "./Header.css";
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

function Header() {
  const {logout, isAuthenticated} = useAuth();
  const {countCart} = useCart();

  return (
    <Navbar expand="md" sticky="top" className="bg-body-tertiary mb-4">
      <Container>
        <Navbar.Brand className="fs-1 fw-bold" as={Link} to={'/'}>STORE</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex align-items-md-center">  
            <Nav.Link as={Link} to="/">HOME</Nav.Link>          
            <Nav.Link as={Link} to={'/dress'}>DRESS</Nav.Link>
            <Nav.Link as={Link} to={'/jewelry'}>JEWELRY</Nav.Link>
            <Nav.Link as={Link} to={'/electronics'}>ELECTRONICS</Nav.Link>
          </Nav>
          <Nav>
              <Nav.Link as={Link} to="/cart">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"></path>
                </svg> {countCart()} Cart</Nav.Link>
            <div className="vr d-none d-md-inline"></div>
            {!isAuthenticated 
                ? (<Nav.Link as={Link} to="/login">Login</Nav.Link>)
                : (<Nav.Link as={Link} to="#" onClick={logout}>Log out</Nav.Link>)
            }
            {/*Enlaces que solo se muestran si el usuario está autenticado*/}
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/profile">Perfil</Nav.Link>
                <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;