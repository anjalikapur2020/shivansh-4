var gameState = "wait"
var bgimg, splashscreen, playbutton, howbutton
var playimg, level1img, leftwall, rightwall

var score1=0

function preload() {

    bgimg = loadImage("alienDynasty.gif")
    level1img = loadImage("level1bg.jpeg")
    platform1img = loadImage("platform.png")
    platform2img = loadImage("platform_2.png")
    enemy1 = loadImage("enemy1-unscreen.gif")
    enemy2 = loadImage("enemy2-unscreen.gif")
    enemy3 = loadImage("enemy3-unscreen.gif")
    enemy4 = loadImage("enemy4-unscreen.gif")
    enemy5 = loadImage("enemy-5-unscreen.gif")
    aestronaut = loadImage("aestronautAlien-removebg-preview.png")
    gameOverImg = loadImage("gameover.jpg")
    popUpImg = loadImage("AboutGame.gif")
    spikes = loadImage("spikes.png")
    playerimg=loadImage("alien.gif")
    bgmusic = loadSound("bgMusic.mp3")
    coinCollecting = loadSound("coincollectsound.mp3")
    jumpSound = loadSound("jump.mp3")
    gameOverSound = loadSound("gameoversound.mp3")
    coinimg = loadAnimation("coin/c1.png", "coin/c2.png", "coin/c3.png", "coin/c4.png", "coin/c5.png", "coin/c6.png", "coin/c7.png", "coin/c8.png", "coin/c9.png","coin/c10.png")
}


function setup() {
    createCanvas(windowWidth, windowHeight)

    playbutton = createImg("play_btn.png")
    playbutton.position(width / 2 - 250, height - 145)
    playbutton.size(160, 150)

    playbutton.hide()


    soundbutton = createImg("sound_btn.png")
    soundbutton.position(width / 2 + 80, height - 150)
    soundbutton.size(150, 150)
    soundbutton.hide()


    mutebutton = createImg("mute.png")
    mutebutton.position(width / 2 + 70, height - 150)
    mutebutton.size(165, 150)
    mutebutton.hide()


    level1popbutton = createImg("AboutGame.gif")
    level1popbutton.position(width / 5.3, height / 4)
    level1popbutton.size(1000, 500)
    level1popbutton.hide()


    invisibleground = createSprite(width / 2, height - 50, width, 10)
    invisibleground.visible = false

    leftwall = createSprite(width / 2 - width / 4, height / 2, 10, height)
    leftwall.visible = false

    rightwall = createSprite(width - width / 4, height / 2, 10, height)
    rightwall.visible = false

    platform1 = createSprite(width / 4, height - 120)
    platform1.addImage(platform1img)
    platform1.scale = 1.25
    platform1.visible = false
    platform1.setCollider("rectangle", -50, 0, platform1.width / 2 , platform1.height / 2)



    platform2 = createSprite(200, height / 2)
    platform2.addImage(platform2img)
    platform2.scale = 1.25
    platform2.visible = false
    platform2.setCollider("rectangle", -50, 0, platform2.width / 2 , platform2.height / 2)


    platform3 = createSprite(width / 2, height / 4)
    platform3.addImage(platform1img)
    platform3.scale = 1.25
    platform3.visible = false
    platform3.setCollider("rectangle", -50, 0, platform3.width / 2 , platform3.height / 2)


    platform4 = createSprite(width - 400, height / 2)
    platform4.addImage(platform2img)
    platform4.scale = 1.25
    platform4.visible = false
    platform4.setCollider("rectangle", -50, 0, platform4.width / 2 , platform4.height / 2)

platform1.debug=true
platform2.debug=true
platform3.debug=true
platform4.debug=true


    player = createSprite(50, height - 100)
    player.addImage(playerimg)
    player.scale = 0.5
    player.visible = false
    player.debug=true
    player.setCollider("rectangle",0,10,100,220)


    // collectables level1
    coin=createSprite(platform2.x-20,platform2.y-(platform2.height+15))
    coin.addAnimation("coin1",coinimg)
    coin.scale=0.15
    coin.visible=false

    coin1=createSprite(platform3.x-20,platform3.y-(platform3.height+12))
        coin1.addAnimation("coin2",coinimg)
        coin1.scale=0.15
        coin1.visible=false


        coin2=createSprite(platform4.x-20,platform4.y-(platform4.height+15))
        coin2.addAnimation("coin3",coinimg)
        coin2.scale=0.15
        coin2.visible=false


        coinscore=createSprite(width-width/6,50)
        coinscore.addAnimation("scorecoin",coinimg)
        coinscore.scale=0.075
        coinscore.visible=false


        level1endwall=createSprite(width-10,height-100,20,height/2)
        level1endwall.visible=false


}


