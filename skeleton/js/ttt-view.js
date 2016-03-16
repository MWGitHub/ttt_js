var View = function (game, $el) {
	this._game = game;
	this._$el = $el;
	this.setupBoard();
	this.bindEvents();
};

View.prototype.bindEvents = function () {
	this._$el.on('click', 'ul > li', this.onClick.bind(this));
};

View.prototype.handleWinner = function () {
	var winner = this._game.winner();
	$('.' + winner).toggleClass('winner');
	$('.game-grid > li').toggleClass("loser");
	$('body').append("<h2>You win, "+winner+"!</h2>");
};

View.prototype.handleTie = function () {
	$('.game-grid > li').toggleClass("loser");
	$('body').append("<h2>It's a draw!</h2>");
};

View.prototype.makeMove = function ($square) {
	if (this._game.isOver()) return;
	var pos = $square.data("square").id;
	var row = Math.floor(pos / 3);
	var col = pos % 3;
	var currentPlayer = this._game.currentPlayer;
	try {
		this._game.playMove([row, col]);
		$square.toggleClass(currentPlayer);

	 	if (this._game.winner()) {
			this.handleWinner();
		}
		else if (this._game.isOver()) {
			this.handleTie();

		}
	}
	catch (e) {
		alert('Invalid move! Try again.');
	}
};

View.prototype.onClick = function(e) {
	var $square = $(e.currentTarget);
	this.makeMove($square);
};

View.prototype.setupBoard = function () {
	this._$el.append('<ul class="game-grid group"></ul>');
	var $ul = $('.game-grid');
	for (var i = 0; i < 9; i++) {
		$ul.append("<li data-square='{\"id\":"+i+"}'></li>");
	}
};

module.exports = View;
