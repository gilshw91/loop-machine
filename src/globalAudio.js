const audios = {
  Bass: new Audio("./sounds/Bass.mp3"),
  Tanggu: new Audio("./sounds/Tanggu.mp3"),
  Electric: new Audio("./sounds/Electric.mp3"),
  Future: new Audio("./sounds/Future.mp3"),
  Maze: new Audio("./sounds/Maze.mp3"),
  Pas: new Audio("./sounds/Pas.mp3"),
  Silent: new Audio("./sounds/Silent.mp3"),
  Stompy: new Audio("./sounds/Stompy.mp3"),
  Stutter: new Audio("./sounds/Stutter.mp3"),
};

const play = (name) => {
  audios[name].play();
  //   audios[name].loop = true;
};

const pause = (name) => {
  audios[name].currentTime = 0;
  audios[name].pause();
};

const audio = (name) => {
  return audios[name];
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  pause,
  play,
  audio,
};
