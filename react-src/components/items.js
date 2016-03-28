
var ItemsCreateBlock = React.createClass({
	render: function () {
		if (!this.props.game) {
			return null;
		}
		
		return (
			<div id="creatable"  className="holder">
				<h2>Items</h2>
				
				<p>Do some research to unlock items</p>
				
				<table className="items-table">
				<thead>
				<tr>
					<th width="60px">Item</th>
					<th width="60px"></th>
					<th width="100px">Amount</th>
					<th>Requires</th>
					<th>Cost</th>
					<th>Gives</th>
					<th>Consumes</th>
					<th>Provides</th>
					<th>Improves</th>
				</tr>
				</thead>
				<tbody>
				{
					this.props.game.byComponent('goods').map(function (item) {
						if (item.meetsRequirements()) {
						return (<BuildableItemRow item={item} key={'goods-' + item.name} />)
						}
					})
				}
				</tbody>
				</table>

				
				<h2>Buildings</h2>
				
				<p>Do some research to unlock buildings</p>
				
				<table>
				<thead>
				<tr>
				<th width="60px">Item</th>
				<th width="60px"></th>
				<th width="100px">Amount</th>
				<th>Requires</th>
				<th>Cost</th>
				<th>Gives</th>
				<th>Consumes</th>
				<th>Provides</th>
				<th>Improves</th>
				</tr>
				</thead>
				<tbody>
				{
					this.props.game.byComponent('building').map(function (item) {
						if (item.meetsRequirements()) {
							return (<BuildableItemRow key={'building-' + item.name} item={item} />)
						}
						
					})
				}
				</tbody>
				</table>
			</div>
		)
	}
})

var BuildableItemRow = React.createClass({
	render: function () {
		var item = this.props.item;
		if (!item) {
			return false;
		}
		if (!item.meetsRequirements()) {
			return false;
		}
		
		return (
			<tr>
				<td className="build-col">
				<ItemBuyButton showImage={true} item={item} />
				</td>

				<td>
				<ItemVolumeSelect item={item} />
				</td>

				{ItemDisplay(item)}
			</tr>
		);
	}
})

var ItemDisplay = function (item) {
	var topicReqs;
	var itemReqs;
	
	
	var renderNeeds = function (props) {
		var needs = [];
		var context = item.components;
		var depth = 0;
		for (var i in props) {
			var propName = props[i];
			if (context[propName]) {
				depth ++;
				context = context[propName];
			} else {
				break;
			}
		}
		if (context && depth == props.length) {
			var key, value;
			for (var key in context) {
				needs.push(
					<span className="requirement" key={"req-span-" + key}>
					<img title={key} src={item.iconfor(key)} className="required-icon" /> {context[key]}
					</span>
				);
			}
		}
		if (needs.length) {
			return needs;
		}
	};
	
	var renderRate = function(rate) {
		if (item.rates[rate]) {
			return (
				<span className="rate-info"> / {item.rates[rate]} ticks</span>
			);
		}
	}
	
	return [
		<td key="item-td-one"><span className="item-amount">{item.amount} / {item.maximum}</span></td>,
		<td key="item-td-two"><div>{ topicReqs } { itemReqs }</div></td>,
		<td key="item-td-three">{ renderNeeds(['created', 'cost'])}</td>,
		<td key="item-td-four">{ renderNeeds(['created', 'gives'])}</td>,
		<td key="item-td-five"><div>{ renderNeeds(['consumer','consumes'])} {renderRate('consumer')}</div></td>,
		<td key="item-td-six"><div>{ renderNeeds(['worker','provides'])} {renderRate('worker')}</div></td>,
		<td key="item-td-seven"><div>{ renderNeeds(['improves'])}</div></td>
	]
};

var ItemBuyButton = React.createClass({
	clickBuy: function () {
		if (this.props.item && this.props.item.canBuy()) {
			Clicker.runInContext("buyItem", this.props.item);
		}
	},
	render: function () {
		var item = this.props.item;
		var showImage = this.props.showImage;

		if (!item || !item.meetsRequirements()) {
			return null;
		}
		var buyButton = null;
		var buttonDisplay = showImage ? (
				<img title={item.name} src={item.icon} className="item-icon" />
			) : item.formatted(item.components.market.buy * item.buyVolume);
		if (item.canBuy()) {
			buyButton = (
				<button title={item.name} onClick={this.clickBuy}>
				{buttonDisplay}
				</button>
			);
		} else {
			buyButton = buttonDisplay;
		}
		return (
			<span>
			{buyButton}
			</span>
		)
	}
});

var ItemSellButton = React.createClass({
	sellItem: function () {
		var item = this.props.item;
		if (item.amount >= item.buyVolume) {
			Clicker.runInContext("sellItem", item);
		}
	},
	render: function () {
		var item = this.props.item;
		if (!item) {
			return null;
		}
		var sellButton = null;
		if (item.amount >= item.buyVolume) {
			sellButton = (<button title={item.name} onClick={this.sellItem}>
				{item.formatted(item.components.market.sell * item.buyVolume)}
				</button>);
		}
		return sellButton;
	}
})

var ItemVolumeSelect = React.createClass({
	lastBuy: 0,
	changeBuyVolume: function (event) {
		this.lastBuy = this.props.item.buyVolume;
		this.props.item.buyVolume = event.target.value;
	},
	
	shouldComponentUpdate: function(nextProps, nextState) {
		if (this.props.item.buyVolume == this.lastBuy) {
			return false;
		}
		this.lastBuy = this.props.item.buyVolume;
		return true;
	},
	
	render: function () {
		var item = this.props.item;
		if (!item) {
			return null;
		}
		var options = this.props.options;
		if (!options) {
			options = [1, 10, 20, 50, 100];
		}
		return (
			<select value={item.buyVolume} onChange={this.changeBuyVolume}>
			{
				options.map(function (val) {
					return ( <option key={'vol-' + val +'-' + item.name} value={val}>x{val}</option> );
				})
			}
			</select>
		)
	}
})

module.exports = {
	ItemsCreateBlock: ItemsCreateBlock,
	ItemDisplay: ItemDisplay,
	ItemBuyButton: ItemBuyButton,
	ItemVolumeSelect: ItemVolumeSelect,
	ItemSellButton: ItemSellButton
}