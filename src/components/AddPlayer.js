import React from "react";
import { useState, useEffect } from "react";
import {
  Form,
  Alert,
  InputGroup,
  FloatingLabel,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import PlayerDataService from "../services/player.services";
import "bootstrap/dist/css/bootstrap.min.css";
import "alertifyjs/build/css/alertify.css";
import alertify from "alertifyjs";

const AddPlayer = (props) => {
  let [name, setName] = useState("");
  let [age, setAge] = useState(0);
  let [contactNo, setContactNo] = useState(0);
  let [dob, setDOB] = useState("");
  let [teamName, setTeamName] = useState("");
  let [address, setAddress] = useState("");
  let [bootSize, setBootSize] = useState("");
  let [jerseySize, setJerseySize] = useState("");
  let [shortSize, setShortSize] = useState("");
  let [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (name === "" || teamName === "" || dob === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newPlayer = {
      name,
      contactNo,
      dob,
      age,
      address,
      teamName,
      jerseySize,
      shortSize,
      bootSize,
    };

    await PlayerDataService.addPlayer(newPlayer);
    try {
      alertify.notify(
        "Player" + name + " has been added successfully",
        "success",
        2,
        function () {
          props.setPopup();
          console.log("dismissed");
        }
      );
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setName("");
    setContactNo(0);
    setAge(0);
    setDOB("");
    setAddress("");
    setContactNo(0);
    setTeamName("");
    setJerseySize("");
    setBootSize("");
    setShortSize("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await PlayerDataService.getPlayer(props.id);
      console.log("the record is :", docSnap.data());
      setName(docSnap.data().name);
      setAge(docSnap.data().age);
      setDOB(docSnap.data().dob);
      setAddress(docSnap.data().address);
      setContactNo(docSnap.data().contactNo);

      setTeamName(docSnap.data().teamName);
      setJerseySize(docSnap.data().jerseySize);
      setBootSize(docSnap.data().bootSize);
      setShortSize(docSnap.data().shortSize);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", props.id);
    if (props.id !== undefined && props.id !== "") {
      editHandler();
    }
  }, [props.id]);

  return (
    <>
      <div className="p-4 box">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}
        <div>Adding Players</div>
        <form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formPlayerName">
            <FloatingLabel
              controlId="floatingInput"
              label="Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Player Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingInput"
              label="ContactNo"
              className="mb-3"
            >
              <Form.Control
                type="number"
                placeholder="ContactNo"
                value={contactNo === 0 ? "" : parseInt(contactNo)}
                onChange={(e) => setContactNo(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Date-Of-Birth"
              className="mb-3"
            >
              <Form.Control
                type="date"
                placeholder="DOB"
                value={dob}
                onChange={(e) => setDOB(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingInput"
              label="Age"
              className="mb-3"
            >
              <Form.Control
                type="number"
                placeholder="Team"
                value={age === 0 ? "" : age}
                onChange={(e) => setAge(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Address"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingInput"
              label="Team Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Team"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingSelect" label="Jersey Size">
              <Form.Select
                aria-label="jersey selection"
                value={jerseySize}
                onChange={(e) => setJerseySize(e.target.value)}
              >
                <option>Select Jersey Size</option>
                <option value="1">S</option>
                <option value="2">M</option>
                <option value="3">L</option>
              </Form.Select>
            </FloatingLabel>

            <FloatingLabel controlId="floatingSelect" label="Shorts Size">
              <Form.Select
                aria-label="short selection"
                value={shortSize}
                onChange={(e) => setShortSize(e.target.value)}
              >
                <option>Select Shorts Size</option>
                <option value="1">S</option>
                <option value="2">M</option>
                <option value="3">L</option>
              </Form.Select>
            </FloatingLabel>

            <FloatingLabel controlId="floatingSelect" label="Boots Size">
              <Form.Select
                aria-label="boots selection"
                value={bootSize}
                onChange={(e) => setBootSize(e.target.value)}
              >
                <option>Select Boots Size</option>
                <option value="1">S</option>
                <option value="2">M</option>
                <option value="3">L</option>
              </Form.Select>
            </FloatingLabel>
          </Form.Group>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
};

export default AddPlayer;
