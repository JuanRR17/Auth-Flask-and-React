import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Private = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (store.token == undefined) navigate("/login");
    // if (store.data == null) actions.getData();
  }, [store.token, store.data]);
  console.log("token in private", store.token);
  console.log("data", store.data);

  return (
    <div className="text-center mt-5">
      {store.data ? (
        <div>
          <h1>Your Data:</h1>
          <div>
            <div>email: {store.data.email}</div>
            <div>id: {store.data.id}</div>
          </div>
        </div>
      ) : (
        <div>Loading your data:</div>
      )}
    </div>
  );
};
