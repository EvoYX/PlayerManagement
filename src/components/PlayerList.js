import React from "react";
import { useEffect, useState } from "react";
import {
  Form,
  FloatingLabel,
  Table,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import PlayersDataService from "../services/player.services";
import "bootstrap/dist/css/bootstrap.min.css";
import alertify from "alertifyjs";

const PlayerList = (props) => {
  let [players, setPlayers] = useState([]);
  let [search, setSearch] = useState(false);
  let [searchPlayers, setSearchPlayers] = useState([]);

  let [name, setName] = useState("");
  useEffect(() => {
    getPlayers();
  }, []);

  const getPlayers = async () => {
    setSearch(false);
    setName("");
    const data = await PlayersDataService.getAllPlayers();
    setPlayers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    alertify.notify(
      "Data is updated to the latest version",
      "success",
      2,
      function () {
        props.setPopup();
        console.log("dismissed");
      }
    );
  };

  const deleteHandler = async (id) => {
    console.log("delete id is ", id);
    await PlayersDataService.deletePlayer(id);
    getPlayers();
  };

  const searchPlayer = () => {
    setSearchPlayers(
      players.filter((obj) => {
        return obj.name === name;
      })
    );
    if (searchPlayers.length === 0) {
      setSearch(false);
      alertify.notify("Player not found", "success", 2, function () {
        console.log("");
      });
    } else {
      setSearch(true);
    }
  };
  return (
    <>
      <Container>
        <Row className="justify-content-md-center my-auto">
          <Col xs lg="5">
            <FloatingLabel
              controlId="floatingInput"
              label="Search Player Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Player Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FloatingLabel>
          </Col>
          <Col xs lg="1">
            <Button variant="dark" size="lg" onClick={() => searchPlayer()}>
              Search
            </Button>
          </Col>
          <Col xs lg="2">
            <Button
              className="btn btn-outline-dark btn-light"
              size="lg"
              onClick={() => getPlayers()}
            >
              Refresh List
            </Button>
          </Col>
        </Row>
      </Container>
      <Container>
        <div></div>
      </Container>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>ContactNo</th>
            <th>Date Of Birth</th>
            <th>Age</th>
            <th>Address</th>
            <th>Team Name</th>
            <th>Jersey Size</th>
            <th>Short Size</th>
            <th>Boot Size</th>
          </tr>
        </thead>
        <tbody>
          {search
            ? searchPlayers.map((doc, index) => {
                return (
                  <tr key={doc.id}>
                    <td>{index + 1}</td>
                    <td>{doc.name}</td>
                    <td>{doc.contactNo}</td>
                    <td>{doc.dob}</td>
                    <td>{doc.age}</td>
                    <td>{doc.address}</td>
                    <td>{doc.teamName}</td>
                    <td>{doc.jerseySize}</td>
                    <td>{doc.shortSize}</td>
                    <td>{doc.bootSize}</td>

                    <td>
                      <Button
                        variant="secondary"
                        className="edit"
                        onClick={(e) => props.getPlayerId(doc.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        className="delete"
                        onClick={(e) => deleteHandler(doc.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })
            : players.map((doc, index) => {
                return (
                  <tr key={doc.id}>
                    <td>{index + 1}</td>
                    <td>{doc.name}</td>
                    <td>{doc.contactNo}</td>
                    <td>{doc.dob}</td>
                    <td>{doc.age}</td>
                    <td>{doc.address}</td>
                    <td>{doc.teamName}</td>
                    <td>{doc.jerseySize}</td>
                    <td>{doc.shortSize}</td>
                    <td>{doc.bootSize}</td>

                    <td>
                      <Button
                        variant="secondary"
                        className="edit"
                        onClick={(e) => props.getPlayerId(doc.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        className="delete"
                        onClick={(e) => deleteHandler(doc.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </Table>
    </>
  );
};

export default PlayerList;
