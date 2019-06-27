class Score extends Phaser.Text {
  constructor({ game, x, y, text, style }) {
    super(game, x, y, text, style);

    this.anchor.setTo(0.5, 0);
    this.fixedToCamera = true;
    this.setStyle({ fill: "white", font: "18px Arial" });
    this.setText("score: 0");

    this.point = 0;

    this.game.add.existing(this);
  }

  renew(enemys, boss) {
    const enemy = enemys.getFirst("health", 0);

    if (enemy) {
      this.point++;
      this.setText("score: " + this.point);

      enemy.health = 3;
    }

    if (!boss.health) {
      this.point += 5;
      this.setText("score: " + this.point);

      this.health = 10;
    }
  }
}
