
Synned.addCommand({
	name: 'collectItem',
	execute: function () {
		if (this.context.components && this.context.components['raw']) {
			var current = Synned.game().items[this.context.name];
			var increase = 1;
			if (current.rates.raw) {
				increase = current.rates.raw;
			}
			current.amount += increase;
		}
	}
});

Synned.addCommand({
	name: 'buyItem',
	execute: function () {
		var item = this.context;
		var volume = this.volume ? this.volume : 1;
		if (Synned.canBuyItem(item)) {
			Synned.queueBuild(item, this.volume);
		}
	}
})

Synned.addCommand({
	name: 'mine',
	execute: function () {
		var nextRand = Synned.random() * 100;
		
		if (nextRand >= Synned.game().globalRates.mined) {
			return;
		}

		var mineable = Synned.types().byComponent('mined');
		var rand = Synned.random(0, mineable.length - 1);

		var mineType = mineable[rand];
		
		var toMine = Synned.game().items[mineType.name];
		
		nextRand = Synned.random() * 100;

		if (toMine && toMine.rates.mined > nextRand) {
			toMine.amount++;
		}
	}
});

