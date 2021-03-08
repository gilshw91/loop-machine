import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import {
  CaretRight,
  Stop,
  Trash2,
  RecordCircle,
  PauseCircle,
} from "react-bootstrap-icons";

const Controller = ({
  onPlayClick,
  onStopClick,
  onResetClick,
  onRecordClick,
  isRecording,
}) => {
  return (
    <Row>
      <Col sm={10}>
        <Button
          title="Play"
          variant="success"
          size="lg"
          style={{ margin: "10px" }}
          onClick={onPlayClick}
        >
          Play
          <CaretRight />
        </Button>
        <Button
          title="Stop"
          variant="danger"
          size="lg"
          style={{ margin: "10px" }}
          onClick={onStopClick}
        >
          Stop
          <Stop />
        </Button>
        <Button
          title="Reset"
          variant="warning"
          size="lg"
          style={{ margin: "10px" }}
          onClick={onResetClick}
        >
          Reset
          <Trash2 />
        </Button>
      </Col>
      <Col sm={2}>
        {!isRecording ? (
          <Button
            title="Record"
            variant="outline-danger"
            size="lg"
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
            }}
            onClick={onRecordClick}
          >
            <RecordCircle />
          </Button>
        ) : (
          <Button
            title="Stop recording"
            variant="outline-danger"
            size="lg"
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
            }}
            onClick={onRecordClick}
          >
            <PauseCircle />
          </Button>
        )}
      </Col>
    </Row>
  );
};

Controller.propTypes = {
  onPlayClick: PropTypes.func.isRequired,
  onStopClick: PropTypes.func.isRequired,
  onResetClick: PropTypes.func.isRequired,
  onRecordClick: PropTypes.func.isRequired,
  isRecording: PropTypes.bool.isRequired,
};

export default Controller;
