

var buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36'];
var userpat = [];
var gamepat = [];
var level = 0;
var levelob = document.querySelector('.level');
var infoob = document.querySelector('.info');
var start = false;

function gamestart(){
    gamepattern();
    levelob.innerHTML = "Level : " + String(level);
}

document.addEventListener('keypress',function(){
    if(start == false){
        gamestart();
        start = true;
        for(var i=1;i<37;i++){
            s = document.querySelector('.b' + String(i)).classList.remove('wrong');
            s = document.querySelector('.b' + String(i)).classList.remove('clicked');
        }
    }
})


for(var i=1;i<37;i++){
    document.querySelector('.b'+ String(i)).addEventListener('click',function(){
        clickanim(this.getAttribute('class'));
        clickbut(this.innerHTML);
    });
}

function gamepattern(){


    if(buttons.length <=0){
        console.log('end');
        levelob.innerHTML = "You Won!";
    }
    else{
    level++;
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
        infoob.innerHTML = 'Wrong! press any key to restart';
        gamepat = [];
        userpat = [];
        buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36'];

        start = false;
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