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
		if (!item) {
			return null;
		}
		var buyButton = null;
		if (item.canBuy()) {
			buyButton = (
				<button title={item.name} onClick={this.clickBuy}>
				{item.formatted(item.components.market.buy * item.buyVolume)}
				</button>
			);
		}
		return (
			buyButton
		)
	}
});

module.exports = {
	ItemDisplay: ItemDisplay,
	ItemBuyButton: ItemBuyButton
}