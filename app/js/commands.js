
Clicker.onInit(function() {

	Clicker.addCommand({
		name: 'collectItem',
		execute: function() {
			if (this.context.components && this.context.components['raw']) {
				var current = Clicker.game().items[this.context.name];
				var increase = 1;
				if (current.rates.raw) {
					increase = current.rates.raw;
				}

				var stats = Clicker.game().stats.clicks;
				if (!stats[this.context.name]) {
					stats[this.context.name] = 1;
				} else {
					stats[this.context.name] += 1;
				}
				
				if (stats[this.context.name] % 100 === 0 && current.bonus) {
					var toAdd = stats[this.context.name] / 100;
					Clicker.message(stats[this.context.name] + " click bonus awarded for " + current.name + " - Keep clicking!", 'good', current.name);
					if (typeof ga === 'function') {
						ga('send', 'event', 'game', 'player', 'bonus' , toAdd);
					}
					increase = toAdd * current.bonus;
				}

				if (current.canAdd(increase)) {
					current.add(increase);
				}
			}
		}
	});

	Clicker.addCommand({
		name: 'buyItem',
		execute: function() {
			var item = this.context;
			
			var volume = this.volume ? this.volume : (item.buyVolume ? parseInt(item.buyVolume) : 1);
			if (item.canBuy(volume) && item.canAdd(volume)) {
				Clicker.queueBuild(item, volume);
			}
		}
	});
	
	Clicker.addCommand({
		name: 'sellItem',
		execute: function() {
			var item = this.context;
			var volume = this.volume ? this.volume : (item.buyVolume ? parseInt(item.buyVolume) : 1);
			if (item.amount >= volume && item.components.market.sell > 0) {
				var transactionRecord = {type: 'sell', item: item.name, items: {}};
				transactionRecord.items[item.name] = volume;
				
				var total = item.components.market.sell * volume;
				
				transactionRecord.volume = volume;
				transactionRecord.price = item.components.market.sell;
				transactionRecord.total = total;
				
				item.amount -= volume;
				Clicker.game().items.Cash.amount += total;
				
				Clicker.game().transactions.push(transactionRecord);
				
				item.components.market.lastSell = Clicker.game().ticks;
				
				item.components.market.sell -= item.components.market.sell * (volume * 0.01);
				item.components.market.buy -= item.components.market.sell * (volume * 0.008);
			}
		}
	})

// for the amount of ore consumed, generated a single random ore item
	Clicker.addCommand({
		name: 'mine',
		perOp: 1,
		execute: function() {
			var i = 0;
			while (i < this.perOp) {
				var nextRand = Clicker.random() * 100;

				if (nextRand >= Clicker.game().globalRates.mined) {
					return;
				}

				var mineable = Clicker.game().byComponent('mined');
				var rand = Clicker.random(0, mineable.length - 1);

				var toMine = mineable[rand];

				nextRand = Clicker.random() * 100;

				if (toMine && toMine.rates.mined > nextRand && toMine.canAdd(1)) {
					toMine.add(1);
				} 
				i++;
			}
		}
	});
});