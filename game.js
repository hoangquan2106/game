let snake = document.getElementById("gamesnake");
let snake1 =snake.getContext("2d");
let image = document.getElementById("imga");
let ball = {
    x:600,
    y:300,
    dx:10,
    dy:2,
    bankinh:15
}
let em = {
    width: 150, height:30 , x: 0, y: snake.height - 10,
    speed: 15,
    sangtrai:false,
    sangphai:false,
}

let viengachto={
    gachx:25,
    gachy:25,
    magin:25,
    width: 70,
    height:15,
    hang:3,
    cot:14
};
let gameover = false;
let gamewin = false;
let diem = 0;
let diemmax = viengachto.cot * viengachto.hang;




let viengach1 = [];
for(let i = 0; i< viengachto.hang; i++){
    for(let j = 0; j < viengachto.cot; j++){
        viengach1.push({
            x: viengachto.gachx + j * (viengachto.width + viengachto.magin),
            y: viengachto.gachy + i * (viengachto.height + viengachto.magin),
            broken: false
        })
    }
}

document.addEventListener('keyup', function (event){
    console.log('key up')
    console.log(event);
    if(event.keyCode === 37){
        em.sangtrai = false;
    }else if(event.keyCode === 39){
        em.sangphai = false;
    }
});
document.addEventListener('keydown', function (event){
    console.log('key down');
    console.log(event);
    if(event.keyCode === 37){
        em.sangtrai = true;
    }else if(event.keyCode === 39){
        em.sangphai = true;
    }
});


function quabong(){
    snake1.beginPath()
    snake1.drawImage(image, 0, 0, 1350,650);
    snake1.arc(ball.x, ball.y, ball.bankinh,0,Math.PI*2);
    snake1.stroke();
    snake1.fillStyle="red";
    snake1.fill();
    snake1.closePath();
}

function dow() {
    snake1.beginPath()
    snake1.rect(em.x, em.y, em.width, em.height);
    snake1.fillStyle = "YellowGreen"
    snake1.fill();
    snake1.stroke();
    snake1.closePath();
}

function viengach(){
    viengach1.forEach (function(c) {
        if(!c.broken){
            snake1.beginPath();
            snake1.rect(c.x, c.y, viengachto.width, viengachto.height);
            snake1.fillStyle = "BlueViolet"
            snake1.fill();
            snake1.closePath();
        }
    })
}
function dieukien(){
    if(ball.x<ball.bankinh || ball.x > snake.width - ball.bankinh){
        ball.dx = -ball.dx;
    }
    if(ball.y<ball.bankinh){
        ball.dy = -ball.dy;
    }
}
function hinhtron(){
    ball.x += ball.dx;
    ball.y +=ball.dy;
}

function isgameover(){
    if(ball.x + ball.bankinh >= em.x && ball.x + ball.bankinh <=em.x + em.width &&
        ball.y + ball.bankinh >= snake.height - em.height){
        ball.dy = -ball.dy;
    }
}

function bongvacham() {
    viengach1.forEach(function (c) {
        if (!c.broken) {
            if (ball.x >= c.x && ball.x <= c.x + viengachto.width && ball.y + ball.bankinh >= c.y && ball.y - ball.bankinh <= c.y + viengachto.height) {
                ball.dy = -ball.dy;
                c.broken = true;
                diem +=1;
                if(diem >= diemmax){
                    gameover = true;
                    gamewin = true;

                }
            }
        }
    })
}

function updeatgame(){
    if (em.sangtrai) {
        em.x -= em.speed;
    } else if (em.sangphai) {
        em.x += em.speed;
    }

    if (em.x < 0) {
        em.x = 0;
    } else if (em.x > snake.width - em.width) {
        em.x = snake.width - em.width;
    }
}
function checkgameover(){
    if( ball.y > snake.height -ball.bankinh){
        gameover = true;
    }
}
function gameee(){
    if(gamewin){
        alert('YOU WIN')
    }else{
        alert('YOU LOSE')
    }
}

function bongbay() {
    if (!gameover) {
        snake1.clearRect(0, 0, snake.width, snake.height);
        quabong();
        dow();
        viengach();

        dieukien();
        isgameover();
        bongvacham();

        hinhtron();
        updeatgame();

        checkgameover();
        requestAnimationFrame(bongbay);
    }else {
        gameee();
    }
}
bongbay();