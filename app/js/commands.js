
Synned.addCommand({
	name: 'collectItem',
	execute: function () {
		if (this.context.components && this.context.components['raw']) {
			var current = Synned.game().items[this.context.name];
			current.amount++;
		}
	}
});

Synned.addCommand({
	name: 'mine',
	execute: function (context) {
		var nextRand = Synned.random() * 100;
		
		if (nextRand >= Synned.game().globalRates.mined) {
			return;
		}
		
		var mineable = Synned.types().itemsByComponent('mined');
		var rand = Synned.random(0, mineable.length - 1);

		var mineType = mineable[rand];
		
		var toMine = Synned.game().items[mineType.name];
		
		nextRand = Synned.random() * 100;

		if (toMine && toMine.rates.mined > nextRand) {
			toMine.amount++;
		}
	}
});

