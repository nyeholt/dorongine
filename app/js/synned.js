
;(function ($) {
	
	var byComponent = function (component) {
		var items = [];
		for (var k in this.items) {
			if (this.items[k].components[component]) {
				items.push(this.items[k])
			}
		}
		return items;
	};

	var game = {
		ticks: 0,
		items: {},
		globalRates: {
			mined: 30
		},
		topics: {
			
		},
		buildQueue: [],
		byComponent: byComponent
	};
	
	var tickers = [];
	var fastTickers = [];

	var types = {
		items: {},
		techs: {},
		topics: {
			
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
		itemsByType: function (type) {
			
		},
		addItem: function (item) {
			if (!item.components) {
				item.components = {};
			}
			
//			types.items[item.name] = item;

			var rates = {};
			for (var c in item.components) {
				if (item.components[c].rate) {
					rates[c] = item.components[c].rate;
				}
			}

			item.canBuy = this.canBuyItem;
			item.rates = rates;
			item.amount = item.defaultAmount ? item.defaultAmount : 0;

			game.items[item.name] = item;
//			{
//				amount: 0,
//				rates: rates
//			};

			this.ractive.set('types', types);
		},
		canBuyItem: function (item, volume) {
			if (!volume) {
				volume = 1;
			}
			var okay = true;
			if (item.components.created && item.components.created.cost) {
				for (var itemType in item.components.created.cost) {
					// check stock levels
					var requiredAmount = item.components.created.cost[itemType] * volume;
					if (game.items[itemType].amount < requiredAmount) {
						okay = false;
						break;
					}
				}
			}
			if (okay && item.requires && item.requires.topics) {
				for (var topic in item.requires.topics) {
					if (game.topics[topic].level < item.requires.topics[topic]) {
						okay = false;
					}
				}
			}
			
			return okay;
		},
		addTopic: function (topic) {
			types.topics[topic.name] = topic;
			game.topics[topic.name] = {
				knowledge: 0,
				level: 0,
				target: 100,
				percentage: 0
			};
			this.ractive.observe('game.topics.' + topic.name +'.percentage', this.updateTopics);
			this.ractive.set('game', game);
		},
		updateTopics: function () {
			var currentAmount = 0;
			for (var k in game.topics) {
				var topic = game.topics[k];
				topic.percentage = parseInt(topic.percentage);
				currentAmount += topic.percentage;
				if (currentAmount > 100) {
					topic.percentage = 0;
				}
			}
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
		queueBuild: function (item, volume) {
			for (var i = 0, c = fastTickers.length; i < c; i++) {
				if (fastTickers[i].name == 'Builder') {
					fastTickers[i].queueItem(item, volume);
					return;
				}
			}
		},
		addTech: function (tech) {
			tech.researched = false;
			types.techs[tech.name] = tech;
		},
		addTicker: function (listener) {
			tickers.push(listener);
		},
		addFastTicker: function (listener) {
			fastTickers.push(listener);
		},
		tick: function () {
			++game.ticks;
			for (var i = 0, c = tickers.length; i < c; i++) {
				tickers[i].tick();
			}

			this.ractive.set('types', types);
		},
		processCommands: function () {
			if (this.commands.length) {
				var command = this.commands.shift();
				while (command) {
					command.execute();
					command = this.commands.shift();
				}
			}
			for (var i = 0, c = fastTickers.length; i < c; i++) {
				fastTickers[i].tick();
			}
			this.ractive.set('game', game);
		},
		save: function () {
			var data = JSON.stringify(game);
			localStorage.setItem(this.name + '-game', data);
		},
		load: function () {
			var data = localStorage.getItem(this.name + '-game');
			game = JSON.parse(data);
			game.byComponent = byComponent;
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

