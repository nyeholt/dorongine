;(function ($) {
	
	var game = {
		ticks: 0,
		items: {}
	};

	var types = {
		items: {},
		techs: {},
		itemsByComponent: function (component) {
			var items = [];
			for (var k in this.items) {
				if (this.items[k].components[component]) {
					items.push(this.items[k])
				}
			}
			return items;
		}
	};
	
	// all commands that could be executed
	var availableCommands = {
		
	};

	function SynnedGame() {
		this.name = 'default';
		this.seed = 1;
		this.commands = [];
	};

	SynnedGame.prototype = {
		log: function (msg) {
			if (window.console && window.console.log) {
				console.log(msg);
			}
		},
		types: function () {
			return types;
		},
		game: function () {
			return game;
		},
		addItem: function (item) {
			if (!item.components) {
				item.components = {};
			}
			types.items[item.name] = item;

			game.items[item.name] = {
				number: 0
			};
			
			this.ractive.set('types', types);
		},
		
		addCommand: function (command) {
			availableCommands[command.name] = command;
		},
		newCommand: function (name) {
			var cmd = availableCommands[name];
			if (cmd) {
				var newCmd = jQuery.extend(true, {}, cmd);
				return newCmd;
			}
		},
		runCommand: function (command) {
			this.commands.push(command);
		},
		addTech: function (tech) {
			tech.researched = false;
			types.techs[tech.name] = tech;
		},
		tick: function () {
			++game.ticks;
			this.ractive.set('game', game);
		},
		processCommands: function () {
			if (this.commands.length) {
				var command = this.commands.shift();
				while (command) {
					command.execute();
					command = this.commands.shift();
				}
				this.ractive.set('game', game);
			}
		},
		save: function () {
			var data = JSON.stringify(game);
			localStorage.setItem(this.name + '-game', data);
		},
		load: function (name) {
			var data = localStorage.getItem(name + '-game');
			game = JSON.parse(data);
		},
		
		random: function (min, max) {
			var x = Math.sin(this.seed++) * 10000;
			var rand = x - Math.floor(x);
			
			if (max) {
				rand = Math.floor(rand * (max - min + 1)) + min;
			}
			return rand;
		}
	};

	window.Synned = new SynnedGame();
	
	Synned.ractive = new Ractive({
		// The `el` option can be a node, an ID, or a CSS selector.
		el: 'container',
		// We could pass in a string, but for the sake of convenience
		// we're passing the ID of the <script> tag above.
		template: '#template',
		// Here, we're passing in some initial data
		data: {
			game: game,
			types: types
		}
	});

	
	var gameLoop = setInterval(function () {
		Synned.tick();
	}, 1000);
	
	var commandLoop = setInterval(function () {
		Synned.processCommands();
	}, 100);
	
})(jQuery);

