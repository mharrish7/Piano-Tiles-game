

var buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36'];
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

for(var i=1;i<37;i++){
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
        for(var i=1;i<37;i++){
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
        document.querySelector('.welname').innerHTML = "let's Go 🔥!, " + name;
        document.querySelector('#name').style.display = 'none';
        document.querySelector('.namebut').style.display = 'none';

        
    }
})

document.addEventListener('keypress',function(){
    if(start == false && play == true){
        gamestart();
        start = true;
        for(var i=1;i<37;i++){
            s = document.querySelector('.b' + String(i)).classList.remove('wrong');
            s = document.querySelector('.b' + String(i)).classList.remove('clicked');
        }
        a3.play();
    }
})


for(var i=1;i<37;i++){
    document.querySelector('.b'+ String(i)).addEventListener('click',function(){
        clickanim(this.getAttribute('class'));
        clickbut(this.innerHTML);
        a3.play();

    });
}

function gamepattern(){


    if(buttons.length <=0){
        console.log('end');
        levelob.innerHTML = "You Won! press any key to restart, scored " + String(score) + " points";;
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
        buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36'];
        start = false;
        play = true;
        score = -100;
        level = 0;
        nex.play();
        document.querySelector('.namebut').style.display = 'block';

    }
    else{
    level++;
    score += 100;
    cor.play();
    for(var i=1;i<37;i++){
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
            for(var i=1;i<37;i++){
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
        if (userpat.length == gamepat.length){
            userpat = [];
            setTimeout(gamepattern(),1000);
        }
    }
    else{
        for(var i=1;i<37;i++){
            document.querySelector('.b'+ String(i)).disabled = true;
        }
        document.querySelector('.b' + key).classList.add('wrong');
        for(but of gamepat){
            document.querySelector('.b' + but).classList.add('clicked');
        }
        console.log('wrong');
        infoob.innerHTML = 'Wrong! press any key to restart, scored ' + String(score) + ' points' ;
        wro.play();
        gamepat = [];
        userpat = [];
        buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36'];

        start = false;
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
        document.querySelector('.namebut').style.display = 'block';

        score = -100;
        level = 0;
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