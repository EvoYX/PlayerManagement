import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg";
import "./App.css";
import { Container, Navbar, Row, Col, NavbarBrand } from "react-bootstrap";
import { Button } from "react-bootstrap";
import AddPlayer from "./components/AddPlayer";
import PlayerList from "./components/PlayerList";

function App() {
  const [playerId, setPlayerId] = useState("");
  let [modal, setAddModal] = useState(false);
  const getPlayerIdHandler = (id) => {
    setPlayerId(id);
  };

  const popUpModal = () => {
    setAddModal(!modal);
  };
  return (
    <>
      <Navbar bg="light" className="header">
        <Container fluid>
          <NavbarBrand variant="dark"> Player Management</NavbarBrand>
          <Button variant="outline-success" onClick={() => popUpModal()}>
            Add Player
          </Button>
        </Container>
      </Navbar>

      {modal && (
        <AddPlayer
          id={playerId}
          setPlayerId={setPlayerId}
          setPopup={setAddModal}
        ></AddPlayer>
      )}
      <div className="divSpacing">
        <PlayerList
          getPlayerId={getPlayerIdHandler}
          setModal={setAddModal}
        ></PlayerList>
      </div>
    </>
  );
}

export default App;
