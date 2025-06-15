import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Shield, Ship, Wrench, Users } from "lucide-react";

const Menu = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Detecta se a tela é mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // Chamada inicial
    window.addEventListener("resize", handleResize); // Atualiza ao redimensionar
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Navbar className="mb-3" bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="https://logodownload.org/wp-content/uploads/2018/01/marinha-brasil-logo.png"
            alt="Logo"
            height="30"
            className="d-inline-block align-top me-2"
          />
          Frota Naval Remake
        </Navbar.Brand>

        {isMobile ? (
          <>
            {/* --- MODO MOBILE --- */}
            <Navbar.Toggle aria-controls="mobile-navbar" />
            <Navbar.Collapse id="mobile-navbar">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  <Shield size={16} className="me-1" /> Lista Geral
                </Nav.Link>
                <Nav.Link as={Link} to="/solicita">
                  <Wrench size={16} className="me-1" /> Solicitação
                </Nav.Link>         
                <NavDropdown.Header>📌 Informações</NavDropdown.Header>
                <NavDropdown.Divider className="divider"/>
                <Nav.Link as={Link} to="/armamento">
                  <Shield size={14} className="me-1" /> Armamentos
                </Nav.Link>
                <Nav.Link as={Link} to="/infor">
                  <Ship size={14} className="me-1" /> Navios
                </Nav.Link>             
                <NavDropdown.Header>🛠️ Serviços</NavDropdown.Header>
                <NavDropdown.Divider />
                <Nav.Link as={Link} to="/manutencao">
                  <Wrench size={14} className="me-1" /> Manutenção
                </Nav.Link>
                <Nav.Link as={Link} to="/armamentos">🛡️ Equipamentos Bélicos</Nav.Link>
                <Nav.Link as={Link} to="/construcao">🏗️ Construção</Nav.Link>
                <Nav.Link as={Link} to="/missao">🚀 Missão</Nav.Link>
                <Nav.Link as={Link} to="/treinamento">🎯 Treinamento</Nav.Link>
                <Nav.Link as={Link} to="/servico">📋 Serviço</Nav.Link>
                <Nav.Link as={Link} to="/comandantes">
                  <Users size={14} className="me-1" /> Comandantes
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </>
        ) : (
          <>
            {/* --- MODO WEB --- */}
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                <Shield size={16} className="me-1" /> Lista Geral
              </Nav.Link>

              <Nav.Link as={Link} to="/solicita">
                <Wrench size={16} className="me-1" /> Solicitação de Serviços
              </Nav.Link>

              <NavDropdown title="Outros" id="web-dropdown">
                <NavDropdown.Header>📌 Informações</NavDropdown.Header>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/armamento">
                  <Shield size={14} className="me-1" /> Armamentos
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/infor">
                  <Ship size={14} className="me-1" /> Navios
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Header>🛠️ Serviços</NavDropdown.Header>
                <NavDropdown.Item as={Link} to="/armamentos">
                  <Shield size={14} className="me-1" /> Armamentos
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/manutencao">
                  <Wrench size={14} className="me-1" /> Manutenção
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/armamentos">🛡️ Equipamentos Bélicos</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/construcao">🏗️ Construção</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/missao">🚀 Missão</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/treinamento">🎯 Treinamento</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/servico">📋 Serviço</NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Header>⚓ Administração</NavDropdown.Header>
                <NavDropdown.Item as={Link} to="/comandantes">
                  <Users size={14} className="me-1" /> Comandantes
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default Menu;
