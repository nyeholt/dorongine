
;(function () {
	var gameLoop;
	var commandLoop;

	var byComponent = function (component, mapped) {
		var items;
		if (mapped) {
			items = {};
		} else {
			items = [];
		}
		
		for (var k in this.items) {
			if (this.items[k].components[component]) {
				if (mapped) {
					items[k] = this.items[k];
				} else {
					items.push(this.items[k])
				}
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
		transactions: [],
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

	function ClickerGame(seed) {
		this.name = 'default';
		this.seed = seed ? seed : 1;
		this.commands = [];
		
		this.initters = [];

		this.ractive = new Ractive({
			// The `el` option can be a node, an ID, or a CSS selector.
			el: 'container',
			// We could pass in a string, but for the sake of convenience
			// we're passing the ID of the <script> tag above.
			template: '#template',
			// Here, we're passing in some initial data
			data: {
				game: game,
				types: types,
			}
		});
	};

	ClickerGame.prototype = {
		log: function (msg) {
			if (window.console && window.console.log) {
				console.log(msg);
			}
		},
		onInit: function (func) {
			this.initters.push(func);
		},
		// reset everything to rego
		init: function () {
			clearInterval(gameLoop);
			clearInterval(commandLoop);

			game = {
				ticks: 0,
				items: {},
				globalRates: {
					mined: 30
				},
				topics: {

				},
				buildQueue: [],
				transactions: [],
				byComponent: byComponent
			};
			
			tickers = [];
			fastTickers = [];

			types = {
				items: {},
				techs: {},
				topics: {

				}
			};

			// all commands that could be executed
			availableCommands = {

			};
			
			for (var i = 0; i < this.initters.length; i++) {
				this.initters[i].call(this);
			}
		},
		start: function () {
			var clicker = this;

			gameLoop = setInterval(function () {
				clicker.tick();
			}, 1000);

			commandLoop = setInterval(function () {
				clicker.processCommands();
			}, 100);
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

			item = jQuery.extend({}, Item, item);
			
			item.rates = rates;
			item.amount = item.defaultAmount ? item.defaultAmount : 0;

			game.items[item.name] = item;
//			{
//				amount: 0,
//				rates: rates
//			};

//			this.ractive.set('types', types);
		},
		
		addTopic: function (topic) {
			types.topics[topic.name] = topic;
			game.topics[topic.name] = {
				icon: topic.icon,
				knowledge: 0,
				level: 0,
				target: 100,
				percentage: 0
			};
			this.ractive.observe('game.topics.' + topic.name +'.percentage', this.updateTopics);
//			this.ractive.set('game', game);
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
					var cmd = Clicker.newCommand(command.name, button.context);
					Clicker.runCommand(cmd);
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
			var oldgame = JSON.parse(data);
			
			var newgame = jQuery.extend(true, {}, game, oldgame);
			game = newgame;
			// rebind functions
			game.byComponent = byComponent;
			for (var type in game.items) {
				game.items[type] = jQuery.extend({}, Item, game.items[type]);
			}
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

	var Item = {
		applyImprovement: function () {
			if (this.components.improves) {
				for (var type in this.components.improves) {
					if (Clicker.game().items[type].rates && Clicker.game().items[type].rates.raw) {
						var current = Clicker.game().items[type].rates.raw;
						Clicker.game().items[type].rates.raw = current + current * this.components.improves[type];
					}
				}
			}
			
			if (this.components.increases) {
				for (var type in this.components.increases) {
					if (Clicker.game().items[type]) {
						Clicker.game().items[type].maximum += this.components.increases[type];
					} else {
						// try by component type
						var items = Clicker.game().byComponent(type);
						if (items && items.length) {
							for (var i = 0; i < items.length; i++) {
								items[i].maximum += this.components.increases[type];
							}
						}
					}
				}
			}
		},
		formattedAmount: function () {
			return this.amount;
		},
		meetsRequirements: function () {
			if (!this.components.requires) {
				return true;
			}
			
			if (this.components.requires.topics) {
				for (var topic in this.components.requires.topics) {
					if (game.topics[topic].level < this.components.requires.topics[topic]) {
						return false;
					}
				}
			}

			if (this.components.requires.items) {
				for (var item in this.components.requires.items) {
					if (game.items[item].amount < this.components.requires.items[item]) {
						return false;
					}
				}
			}

			return true;
		},
		canBuy: function (volume) {
			var item = this;
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
			
			return okay && this.canAdd(volume) && this.meetsRequirements();
		}, 
		canAdd: function (number) {
			if (number < 0 && this.amount <= 0) {
				return false;
			}
			
			var max = this.maximum ? this.maximum : 1000;
			if (number > 0 && this.amount >= max) {
				return false;
			}

			return true;
		},
		iconfor: function (name) {
			if (game.items[name]) {
				return game.items[name].icon;
			}
			
			console.log("Iconfor " + name);
			
			return types.topics[name].icon;
		}
	};
	
	var seed = (new Date()).getTime() % 100000;

	window.Clicker = new ClickerGame(seed);

})();

