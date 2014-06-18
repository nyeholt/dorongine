;(function ($) {
	
	var game = {
		ticks: 0,
		items: {},
		globalRates: {
			mined: 10
		},
		topics: {
			
		}
	};

	var types = {
		items: {},
		techs: {},
		topics: {
			
		},
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

	function SynnedGame(seed) {
		this.name = 'default';
		this.seed = seed ? seed : 1;
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

			var rates = {};
			for (var c in item.components) {
				if (item.components[c].rate) {
					rates[c] = item.components[c].rate;
				}
			}

			game.items[item.name] = {
				amount: 0,
				rates: rates
			};

			this.ractive.set('types', types);
		},
		addTopic: function (topic) {
			types.topics[topic.name] = topic;
			game.topics[topic.name] = {
				knowledge: 0,
				level: 0
			};
			
			this.ractive.set('game', game);
		},
		addCommand: function (command) {
			availableCommands[command.name] = command;


			this.ractive.on(command.name, function (button) {
				if (button.context) {
					var cmd = Synned.newCommand(command.name, button.context);
					Synned.runCommand(cmd);
				}
			});
		},
		newCommand: function (name, context) {
			var cmd = availableCommands[name];
			if (cmd) {
				var newCmd = jQuery.extend(true, {}, cmd);
				newCmd.context = context;
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

	var time = (new Date()).getTime() % 100000;

	window.Synned = new SynnedGame(time);
	
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

