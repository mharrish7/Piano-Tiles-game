

var buttons = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16'];
var userpat = [];
var gamepat = [];
var level = 0;
var levelob = document.querySelector('.level');
var infoob = document.querySelector('.info');
var start = false;
var play = false;
var name = "NoName";
var score = -100;

const a3 = new Audio('sounds/pop.wav');
const cor = new Audio('sounds/correct.wav');
const wro = new Audio('sounds/wrong.wav');
const nex = new Audio('sounds/next.wav');

for(var i=1;i<17;i++){
    document.querySelector('.b'+ String(i)).disabled = true;
}

function gamestart(){
    gamepattern();
    levelob.innerHTML = "Level : " + String(level);
}
document.querySelector('.namebut').addEventListener('click',function(){
    if(start == false){
        gamestart();
        start = true;
        for(var i=1;i<17;i++){
            s = document.querySelector('.b' + String(i)).classList.remove('wrong');
            s = document.querySelector('.b' + String(i)).classList.remove('clicked');
        }
        name = document.querySelector('#name').value;
        if (name == 'NoName') {
            name = document.querySelector('#name').value;
            if (name == '') {
                name = "NoName";
            }
        }
        document.querySelector('.welname').innerHTML =  "let's Go 🔥!, " + name;
        document.querySelector('#name').style.display = 'none';
        document.querySelector('.namebut').style.display = 'none';

        
    }
})

document.addEventListener('keypress',function(){
    if(start == false && play == true){
        gamestart();
        start = true;
        for(var i=1;i<17;i++){
            s = document.querySelector('.b' + String(i)).classList.remove('wrong');
            s = document.querySelector('.b' + String(i)).classList.remove('clicked');
        }
        a3.play();
    }
})


for(var i=1;i<17;i++){
    document.querySelector('.b'+ String(i)).addEventListener('click',function(){
        clickanim(this.getAttribute('class'));
        clickbut(this.innerHTML);
        a3.play();

    });
}

function gamepattern(){


    if(buttons.length <=0){
        console.log('end');
        levelob.innerHTML = "You Won! press any key to restart, scored " + String(score) + " points";
        nex.play();
        var keys = Object.keys(localStorage);
        if(keys.includes(name)){
            var value = parseInt(localStorage.getItem(name));
            if(score > value){
                localStorage.setItem(name,String(score));
            }
        }
        else{
            localStorage.setItem(name,String(score));
        }
        gamepat = [];
        userpat = [];
        buttons = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16'];
        start = false;
        play = true;
        score = -100;
        level = 0;
        document.querySelector('.namebut').style.display = 'block';

    }
    else{
    level++;
    cor.play();
    score += 100;
    for(var i=1;i<17;i++){
        document.querySelector('.b'+ String(i)).disabled = true;
    }
    infoob.innerHTML = "Wait!";
    levelob.innerHTML = "Level : " + String(level);
    rand = Math.floor(Math.random() * buttons.length);
    gamepat.push(buttons[rand]);
    buttons.splice(rand,1);
    setTimeout(function(){
        console.log('new');
        for(but in gamepat){
            animbut(but);
        }
    },1000);
}
    
}

function animbut(but){
    setTimeout(function(){
        console.log(gamepat[but]);
        clickanim('b' + gamepat[but]);
        checkbut(but);
    },100 * (but+1));

    
}

function checkbut(but){
    if(but == gamepat.length - 1){
        
        setTimeout(function(){
            for(var i=1;i<17;i++){
                document.querySelector('.b'+ String(i)).disabled = false;
            };
            infoob.innerHTML = "Now Play!";
        },1000);
        
        
    }
}

function clickbut(key){

    if(userpat.includes(key)){
        console.log('pressed before');
    }
    else{
    userpat.push(key);
    var current = userpat.length - 1;
    console.log(userpat);
    console.log(gamepat);
    if (gamepat.includes(userpat[current])){
        if (userpat.length === gamepat.length){
            userpat = [];
            setTimeout(gamepattern(),1000);
        }
    }
    else{
        for(var i=1;i<17;i++){
            document.querySelector('.b'+ String(i)).disabled = true;
        }
        document.querySelector('.b' + key).classList.add('wrong');
        for(but of gamepat){
            document.querySelector('.b' + but).classList.add('clicked');
        }
        console.log('wrong');
        infoob.innerHTML = 'Wrong! press any key to restart, scored ' + String(score) + ' points' ;
        gamepat = [];
        userpat = [];
        wro.play();
        start = false;
        buttons = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16'];
        var keys = Object.keys(localStorage);
        if(keys.includes(name)){
            var value = parseInt(localStorage.getItem(name));
            if(score > value){
                localStorage.setItem(name,String(score));
            }
        }
        else{
            localStorage.setItem(name,String(score));
        }
        play = true;
        score = -100;
        level = 0;
        document.querySelector('.namebut').style.display = 'block';

    }
    }
}

function clickanim(but){
    var c = document.querySelector('.' + but);
    c.classList.add('clicked');
    setTimeout( function(){
        c.classList.remove('clicked') 
    },100);
}