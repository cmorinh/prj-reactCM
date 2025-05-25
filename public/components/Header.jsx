import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./Header.css";


function Header() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const isAuthorized = localStorage.getItem('auth') === 'true';

  const logOut = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <Navbar expand="md" sticky="top" className="bg-body-tertiary mb-4">
      <Container>
        <Navbar.Brand className="fs-1 fw-bold" as={Link} to={'/'}>SHOP STORE</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex align-items-md-center">  
            <Nav.Link as={Link} to="/">HOME</Nav.Link>          
            <Nav.Link as={Link} to={'/dress'}>DRESS</Nav.Link>
            <Nav.Link as={Link} to={'/jewelry'}>JEWELRY</Nav.Link>
            <Nav.Link as={Link} to={'/electronics'}>ELECTRONICS</Nav.Link>

            {/*Enlaces que solo se muestran si el usuario está autenticado*/}
            {isAuthorized && (
              <>
                <Nav.Link as={Link} to="/profile">Perfil</Nav.Link>
                <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            <span className="navbar-text">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"></path>
              </svg>
              <a href="#" className="text-decoration-underline mx-2" >
                  {`${items.length} items`}
              </a>            
            </span>
            <div className="vr d-none d-md-inline"></div>
            {!isAuthorized 
                ? (<Nav.Link as={Link} to="/login" className="text-decoration-underline">Login</Nav.Link>)
                : (<Button variant="outline-light" onClick={logOut} className="text-decoration-underline">Log out</Button>)
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;