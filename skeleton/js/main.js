var View = require('./ttt-view');
var Game = require('../../ttt-core-solution/game');

$(function () {
  // Your code here
	var game = new Game();
	var view = new View(game, $('.ttt').first());
});
