const sounds = {
  init() {
    this.shiftSound = new Audio('/assets/audio/shift.wav');
    this.menuSound = new Audio('/assets/audio/menu-click.mp3');
    this.loseGame = new Audio('/assets/audio/lose-game.mp3');
    this.winGame = new Audio('/assets/audio/win-game.wav');
    this.newGame = new Audio('/assets/audio/new-game.wav');
    this.settingsSound = new Audio('/assets/audio/settings-change.wav');
    return this;
  },
  setVolume(num) {
    Object.keys(sounds).forEach((key) => {
      if (sounds[key] instanceof Audio) {
        sounds[key].volume = num / 10;
      }
    });
    document.getElementById('bgSound').volume = num;
  },
};

export default sounds;
