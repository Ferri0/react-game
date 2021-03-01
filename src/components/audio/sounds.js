const sounds = {
  init() {
    this.shiftSound = new Audio('/assets/audio/shift.wav');
    this.menuSound = new Audio('/assets/audio/menu-click.mp3');
    this.bgSound = new Audio('/assets/audio/menu-bg.wav');
    this.loseGame = new Audio('/assets/audio/lose-game.mp3');
    this.winGame = new Audio('/assets/audio/win-game.wav');
    this.newGame = new Audio('/assets/audio/new-game.wav');
    return this;
  },
  setVolume(num) {
    Object.keys(sounds).forEach((key) => {
      if (sounds[key] instanceof Audio) {
        sounds[key].volume = num;
      }
    });
  },
};

export default sounds;
