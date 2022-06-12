import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg";
import "./App.css";
import { Container, Navbar, Row, Col, NavbarBrand } from "react-bootstrap";
import { Button } from "react-bootstrap";
import AddPlayer from "./components/AddPlayer";
import PlayerList from "./components/PlayerList";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../src/alertify/css/themes/bootstrap.css";
function App() {
  const [playerId, setPlayerId] = useState("");
  let [modal, setAddModal] = useState(false);
  const getPlayerIdHandler = (id) => {
    popUpModal();
    setPlayerId(id);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const popUpModal = () => {
    setShow(true);
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
      {["end"].map((placement, idx) => (
        <Offcanvas
          key={idx}
          placement={placement}
          name={placement}
          show={show}
          onHide={handleClose}
          className="offcanvas offcanvas-end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              {playerId !== undefined && playerId !== ""
                ? "Add Players"
                : "Player"}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <AddPlayer
              id={playerId}
              setPlayerId={setPlayerId}
              setPopup={setAddModal}
            ></AddPlayer>
          </Offcanvas.Body>
        </Offcanvas>
      ))}

      {/* {modal && (
        <div className="modalAdd">
          <div className="overlay" onClick={popUpModal}></div>
          <div className="spacing"></div>
          <div className="modal_content">
            <div className="modal_container">
              <button className="closeBtn" onClick={popUpModal}>
                X
              </button>
              <AddPlayer
                id={playerId}
                setPlayerId={setPlayerId}
                setPopup={setAddModal}
              ></AddPlayer>
            </div>
          </div>
        </div>
      )} */}

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
