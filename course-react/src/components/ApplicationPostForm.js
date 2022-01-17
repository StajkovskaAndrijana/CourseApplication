import "../css/index.css";
import React, { useState } from "react";
import Constants from "../utilities/Constants";
import Courses from "../courses.json";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

export default function ApplicationPostForm() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const [participantFields, setParticipantFields] = useState([
    {
      name: "",
      phoneNumber: "",
      email: "",
    },
  ]);

  const initialFormData = Object.freeze({
    courseID: 1,
    courseDate: "2017-01-01",
    companyName: "",
    companyPhoneNumber: "",
    companyEmail: "",
    participants: "",
  });

  const [formData, setFormData] = useState(initialFormData);

  const handleParticipantInput = (index, e) => {
    const values = [...participantFields];
    values[index][e.target.name] = e.target.value;
    setParticipantFields(values);
  };

  const addNewParticipant = () => {
    setParticipantFields([
      ...participantFields,
      { name: "", phoneNumber: "", email: "" },
    ]);
  };

  const removeParticipant = (index) => {
    const values = [...participantFields];
    values.splice(index, 1);
    setParticipantFields(values);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const applicationToCreate = {
      id: 0,
      courseID: formData.courseID,
      courseDate: formData.courseDate,
      companyName: formData.companyName,
      companyPhoneNumber: formData.companyPhoneNumber,
      companyEmail: formData.companyEmail,
      participants: participantFields,
    };

    const url = Constants.API_URL_POST_APPLICATION;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationToCreate),
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
        setShow(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCoursesDate = () => {
    const course = Courses.filter(({ id }) => id == formData.courseID)[0];
    return (
      <div className="col-5 mt-3 form-group">
        <label className="form-label">DATE*</label>
        <select
          name="courseDate"
          value={formData.courseDate}
          onChange={handleChange}
          className="form-select"
        >
          {course.dates.map((date, index) => (
            <option key={index} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row mt-5 pb-4 justify-content-center">
        <h3 className="fw-bolder col-10">Course</h3>
        <div className="col-5 mt-3 form-group">
          <label className="form-label">NAME*</label>
          <select
            name="courseID"
            value={formData.courseID}
            className="form-select"
            onChange={handleChange}
          >
            {Courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
        {getCoursesDate()}
      </div>
      <div id="company" className="row pb-4 pt-4 justify-content-center">
        <h3 className="fw-bolder col-10">Company</h3>
        <div className="col-10 mt-3 form-group">
          <label className="form-label">NAME*</label>
          <input
            required
            value={formData.companyName}
            name="companyName"
            type="text"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="col-5 mt-3 form-group">
          <label className="form-label">PHONE*</label>
          <input
            required
            value={formData.companyPhoneNumber}
            name="companyPhoneNumber"
            type="number"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="col-5 mt-3 form-group">
          <label className="form-label">EMAIL*</label>
          <input
            required
            value={formData.companyEmail}
            name="companyEmail"
            type="email"
            className="form-control"
            onChange={handleChange}
          />
        </div>
      </div>
      <div id="participants" className="row pb-4 pt-4 justify-content-center">
        <h3 className="fw-bolder col-10">Participants</h3>
        {participantFields.map((participant, index) => (
          <React.Fragment key={index}>
            <h4 className="fw-bold col-10 pt-4">Participant #{index + 1}</h4>
            <div className="col-10 mt-3 form-group">
              <label className="form-label">NAME*</label>
              <input
                required
                value={participant.name}
                name="name"
                type="text"
                className="form-control"
                onChange={(e) => handleParticipantInput(index, e)}
              />
            </div>
            <div className="col-5 mt-3 form-group">
              <label className="form-label">PHONE*</label>
              <input
                required
                value={participant.phoneNumber}
                name="phoneNumber"
                type="number"
                className="form-control"
                onChange={(e) => handleParticipantInput(index, e)}
              />
            </div>
            <div className="col-5 mt-3 form-group">
              <label className="form-label">EMAIL*</label>
              <input
                required
                value={participant.email}
                name="email"
                type="email"
                className="form-control"
                onChange={(e) => handleParticipantInput(index, e)}
              />
            </div>
            <div className="col-10 mt-4">
              <button
                onClick={() => addNewParticipant()}
                className="btn btn-primary"
              >
                Add a participant
              </button>
              {index === 1 && (
                <button
                  onClick={() => removeParticipant(index)}
                  className="btn btn-danger ms-4"
                >
                  Remove the participant
                </button>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="row pb-4 pt-4 justify-content-center">
        <div className="col-10 mt-3 d-grid gap-2">
          <button className="btn btn-primary">Submit application</button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>Your application was successfully submited.</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </form>
  );
}
