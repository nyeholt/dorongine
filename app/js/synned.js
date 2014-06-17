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

	function SynnedGame() {
		this.name = 'default';
		this.game = game;
		
		this.commands = [];
	};

	SynnedGame.prototype = {
		log: function (msg) {
			if (window.console && window.console.log) {
				console.log(msg);
			}
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
			this.commands.push(command);
		},
		addTech: function (tech) {
			tech.researched = false;
			types.techs[tech.name] = tech;
		},
		tick: function () {
			++game.ticks;
			
			if (this.commands.length) {
				var command = this.commands.shift();
				while (command) {
					command.execute();
					command = this.commands.shift();
				}
			}
			
			this.ractive.set('game', game);
		},
		save: function () {
			var data = JSON.stringify(game);
			localStorage.setItem(this.name + '-game', data);
		},
		load: function (name) {
			var data = localStorage.getItem(name + '-game');
			game = JSON.parse(data);
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

	Synned.ractive.on('collectItem', function (button) {
		if (button.context && button.context.components && button.context.components['raw']) {
			var item = button.context;
			
			// todo - abstract this command create -> push
			Synned.addCommand({
				item: button.context,
				execute: function () {
					var current = game.items[this.item.name];
					current.number++;
				}
			})
		}
	});
	
	var gameLoop = setInterval(function () {
		Synned.tick();
	}, 1000);
})(jQuery);

