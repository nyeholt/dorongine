
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