var ActionBar = require('./components/actionbar');
var PeopleGroup = require('./components/population');
var KnowledgeTable = require('./components/knowledge');
var ResourceTable = require('./components/resources');

var AppLayout = React.createClass({
	componentDidMount: function () {
		Clicker.init();
		Clicker.load();
		Clicker.start(redrawAll);
		
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
			</div>
		);
	}
});



var redrawAll = function () {
	ReactDOM.render(
		<AppLayout />,
		document.getElementById('reactgine')
	);
}
redrawAll();