import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { MusicNoteBeamed } from "react-bootstrap-icons";

const Pad = ({ object, onPadClicked }) => {
  return (
    <Button
      className={`${object.clicked === true ? "btn-primary" : "btn-secondary"}`}
      size="lg"
      value={object.name}
      style={{
        width: 100,
        height: 100,
        borderRadius: 50,
        margin: "10px",
      }}
      onClick={(event) => onPadClicked(event)}
    >
      {object.name}
      <br />
      <MusicNoteBeamed />
    </Button>
  );
};

Pad.propTypes = {
  object: PropTypes.object.isRequired,
  onPadClicked: PropTypes.func.isRequired,
};

export default Pad;
