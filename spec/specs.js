describe('Player', function() {
  it("returns the player's mark", function() {
    var testPlayer = new Player("X");
    expect(testPlayer.mark).to.equal("X");
  });
});

describe('Space', function() {
  it("returns the player's mark", function() {
    var testSpace = new Space(1, 2);
    expect(testSpace.xCoordinate).to.equal(1);
  });

  it("returns the player's mark", function() {
    var testSpace = new Space(1, 2);
    expect(testSpace.yCoordinate).to.equal(2);
  });

  it("lets a player mark a space", function() {
    var testPlayer = new Player("X");
    var testSpace = new Space(1, 2);
    testSpace.selectSquare((testPlayer));
    expect(testSpace.markedBy()).to.equal("X");
  });
});

describe('Board', function() {
  it("creates 9 spaces when it is initialized", function() {
    var testBoard = new Board();
    expect(testBoard.playBoard.length).to.equal(9);
  });

  it("finds a space by coordinates", function() {
    var testBoard = new Board();
    expect(testBoard.findSpace([1,1]).coordinates).to.eql([1,1]);
  });
});

describe('Game', function() {
  it("initializes the game and alerts when a winner is found", function() {
    var testGame = new Game;
    expect(testGame.board.playBoard.length).to.equal(9);
    expect(testGame.player.mark).to.equal("X");
  });

  it("checks if a player marks a space", function() {
    var testGame = new Game;
    testGame.board.findSpace([1, 2]).selectSquare(testGame.player);
    expect(testGame.board.findSpace([1, 2]).playerMark).to.equal("X");
  });

  it("prevents a player from marking a used space", function() {
    var testGame = new Game;
    testGame.board.findSpace([1, 2]).selectSquare(testGame.player);
    testGame.board.findSpace([1, 2]).selectSquare(testGame.player2);
    expect(testGame.board.findSpace([1, 2]).playerMark).to.equal("X");
  })

  it("tells when a player has won", function() {
    var testGame = new Game;
    testGame.board.findSpace([1, 1]).selectSquare(testGame.player);
    testGame.board.findSpace([1, 0]).selectSquare(testGame.player2);
    testGame.board.findSpace([0, 0]).selectSquare(testGame.player);
    testGame.board.findSpace([1, 2]).selectSquare(testGame.player2);
    testGame.board.findSpace([2, 2]).selectSquare(testGame.player);
    expect(testGame.checkWinner()).to.equal("You win!");
  })
  it("tells when a player has lost", function() {
    var testGame = new Game;
    testGame.board.findSpace([1, 0]).selectSquare(testGame.player);
    testGame.board.findSpace([1, 1]).selectSquare(testGame.player2);
    testGame.board.findSpace([0, 0]).selectSquare(testGame.player);
    testGame.board.findSpace([2, 0]).selectSquare(testGame.player2);
    testGame.board.findSpace([2, 2]).selectSquare(testGame.player);
    testGame.board.findSpace([0, 2]).selectSquare(testGame.player2);
    expect(testGame.checkWinner()).to.equal("You lose!");
  })
  it("tells when there is a stalemate", function() {
    var testGame = new Game;
    testGame.board.findSpace([0, 0]).selectSquare(testGame.player);
    testGame.board.findSpace([1, 0]).selectSquare(testGame.player2);
    testGame.board.findSpace([2, 0]).selectSquare(testGame.player);
    testGame.board.findSpace([2, 1]).selectSquare(testGame.player2);
    testGame.board.findSpace([0, 1]).selectSquare(testGame.player);
    testGame.board.findSpace([0, 2]).selectSquare(testGame.player2);
    testGame.board.findSpace([1, 1]).selectSquare(testGame.player);
    testGame.board.findSpace([2, 2]).selectSquare(testGame.player2);
    testGame.board.findSpace([1, 2]).selectSquare(testGame.player);
    expect(testGame.board.availableSpaces()).to.equal(false);
  });
  it("lets a player take a turn", function() {
    var testGame = new Game;
    var test = testGame.turn([1,2]);
    expect(test).to.equal(true);
  });
  it("makes a comp move after a player move", function() {
    var testGame = new Game;
    var test = testGame.turn([1,2]);
    expect(testGame.computerMoves.length).to.equal(1);
  });
  it("makes the comp make a strategic move", function() {
    var testGame = new Game;
    testGame.turn([0,0]);
    expect(testGame.computerMoves[0].coordinates).to.eql([1,1]);
  });
  it("makes the comp make a strategic move", function() {
    var testGame = new Game;
    testGame.turn([1,1]);
    expect(testGame.computerMoves[0].coordinates).to.eql([0,0]);
  });
});
