import React from "react";
import { Link } from "react-router-dom";
// @ts-ignore
import * as authorImage from "../../images/mika.png";
import ROUTES from "../constantes/routes";

const HomePage = () => {
  return (
    <div className="d-flex justify-content-between">
      <div className="jumbotron">
        <h1 className="display-3">Bienvenue !</h1>
        <p className="lead">
          SymReact-Invoicer est une application web qui vous permettra de gérer
          vos clients ainsi que leurs factures.
        </p>
        <hr className="my-4" />
        <p>Pour commencer, vous pouvez déjà créer un compte.</p>
        <p className="lead">
          <Link className="btn btn-primary btn-lg" to={ROUTES.REGISTER}>
            C'est ici
          </Link>
        </p>
      </div>
      <div className="card ml-3" style={{ maxWidth: "20rem" }}>
        <div className="card-header">A propos</div>
        <div className="card-body">
          <h4 className="card-title">Mikaia Ralaivita</h4>
          <p className="card-text">
            Passioné d'informatique et développeur <strong>fullstack</strong>
          </p>
          <p className="card-text">
            <img
              className="justify-content-between d-flex"
              src={authorImage.default}
              style={{
                width: "50%",
                height: "auto",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              alt="Mikaia"
            ></img>
          </p>
          <p className="card-text">
            Cette application a été développé dans le cadre d'une formation sur
            <strong> symfony / reactjs / apiplatform</strong>;
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
