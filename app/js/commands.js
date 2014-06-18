
Synned.addCommand({
	name: 'collectItem',
	execute: function () {
		var current = Synned.game().items[this.item.name];
		current.number++;
	}
});


Synned.addCommand({
	name: 'mine',
	execute: function (context) {
		var minable = Synned.types().itemsByComponent('mined');
		var rand = Synned.random(0, minable.length - 1);

		var toMine = minable[rand];

		var nextRand = Synned.random();

		if (toMine && toMine.rate > nextRand) {
			var current = Synned.game().items[toMine.name];
			current.number++;
		}
	}
});


Synned.ractive.on('collectItem', function (button) {
	if (button.context && button.context.components && button.context.components['raw']) {
		var item = button.context;
		
		var cmd = Synned.newCommand('collectItem');
		cmd.item = button.context;
		Synned.runCommand(cmd);
	}
});


Synned.ractive.on('mine', function () {
	var cmd = Synned.newCommand('mine');
	Synned.runCommand(cmd);
});