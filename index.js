/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360 && top < 400) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerCenter = dodgerLeftEdge + 20;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockCenter = rockLeftEdge + 10;

    if (Math.abs(dodgerCenter-rockCenter)<30) {
      return true;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`
  var top = 0
  rock.style.top = top;

  GAME.appendChild(rock);

  function moveRock() {
     if(checkCollision(rock)){
       return endGame();
     }

     top = positionToInteger(rock.style.top);
     rock.style.top = `${top + 2}px`;
     window.requestAnimationFrame(moveRock);

     if(top>400)
      rock.remove();
  }

  window.requestAnimationFrame(moveRock);
  ROCKS.push(rock)

  return rock
}

function endGame() {
  clearInterval(gameInterval);
  ROCKS.forEach(function(element){
    element.remove()
  });
  window.removeEventListener('keydown',moveDodger);
  alert("YOU LOSE!");
}

function moveDodger(e) {
   if(e.which == LEFT_ARROW){
     moveDodgerLeft();
   }
   if(e.which == RIGHT_ARROW){
     moveDodgerRight();
   }
}

function moveDodgerLeft() {
  window.requestAnimationFrame(function(){
    var leftNumbers = dodger.style.left.replace('px', '')
    var left = parseInt(leftNumbers, 10)

    if (left > 0) {
      dodger.style.left = `${left - 4}px`
    }
  });
}

function moveDodgerRight() {
  window.requestAnimationFrame(function(){
    var leftNumbers = dodger.style.left.replace('px','');
    var left = parseInt(leftNumbers, 10);

    if(left<GAME_WIDTH-40){
      dodger.style.left = `${left + 4}px`;
    }
  });
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)

}
