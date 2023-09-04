class IMG extends Phaser.Image {
  constructor({ game, x, y, key, frame }) {
    super(game, x, y, key, frame);

    this.anchor.setTo(0.5, 0);
    this.fixedToCamera = true;
    this.visible = false;

    this.game.add.existing(this);
  }
}

class Txt extends Phaser.Text {
  constructor({ game, x, y, text, style }) {
    super(game, x, y, text, style);

    this.anchor.setTo(0.5, 0.5);
    this.fixedToCamera = true;
    this.visible = false;

    this.game.add.existing(this);
  }
}
