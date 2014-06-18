
Synned.addTicker({
	name: 'Researcher',
	tick: function () {
		var amount = Synned.game().items.Brainpower.amount;
		if (amount > 0) {
			
			for (var name in Synned.game().topics) {
				var topic = Synned.game().topics[name];
				console.log(name + " - perc: " + topic.percentage + " amount: " + amount);
				
				if (topic.percentage > 0) {
					var toAdd = Math.floor((topic.percentage / 100) * amount);
					topic.knowledge += toAdd;
					amount -= toAdd;
				}
			}
		}
		Synned.game().items.Brainpower.amount = amount;
	}
});