var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var player, Slime, Ground, cursors, score = 0, scoreText;

function preload() {
    this.load.image("background", "../assets/background.png");
    this.load.image("slime", "../assets/slime.png");
    this.load.image("ground", "../assets/Ground.jpg");
    this.load.image("dude", "../assets/dude.png",
    { frameWidth: 300, frameHeight: 300} 
    );
}

function create () {

    Ground = this.physics.add.staticGroup(); 
    
    this.add.image(400, 280, 'background').setScale(1);
    Ground.create(400, 550, 'ground').setScale(1).refreshBody();

    player = this.physics.add.sprite(100, 300, 'dude').setScale(0.1);
    player.setBounce(.3);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, Ground);
    
    cursors = this.input.keyboard.createCursorKeys();
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '40px', fill: '#000000' });
    
    Slime = this.physics.add.group();
    Slime.create(600, 250, 'slime').setScale(0.1);

    this.physics.add.collider(Slime, Ground);
    this.physics.add.overlap(player, Slime, collectSlime, null, this);
    
    function collectSlime (player, Slime) {
        Slime.disableBody(true, true);
        score += 100;
        scoreText.setText('Score: ' + score);
    
        if (score == 100) {
            return alert("Congratulations!")
    
        }
    }
    
}

function update () {
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);
    }
    else
    {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}