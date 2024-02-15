
//criação da variável config
var config =
{
    type: Phaser.AUTO,//definição do tipo
    width:800,//definição da largura
    height:600,//definição da altura
    //criação da cena e definicão preload,create e update
    scene:{
        preload: preload,
        create: create,
        update: update,
    }
};
var game = new Phaser.Game(config) //criação da variável game e colocando a variável config para funcionar
//definindo variáveis
var map;
var player;
var cursors;
var keybA;
var text

function preload(){
    //sprite do player
    this.load.spritesheet('player','assets/boneco.jpeg',{frameWidth:166, frameHeight:186});
    //animação do plano de fundo
    this.load.image('map','assets/image.jpeg');
}



function create(){
    //carregando o plano de fundo
    this.add.image(400,300,'map').setScale(1.2);
    //carregando o mapa
    player = this.add.sprite(300,300,'player').setScale(1.0);
    //player.setBounce(0,2);//bater nas bordas
    //player.setCollideWorldBounds(true); // não sair do mapa
    cursors = this.input.keyboard.createCursorKeys();
    keybA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keybD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    
    
    this.anims.create({
        key: 'fly', // definição key
        frames: this.anims.generateFrameNumbers // escolhendo animação
            (
                'player', // escolha da imagem para animação
                {
                    start: 0, // escolha do primeiro frame a ser utilizado
                    end: 7 // escolha do último frame a ser utilzado
                }
            ),
        frameRate: 10, // definição da velocidade do Frame
        repeat: -1 // colocando para repetir infinitamente

});
  player.anims.play('fly'); // colocando a animação com a key para funcionar
}

function update(){
    //player.body.setVelocityX(0);

    if (cursors.left.isDown || keybA.isDown)// se precionado para a esquerda
        {
            player.x -=10
            //player.setVelocityX(-100)} //mover para a esquerda
        }else if (cursors.right.isDown || keybD.isDown)// se pressionado para a direita
        {
            player.x +=10
           // player.setVelocityX(+100)
        }
       else if(cursors.up.isDown){
            player.y -=10
           // player.setVelocityX(0);
        //}/
    } else if(cursors.down.isDown){
        player.y +=10
    }
}
