class Play_Scene_Background extends Phaser.TileSprite {
  constructor({ game, x, y, width, height, key, frame }) {
    super(game, x, y, width, height, key, frame);

    const GAME = this.game;
    const HEIGHT = GAME.height;

    this.x = -260;
    this.y = HEIGHT * -1;
    this.width = 1087;
    this.height = HEIGHT * 2;

    GAME.add.existing(this);
  }

  renew(timer) {
    const TILE = this.tilePosition;

    if (timer > 20) {
      TILE.y += 4;
    } else if (timer > 10) {
      TILE.y += 3;
    } else {
      TILE.y += 2;
    }
  }
}
