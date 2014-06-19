
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
			// wee do what we need to do
			var allItems = Synned.game().items;
			
			if (item.components.created && item.components.created.cost) {
				for (var itemType in item.components.created.cost) {
					// check stock levels
					var requiredAmount = item.components.created.cost[itemType] * volume;
					if (allItems[itemType].amount >= requiredAmount) {
						allItems[itemType].amount -= requiredAmount;
					} else {
						Synned.log("Item " + itemType + " was checked for sufficient amount, but there doesn't seem to be enough now");
					}
				}
			}
			allItems[item.name].amount += volume;
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

