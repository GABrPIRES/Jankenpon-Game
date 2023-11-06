var elementos = document.querySelectorAll('.player-options div > img');
var playerOpt = '';
var enemyOpt = '';
var placarPlayer = 0;
var placarEnemy = 0;

function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const playerName = getURLParameter('menu-name-player');
if (playerName) {
    console.log(`Player Name: ${playerName}`);
}

document.querySelector('.player-options h3').innerHTML = `${playerName}`;

function mudandoPlacar(vencedor) {
    setTimeout(function () {
        if (vencedor == "draw") {
            return;
        } else if (vencedor == "Machine") {
            var placar = document.querySelector('.placar .enemy-placar');
            placar.innerHTML = placarEnemy;
        } else {
            var placar = document.querySelector('.placar .player-placar');
            placar.innerHTML = placarPlayer;
        }
    }, 1000);

}

function aparecerPlacar() {
    setTimeout(function () {
        var winnerTable = document.querySelector('.winner-table');
        winnerTable.style.display = 'block';
    }, 500);
}

function tabelaVencedor(vencedor) {
    var winnerTable = document.querySelector('.winner-table p');
    var winnerTableH2 = document.querySelector('.winner-table h2');
    if (vencedor == 'draw') {
        winnerTableH2.innerHTML = `Tie`
        winnerTable.innerHTML = `It's a tie!`;
    } else if (vencedor == "Machine") {
        winnerTableH2.innerHTML = `Defeated`
        winnerTable.innerHTML = `${vencedor} win!`;
    } else {
        winnerTableH2.innerHTML = `Winner`
        winnerTable.innerHTML = `${vencedor} win!`;
    }
    mudandoPlacar(vencedor);
}

function validarVitoria() {
    if (playerOpt == enemyOpt) {
        var draw = "draw";
        tabelaVencedor(draw);
    } else if (playerOpt == "tesoura" && enemyOpt == "papel" || playerOpt == "papel" && enemyOpt == "pedra" || playerOpt == "pedra" && enemyOpt == "tesoura") {
        placarPlayer += 1;
        tabelaVencedor(playerName);
    } else {
        var enemy = "Machine";
        placarEnemy += 1;
        tabelaVencedor(enemy);
    }
}

function resetEnemy() {
    const enemyOptions = document.querySelectorAll(".enemy-options div img");
    for (var i = 0; i < enemyOptions.length; i++) {
        enemyOptions[i].style.opacity = 0.3;
    }
}

function inimigoJogar() {
    let rand = Math.floor(Math.random() * 3);

    const enemyOptions = document.querySelectorAll(".enemy-options div img");
    resetEnemy();
    for (var i = 0; i < enemyOptions.length; i++) {
        if (i == rand) {
            enemyOptions[i].style.opacity = 1;
            enemyOpt = enemyOptions[i].getAttribute('opt');
        }
    }

    validarVitoria();
    aparecerPlacar();
}

function resetOpacityPlayer() {
    for (var i = 0; i < elementos.length; i++) {
        elementos[i].style.opacity = 0.3;
    }
}

for (var i = 0; i < elementos.length; i++) {
    elementos[i].addEventListener('click', function (t) {
        resetOpacityPlayer();
        t.target.style.opacity = 1;
        playerOpt = t.target.getAttribute('opt');

        inimigoJogar();
    })
}

function fecharTabela() {
    var winnerTable = document.querySelector('.winner-table');
    winnerTable.style.display = 'none';
}