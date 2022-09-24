import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      {store.token && store.token != "" && store.token != undefined
        ? "You are logged in with this token: " + store.token
        : "You are not logged in"}
    </div>
  );
};
