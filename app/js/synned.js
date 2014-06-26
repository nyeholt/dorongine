
Clicker.init();
Clicker.start();

;(function ($) {
	$(function () {
		
		$(document).on('click', '#save', function () {
			Clicker.save();
		})
		
		$(document).on('click', '#load', function () {
			Clicker.load();
		})
		
		$(document).on('click', function () {
			
		})

		var graphDiv;
		var closeGraph = function () {
			graphDiv.hide();
		};
		
		$(document).on('click','#graphbtn', function () {
			if (!graphDiv) {
				graphDiv = $('<div id="graphdiv-container"><span id="graph">Loading...</span><div id="graphoptions"></div></div>');
				graphDiv.css({
					position: 'fixed',
					top: '5%',
					left: '5%',
					background: '#fff',
					width: '90%',
					height: '90%',
					margin: '10px auto',
					border: '2px solid #aaa',
					'padding-top': '20px',
					display: 'none'
				});
				$('body').append(graphDiv);
				$('#graphoptions').css('height', '50px');
			}
			
			if (graphDiv.is(':visible')) {
				closeGraph();
				return;
			}
			graphDiv.click(closeGraph);
			graphDiv.show();
			
			var src = $('#graphsrc').val();
			var data = Clicker.game().stats[src];
			
			var max = data.max_val;
			var drawn = false;
			for (var key in data) {
				if (key === 'max_val') {
					continue;
				}

				// create the graph
				$('#graph').sparkline(data[key], {
					width: '100%',
					height: '100%',
					lineColor: Clicker.game().items[key].color,
					fillColor: false,
					chartRangeMax: max,
					composite: drawn
				});

				drawn = true;
			}
		});
	});
})(jQuery);