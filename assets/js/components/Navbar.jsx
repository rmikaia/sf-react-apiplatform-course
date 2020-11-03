import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../contexts/AuthContext";
import api from "../services/api";

const Navbar = ({ history }) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    api.logout();
    setIsAuthenticated(false);
    toast.success("Vous êtes déconnecté, à bientôt!");
    history.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <NavLink className="navbar-brand" to="/">
        SymReact
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarColor01">
        {isAuthenticated && (
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/customers">
                Clients
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/invoices">
                Factures
              </NavLink>
            </li>
          </ul>
        )}
        <ul className="navbar-nav ml-auto">
          {(!isAuthenticated && (
            <>
              <li className="nat-item">
                <NavLink className="nav-link" to="/register">
                  Inscription
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="btn btn-success" to="/login">
                  Connexion
                </NavLink>
              </li>
            </>
          )) || (
            <li className="nav-item">
              <button onClick={handleLogout} className="btn btn-danger">
                Déconnexion
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
