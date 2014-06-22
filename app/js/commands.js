
Clicker.addCommand({
	name: 'collectItem',
	execute: function () {
		if (this.context.components && this.context.components['raw']) {
			var current = Clicker.game().items[this.context.name];
			var increase = 1;
			if (current.rates.raw) {
				increase = current.rates.raw;
			}
			
			if (current.canAdd(increase)) {
				current.amount += increase;
			}
		}
	}
});

Clicker.addCommand({
	name: 'buyItem',
	execute: function () {
		var item = this.context;
		var volume = this.volume ? this.volume : 1;
		if (item.canBuy(volume) && item.canAdd(volume)) {
			Clicker.queueBuild(item, volume);
		}
	}
})

Clicker.addCommand({
	name: 'mine',
	execute: function () {
		var nextRand = Clicker.random() * 100;
		
		if (nextRand >= Clicker.game().globalRates.mined) {
			return;
		}

		var mineable = Clicker.game().byComponent('mined');
		var rand = Clicker.random(0, mineable.length - 1);

		var toMine = mineable[rand];
		
		nextRand = Clicker.random() * 100;

		if (toMine && toMine.rates.mined > nextRand) {
			toMine.amount++;
		}
	}
});

