class mainScene {
  preload() {
    // Assets laden
    this.load.image("player1", "assets/snow-bordeaux.svg");
    this.load.image("player2", "assets/snow-rose.svg");
    this.load.image("coin", "assets/coin.png");
    this.load.image("snow", "assets/snow.svg");
    this.load.audio("collect-coin", [
      "assets/collect-coin.mp3",
      "assets/collect-coin.ogg",
    ]);
  }

  create() {
    // Erste Spielfigur
    this.player = this.physics.add.sprite(150, 35, "player1");

    // Zweite Spielfigur
    this.player2 = this.physics.add.sprite(150, 65, "player2");

    // Münze
    this.coin = this.physics.add.sprite(300, 300, "snow");

    // Grosse Münze (gleiche Textur wie die normale Münze, aber grösser)
    this.bigCoin = this.physics.add.sprite(500, 150, "snow");
    this.bigCoin.setScale(2); // Skaliert die große Münze auf das 2-fache ihrer Originalgröße
    this.bigCoin.setAlpha(0); // Versteckt die große Münze initial

    // Punktestände für beide Spieler
    this.scorePlayer1 = 0;
    this.scorePlayer2 = 0;

    // Text für die Anzeige der Punktestände
    let style = { font: "16px Arial Narrow" };
    this.scoreTextPlayer1 = this.add.text(
      20,
      20,
      "Player 1: " + this.scorePlayer1,
      (style = { font: "16px Arial Narrow", fill: "#400625" })
    );
    this.scoreTextPlayer2 = this.add.text(
      20,
      50,
      "Player 2: " + this.scorePlayer2,
      (style = { font: "16px Arial Narrow", fill: "#cdb1c0" })
    );

    // Steuerung
    this.arrow = this.input.keyboard.createCursorKeys(); // Pfeiltasten
    this.wasd = this.input.keyboard.addKeys("W,A,S,D"); // WASD

    // Sound
    this.collectCoin = this.sound.add("collect-coin");
  }

  update() {
    // Spieler 1 (Pfeiltasten) Bewegung
    if (this.arrow.right.isDown) {
      this.player.x += 3;
    } else if (this.arrow.left.isDown) {
      this.player.x -= 3;
    }

    if (this.arrow.down.isDown) {
      this.player.y += 3;
    } else if (this.arrow.up.isDown) {
      this.player.y -= 3;
    }

    // Spieler 2 (WASD) Bewegung
    if (this.wasd.D.isDown) {
      this.player2.x += 3;
    } else if (this.wasd.A.isDown) {
      this.player2.x -= 3;
    }

    if (this.wasd.S.isDown) {
      this.player2.y += 3;
    } else if (this.wasd.W.isDown) {
      this.player2.y -= 3;
    }

    // Kollision mit den Münzen prüfen
    if (this.physics.overlap(this.player, this.coin)) {
      this.hit(this.player, 1, "coin"); // Player 1 trifft die normale Münze
    } else if (this.physics.overlap(this.player2, this.coin)) {
      this.hit(this.player2, 2, "coin"); // Player 2 trifft die normale Münze
    }
  }

  hit(player, playerNumber, coinType) {
    // Münze an eine neue Position setzen
    if (coinType === "coin") {
      this.coin.x = Phaser.Math.Between(100, 600);
      this.coin.y = Phaser.Math.Between(100, 300);
      // Normale Münze gibt 10 Punkte
      if (playerNumber === 1) {
        this.scorePlayer1 += 10;
        this.scoreTextPlayer1.setText("Player 1: " + this.scorePlayer1);
      } else {
        this.scorePlayer2 += 10;
        this.scoreTextPlayer2.setText("Player 2: " + this.scorePlayer2);
      }
    }

    // Animation für den getroffenen Spieler
    this.tweens.add({
      targets: player, // Die Spielfigur, die die Münze getroffen hat
      duration: 200,
      scaleX: 1.2,
      scaleY: 1.2,
      yoyo: true,
    });

    this.collectCoin.play();
  }
}

new Phaser.Game({
  width: 1000, // Breite des Spiels
  height: 500, // Höhe des Spiels
  backgroundColor: "#825c38", // Hintergrundfarbe
  scene: mainScene, // Szene
  physics: { default: "arcade" }, // Physik-Engine
  parent: "game", // <div id="game">
});
