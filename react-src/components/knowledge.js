
var KnowledgeTable = React.createClass({
	toggleResearch: function (topicName) {
		Clicker.toggleTopic(topicName);
	},
	render: function() {
		var game = this.props.game;
		if (!game) {
			return null;
		}
		
		var renderDep = function (srcTopic, level) {
			var deps = [];
			var otherTopics = game.byTopic(srcTopic, level);
			for (var i in otherTopics) {
				var depTopic = otherTopics[i];
				deps.push(
					<img key={srcTopic + "-" + i} title={depTopic.name} src={depTopic.icon} className="item-icon" />
				);
			}
			return deps;
		}
		
		var renderTopics = function (context) {
			var topics = [];
			for (var topic_name in game.topics) {
				var theTopic = game.topics[topic_name];
				topics.push(
					<tr key={topic_name + "-research"}>
					<td><img src={theTopic.icon} title={topic_name} className="item-icon" /></td>
					<td>Level {theTopic.level}</td>
					<td>
					<div><progress max={theTopic.target} value={theTopic.knowledge}></progress></div>
					<div className="progress-info">
					<span>Needed for: </span>
					{ renderDep(topic_name, theTopic.level+1) }
					</div>
					</td>
					<td className="knowledge-input">
					<input type="checkbox" checked={theTopic.active} onChange={context.toggleResearch.bind(context, topic_name)} />
					</td>
					</tr>
				);
			}
			return topics;
		};
		
		return (
			<div id="knowledge" className="holder">
				<h2>Research</h2>
				<p>Research improves existing items, and allows the creation of others</p>
				<p>Create schools and hire teachers to increase rate of research</p>
				
				<table>
				<thead>
				<tr>
				<th></th>
				<th></th>
				<th></th>
				<th width="10%">Research active</th>
				</tr>
				</thead>
				<tbody>
				{ renderTopics(this) }
				</tbody>
				</table>
			</div>
		)
	}
});

module.exports = KnowledgeTable;