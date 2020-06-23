import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import firebase from "./utils/Firebase"
import "firebase/auth"
import { Button } from "semantic-ui-react";
import Auth from "./pages/Auth";

function App() {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  firebase.auth().onAuthStateChanged(currentUser => {

    if (!currentUser?.emailVerified) {
      firebase.auth().signOut();
      setUser(null);
    } else {
      setUser(currentUser);
    }

    setIsLoading(false);

  });

  if (isLoading) {
    return null;
  }

  //return (user ? <Auth /> : <UserLogged />);

  return (
    <>
      {!user ? <Auth /> : <UserLogged />}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </>
  );
}

const logout = () => {
  firebase.auth().signOut();
}

function UserLogged() {
  return (
    < div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      height: "100vh"
    }}
    >
      <h1>Usuario Logeado</h1>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  )
}

export default App;
