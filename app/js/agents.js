
Clicker.onInit(function() {
	Clicker.addTicker({
		name: 'Disease',
		onTick: 21,
		currentTick: 0,
		tick: function() {
			this.currentTick++;

			if (this.currentTick >= this.onTick) {
				// trigger a disease
				var rand = Clicker.random();
				if (rand > .5) {
					var pollution = Clicker.game().items.Pollution.amount;
					if (pollution > 0) {
						// polution == 10, 1% chance of disease striking
						var chance = pollution / 1000;

						var dis = Clicker.random();
						if (dis <= chance) {
							var employTypes = Clicker.game().byComponent('employable');
							var key = Clicker.random(0, employTypes.length - 1);

							var toRemove = employTypes[key];

							var number = 1;

							if (toRemove.amount > 0) {
								if (number >= toRemove.amount) {
									number = toRemove.amount;
								}
								
								Clicker.message(number + " " + toRemove.name + " became diseased!", 'bad', 'Sick');
								
								toRemove.amount -= number;
								Clicker.game().items.Sick.amount++;
							}

						}
					}
				}

				this.currentTick = 0;
			}
		}
	});

	Clicker.addTicker({
		name: 'Workers',
		tick: function() {
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
										addto.add(toAdd);
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
		tick: function() {
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
									if (!worker.disabled) {
										Clicker.message("Disabling " + worker.name + " due to insufficient " + prov, 'bad', worker.name);
									}
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
		researchAmount: 10, // level required before research will be applied, prevents 10% on first item blocking all others.
		tick: function() {
			var amount = Clicker.game().items.Brainpower.amount;
			var perTick = 0;
			
			for (var k in Clicker.game().topics) {
				++perTick;
			}
			if (amount > perTick) {
				var totalUsed = 0;
				for (var name in Clicker.game().topics) {
					var topic = Clicker.game().topics[name];

					if (topic.percentage > 0) {
						var toAdd = (topic.percentage / 100) * perTick;
						topic.knowledge += toAdd;

						totalUsed += toAdd;

						if (topic.knowledge >= topic.target) {
							topic.knowledge -= topic.target;
							topic.target = Math.pow(topic.level + 2, 3) * 100;
							topic.target = topic.target * .66;

							if (topic.level < this.maxLevel) {
								topic.level++;
								var topicType = Clicker.types().topics[name];
								if (topicType.levelUp) {
									Clicker.message("Leveling up " + name + " to " + topic.level, 'good', name);
									topicType.levelUp(topic.level);
								}
							}
						}
					}
				}

				Clicker.game().items.Brainpower.amount -= perTick;
			}
		}
	});

	/**
	 * Converts ore into resources
	 */
	Clicker.addTicker({
		name: 'Miner',
		maxLevel: 10,
		tick: function() {
			var amount = Clicker.game().items.Ore.amount;
			var miners = Clicker.game().byComponent('mine');
			if (amount > 0 && miners.length) {
				var numToProcess = 0;
				for (var i = 0, c = miners.length; i < c; i++) {
					var miner = miners[i];
					var rate = miner.rates.mine;
					if (!miner.disabled) {
						numToProcess += rate * miner.amount;
					}
				}

				numToProcess = amount > numToProcess ? numToProcess : amount;
				amount -= numToProcess;
				Clicker.game().items.Ore.amount = amount;

				for (var i = 0; i < numToProcess; i++) {
					Clicker.log("Mining " + numToProcess);
					var cmd = Clicker.newCommand('mine');
					Clicker.runCommand(cmd);
				}
			}
		}
	});

	Clicker.addFastTicker({
		name: 'Builder',
		buildIndex: 0,
		queueItem: function(item, volume) {
			var steps = 1;
			if (item.components.created.time) {
				steps = item.components.created.time;
			}
			volume = volume ? volume : 1;
			if (this.payFor(item, volume)) {
				var stepMulti = volume;
				if (volume > 5) {
					stepMulti = 5 + Math.floor(volume / 10);
				}
				// mark pending amount
				if (typeof item.pending === 'undefined') {
					item.pending = 0;
				}
				item.pending += volume;
				Clicker.game().buildQueue.push({
					totalSteps: steps * stepMulti,
					currentStep: 0,
					volume: volume,
					item: item
				});
			}
		},
		tick: function() {
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
		payFor: function(item, volume) {
			var allItems = Clicker.game().items;
			var volume = volume ? volume : 1;

			var transactionRecord = {
				type: 'buy',
				item: item.name,
				volume: volume,
				items: {}
			};

			if (item.components.created && item.components.created.cost) {
				for (var itemType in item.components.created.cost) {
					// check stock levels
					var requiredAmount = item.components.created.cost[itemType] * volume;
					if (allItems[itemType].amount >= requiredAmount) {
						allItems[itemType].amount -= requiredAmount;
						transactionRecord.items[itemType] = requiredAmount;
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
		tally: function() {
			// we actually add the total on now
			if (!this.current.item.add) {
				Clicker.log("Missing item func - probably due to saving with a partially complete build queue");
				this.current.item = Clicker.game().items[this.current.item.name];
			}
			this.current.item.add(this.current.volume);
			
			if (this.current.item.components.created.gives) {
				for (var type in this.current.item.components.created.gives) {
					Clicker.game().items[type].add(this.current.item.components.created.gives[type]);
				}
			}
			
			if (this.current.totalSteps > 50) {
				Clicker.message("Created " + this.current.volume + " " + this.current.item.name, 'good', this.current.item.name);
			}
			
			this.current.item.pending -= this.current.volume;
			this.current.item.applyImprovement();
		},
		finalise: function() {
			this.current = null;
			Clicker.game().buildQueue.splice(this.buildIndex, 1);
		}
	})

	Clicker.addTicker({
		name: 'StatsCollector',
		onTick: 10,
		currentTick: 0,
		tick: function () {
			this.currentTick++;

			if (this.currentTick >= this.onTick) {
				// collect data from the items and store
				var stats = Clicker.game().stats;
				
				var items = Clicker.game().byComponent('raw');

				for (var i = 0; i < items.length; i ++) {
					var existing = stats.amounts[items[i].name];
					if (!existing) {
						existing = [0];
						stats.amounts[items[i].name] = existing;
					}
					existing.push(items[i].amount);
					// track the maximum for graphing purposes
					if (items[i].amount > stats.amounts.max_val) {
						stats.amounts.max_val = items[i].amount;
					}

					var existing = stats.rates[items[i].name];
					if (!existing) {
						existing = [0];
						stats.rates[items[i].name] = existing;
					}
					existing.push(items[i].rates.raw);
					if (items[i].rates.raw > stats.rates.max_val) {
						stats.rates.max_val = items[i].rates.raw;
					}
					
					var existing = stats.totals[items[i].name];
					if (!existing) {
						existing = [0];
						stats.totals[items[i].name] = existing;
					}
					existing.push(items[i].existed);
					if (items[i].existed > stats.totals.max_val) {
						stats.totals.max_val = items[i].existed;
					}
				}

				this.currentTick = 0;
			}
		}
	});
});