var ActionBar = require('./components/actionbar');
var PeopleGroup = require('./components/population');
var KnowledgeTable = require('./components/knowledge');
var ResourceTable = require('./components/resources');
var ItemsCreateBlock = require('./components/items').ItemsCreateBlock;
var FooterBar = require('./components/footer');

var AppLayout = React.createClass({
	componentDidMount: function () {
		Clicker.init();
		Clicker.load();
		Clicker.setRenderFunction(redrawAll);
		Clicker.start();
		var game = Clicker.game();
		this.setState({game: game})
	},
	render: function () {
		var game = this.state ? this.state.game : null;
		return (
			<div id="app-layout">
			<ActionBar game={game} />
			<PeopleGroup game={game} />
			<KnowledgeTable game={game} />
			<ResourceTable game={game} />
			<ItemsCreateBlock game={game} />
			<FooterBar game={game} />
			</div>
		);
	}
});

var redrawAll = function (d) {
	App.setState({time: d});
}

var App = ReactDOM.render(
	<AppLayout />,
	document.getElementById('reactgine')
);