
Clicker.onInit(function() {
	Clicker.addItem({
		name: 'Cash',
		color: '#01832D',
		maximum: 1000000,
		bonus: 50,			// bonus after 100 clicks
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
		color: '#E60084',
		icon: 'icons/brain/icon_38934.svg',
		bonus: 50,			// bonus after 100 clicks
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
		color: '#F9B700',
		icon: 'icons/energy/icon_2766.svg',
		bonus: 50,			// bonus after 100 clicks
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
		color: '#4F1700',
		icon: 'icons/ore/icon_13384.svg',
		maximum: 1000,
		bonus: 50,			// bonus after 100 clicks
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
		color: '#0059A9',
		icon: 'icons/water/icon_3168.svg',
		maximum: 1000,
		bonus: 50,			// bonus after 100 clicks
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
		color: '#B30006',
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
		color: '#012F08',
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
		color: '#000',
		icon: 'icons/dead/icon_13126.svg',
		components: {
		}
	});

	Clicker.addItem({
		name: 'People',
		maximum: 20,
		color: '#F59701',
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
		maximum: 15,
		components: {
			employable: true,
			worker: {
				rate: 5,
				provides: {
					Cash: 1,
					Crime: -0.02		// negative because the base rate is negative
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
				rate: 33,
				consumes: {
					Energy: 1
				}
			}
		}
	});

	Clicker.addItem({
		name: 'Miner',
		icon: 'icons/miner/icon_39492.svg',
		maximum: 2,
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
				rate: 31,
				consumes: {
					Energy: 2
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
		maximum: 2,
		components: {
			employable: true,
			worker: {
				rate: 5,
				provides: {
					Water: 2,
					Energy: 2
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
				rate: 29,
				consumes: {
					Cash: 5
				}
			},
			requires: {
				topics: {
					'Civics': 1
				}
			}
		}
	});
	
	Clicker.addItem({
		name: 'Banker',
		icon: 'icons/banker/icon_32097.svg',
		maximum: 2,
		components: {
			employable: true,
			worker: {
				rate: 5,
				provides: {
					Cash: 6,
					Crime: -0.1
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
				rate: 33,
				consumes: {
					Water: 3,
					Energy: 5
				}
			},
			requires: {
				topics: {
					'Economics': 3
				}
			}
		}
	});

	Clicker.addItem({
		name: 'Teacher',
		icon: 'icons/teacher/icon_28111.svg',
		maximum: 1,
		components: {
			employable: true,
			worker: {
				rate: 5,
				provides: {
					Brainpower: 2
				}
			},
			created: {
				time: 30,
				cost: {
					Cash: 250,
					Employee: 1
				}
			},
			consumer: {// consumers 
				rate: 29,
				consumes: {
					Energy: 4,
					Cash: 5
				}
			},
			requires: {
				topics: {
					'Education': 1
				},
				items: {
					'School': 1
				}
			}
		}
	});

	Clicker.addItem({
		name: 'Professor',
		icon: 'icons/professor/icon_43308.svg',
		maximum: 1,
		components: {
			employable: true,
			worker: {
				rate: 5,
				provides: {
					Brainpower: 10
				}
			},
			created: {
				time: 30,
				cost: {
					Cash: 250,
					Employee: 1
				}
			},
			consumer: {// consumers 
				rate: 30,
				consumes: {
					Energy: 10
				}
			},
			requires: {
				topics: {
					'Education': 3
				},
				items: {
					'University': 1
				}
			}
		}
	});
	
	Clicker.addItem({
		name: 'Scientist',
		icon: 'icons/scientist/icon_19851.svg',
		maximum: 1,
		components: {
			employable: true,
			worker: {
				rate: 5,
				provides: {
					Brainpower: 2,
					Water: 5
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
					Energy: 20
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
		name: 'Wood',
		icon: 'icons/wood/icon_53364.svg',
		maximum: 50,
		components: {
			'mined': {
				rate: 100
			},
			market: {
				base: 5
			}
		}
	});

	Clicker.addItem({
		name: 'Coal',
		icon: 'icons/coal/icon_16776.svg',
		maximum: 50,
		components: {
			'mined': {rate: 95},
			market: {
				base: 5
			}
		}
	});
	
	Clicker.addItem({
		name: 'Cement',
		icon: 'icons/cement/icon_24412.svg',
		maximum: 50,
		components: {
			'mined': {rate: 80},
			market: {
				base: 10
				
			}

		}
	});

	Clicker.addItem({
		name: 'Oil',
		icon: 'icons/oil/icon_375.svg',
		maximum: 50,
		components: {
			'mined': {
				rate: 70
			},
			market: {
				base: 15
			}
		}
	});

	Clicker.addItem({
		name: 'Iron',
		icon: 'icons/iron/icon_25438.svg',
		maximum: 20,
		components: {
			'mined': {rate: 70},
			market: {
				base: 20
			}
		}
	});

	Clicker.addItem({
		name: 'Copper',
		icon: 'icons/copper/icon_15400.svg',
		maximum: 20,
		components: {
			'mined': {rate: 60},
			market: {
				base: 50
			}

		}
	});

	Clicker.addItem({
		name: 'Silicon',
		icon: 'icons/silicon/icon_53365.svg',
		maximum: 10,
		components: {
			'mined': {rate: 20},
			market: {
				base: 50
			}

		}
	});

	Clicker.addItem({
		name: 'Gold',
		icon: 'icons/gold/icon_13470.svg',
		maximum: 10,
		components: {
			'mined': {rate: 10},
			market: {
				base: 250
			}
		}
	});
	
	Clicker.addItem({
		name: 'Actinide',
		icon: 'icons/actinide/icon_50501.svg',
		maximum: 10,
		components: {
			'mined': { rate: 5 },
			
			market: {
				base: 500
			}
		}
	});

	Clicker.addItem({
		name: 'Glass',
		icon: 'icons/glass/icon_20953.svg',
		maximum: 10,
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
		maximum: 10,
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
		maximum: 10,
		components: {
			goods: true,
			created: {
				time: 1,
				cost: {
					Oil: 2,
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
		name: 'Truck',
		icon: 'icons/truck/icon_2558.svg',
		maximum: 10,
		components: {
			goods: true,
			created: {
				time: 25,
				cost: {
					Steel: 5,
					Glass: 2,
					Oil: 5
				}
			},
			consumer: {
				rate: 17,
				consumes: {
					Fuel: 1
				}
			},
			worker: {
				rate: 11,
				provides: {
					Ore: 2,
					Cash: 10,
					Pollution: 1
				}
			},
			
			requires: {
				items: {
					'Highway': 1
				}
			}
		}
	});
	
	Clicker.addItem({
		name: 'Plane',
		icon: 'icons/plane/icon_88.svg',
		maximum: 10,
		components: {
			goods: true,
			created: {
				time: 50,
				cost: {
					Cash: 500,
					Steel: 25,
					Glass: 5,
					Oil: 10
				}
			},
			consumer: {
				rate: 33,
				consumes: {
					Fuel: 1
				}
			},
			worker: {
				rate: 17,
				provides: {
					Cash: 100
				}
			},
			requires: {
				items: {
					'Airport': 1
				}
			}
		}
	});
	
	Clicker.addItem({
		name: 'Steel',
		icon: 'icons/steel/icon_18535.svg',
		maximum: 10,
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
		maximum: 10,
		components: {
			goods: true,
			created: {
				time: 3,
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
		maximum: 10,
		components: {
			goods: true,
			created: {
				time: 5,
				cost: {
					'Steel': 3 
				}
			},
			requires: {
				topics: {
					'Manufacturing': 1
				},
				items: {
					'Miner': 5
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
		maximum: 10,
		components: {
			goods: true,
			created: {
				time: 10,
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
		maximum: 5,
		components: {
			goods: true,
			created: {
				time: 50,
				cost: {
					'Gold': 1,
					'Chip': 2,
					'Glass': 2,
					'Copper': 10
				}
			},
			requires: {
				items: {
					Chip: 1
				}
			},
			improves: {
				Brainpower: 0.01
			}
		}
	});

	Clicker.addItem({
		name: 'FuelRod',
		icon: 'icons/fuelrod/icon_36099.svg',
		maximum: 200,
		components: {
			goods: true,
			created: {
				time: 100,
				cost: {
					'Gold': 10,
					'Actinide': 5
				}
			},
			requires: {
				topics: {
					'Technology': 3,
					'Manufacturing': 4
				}
			}
		}
	});
	
	
	Clicker.addItem({
		name: 'Outsource Thinking',
		icon: 'icons/brain/icon_38934.svg',
		maximum: 10,
		fixed: true,
		components: {
			goods: true,
			created: {
				time: 120,
				cost: {
					'Cash': 1000
				},
				gives: {
					Brainpower: 1000
				}
			},
			requires: {
				items: {
					Cash: 2000
				}
			}
		}
	});
	
	Clicker.addItem({
		name: 'Sunburst',
		icon: 'icons/energy/icon_2766.svg',
		maximum: 100,
		fixed: true,
		components: {
			goods: true,
			created: {
				time: 120,
				cost: {
					'Cash': 1000
				},
				gives: {
					Energy: 1000
				}
			},
			requires: {
				items: {
					Cash: 2000
				}
			}
		}
	});
	

// Buildings

	Clicker.addItem({
		name: 'Town Hall',
		icon: 'icons/townhall/icon_2406.svg',
		fixed: true,		// cannot increase maximum
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

	Clicker.addItem({
		name: 'Warehouse',
		icon: 'icons/warehouse/icon_1808.svg',
		maximum: 5,
		components: {
			building: true,
			increases: {
				'mined': 50,
				'goods': 15
			},
			created: {
				time: 100,
				cost: {
					'Cash': 200,
					'Wood': 20,
					'Cement': 10
				}
			},
			requires: {
				topics: {
					'Manufacturing': 1
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
		name: 'Water Pump',
		icon: 'icons/pump/icon_24191.svg',
		maximum: 5,
		components: {
			building: true,
			created: {
				time: 20,
				cost: {
					'Cash': 300,
					'Copper': 5
				}
			},
			worker: {
				rate: 32,
				provides: {
					Water: 2
				}
			},
			requires: {
				topics: {
					'Manufacturing': 1
				},
				items: {
					Engineer: 1
				}
			}
		}
	});
	
	Clicker.addItem({
		name: 'Sewer',
		icon: 'icons/sewer/icon_30146.svg',
		maximum: 5,
		components: {
			building: true,
			created: {
				time: 150,
				cost: {
					'Cash': 300,
					'Iron': 10
				}
				
			},
			consumer: {
				rate: 7,
				consumes: {
					Pollution: 2
				}
			},
			requires: {
				topics: {
					'Manufacturing': 1
				},
				items: {
					Engineer: 1
				}
			}
		}
	});
	
	Clicker.addItem({
		name: 'Highway',
		icon: 'icons/highway/icon_7534.svg',
		maximum: 5,
		components: {
			building: true,
			created: {
				time: 200,
				cost: {
					'Cash': 400,
					'Wood': 10,
					'Cement': 30
				}
			},
			improves: {
				Ore: 0.05,
				Cash: 0.05,
				Water: 0.05
			},
			requires: {
				topics: {
					'Manufacturing': 1
				}
			}
		}
	});
	
	Clicker.addItem({
		name: 'Water Tank',
		icon: 'icons/watertank/icon_30192.svg',
		maximum: 5,
		components: {
			building: true,
			increases: {
				Water: 300
			},
			created: {
				time: 250,
				cost: {
					'Cash': 1000,
					'Copper': 20
				},
				gives: {
					Water: 300
				}
			},
			requires: {
				topics: {
					'Civics': 2,
					'Manufacturing': 2
				}
			}
		}
	});
	
	Clicker.addItem({
		name: 'Battery',
		icon: 'icons/battery/icon_2952.svg',
		maximum: 25,
		components: {
			building: true,
			increases: {
				Energy: 300
			},
			created: {
				time: 150,
				cost: {
					'Cash': 500,
					'Copper': 10,
					Gold: 5,
					'Silicon': 5
				},
				gives: {
					Energy: 300
				}
			},
			requires: {
				topics: {
					'Technology': 2,
					'Manufacturing': 1
				}
			}
		}
	});

	Clicker.addItem({
		name: 'Mine',
		icon: 'icons/mine/icon_8497.svg',
		maximum: 5,
		components: {
			building: true,
			mine: {
				rate: 1
			},
			increases: {
				Miner: 3
			},
			worker: {
				rate: 9,
				provides: {
					Pollution: -2,
					Ore: 3
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
		name: 'Power Plant',
		icon: 'icons/powerplant/icon_2071.svg',
		maximum: 5,
		components: {
			building: true,
			improves: {
				Energy: 0.20
			},
			worker: {
				rate: 4,
				provides: {
					Energy: 1,
					Pollution: -1.5
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
		name: 'Office',
		icon: 'icons/office/icon_26565.svg',
		maximum: 5,
		components: {
			building: true,
			improves: {
				Cash: 0.10
			},
			increases: {
				Employee: 20,
				Banker: 5
			},
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
		name: 'School',
		icon: 'icons/school/icon_4405.svg',
		maximum: 5,
		components: {
			building: true,
			improves: {
				Brainpower: 0.08
			},
			increases: {
				Teacher: 3
			},
			created: {
				time: 300,
				cost: {
					'Cash': 300,
					'Cement': 10,
					'Wood': 30,
					'Book': 5
				},
				gives: {
					Brainpower: 200
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
		name: 'Clinic',
		icon: 'icons/clinic/icon_50644.svg',
		maximum: 5,
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
					'Cash': 750,
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
		name: 'Solar Panel',
		icon: 'icons/solar/icon_2062.svg',
		maximum: 5,
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
					'Technology': 3
				}
			}
		}
	});
	
	Clicker.addItem({
		name: 'Water Recycling Plant',
		icon: 'icons/watertreatment/icon_1132.svg',
		maximum: 5,
		components: {
			building: true,
			improves: {
				Water: 0.05
			},
			increases: {
				Water: 500,
			},
			worker: {
				rate: 23,
				provides: {
					Water: 10
				}
			},
			consumer: {
				rate: 13,
				consumes: {
					Pollution: 25,
					Energy: 3
				}
			},
			created: {
				time: 400,
				cost: {
					'Cash': 5000,
					'Glass': 20,
					'Steel': 40,
					'Reinforced Concrete': 10,
					'Computer': 1,
					'Gold': 10
				}
			},
			requires: {
				topics: {
					'Civics': 2,
					'Technology': 3
				}
			}
		}
	});

	Clicker.addItem({
		name: 'Airport',
		icon: 'icons/airport/icon_14018.svg',
		maximum: 5,
		components: {
			building: true,
			created: {
				time: 300,
				cost: {
					'Cash': 30000,
					'Cement': 100,
					Glass: 20,
					Oil: 50,
					'Water Tank': 2
				}
			},
			improves: {
				Cash: 0.10,
				Water: 0.15,
				Energy: 0.15
			},
			requires: {
				topics: {
					'Civics': 2,
					'Technology': 2
				}
			}
		}
	});

	Clicker.addItem({
		name: 'Bank',
		icon: 'icons/bank/icon_40422.svg',
		maximum: 5,
		components: {
			building: true,
			improves: {
				Cash: 0.20
			},
			increases: {
				Banker: 5,
				Cash: 1000000
			},
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
					'Cash': 50000,
					'Glass': 20,
					'Steel': 20,
					'Reinforced Concrete': 20,
					'Computer': 5,
					'Gold': 30
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
		name: 'Hospital',
		icon: 'icons/hospital/icon_50643.svg',
		maximum: 5,
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
					'Cash': 50000,
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
		maximum: 5,
		components: {
			building: true,
			improves: {
				Brainpower: 0.30
			},
			increases: {
				Engineer: 10,
				Professor: 3
			},
			created: {
				time: 1200,
				cost: {
					'Cash': 100000,
					'Reinforced Concrete': 20,
					'Steel': 50,
					'Computer': 15
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
	
	
	Clicker.addItem({
		name: 'Nuclear Plant',
		icon: 'icons/nuclearplant/icon_42473.svg',
		maximum: 5,
		components: {
			building: true,
			improves: {
				Energy: 1
			},
			increases: {
				'Energy': 10000
			},
			worker: {
				rate: 5,
				provides: {
					Energy: 50
				}
			},
			consumer: {
				rate: 181,
				consumes: {
					Water: 100,
					FuelRod: 5
				}
			},
			created: {
				time: 1200,
				cost: {
					'Cash': 500000,
					'Reinforced Concrete': 100,
					'Steel': 200,
					'Engineer': 10,
					'Computer': 20
				},
				gives: {
					Energy: 1000
				}
			},
			requires: {
				topics: {
					'Manufacturing': 5
				},
				items: {
					University: 1,
					Hospital: 1
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
			
			Clicker.game().items.Ore.maximum += newLevel * 600;
		}
	});

	Clicker.addTopic({
		name: 'Education',
		icon: 'icons/education/icon_3012.svg',
		levelUp: function(newLevel) {
			var current = Clicker.game().items.Brainpower.rates.raw;
			Clicker.game().items.Brainpower.rates.raw = current + current * (newLevel / 10);
			Clicker.game().items.Brainpower.maximum += newLevel * 600;
		}
	});

	Clicker.addTopic({
		name: 'Civics',
		icon: 'icons/civics/icon_24569.svg',
		levelUp: function(newLevel) {
			var current = Clicker.game().items.Cash.rates.raw;

			Clicker.game().items.People.rates.raw = newLevel;
			Clicker.game().items.People.maximum += newLevel * 10;
		}
	});

	Clicker.addTopic({
		name: 'Economics',
		icon: 'icons/economics/icon_29406.svg',
		levelUp: function(newLevel) {
			var current = Clicker.game().items.Cash.rates.raw;
			Clicker.game().items.Cash.rates.raw = current + current * (newLevel / 10);
		}
	});
	Clicker.addTopic({
		name: 'Technology',
		icon: 'icons/technology/icon_1870.svg',
		levelUp: function(newLevel) {
			var current = Clicker.game().items.Water.rates.raw;
			Clicker.game().items.Water.rates.raw = current + current * (newLevel / 10);
			
			Clicker.game().items.Energy.maximum += newLevel * 10;
		}
	});

	Clicker.addTopic({
		name: 'Manufacturing',
		icon: 'icons/manufacturing/icon_819.svg',
		levelUp: function(newLevel) {
			var items = Clicker.game().byComponent('building');
			if (items && items.length) {
				for (var i = 0; i < items.length; i++) {
					if (items[i].fixed) {
						continue;
					}
					items[i].maximum += newLevel * 4;
				}
			}
			Clicker.game().items.Water.maximum += newLevel * 10;
		}
	});
});
