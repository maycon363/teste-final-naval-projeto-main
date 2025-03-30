import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Shield, Ship, Wrench, Users } from "lucide-react";
import { Link } from "react-router-dom";
import "./menu.css"; 

const Menu = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-3 px-3 menu">
      <Container fluid> 
        <Navbar.Brand as={Link} to="/" className="menu-logo">
          <img
            src="https://logodownload.org/wp-content/uploads/2018/01/marinha-brasil-logo.png"
            alt="Logo"
            className="logo-img"
          />
          Frota Naval Remake
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav" className="d-flex justify-content-end"> 
          <Nav className="me-auto menu-icons">
            <Nav.Link as={Link} to="/" className="menu-item">
              <Shield size={20} className="icon" />
              Lista Geral
            </Nav.Link>
            <Nav.Link as={Link} to="/solicita" className="menu-item">
              <Wrench size={20} className="icon" />
              Solicitação de Serviços
            </Nav.Link>

            <NavDropdown title="Outros" id="basic-nav-dropdown" className="menu-dropdown">
              <NavDropdown.Header className="menu-dropdown-header">📌 Informações</NavDropdown.Header>
              <NavDropdown.Divider className="divider" />
              <NavDropdown.Item as={Link} to="/armamento" className="menu-item">
                <Shield size={16} className="icon" />
                Armamentos
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/infor" className="menu-item">
                <Ship size={16} className="icon" />
                Navios
              </NavDropdown.Item>
              <NavDropdown.Divider className="divider"/>
              <NavDropdown.Header className="menu-dropdown-header">🛠️ Serviços</NavDropdown.Header>
              <NavDropdown.Item as={Link} to="/Armamentos">
                <Shield size={16} className="me-2" />
                Armamentos
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/manutencao" className="menu-item">
                <Wrench size={16} className="icon" />
                Manutenção
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/construcao" className="menu-item">
                🏗️ Construção
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/missao" className="menu-item">
                🚀 Missão
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/treinamento" className="menu-item">
                🎯 Treinamento
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/servico" className="menu-item">
                📋 Serviço
              </NavDropdown.Item>

              <NavDropdown.Divider className="divider"/>

              <NavDropdown.Header className="menu-dropdown-header">⚓ Administração</NavDropdown.Header>
              <NavDropdown.Item as={Link} to="/comandantes" className="menu-item">
                <Users size={16} className="icon" />
                Comandantes
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
