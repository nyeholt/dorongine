
Clicker.onInit(function() {

	Clicker.addItem({
		name: 'People',
		maximum: 20,
		icon: 'icons/people/icon_10579.svg',
		defaultAmount: 5,
		components: {
			raw: {
				rate: 1
			}
		}
	});

	Clicker.addItem({
		name: 'Sick',
		maximum: 20,
		icon: 'icons/sick/icon_27818.svg',
		components: {
		}
	});

	Clicker.addItem({
		name: 'Dead',
		maximum: 20,
		icon: 'icons/dead/icon_13126.svg',
		components: {
		}
	});

	Clicker.addItem({
		name: 'People',
		maximum: 20,
		icon: 'icons/people/icon_10579.svg',
		defaultAmount: 5,
		components: {
			raw: {
				rate: 1
			}
		}
	});

	Clicker.addItem({
		name: 'Employee',
		icon: 'icons/employee/icon_961.svg',
		maximum: 100,
		components: {
			employable: true,
			worker: {
				rate: 5,
				provides: {
					Cash: 1,
					Crime: -0.01
				}
			},
			created: {
				time: 2,
				cost: {
					Cash: 10,
					People: 1
				}
			},
			consumer: {// consumers 
				rate: 30,
				consumes: {
					Cash: 2,
					Energy: 1
				}
			}
		}
	});

	Clicker.addItem({
		name: 'Miner',
		icon: 'icons/miner/icon_39492.svg',
		maximum: 200,
		components: {
			employable: true,
			worker: {
				rate: 5,
				provides: {
					Ore: 1,
					Pollution: -0.02
				}
			},
			created: {
				time: 3,
				cost: {
					Cash: 250,
					Employee: 1
				}
			},
			consumer: {// consumers 
				rate: 30,
				consumes: {
					Cash: 5,
					Energy: 1
				}
			},
			requires: {
				topics: {
					'Mining': 1
				}
			}
		}
	});

	Clicker.addItem({
		name: 'Engineer',
		icon: 'icons/engineer/icon_34710.svg',
		maximum: 200,
		components: {
			employable: true,
			worker: {
				rate: 5,
				provides: {
					Water: 2,
					Brainpower: 0.1
				}
			},
			created: {
				time: 3,
				cost: {
					Cash: 500,
					Employee: 1
				}
			},
			consumer: {// consumers 
				rate: 30,
				consumes: {
					Cash: 10,
					Energy: 2
				}
			},
			requires: {
				topics: {
					'Civics': 2
				}
			}
		}
	});

	Clicker.addItem({
		name: 'Scientist',
		icon: 'icons/scientist/icon_19851.svg',
		maximum: 100,
		components: {
			employable: true,
			worker: {
				rate: 5,
				provides: {
					Brainpower: 1
				}
			},
			created: {
				time: 20,
				cost: {
					Cash: 750,
					Employee: 1
				}
			},
			consumer: {// consumers 
				rate: 30,
				consumes: {
					Cash: 10,
					Energy: 10
				}
			},
			requires: {
				topics: {
					'Education': 2,
					'Technology': 3
				}
			}
		}
	});

	Clicker.addItem({
		name: 'Cash',
		maximum: 1000000,
		icon: 'icons/cash/icon_2709.svg',
		formattedAmount: function() {
			return Number(this.amount).toFixed(2);
		},
		components: {
			'raw': {rate: 1},
			'collected': true
		}
	});

	Clicker.addItem({
		name: 'Brainpower',
		icon: 'icons/brain/icon_38934.svg',
		maximum: 1000,
		formattedAmount: function() {
			return Number(this.amount).toFixed(2);
		},
		components: {
			'raw': {rate: 1},
			'collected': true
		}
	});

	Clicker.addItem({
		name: 'Energy',
		icon: 'icons/energy/icon_2766.svg',
		maximum: 1000,
		formattedAmount: function() {
			return Number(this.amount).toFixed(2);
		},
		components: {
			'raw': {rate: 1},
			'collected': true
		}
	});

	Clicker.addItem({
		name: 'Ore',
		icon: 'icons/ore/icon_7202.svg',
		maximum: 1000,
		formattedAmount: function() {
			return Number(this.amount).toFixed(2);
		},
		components: {
			'raw': {rate: 1},
			'collected': true
		}
	});

	Clicker.addItem({
		name: 'Water',
		icon: 'icons/water/icon_3168.svg',
		maximum: 1000,
		formattedAmount: function() {
			return Number(this.amount).toFixed(2);
		},
		components: {
			'raw': {rate: 1},
			'collected': true
		}
	});

	Clicker.addItem({
		name: 'Crime',
		maximum: 100000,
		icon: 'icons/crime/icon_5293.svg',
		formattedAmount: function() {
			return Number(this.amount).toFixed(2);
		},
		components: {
			'raw': {rate: -1},
			'collected': true
		}
	});

	Clicker.addItem({
		name: 'Pollution',
		maximum: 100000,
		icon: 'icons/pollution/icon_40472.svg',
		formattedAmount: function() {
			return Number(this.amount).toFixed(2);
		},
		components: {
			'raw': {rate: -1},
			'collected': true
		}
	});

	Clicker.addItem({
		name: 'Wood',
		icon: 'icons/wood/icon_53364.svg',
		maximum: 10000,
		components: {
			'mined': {
				rate: 100
			},
			created: {
				time: 1,
				cost: {
					'Cash': 5
				}
			}
		}
	});
	
	Clicker.addItem({
		name: 'Coal',
		icon: 'icons/coal/icon_16776.svg',
		maximum: 10000,
		components: {
			'mined': {rate: 90},
			created: {
				time: 1,
				cost: {
					'Cash': 5
				}
			}

		}
	});
	
	Clicker.addItem({
		name: 'Cement',
		icon: 'icons/cement/icon_24412.svg',
		maximum: 10000,
		components: {
			'mined': {rate: 80},
			created: {
				time: 1,
				cost: {
					'Cash': 10
				}
			}

		}
	});

	Clicker.addItem({
		name: 'Oil',
		icon: 'icons/oil/icon_375.svg',
		maximum: 10000,
		components: {
			'mined': {
				rate: 70
			},
			created: {
				time: 1,
				cost: {
					'Cash': 10
				}
			}
		}
	});

	Clicker.addItem({
		name: 'Iron',
		icon: 'icons/iron/icon_25438.svg',
		maximum: 1000,
		components: {
			'mined': {rate: 50},
			created: {
				time: 1,
				cost: {
					'Cash': 20
				}
			}
		}
	});

	Clicker.addItem({
		name: 'Copper',
		icon: 'icons/copper/icon_15400.svg',
		maximum: 1000,
		components: {
			'mined': {rate: 20},
			created: {
				time: 1,
				cost: {
					'Cash': 50
				}
			}

		}
	});

	Clicker.addItem({
		name: 'Silicon',
		icon: 'icons/silicon/icon_53365.svg',
		maximum: 1000,
		components: {
			'mined': {rate: 10},
			created: {
				time: 1,
				cost: {
					'Cash': 50
				}
			}

		}
	});

	Clicker.addItem({
		name: 'Gold',
		icon: 'icons/gold/icon_13470.svg',
		maximum: 1000,
		components: {
			'mined': {rate: 10},
			created: {
				time: 1,
				cost: {
					'Cash': 75
				}
			}
		}
	});


	Clicker.addItem({
		name: 'Glass',
		icon: 'icons/glass/icon_20953.svg',
		maximum: 1000,
		components: {
			goods: true,
			created: {
				time: 2,
				cost: {
					'Cement': 2
				}
			},
			requires: {
				topics: {
					'Manufacturing': 1
				}
			}
		}
	});

	Clicker.addItem({
		name: 'Book',
		icon: 'icons/book/icon_4964.svg',
		maximum: 10000,
		components: {
			goods: true,
			created: {
				time: 10,
				cost: {
					'Wood': 2
				}
			},
			requires: {
				topics: {
					'Education': 1
				}
			}
		}
	});

	Clicker.addItem({
		name: 'Fuel',
		icon: 'icons/fuel/icon_17625.svg',
		maximum: 1000,
		components: {
			created: {
				time: 1,
				cost: {
					Oil: 10,
					Energy: 2
				}
			},
			requires: {
				topics: {
					'Manufacturing': 2
				}
			}
		}
	});
	
	Clicker.addItem({
		name: 'Steel',
		icon: 'icons/steel/icon_18535.svg',
		maximum: 1000,
		components: {
			goods: true,
			created: {
				time: 2,
				cost: {
					'Iron': 3,
					Water: 2
				}
			},
			requires: {
				topics: {
					'Manufacturing': 1
				}
			}
		}
	});

	Clicker.addItem({
		name: 'Reinforced Concrete',
		icon: 'icons/reinforced/icon_14927.svg',
		maximum: 1000,
		components: {
			goods: true,
			created: {
				time: 5,
				cost: {
					'Cement': 1,
					'Steel': 1,
					'Water': 3
				}
			},
			requires: {
				topics: {
					'Manufacturing': 3
				}
			}
		}
	});

	Clicker.addItem({
		name: 'Mining Tools',
		icon: 'icons/tools/icon_543.svg',
		maximum: 1000,
		components: {
			goods: true,
			created: {
				time: 5,
				cost: {
					'Steel': 100
				}
			},
			requires: {
				topics: {
					'Manufacturing': 1
				},
				items: {
					'Miner': 20
				}
			},
			improves: {
				Ore: 0.02
			}
		}
	});

	Clicker.addItem({
		name: 'Chip',
		icon: 'icons/chip/icon_25352.svg',
		maximum: 1000,
		components: {
			goods: true,
			created: {
				time: 20,
				cost: {
					'Gold': 1,
					'Silicon': 2,
					'Copper': 5
				}
			},
			requires: {
				topics: {
					'Technology': 2,
					'Manufacturing': 3
				}
			}
		}
	});

	Clicker.addItem({
		name: 'Computer',
		icon: 'icons/computer/icon_3633.svg',
		maximum: 1000,
		components: {
			goods: true,
			created: {
				time: 100,
				cost: {
					'Gold': 1,
					'Chip': 2,
					'Glass': 2,
					'Copper': 10
				}
			},
			requires: {
				topics: {
					'Technology': 2,
					'Manufacturing': 2
				}
			},
			improves: {
				Brainpower: 0.01
			}
		}
	});



// Buildings

	Clicker.addItem({
		name: 'Town Hall',
		icon: 'icons/townhall/icon_2406.svg',
		maximum: 1,
		components: {
			building: true,
			worker: {
				rate: 61,
				provides: {
					People: 1
				}
			},
			created: {
				time: 200,
				cost: {
					'Cash': 100,
					'Wood': 10
				}
			}
		}
	});

//
//Clicker.addItem({
//	name: 'House',
//	icon: 'icons/house/icon_4399.svg',
//	maximum: 1,
//	components: {
//		building: true,
//		worker: {
//			rate: 31,
//			provides: {
//				People: 1
//			}
//		},
//		created: {
//			time: 200,
//			cost: {
//				'Cash': 100,
//				'Wood': 10,
//				'Glass': 1
//			}
//		}
//	}
//});

	Clicker.addItem({
		name: 'Power Plant',
		icon: 'icons/powerplant/icon_2071.svg',
		maximum: 20,
		components: {
			building: true,
			improves: {
				Energy: 0.20
			},
			worker: {
				rate: 4,
				provides: {
					Energy: 1,
					Pollution: -2
				}
			},
			consumer: {
				rate: 30,
				consumes: {
					Water: 7,
					Coal: 5
				}
			},
			created: {
				time: 200,
				cost: {
					'Cash': 500,
					'Glass': 5,
					'Iron': 10,
					'Silicon': 1
				}
			},
			requires: {
				topics: {
					'Manufacturing': 1
				}
			}
		}
	});

	Clicker.addItem({
		name: 'Mine',
		icon: 'icons/mine/icon_8497.svg',
		maximum: 20,
		components: {
			building: true,
			mine: {
				rate: 1
			},
			worker: {
				rate: 9,
				provides: {
					Pollution: -2
				}
			},
			consumer: {
				rate: 30,
				consumes: {
					Water: 5,
					Energy: 5
				}
			},
			created: {
				time: 300,
				cost: {
					'Cash': 500,
					'Wood': 20,
					'Iron': 10
				}
			},
			requires: {
				topics: {
					'Manufacturing': 1
				}
			}
		}
	});



	Clicker.addItem({
		name: 'Office',
		icon: 'icons/office/icon_26565.svg',
		maximum: 20,
		components: {
			building: true,
			improves: {
				Cash: 0.10
			},
//		
//		worker: {
//			rate: 4,
//			provides: {
//				Energy: 1,
//				Pollution: 2
//			}
//		},
			consumer: {
				rate: 31,
				consumes: {
					Energy: 30
				}
			},
			created: {
				time: 300,
				cost: {
					'Cash': 500,
					'Glass': 15,
					'Iron': 20,
					'Copper': 20
				}
			},
			requires: {
				topics: {
					'Civics': 1,
					'Economics': 2
				}
			}
		}
	});

	Clicker.addItem({
		name: 'Clinic',
		icon: 'icons/clinic/icon_50644.svg',
		maximum: 20,
		components: {
			building: true,
//		improves: {
//			Cash: 0.10
//		},
			// technically, we want this to check consumerability first, BUT 
			// we can't guarantee that, so we justifty it by claiming that sometimes
			// an extra person will pop out due to a birth...
			worker: {
				rate: 61,
				provides: {
					People: 1
				}
			},
			consumer: {
				rate: 61,
				consumes: {
					Sick: 1,
					Water: 10
				}
			},
			created: {
				time: 300,
				cost: {
					'Cash': 500,
					'Glass': 15,
					'Iron': 20,
					'Copper': 20
				}
			},
			requires: {
				topics: {
					'Civics': 1,
					'Education': 2
				}
			}
		}
	});

	Clicker.addItem({
		name: 'Bank',
		icon: 'icons/bank/icon_40422.svg',
		maximum: 20,
		components: {
			building: true,
			improves: {
				Cash: 0.20
			},
//		
//		worker: {
//			rate: 4,
//			provides: {
//				Energy: 1,
//				Pollution: 2
//			}
//		},
			created: {
				time: 500,
				cost: {
					'Cash': 5000,
					'Glass': 50,
					'Steel': 100,
					'Reinforced Concrete': 50,
					'Computer': 10,
					'Gold': 50
				}
			},
			requires: {
				topics: {
					'Civics': 2,
					'Economics': 3
				}
			}
		}
	});

	Clicker.addItem({
		name: 'Solar Panel',
		icon: 'icons/solar/icon_2062.svg',
		maximum: 20,
		components: {
			building: true,
			improves: {
				Energy: 0.10
			},
			worker: {
				rate: 6,
				provides: {
					Energy: 1
				}
			},
			consumer: {
				rate: 30,
				consumes: {
					Water: 10,
				}
			},
			created: {
				time: 100,
				cost: {
					'Cash': 200,
					'Glass': 10,
					'Steel': 2,
					'Silicon': 10
				}
			},
			requires: {
				topics: {
					'Education': 2,
					'Technology': 4
				}
			}
		}
	});

	Clicker.addItem({
		name: 'School',
		icon: 'icons/school/icon_4405.svg',
		maximum: 20,
		components: {
			building: true,
			improves: {
				Brainpower: 0.15
			},
			created: {
				time: 300,
				cost: {
					'Cash': 1000,
					'Cement': 100,
					'Wood': 100,
					'Book': 20
				}
			},
			requires: {
				topics: {
					'Education': 2
				}
			}
		}
	});


	Clicker.addItem({
		name: 'Hospital',
		icon: 'icons/hospital/icon_50643.svg',
		maximum: 20,
		components: {
			building: true,
//		improves: {
//			Cash: 0.10
//		},
			// technically, we want this to check consumerability first, BUT 
			// we can't guarantee that, so we justifty it by claiming that sometimes
			// an extra person will pop out due to a birth...
			worker: {
				rate: 13,
				provides: {
					People: 1
				}
			},
			consumer: {
				rate: 13, // 5 times faster than a clinic or there abouts
				consumes: {
					Sick: 1,
					Water: 10
				}
			},
			created: {
				time: 600,
				cost: {
					'Cash': 1500,
					'Glass': 30,
					'Steel': 20,
					'Computer': 5
				}
			},
			requires: {
				topics: {
					'Civics': 2,
					'Education': 3
				}
			}
		}
	});

	Clicker.addItem({
		name: 'University',
		icon: 'icons/uni/icon_2402.svg',
		maximum: 10,
		components: {
			building: true,
			improves: {
				Brainpower: 0.50
			},
			created: {
				time: 1200,
				cost: {
					'Cash': 10000,
					'Reinforced Concrete': 100,
					'Steel': 100,
					'Computer': 100
				}
			},
			requires: {
				topics: {
					'Education': 3,
					'Civics': 2
				}
			}
		}
	});

	Clicker.addTopic({
		increaseBy: 10,
		name: 'Mining',
		icon: 'icons/mining/icon_42900.svg',
		levelUp: function(newLevel) {
			if (Clicker.game().globalRates.mined < 100) {
				Clicker.game().globalRates.mined += this.increaseBy;
			}
			if (Clicker.game().globalRates.mined > 100) {
				Clicker.game().globalRates.mined = 100;
			}
		}
	});

	Clicker.addTopic({
		name: 'Education',
		icon: 'icons/education/icon_3012.svg',
		levelUp: function(newLevel) {
			var current = Clicker.game().items.Brainpower.rates.raw;
			Clicker.game().items.Brainpower.rates.raw = current + current * (newLevel / 10);
		}
	});

	Clicker.addTopic({
		name: 'Civics',
		icon: 'icons/civics/icon_24569.svg',
		levelUp: function(newLevel) {
			var current = Clicker.game().items.Cash.rates.raw;
			Clicker.game().items.Cash.rates.raw = current + current * (newLevel / 10);
			Clicker.game().items.People.rates.raw = newLevel;
		}
	});

	Clicker.addTopic({
		name: 'Economics',
		icon: 'icons/economics/icon_29406.svg',
		levelUp: function(newLevel) {
			var current = Clicker.game().items.Cash.rates.raw;
			Clicker.game().items.Cash.rates.raw = current + current * (newLevel / 4);
		}
	});
	Clicker.addTopic({
		name: 'Technology',
		icon: 'icons/technology/icon_1870.svg',
		levelUp: function(newLevel) {
			var current = Clicker.game().items.Water.rates.raw;
			Clicker.game().items.Water.rates.raw = current + current * (newLevel / 5);
		}
	});

	Clicker.addTopic({
		name: 'Manufacturing',
		icon: 'icons/manufacturing/icon_819.svg',
		levelUp: function() {

		}
	});
});