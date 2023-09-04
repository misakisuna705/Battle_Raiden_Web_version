class Game_Start extends Phaser.State {
  preload() {}

  create() {
    const VIDEO = (this.video = this.add.video("game_start_video"));

    VIDEO.addToWorld(-260, 0, 0, 0, 1, 1);
    VIDEO.play();

    this.add.image(116, 30, "game_start_title");

    VIDEO.onComplete.add(() => {
      this.game.state.start("Play_Scene");
    }, this);
  }
}
