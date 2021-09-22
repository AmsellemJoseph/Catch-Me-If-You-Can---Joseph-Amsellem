const gameVar = {
    main: {
        DOM: document.getElementById("main"),
    },
    startBtn: {
        DOM: document.getElementById("startBtn"),
    },
    score: {
        DOM: document.getElementById("score"),
    },
    nextLvl: {
        DOM: document.getElementById("nextLvl"),
    },
    lvl: {
        DOM: document.getElementById("lvl"),
    },
    missedClick: {
        DOM: document.getElementById("missedClick"),
    },
    timer: {
        DOM: document.getElementById("timer"),
        val: "60",
    },
    gameScreen: {
        DOM: document.getElementById("gameScreen"),
    },
    mysteryBox: {
        DOM: document.getElementById("mysteryBox"),
    },
    point1: {
        DOM: document.getElementById("point1"),
    },
    point2: {
        DOM: document.getElementById("point2"),
    },
    point3: {
        DOM: document.getElementById("point3"),
    },
    point4: {
        DOM: document.getElementById("point4"),
    },
    point5: {
        DOM: document.getElementById("point5"),
    },
    name1: {
        DOM: document.getElementById("name1"),
    },
    score6: {
        DOM: document.querySelector(".score6"),
    },
    dateScore1: {
        DOM: document.getElementById("dateScore1"),
    },
    name2: {
        DOM: document.getElementById("name2"),
    },
    name3: {
        DOM: document.getElementById("name3"),
    },
    name4: {
        DOM: document.getElementById("name4"),
    },
    name5: {
        DOM: document.getElementById("name5"),
    },
    bestPlayerContainer: {
        DOM: document.getElementById("bestPlayerContainer"),
    },
    bowser: {
        DOM: document.getElementById("bowser"),
    },
    bowserJr: {
        DOM: document.getElementById("bowserJr"),
    },
    mushroom: {
        DOM: document.getElementById("mushroom"),
    },
    x: null,
    y: null,
    z: null,
    zJr: null,
    zMushroom: null,
    rotation: 2,
    timeCount: 60,
    lvlGame: 1,
    scoreCount: 0,
    clickMissed: 0,
    exp: 10,
    xBase: 0,
    yBase: 0,
    piece: new Audio("assets/sounds/super-mario-coin-sound.mp3"),
    toad: new Audio("assets/sounds/toad.wav"),
    go: new Audio("assets/sounds/hereWeGo.mp3"),
    yoshi: new Audio("assets/sounds/victory-mario-series-hq-super-smash-bros.mp3"),
    looseSound: new Audio("assets/sounds/super-mario-death-sound-sound-effect.mp3"),
    bowserLaugh: new Audio("assets/sounds/bowserLaugh.mp3"),
    gameMusic: new Audio("assets/sounds/game.mp3"),
    bowserJrLaugh: new Audio("assets/sounds/bowserJrLaugh.wav"),
    moveBoxDelayTime: 300,
    bgFlag: false,
    moveBowserTime: 2500,
    moveBowserJrTime: 2000,
    xBowser: 0,
    yBowser: 0,
    xBowserJr: 0,
    yBowserJr: 0,

};
const gameFunc = {
    timerFunc: function (x) {
        gameVar.x = setInterval(() => {
            gameVar.timer.DOM.innerHTML = x;
            gameVar.timer.val = x;
            if (x <= 0) {
                game.stopGame();
            };
            return x = x - 1;
        }, 1000);
    },
    rotate: function (x) {
        gameVar.mysteryBox.DOM.style.animationDuration = `${x}s`;
    },
    goodClick: function (e) {
        gameVar.mysteryBox.DOM.addEventListener("mouseout", gameFunc.removeMoveBoxDelay);
        gameVar.scoreCount = gameVar.scoreCount + (gameVar.lvlGame * 10);
        gameVar.score.DOM.innerHTML = gameVar.scoreCount;
        gameVar.exp--;
        gameVar.nextLvl.DOM.innerHTML = gameVar.exp;
        gameFunc.lvlUp(gameVar.exp, gameVar.timeCount);
        gameFunc.moveBox();
        gameVar.piece.play();
        e.stopPropagation();
    },
    badClick: function (e) {
        gameVar.scoreCount = gameVar.scoreCount - gameVar.lvlGame;
        gameVar.score.DOM.innerHTML = gameVar.scoreCount;
        gameVar.clickMissed++;
        gameVar.missedClick.DOM.innerHTML = gameVar.clickMissed;
        e.stopPropagation();
    },
    lvlUp: function (x) {
        if (x == 0) {
            gameVar.toad.play();
            gameVar.lvlGame++;
            gameVar.lvl.DOM.innerHTML = gameVar.lvlGame;
            gameVar.exp = 10;
            gameVar.nextLvl.DOM.innerHTML = 10;
            gameVar.rotation = gameVar.rotation - 0.25;
            gameFunc.rotate(gameVar.rotation);
            gameVar.moveBoxDelayTime = 300 - (50 * (gameVar.lvlGame - 1));
            gameVar.mysteryBox.DOM.style.width = 100 - (gameVar.lvlGame * 10) + "px";
            gameVar.bowser.DOM.style.width = 100 + (gameVar.lvlGame * 15) + "px";
            gameVar.bowser.DOM.style.height = 100 + (gameVar.lvlGame * 15) + "px";
            gameVar.bowserJr.DOM.style.width = 100 + (gameVar.lvlGame * 20) + "px";
            gameVar.bowserJr.DOM.style.height = 100 + (gameVar.lvlGame * 20) + "px";
            gameVar.moveBowserTime = gameVar.moveBowserTime - 250;
            gameVar.moveBowserJrTime = gameVar.moveBowserJrTime - 250;
            clearInterval(gameVar.x);
            gameFunc.timerFunc(gameVar.timer.val + 10);
            if (gameVar.bgFlag == false) {
                gameVar.gameScreen.DOM.style.background = "rgb(184,4,4)";
                gameVar.gameScreen.DOM.style.border = "4px solid rgb(0, 0, 255)";
                gameVar.bgFlag = true;
            } else if (gameVar.bgFlag == true) {
                gameVar.gameScreen.DOM.style.background = "rgb(0,0,255)";
                gameVar.gameScreen.DOM.style.border = "4px solid rgb(0, 200, 0)";
                gameVar.bgFlag = false;
            }
        }
        if (gameVar.lvlGame == 2) {
            gameVar.bowser.DOM.style.display = "block";
        }
        if (gameVar.lvlGame == 3) {
            gameVar.bowserJr.DOM.style.display = "block";
        }
        if (gameVar.lvlGame == 6) {
            gameVar.piece.pause();
            gameVar.toad.pause();
            game.stopGame();
        };
    },
    moveBox: function () {
        gameVar.xBase = (Math.floor(Math.random() * 1200));
        gameVar.yBase = (Math.floor(Math.random() * 400));
        if (gameVar.xBase < 130 || gameVar.xBase > 1090 || gameVar.yBase < 130 || gameVar.yBase > 270) {
            return gameFunc.moveBox();
        }
        gameVar.mysteryBox.DOM.style.left = `${gameVar.xBase}px`;
        gameVar.mysteryBox.DOM.style.top = `${gameVar.yBase}px`;
    },
    moveBoxDelay: function () {
        gameVar.y = setTimeout(() => {
            gameFunc.moveBox();
        }, gameVar.moveBoxDelayTime);
    },
    removeMoveBoxDelay: function () {
        clearTimeout(gameVar.y);
    },
    //    mario:{userName:"Mario",scoreGame:1500,dateScore:new Date("1986,8,15")},
    //    luigi:{userName:"Luigi",scoreGame:1000,dateScore:new Date("1986,10,24")},
    //    bowser:{userName:"Bowser",scoreGame:750,dateScore:new Date("2009,11,18")},
    //    kamek:{userName:"Kamek",scoreGame:500,dateScore:new Date("2013,8,31")},
    //    peach:{userName:"Peach",scoreGame:250,dateScore:new Date("2020,4,24")},

    highScore: function () {
        gameVar.bestPlayerContainer.DOM.innerHTML = `<div class="score2">
        <ul>
            <li class="score score06">
<div id="dateScore1"></div>
                <p id="point1">${highScoreArr[0].scoreGame}</p><p id="name1">${highScoreArr[0].userName}</p>
               
            </li>
            <li class="score score07"><div id="dateScore2"></div>
                <p id="point2">${highScoreArr[1].scoreGame}</p><p id="name2">${highScoreArr[1].userName}</p>
            </li>
            <li class="score score08"><div id="dateScore3"></div>
                <p id="point3">${highScoreArr[2].scoreGame}</p><p id="name3">${highScoreArr[2].userName}</p>
            </li>
            <li class="score score09"><div id="dateScore4"></div>
                <p id="point4">${highScoreArr[3].scoreGame}</p><p id="name4">${highScoreArr[3].userName}</p>
            </li>
            <li class="score score10"><div id="dateScore5"></div>
                <p id="point5">${highScoreArr[4].scoreGame}</p><p id="name5">${highScoreArr[4].userName}</p>
            </li>
        </ul>
    </div>`
    },
    playMusicGame: function () {
        gameVar.gameMusic.loop = true;
        gameVar.gameMusic.play();
    },
    moveBowser: function () {
        gameVar.z = setInterval(() => {
            gameVar.xBowser = Math.floor(Math.random() * 1200);
            gameVar.yBowser = Math.floor(Math.random() * 400);
            if (gameVar.xBowser > (1220 - (100 + (gameVar.lvlGame * 15))) || gameVar.yBowser > (340 - (100 + (gameVar.lvlGame * 15)))) {
                clearInterval(gameVar.z);
                return gameFunc.moveBowser();
            }
            gameVar.bowser.DOM.style.left = `${gameVar.xBowser}px`;
            gameVar.bowser.DOM.style.top = `${gameVar.yBowser}px`;

        }, 1000);
    },
    badBowser: function (e) {
        gameVar.scoreCount = gameVar.scoreCount - 100;
        gameVar.bowserLaugh.play();
        gameVar.score.DOM.innerHTML = gameVar.scoreCount;
        e.stopPropagation();
    },
    moveBowserJr: function () {
        gameVar.zJr = setInterval(() => {
            gameVar.xBowserJr = Math.floor(Math.random() * 1200);
            gameVar.yBowserJr = Math.floor(Math.random() * 400);
            if (gameVar.xBowserJr > (1220 - (100 + (gameVar.lvlGame * 20))) || gameVar.yBowserJr > (340 - (100 + (gameVar.lvlGame * 20)))) {
                clearInterval(gameVar.zJr);
                return gameFunc.moveBowserJr();
            }
            gameVar.bowserJr.DOM.style.left = `${gameVar.xBowserJr}px`;
            gameVar.bowserJr.DOM.style.top = `${gameVar.yBowserJr}px`;

        }, 500);
    },
    badBowserJr: function (e) {
        gameVar.bowserJrLaugh.play();
        clearInterval(gameVar.x);
        gameFunc.timerFunc(gameVar.timer.val - 5);
        gameVar.score.DOM.innerHTML = gameVar.scoreCount;
        e.stopPropagation();
    },
    afficheDateScore1: function () {
        gameVar.dateScore1.DOM.style.display = "block";
    }

};

