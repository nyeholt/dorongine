
Synned.addTicker({
	name: 'Migration',
	onTick: 60,
	currentTick: 0,
	tick: function () {
		this.currentTick++;
		
		if (this.currentTick >= this.onTick) {
			// add a person
			Synned.game().items.People.amount++;
			
			this.currentTick = 0;
		}
	}
});


Synned.addTicker({
	name: 'Workers',
	tick: function () {
		var workerTypes = Synned.types().byComponent('worker');
		for (var i = 0, c = workerTypes.length; i < c; i++) {
			var type = workerTypes[i];
			var worker = Synned.game().items[type.name];
			
			if (worker.amount > 0) {
				if (!worker.workTicks) {
					worker.workTicks = 0;
				}
				worker.workTicks++;

				// actually do the work now
				if (worker.workTicks >= worker.rates.worker) {
					if (type.components.worker.provides) {
						for (var prov in type.components.worker.provides) {
							// add it in to the relevant bits
							var toAdd = worker.amount * type.components.worker.provides[prov];
							if (Synned.game().items[prov]) {
								Synned.game().items[prov].amount += toAdd;
							} else if (Synned.game().topics[prov]) {
								Synned.game().topics[prov].knowledge += toAdd;
							}
						}
					}
					worker.workTicks = 0;
				}
			}
		}
	}
});

Synned.addTicker({
	name: 'Consumers',
	tick: function () {
		var workerTypes = Synned.types().byComponent('consumer');
		for (var i = 0, c = workerTypes.length; i < c; i++) {
			var type = workerTypes[i];
			var worker = Synned.game().items[type.name];
			
			if (worker.amount > 0) {
				if (!worker.consumptionTicks) {
					worker.consumptionTicks = 0;
				}
				worker.consumptionTicks++;

				// actually do the work now
				if (worker.consumptionTicks >= worker.rates.consumer) {
					if (type.components.consumer.consumes) {
						for (var prov in type.components.consumer.consumes) {
							// add it in to the relevant bits
							var toRemove = worker.amount * type.components.consumer.consumes[prov];
							
							if (Synned.game().items[prov]) {
								// TODO - CHECK FOR NEGATIVES AND PUNISH
								Synned.game().items[prov].amount -= toRemove;
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
Synned.addTicker({
	name: 'Researcher',
	maxLevel: 10,
	tick: function () {
		var amount = Synned.game().items.Brainpower.amount;
		if (amount > 0) {
			for (var name in Synned.game().topics) {
				var topic = Synned.game().topics[name];
				
				if (topic.percentage > 0) {
					var toAdd = Math.floor((topic.percentage / 100) * amount);
					topic.knowledge += toAdd;
					amount -= toAdd;

					if (topic.knowledge >= topic.target) {
						amount += topic.knowledge - topic.target;
						topic.knowledge = 0;
						topic.target = Math.pow(10, (topic.level + 3));
						
						if (topic.level < this.maxLevel) {
							topic.level++;
							var topicType = Synned.types().topics[name];
							if (topicType.levelUp) {
								topicType.levelUp(topic.level);
							}
						}
					}
				}
			}
		}
		Synned.game().items.Brainpower.amount = amount;
	}
});

/**
 * Converts ore into resources
 */
Synned.addTicker({
	numPerTick: 5,
	name: 'Miner',
	maxLevel: 10,
	tick: function () {
		var amount = Synned.game().items.Ore.amount;
		if (amount > 0) {
			var numToProcess = amount > this.numPerTick ? this.numPerTick : amount;
			amount -= numToProcess;
			Synned.game().items.Ore.amount = amount;
			
			for (var i = 0; i < numToProcess; i++) {
				var cmd = Synned.newCommand('mine');
				Synned.runCommand(cmd);
			}
		}
	}
});

Synned.addFastTicker({
	name: 'Builder',
	buildIndex: 0,
	queueItem: function (item, volume) {
		var steps = 1;
		if (item.components.created.time) {
			steps = item.components.created.time;
		}
		Synned.game().buildQueue.push({
			totalSteps: steps,
			currentStep: 0,
			volume: volume,
			item: item
		})
	},
	tick: function () {
		if (!this.current) {
			if (!Synned.game().buildQueue) {
				Synned.game().buildQueue = [];
			}
			if (Synned.game().buildQueue.length == 0) {
				return;
			}
			this.current = Synned.game().buildQueue[this.buildIndex];
		}

		this.current.currentStep++;

		if (this.current.currentStep >= this.current.totalSteps) {
			this.finalise();
			this.current = null;
			delete Synned.game().buildQueue.splice(this.buildIndex, 1);
		}
	},
	finalise: function () {
		// wee do what we need to do
		var allItems = Synned.game().items;
		var item = this.current.item;
		var volume = this.current.volume ? this.current.volume : 1;
		
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
})