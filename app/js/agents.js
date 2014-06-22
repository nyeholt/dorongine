
Clicker.addTicker({
	name: 'Migration',
	onTick: 60,
	currentTick: 0,
	tick: function () {
		this.currentTick++;
		
		if (this.currentTick >= this.onTick) {
			// add a person
			var num = Math.floor(Clicker.game().items.People.rates.increment);

			Clicker.game().items.People.amount += num;
			
			this.currentTick = 0;
		}
	}
});

Clicker.addTicker({
	name: 'Workers',
	tick: function () {
		var workers = Clicker.game().byComponent('worker');
		var raw = Clicker.game().byComponent('raw', true);
		
		for (var i = 0, c = workers.length; i < c; i++) {
			var worker = workers[i];
			
			if (!worker.disabled && worker.amount > 0) {
				if (!worker.workTicks) {
					worker.workTicks = 0;
				}
				worker.workTicks++;

				// actually do the work now
				if (worker.workTicks >= worker.rates.worker) {
					if (worker.components.worker.provides) {
						for (var prov in worker.components.worker.provides) {
							// add it in to the relevant bits
							var base = worker.components.worker.provides[prov];
							if (raw[prov] && raw[prov].rates.raw) {
								base *= raw[prov].rates.raw;
							}
							var toAdd = worker.amount * base;
							Clicker.log("Doing work by " + worker.name + " creating " + toAdd + " for " + prov);
							if (Clicker.game().items[prov]) {
								var addto = Clicker.game().items[prov];
								
								if (addto.canAdd(toAdd)) {
									addto.amount += toAdd;
								}
							} else if (Clicker.game().topics[prov]) {
								Clicker.game().topics[prov].knowledge += toAdd;
							}
						}
					}
					worker.workTicks = 0;
				}
			}
		}
	}
});

Clicker.addTicker({
	name: 'Consumers',
	tick: function () {
		var workers = Clicker.game().byComponent('consumer');
		for (var i = 0, c = workers.length; i < c; i++) {
			var worker = workers[i];
			
			if (worker.amount > 0) {
				
				if (!worker.consumptionTicks) {
					worker.consumptionTicks = 0;
				}
				worker.consumptionTicks++;

				// actually do the work now
				if (worker.consumptionTicks >= worker.rates.consumer) {
					Clicker.log("Consuming items for  " + worker.name);
					if (worker.components.consumer.consumes) {
						for (var prov in worker.components.consumer.consumes) {
							// add it in to the relevant bits
							var toRemove = worker.amount * worker.components.consumer.consumes[prov];
							
							if (Clicker.game().items[prov] && Clicker.game().items[prov].amount >= toRemove) {
								// TODO - CHECK FOR NEGATIVES AND PUNISH
								// make sure to reset if it was previously disabled. 
								worker.disabled = false;
								Clicker.game().items[prov].amount -= toRemove;
							} else {
								Clicker.log("Disabling " + worker.name + " due to insufficient " + prov);
								worker.disabled = true;
								break;
							}
						}
					}
					worker.consumptionTicks = 0;
				}
			}
		}
	}
});

/**
 * Spreads Brainpower over the various areas of research
 */
Clicker.addTicker({
	name: 'Researcher',
	maxLevel: 10,
	researchMinAmount: 10, // level required before research will be applied, prevents 10% on first item blocking all others.
	tick: function () {
		var amount = Clicker.game().items.Brainpower.amount;
		if (amount > this.researchMinAmount) {
			var totalUsed = 0;
			for (var name in Clicker.game().topics) {
				var topic = Clicker.game().topics[name];
				
				if (topic.percentage > 0) {
					var toAdd = Math.floor((topic.percentage / 100) * amount);
					topic.knowledge += toAdd;
					
					totalUsed += toAdd;
					
					if (topic.knowledge >= topic.target) {
						amount += topic.knowledge - topic.target;
						topic.knowledge = 0;
						topic.target = Math.pow(10, (topic.level + 3));
						
						if (topic.level < this.maxLevel) {
							topic.level++;
							var topicType = Clicker.types().topics[name];
							if (topicType.levelUp) {
								Clicker.log("Leveling up " + name + " to " + topic.level);
								topicType.levelUp(topic.level);
							}
						}
					}
				}
			}
			Clicker.game().items.Brainpower.amount -= totalUsed;
		}
	}
});

/**
 * Converts ore into resources
 */
Clicker.addTicker({
	numPerTick: 5,
	name: 'Miner',
	maxLevel: 10,
	tick: function () {
		var amount = Clicker.game().items.Ore.amount;
		if (amount > 0) {
			var numToProcess = amount > this.numPerTick ? this.numPerTick : amount;
			amount -= numToProcess;
			Clicker.game().items.Ore.amount = amount;
			
			for (var i = 0; i < numToProcess; i++) {
				var cmd = Clicker.newCommand('mine');
				Clicker.runCommand(cmd);
			}
		}
	}
});

Clicker.addFastTicker({
	name: 'Builder',
	buildIndex: 0,
	queueItem: function (item, volume) {
		var steps = 1;
		if (item.components.created.time) {
			steps = item.components.created.time;
		}
		volume = volume ? volume : 1;
		if (this.payFor(item, volume)) {
			Clicker.game().buildQueue.push({
				totalSteps: steps * volume,
				currentStep: 0,
				volume: volume,
				item: item
			});
		}
	},
	tick: function () {
		if (!this.current) {
			if (!Clicker.game().buildQueue) {
				Clicker.game().buildQueue = [];
			}
			if (Clicker.game().buildQueue.length == 0) {
				return;
			}
			this.current = Clicker.game().buildQueue[this.buildIndex];
//			if (!this.payFor(this.current.item)) {
//				this.finalise();
//				return;
//			}
		}

		this.current.currentStep++;

		if (this.current.currentStep >= this.current.totalSteps) {
			this.tally();
			this.finalise();
		}
	},
	payFor: function (item, volume) {
		var allItems = Clicker.game().items;
		var volume = volume ? volume : 1;

		var transactionRecord = {};

		if (item.components.created && item.components.created.cost) {
			for (var itemType in item.components.created.cost) {
				// check stock levels
				var requiredAmount = item.components.created.cost[itemType] * volume;
				if (allItems[itemType].amount >= requiredAmount) {
					allItems[itemType].amount -= requiredAmount;
					transactionRecord[itemType] = requiredAmount;
				} else {
					Clicker.log("Item " + itemType + " was checked for sufficient amount, but there doesn't seem to be enough now");
					Clicker.log(transactionRecord);
					// TODO - undo transaction
					// OR - leave it as a bugish thing that's actually an annoying feature to make people think about
					// how many they're meaning to buy... ?
					return false;
				}
			}
		}
		if (!Clicker.game().transactions) {
			Clicker.game().transactions = [];
		}
		Clicker.game().transactions.push(transactionRecord);
		return true;
	},
	tally: function () {
		// we actually add the total on now
		this.current.item.amount += this.current.volume;
		this.current.item.applyImprovement();
	},
	finalise: function () {
		this.current = null;
		Clicker.game().buildQueue.splice(this.buildIndex, 1);
	}
})