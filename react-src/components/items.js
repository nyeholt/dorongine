
var ItemInfo = React.createClass({
	render: function () {
		var item = this.props.item;
		
		var deleteButton;
//		if ({item.amount >= 1 && !item.components.employable }<button on-tap="destroy">X</button>}) {
//			
//		}
		
		return (
			<span>
			<td>
			<span className="item-amount">{item.amount} / {item.maximum}</span>
			</td>
			
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</span>
		)
	}
});

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

module.exports = {
	ItemInfo: ItemInfo,
	ItemDisplay: ItemDisplay
}