function draw() {

    if (gameState === "wait") {

        background(bgimg)
        playbutton.show()
        soundbutton.show()
        invisibleground.visible = false
        leftwall.visible = false
        rightwall.visible = false



    }


    playbutton.mousePressed(() => {
        gameState = "play"
        playbutton.hide()
        soundbutton.show()

    })


    if (gameState === "play") {
        background(level1img)
        soundbutton.position(0, 0)
        mutebutton.position(0, 0)
        level1popbutton.show()

        playbutton.hide()
    }

    soundbutton.mousePressed(() => {
        soundbutton.hide()
        mutebutton.show()
    })
    mutebutton.mousePressed(() => {
        soundbutton.show()
        mutebutton.hide()
    })

    level1popbutton.mousePressed(() => {
        gameState = "level1"
        image(level1img, 0, 0, width, height)
        level1popbutton.hide()
    })


    if (gameState === "level1") {
        image(level1img, 0, 0, width, height)
        player.visible = true

        coin.visible=true
        coin1.visible=true
        coin2.visible=true
        coinscore.visible=true
        level1popbutton.hide()
        PLAYLEVEL1()
        if (platform1.isTouching(leftwall)) {
            platform1.velocityX = 2
        }

        else if (platform1.isTouching(rightwall)) {
            platform1.velocityX = -2
        }
        player.velocityY += 0.8
        player.collide(invisibleground)
        
    }

    drawSprites()

    if (gameState==="level1"){
    
        // player movement... added 2 april
        
        textSize(60)
        fill("red")
        stroke(0)
        strokeWeight(2)
        text(" : "+score1,coinscore.x+(coinscore.width/4),70)
        
        if (keyIsDown(RIGHT_ARROW)) {
            player.x += 5
        
         }
        
        if (keyIsDown(LEFT_ARROW)) {
            player.x -= 5
        
        }
        
        if (keyDown("space")) {
            player.velocityY = -15
        }
        
        
        if (player.isTouching(platform1)){
            player.velocityX=0
            player.velocityY=0
        }
        
        
        if (player.isTouching(platform2)){
            player.velocityX=0
            player.velocityY=0
        }
        
        
        if (player.isTouching(platform3)){
            player.velocityX=0
            player.velocityY=0
        }
        
        
        if (player.isTouching(platform4)){
            player.velocityX=0
            player.velocityY=0
        }
        
        if (player.isTouching(coin)||player.isTouching(coin1)||player.isTouching(coin2)){
        
        if (player.isTouching(coin)){
            coin.remove()
            score1 +=10
        }
        if (player.isTouching(coin1)){
            coin1.remove()
            score1 +=10
        }
        if (player.isTouching(coin2)){
            coin2.remove()
            score1 +=10
        }
        
        }
        
        }
        
        
        if (score1==30){
            platform1.x=width-100
            platform1.velocityX=0
        
            if(player.isTouching(level1endwall)){
                level1over()
            }
        }
        
        
        
        if(gameState=="level2"){
           background(0)
           
           platform1.visible=false
           platform2.visible=false
           platform3.visible=false
           platform4.visible=false
        }

    
}



function PLAYLEVEL1() {
    invisibleground.visible = true
   
    platform1.visible = true
    platform2.visible = true
    platform3.visible = true
    platform4.visible = true
    // platform1.velocityX=2


}



function Level2(){
    gameState="level2"
}

function level1over(){
    swal({
        title: "You have done it!! ",
        text: " LEVEL 1 CLEARED!!",
        imageUrl: coinimg,
        imageSize: '200x200',
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'LEVEL 2 !!!',
    },
        function (isConfirm) {
Level2()       })

}



























