import React from "react";
import { FaGithub, FaTrello, FaInstagram } from "react-icons/fa";
import "../components/rodape.css";

const Rodape = () => {
    return (
      <footer className="rodape">
        <h5>Projeto™ 2025</h5>
        <div className="logo-container">
          <img
            src="https://logodownload.org/wp-content/uploads/2018/01/marinha-brasil-logo.png"
            alt="Frota Naval Remake Logo"
          />
        </div>
        <div className="social-icons">
          <a href="https://github.com/maycon363" target="_blank" rel="noopener noreferrer">
            <FaGithub size={28} />
          </a>
          <a href="https://trello.com/b/3bMxVzgE/projeto-navioremake" target="_blank" rel="noopener noreferrer">
            <FaTrello size={28} />
          </a>
          <a href="https://www.instagram.com/mmayconb_p/" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={28} />
          </a>
        </div>
  
        {/* Linha divisória */}
        <div className="rodape-divider"></div>
  
        {/* Copyright */}
        <p className="copyright">© 2025 Frota Naval Remake™</p>
      </footer>
    );
  };
  
  export default Rodape;