class TicTacToe{
    constructor(currentPlayer) {
        this.pickedTiles = 0;
        this.players = {
            "x": [[],[0]],
            "o": [[],[0]]
        }
        this.currentPlayer = currentPlayer;
        this.win = ["012", "036", "048", "147", "246", "258", "345", "678"];
        this.targetId;
    }
    reset () {
        this.players.x[1] = [0];
        this.players.o[1] = [0];
        document.querySelector(".points-player-x").textContent = 0;
        document.querySelector(".points-player-o").textContent = 0;
        this.newGame();
    }
    newGame() {
        this.players.x[0] = [];
        this.players.o[0] = [];
        this.pickedTiles = 0;
        setTimeout(function () { 
            document.querySelectorAll(".items.chosen").forEach(element => {
            element.replaceChildren();
            element.classList.remove("chosen", "x", "o");
        })
        if (document.querySelector(".active")) document.querySelector(".active").classList.remove("active");
    }, 2000)
    }
    checkWin () {
        this.win.forEach(el => {
            let points = 0;
            this.players[`${this.currentPlayer}`][0].forEach(elem => {
                if(el.indexOf(elem) >= 0) { points++}
            })
            if (points >= 3) {
                document.getElementById(el).classList.add("active");
                document.querySelector(`.points-player-${this.currentPlayer}`).textContent = ++this.players[`${this.currentPlayer}`][1];
                this.newGame();
                return;
            };
        })
        if (this.pickedTiles == 9) {
            this.newGame();
            document.body.animate([{background: "red"}, {background: "gainsboro"}], 1000);
        }
    }
    pickTile (id) {
        let p = document.createElement("p");
        p.innerText = `${this.currentPlayer.toUpperCase()}`;
        document.getElementById(id).appendChild(
            p
            ).classList.add(`${this.currentPlayer}`);
            document.getElementById(id).classList.add("chosen");
            this.players[`${this.currentPlayer}`][0].push(id);
            this.pickedTiles++;
        }
        changePlayer () {
            this.currentPlayer === "x" ? this.currentPlayer = "o" : this.currentPlayer = "x";
        }
}

const game = new TicTacToe("x");

document.getElementById("main-content").addEventListener("click", options);

var socket = io();
    
function options(event) {
    if (!event.target.classList.contains("chosen") && event.target.classList.contains("items")) {
        socket.emit('choice', event.target.id); 
    } else if (event.target.id == "reset") {
        game.reset();
    }
}   


socket.on('choice', function(choice) {
    game.pickTile(choice)
    if (game.pickedTiles >= 5) {
        game.checkWin();
    }
    game.changePlayer();
})