const game = {
    startGame: function () {
        gameVar.go.play();
        gameFunc.playMusicGame();
        gameFunc.highScore();
        gameFunc.moveBox();
        gameFunc.moveBowser();
        gameFunc.moveBowserJr();
        gameFunc.timerFunc(gameVar.timer.val);
        gameFunc.rotate(gameVar.rotation);
        gameVar.mysteryBox.DOM.style.display = "block";
        gameVar.startBtn.DOM.removeEventListener("click", game.startGame);
        gameVar.mysteryBox.DOM.addEventListener("mouseover", gameFunc.moveBoxDelay);
        gameVar.gameScreen.DOM.addEventListener("click", gameFunc.badClick);
        gameVar.mysteryBox.DOM.addEventListener("click", gameFunc.goodClick);
        gameVar.bowser.DOM.addEventListener("click", gameFunc.badBowser)
        gameVar.bowserJr.DOM.addEventListener("click", gameFunc.badBowserJr)
    },
    stopGame: function () {
        clearInterval(gameVar.x);
        clearInterval(gameVar.z);
        clearInterval(gameVar.zJr);
        clearInterval(gameVar.xMusic);
        gameVar.gameMusic.load();
        gameVar.gameMusic.pause();
        gameVar.bowser.DOM.style.display = "none";
        gameVar.bowserJr.DOM.style.display = "none";
        gameVar.mysteryBox.DOM.style.display = "none";
        gameVar.startBtn.DOM.addEventListener("click", game.startGame);
        for (let i = 0; i < highScoreArr.length; i++) {
            if (gameVar.scoreCount > highScoreArr[i].scoreGame) {
                gameVar.yoshi.play();
                var userNameTemp = prompt("Your name:");
                var dateTemp = new Date();
                var theDay = dateTemp.getDate();
                var theMonth = dateTemp.getMonth() + 1;
                var theYear = dateTemp.getFullYear();
                var dateText = `${theDay}/${theMonth}/${theYear}`
                var playerTemp = new NewPlayer(userNameTemp, gameVar.scoreCount, dateText);
                highScoreArr.splice(i, 0, playerTemp);
                highScoreArr.pop();
                highScoreSave();
                highScoreLoad();
                gameFunc.highScore();
                game.clearAll();
                affichedate();
                return alert("Bravo!!");
            };
        };
        gameVar.looseSound.play();
        game.clearAll();
        return alert("Game Over!");
    },
    clearAll: function () {
        gameVar.mysteryBox.DOM.style.width = "100px";
        gameVar.mysteryBox.DOM.style.height = "100px";
        gameVar.rotation = 2;
        gameVar.timer.val = 60;
        gameVar.lvlGame = 1;
        gameVar.scoreCount = 0;
        gameVar.clickMissed = 0;
        gameVar.exp = 10;
        gameVar.xBase = 0;
        gameVar.yBase = 0;
        gameVar.xBowser = 0;
        gameVar.yBowser = 0;
        gameVar.xBowserJr = 0;
        gameVar.yBowserJr = 0;
        moveBoxDelayTime = 300;
        gameVar.moveBowserTime = 2500,
            gameVar.moveBowserJrTime = 2000,
            gameVar.score.DOM.innerHTML = gameVar.scoreCount;
        gameVar.nextLvl.DOM.innerHTML = gameVar.exp;
        gameVar.lvl.DOM.innerHTML = gameVar.lvlGame;
        gameVar.missedClick.DOM.innerHTML = gameVar.clickMissed;
        gameVar.timer.DOM.innerHTML = gameVar.timeCount;
    },
};

