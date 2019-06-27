class Game_End extends Phaser.State {
  create() {
    this.game.camera.flash(0xffffff, 5000);

    this.video = this.add.video("video");

    const VIDEO = this.video;

    VIDEO.addToWorld(-300, 0, 0, 0, 1, 1);
    VIDEO.play();
  }

  update() {
    this.video.onComplete.add(() => {
      this.state.start("Game_Load");
    }, this);
  }
}
