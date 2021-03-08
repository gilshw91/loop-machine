import React, { useState, useEffect } from "react";
import Pad from "./Pad";
import Controller from "./Controller";
import globalAudio from "../globalAudio";

import { Col, Row } from "react-bootstrap";

const Pads = () => {
  const [sounds, setSounds] = useState([
    {
      name: "Bass",
      clicked: false,
      wait: false,
    },
    {
      name: "Tanggu",
      clicked: false,
      wait: false,
    },
    {
      name: "Electric",
      clicked: false,
      wait: false,
    },
    {
      name: "Future",
      clicked: false,
      wait: false,
    },
    {
      name: "Maze",
      clicked: false,
      wait: false,
    },
    {
      name: "Pas",
      clicked: false,
      wait: false,
    },
    {
      name: "Silent",
      clicked: false,
      wait: false,
    },
    {
      name: "Stompy",
      clicked: false,
      wait: false,
    },
    {
      name: "Stutter",
      clicked: false,
      wait: false,
    },
  ]);
  //contains the audio element of the first pad which has been clicked
  const [currentAudio, setCurrentAudio] = useState(
    globalAudio.audio(sounds[0].name)
  );
  // playing states is "true" if 'play' has clicked or "false" otherwise
  const [playing, setPlaying] = useState(false);
  // state that help to control the synce between loops
  const [delay, setDelay] = useState(true);
  // handle recording data
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    var audio;
    playing === true
      ? // if the button 'play' is clicked - play all pads which has been clicked at the beginning
        sounds.forEach((obj) => {
          // if the pad has been clicked before the 'play' button is on (no need to sync)
          if (obj.clicked === true && obj.wait === false) {
            try {
              audio = globalAudio.audio(obj.name);
              setCurrentAudio(audio);
              globalAudio.play(obj.name); // play this audio element
              currentAudio.addEventListener("ended", () => {
                handleLoop(audio);
                setDelay(true);
              });
            } catch (error) {
              console.error(error.message);
            }
          }
          // handling the delay if a pad was clicked after the 'play' was clicked
          if (obj.clicked === true && obj.wait === true) {
            if (delay === false) {
              setDelay(true);
              handleLoop(globalAudio.audio(obj.name));
              obj.wait = false;
            }
          }
        })
      : // if the button stop has clicked -> stop all pads
        sounds.forEach((obj) => {
          globalAudio.pause(obj.name);
          obj.wait = false;
        });

    return () => {
      currentAudio.removeEventListener("ended", () => handleLoop(audio));
    };
  }, [playing, sounds, delay, currentAudio]);

  // function that make loop for each pad which has been clicked
  const handleLoop = (audio) => {
    audio.currentTime = 0;
    setDelay(false);
    audio.play();
  };

  const handlePadClick = (e) => {
    const currentName = e.target.value; // the name of the audio which has clicked
    var newSoundsArray = [];
    sounds.forEach((obj) => {
      if (obj.name === currentName) {
        // will pause the track if its pad was clicked to false before the 'stop' btn has clicked
        if (obj.clicked === true) {
          globalAudio.pause(currentName);
          obj.wait = false;
        }
        if (playing === true) {
          obj.wait = true;
        }
        // updates new state of the "clicked" status
        newSoundsArray = [
          ...newSoundsArray,
          {
            name: currentName,
            clicked: !obj.clicked, // updating the status of the pad
            wait: playing ? true : false, // handeling the synced start
          },
        ];
      } else {
        newSoundsArray = [...newSoundsArray, obj];
      }
    });
    setSounds(newSoundsArray);
  };

  const handlePlayClicked = () => {
    console.log("Play clicked");
    setPlaying(true);
  };

  const handleStopClicked = () => {
    if (playing === true) {
      console.log("Stop clicked");
      setPlaying(false);
    }
  };

  const handleResetClicked = () => {
    console.log("Reset clicked");
    setPlaying(false);
    var newResetSoundArray = [];
    sounds.forEach((obj) => {
      newResetSoundArray = [
        ...newResetSoundArray,
        {
          name: obj.name,
          clicked: false,
          wait: false,
        },
      ];
    });
    setSounds(newResetSoundArray);
  };

  const handleRecordClicked = () => {
    console.log("Record clicked");
    setIsRecording((prevState) => !prevState);
  };

  return (
    <div>
      <Row className="controllers">
        <Controller
          onPlayClick={handlePlayClicked}
          onStopClick={handleStopClicked}
          onResetClick={handleResetClicked}
          onRecordClick={handleRecordClicked}
          isRecording={isRecording}
        />
      </Row>
      <Row>
        {sounds.slice(0, 3).map((obj) => {
          return (
            <Col key={obj.name}>
              <Pad className="pad" object={obj} onPadClicked={handlePadClick} />
            </Col>
          );
        })}
      </Row>
      <Row>
        {sounds.slice(3, 6).map((obj) => {
          return (
            <Col key={obj.name}>
              <Pad className="pad" object={obj} onPadClicked={handlePadClick} />
            </Col>
          );
        })}
      </Row>
      <Row>
        {sounds.slice(6, sounds.length).map((obj) => {
          return (
            <Col key={obj.name}>
              <Pad className="pad" object={obj} onPadClicked={handlePadClick} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Pads;