function affichedate() {
    var score6 = document.querySelector(".score06");
    var divScore1 = document.getElementById("dateScore1");
    score6.addEventListener("mouseover", () => {
        divScore1.style.display = "block";
        divScore1.innerHTML = highScoreArr[0].dateScore;
    });
    score6.addEventListener("mouseout", () => {
        divScore1.style.display = "none";
    })
    var score7 = document.querySelector(".score07");
    var divScore2 = document.getElementById("dateScore2");
    score7.addEventListener("mouseover", () => {
        divScore2.style.display = "block";
        divScore2.innerHTML = highScoreArr[1].dateScore;
    });
    score7.addEventListener("mouseout", () => {
        divScore2.style.display = "none";
    })
    var score8 = document.querySelector(".score08");
    var divScore3 = document.getElementById("dateScore3");
    score8.addEventListener("mouseover", () => {
        divScore3.style.display = "block";
        divScore3.innerHTML = highScoreArr[2].dateScore;
    });
    score8.addEventListener("mouseout", () => {
        divScore3.style.display = "none";
    })
    var score9 = document.querySelector(".score09");
    var divScore4 = document.getElementById("dateScore4");
    score9.addEventListener("mouseover", () => {
        divScore4.style.display = "block";
        divScore4.innerHTML = highScoreArr[3].dateScore;
    });
    score9.addEventListener("mouseout", () => {
        divScore4.style.display = "none";
    })
    var score10 = document.querySelector(".score10");
    var divScore5 = document.getElementById("dateScore5");
    score10.addEventListener("mouseover", () => {
        divScore5.style.display = "block";
        divScore5.innerHTML = highScoreArr[4].dateScore;
    });
    score10.addEventListener("mouseout", () => {
        divScore5.style.display = "none";
    })

}
class NewPlayer {
    constructor(_userName, _scoreGame, _dateScore) {
        this.userName = _userName;
        this.scoreGame = _scoreGame;
        this.dateScore = _dateScore;
    }
}
const playerBase = {
    mario: new NewPlayer("Mario", 1000, "15/8/1986"),
    luigi: new NewPlayer("Luigi", 750, "24/10/1986"),
    bowser: new NewPlayer("Bowser", 500, "18/11/2009"),
    kamek: new NewPlayer("Kamek", 250, "31/8/2013"),
    peach: new NewPlayer("Peach", 100, "21/8/2008"),
}

const tableOfFate = [playerBase.mario, playerBase.luigi, playerBase.bowser, playerBase.kamek, playerBase.peach];
var highScoreArr = [];
var highScoreJson = "";
function highScoreLoad() {
    highScoreJson = localStorage.getItem("StarPlayer");
    highScoreArr = JSON.parse(highScoreJson);
    if (highScoreArr == null) {
        highScoreArr = tableOfFate;
    }
}
function highScoreSave() {
    highScoreJson = JSON.stringify(highScoreArr);
    localStorage.setItem("StarPlayer", highScoreJson);
}
gameVar.startBtn.DOM.addEventListener("click", game.startGame);
highScoreLoad();
gameFunc.highScore();
affichedate();
