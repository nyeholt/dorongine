
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
						if (topic.level < this.maxLevel) {
							topic.level ++;
						}
						topic.knowledge = 0;
						topic.target = Math.pow(10, (topic.level + 2));
					}
				}
			}
		}
		Synned.game().items.Brainpower.amount = amount;
	}
});