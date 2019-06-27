class Timer extends Phaser.Time {
  constructor({ game }) {
    super(game);

    this.counter = 0;

    this.content = new Txt({ game: this.game, x: 50, y: 30, text: "time: 0", style: { font: "18px Arial", fill: "#ffffff" } });
    this.content.visible = true;

    this.loop();
  }

  loop() {
    this.game.time.events.loop(Phaser.Timer.SECOND, this.count, this);
  }

  count() {
    const COUNTER = ++this.counter;

    this.content.setText("time: " + COUNTER);
  }
}
