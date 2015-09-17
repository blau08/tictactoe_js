var paths = [[[0, 0], [0, 1], [0, 2]], [[1, 0], [1, 1], [1, 2]], [[2, 0], [2, 1], [2, 2]],
            [[0, 0], [1, 0], [2, 0]], [[0, 1], [1, 1], [2, 1]], [[0, 2], [1, 2], [2, 2]],
            [[0, 0], [1, 1], [2, 2]], [[2, 0], [1, 1], [0, 2]] ];

function Player(mark) {
  this.mark = mark;
}

function Space(xCoordinate, yCoordinate) {
  this.xCoordinate = xCoordinate;
  this.yCoordinate = yCoordinate;
  this.coordinates = [xCoordinate, yCoordinate];
  this.playerMark = null;
}

Space.prototype.selectSquare = function(player) {
  if (this.playerMark == null) {
    this.playerMark = player.mark;
    return (this.coordinates);
  }
}

Space.prototype.markedBy = function(xCoordinate, yCoordinate) {
  return this.playerMark;
}

function Board() {
  this.playBoard = [];
  for(var i = 0; i < 3; i++) {
    for(var j = 0; j < 3; j++) {
      this.playBoard.push(new Space(i, j));
    }
  }
}

Board.prototype.findSpace = function(coordinates) {
  for(var i = 0; i < this.playBoard.length; i++) {
    if (this.playBoard[i].xCoordinate === coordinates[0] && this.playBoard[i].yCoordinate === coordinates[1]) {
      return this.playBoard[i];
    }
  }
}

Board.prototype.availableSpaces = function() {
  var result = false;
  for (var i = 0; i < this.playBoard.length; i++) {
    if (this.playBoard[i].playerMark == null) {
      result = true;
    }
  }
  return result;
}

function Game() {
  this.board = new Board;
  this.player = new Player("X");
  this.player2 = new Player("O");
  this.computerMoves = [];

}

Game.prototype.checkWinner = function() {
  var result = false;
  for (var i = 0; i < paths.length; i++) {
    var first = paths[i][0];
    var second = paths[i][1];
    var third = paths[i][2];
    if (this.board.findSpace(first).playerMark == this.board.findSpace(second).playerMark && this.board.findSpace(second).playerMark == this.board.findSpace(third).playerMark) {
      if (this.player.mark === this.board.findSpace(first).playerMark) {
        result = "You win!";
      } else if (this.player2.mark === this.board.findSpace(first).playerMark) {
        result = "You lose!";
      }
    }
  }
  return result;
}

Game.prototype.checkStalemate = function() {
  var result = false;
  if (this.board.availableSpaces() == false && this.checkWinner() == false) {
    result = true;
  }
  return result;
}

Game.prototype.turn = function(playerChoice) {
  var result = false;
  if (this.board.findSpace(playerChoice).playerMark == null) {
    this.board.findSpace(playerChoice).selectSquare(this.player);
    if (this.checkWinner() !== false) {
      result = this.checkWinner();
    } else if (this.checkStalemate()) {
      result = "Tie game!"
    } else {
      this.strategy();
      if (this.checkWinner() !== false) {
        result = this.checkWinner();
      } else if (this.checkStalemate()) {
        result = "Tie game!"
      } else {
        result = true;
      }
    }
  }
  return result;
}

Game.prototype.strategy = function() {
  var move;
  for (var i = 0; i < paths.length; i++) {
    var first = paths[i][0];
    var second = paths[i][1];
    var third = paths[i][2];

    if (this.board.findSpace(first).playerMark === this.player2.mark && this.board.findSpace(second).playerMark == this.player2.mark && this.board.findSpace(third).playerMark === null) {
      move = third;
    } else if (this.board.findSpace(third).playerMark === this.player2.mark && this.board.findSpace(second).playerMark == this.player2.mark && this.board.findSpace(first).playerMark === null) {
      move = first;
    } else if (this.board.findSpace(third).playerMark === this.player2.mark && this.board.findSpace(first).playerMark == this.player2.mark && this.board.findSpace(second).playerMark === null) {
      move = second;
    }
  }
  if (move === undefined) {
    for (var j = 0; j < paths.length; j++) {
      var first = paths[j][0];
      var second = paths[j][1];
      var third = paths[j][2];
      if (this.board.findSpace(first).playerMark === this.player.mark && this.board.findSpace(second).playerMark == this.player.mark && this.board.findSpace(third).playerMark === null) {
        move = third;
      } else if (this.board.findSpace(third).playerMark === this.player.mark && this.board.findSpace(second).playerMark == this.player.mark && this.board.findSpace(first).playerMark === null) {
        move = first;
      } else if (this.board.findSpace(third).playerMark === this.player.mark && this.board.findSpace(first).playerMark == this.player.mark && this.board.findSpace(second).playerMark === null) {
        move = second;
      }
    }
  }
  if (move === undefined) {
    var gotSpot = false;
    var x;
    var y;
    while (gotSpot === false) {
      x = Math.floor(Math.random()*3);
      y = Math.floor(Math.random()*3);
      if (this.board.findSpace([x, y]).playerMark === null) {
        move = [x, y];
        gotSpot = true;
      }
    }
  }
  // if (move === undefined) {
  //   var possiblePaths = [];
  //   for (var x = 0; x < paths.length; x++) {
  //     var first = paths[x][0];
  //     var second = paths[x][1];
  //     var third = paths[x][2];
  //     if (this.board.findSpace(first).playerMark === this.player.mark || this.board.findSpace(second).playerMark == this.player.mark || this.board.findSpace(third).playerMark === this.player.mark) {
  //     } else {
  //       possiblePaths.push(paths[x]);
  //     }
  //   }
  //   var space;
  //   var spaces = {};
  //   var maxCount = 1;
  //   for(var y = 0; y < possiblePaths.length; y++) {
  //     for(var z = 0; z < 3; z++) {
  //       var currentSpot = possiblePaths[y][z];
  //       if (spaces[currentSpot] == null && currentSpot.playerMark == null) {
  //         spaces[currentSpot] = 1;
  //       } else {
  //         spaces[currentSpot]++;
  //       }
  //       if (spaces[currentSpot] > maxCount) {
  //         space = currentSpot;
  //         maxCount = spaces[currentSpot];
  //       }
  //     }
  //   }
  //   if (space == undefined) {
  //     var gotSpot = false;
  //     while (gotSpot = false) {
  //       var spot = Object.keys(spaces)[Math.floor(Math.random()*(Object.keys(spaces).length))];
  //       debugger;
  //       if (spot.playerMark == null) {
  //         move = spot;
  //         gotSpot = true;
  //       }
  //     }
  //   } else {
  //     move = space;
  //   }
  // }
  this.board.findSpace(move).selectSquare(this.player2);
  this.computerMoves.unshift(this.board.findSpace(move));
}

$(document).ready(function() {
  var newGame = new Game;
  $('#message').text("");
  $("div.space").click(function(event) {
    var array = event.target.id.split(",");
    for(var i=0; i<array.length; i++) { array[i] = +array[i]; }
    var result = newGame.turn(array);
    if (result !== false) {
      document.getElementById(event.target.id).style.backgroundColor="#343d46";
      var array = newGame.computerMoves[0].coordinates;
      var selector = array[0].toString() + "," + array[1].toString();
      document.getElementById(selector).style.backgroundColor="#f0f5fe";
      if (result !== true) {
        $('#message').text(result);
      }
    }
  })
})
