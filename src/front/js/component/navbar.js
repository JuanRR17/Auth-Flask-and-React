import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Home</span>
        </Link>
        {store.token && (
          <Link to="/private">
            <span className="navbar-brand mb-0 h1">Private</span>
          </Link>
        )}
        <div className="ml-auto">
          {!store.token ? (
            <div>
              <Link to="/signup" className="me-2">
                <button className="btn btn-primary">Sign Up</button>
              </Link>
              <Link to="/login">
                <button className="btn btn-success">Log in</button>
              </Link>
            </div>
          ) : (
            <button onClick={() => actions.logout()} className="btn btn-danger">
              Log out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
