//criação da variável config
var config = {
  type: Phaser.AUTO, //definição do tipo
  width: 800, //definição da largura
  height: 600, //definição da altura
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      enableBody: true,
    },
  },   
  //criação da cena e definicão preload,create e update
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};
var game = new Phaser.Game(config); //criação da variável game e colocando a variável config para funcionar
//definindo variáveis
var map;
var player;
var cursors;

function preload() {
  //sprite do player
  this.load.spritesheet("player", "assets/boneco.png", {
    frameWidth: 137,
    frameHeight: 185,
  });
  //pré carregamento do plano de fundo
  this.load.image("map", "assets/image.jpeg");
}

function create() {
  this.add.image(400, 300, "map").setScale(1.3); //criando o plano de fundo

  player = this.physics.add.sprite(300, 300, "player").setScale(0.5); //adicionando o personagem e physics para a gravidade funcionar

  cursors = this.input.keyboard.createCursorKeys(); //adicionando o cursors para mover o personagem no teclado

  keybA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); //adicionando movimento na letra A

  keybD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D); //adicionando movimento na letra D

  keybW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); //adicionando movimento na letra W

  keybS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S); //adicionando movimento na letra S

  this.anims.create({// criando animação do ato andar lateral
    key: "andarLateral", // definição key
    //definição do frame que será utilizado
    frames: this.anims.generateFrameNumbers("player", {
      start: 3,
      end: 5,
    }),
    frameRate: 10, // definição da velocidade do Frame
    repeat: -1, // colocando para repetir infinitamente
  });

  this.anims.create({//criando animação do ato andar para baixo
    key: "andarBaixo", // definição key
    frames: this.anims.generateFrameNumbers("player", {
      start: 6,
      end: 8,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({//criando animação do ato parado (provisório)
    key: "parado", // definição key
    frames: this.anims.generateFrameNumbers("player", {
      start: 7, // definindo posição do player parado
      end: 7,
    }),
    frameRate: 10, 
    repeat: -1,
  });
  this.anims.create({ //criando animação do ato de andar para cima
    key: "andarCima",
    frames: this.anims.generateFrameNumbers("player", { start: 0, end: 2 }),
    frameRate: 10,
    repeat: -1},
    
    player.setCollideWorldBounds(true)  // definição das bordas
  );
}

function update() {
  //definição dos movimentos no cursors(esquerda,direita)
  if (cursors.left.isDown || keybA.isDown) {
    player.anims.play("andarLateral", true); // animação andar lateral
    player.flipX = true; //flip true para inverter o boneco
    player.setVelocityX(-100);
  }
  else if (cursors.right.isDown || keybD.isDown) {
    player.anims.play("andarLateral", true);
    player.flipX = false; //flip false para não inverter o boneco
     player.setVelocityX(+100);
  } 
  
  //definição das animações cima e baixo
  else if (cursors.up.isDown || keybW.isDown) {
    player.anims.play("andarCima", true);
    player.setVelocityY(-100);
  } else if (cursors.down.isDown || keybS.isDown) {
    player.setVelocityY(+100);
    player.anims.play("andarBaixo", true); // colocando a animação com a key para funcionar
  } else {
    player.anims.play('parado', true);// animação para o boneco ficar parado quando os movimentos não são acionados
    player.setVelocityX(0);
    player.setVelocityY(0);
  }
}
