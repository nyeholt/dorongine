

;(function ($) {
	
	Clicker.init();
	Clicker.load();
	Clicker.start();
	
	$(function () {
		
		var dialogDiv;
		
		var graphDiv;
		
		var data = {};
		
		$(document).on('click', '#restart', function () {
			Clicker.init();
			Clicker.save();
			Clicker.start();
		})
		
		$(document).on('click', '#save', function () {
			Clicker.save();
		})

		$(document).on('click', '#load', function () {
			Clicker.load();
		})
		
		$(document).on('click', function () {
			
		})

		
		
		
		var closeDialog = function () {
			dialogDiv.hide();
			return false;
		};
		
		var drawgraph = function () {
			$('#graph').text('Loading...');
			var max = data.max_val;
			var drawn = false;
			
			var include = $('[name=graphitem]');
			
			var height = (dialogDiv.height() - 100);
			
			include.each(function () {
				var key = $(this).val();
				if ($(this).is(':checked')) {
					// create the graph
					$('#graph').sparkline(data[key], {
						width: '100%',
						height: height + 'px',
						lineColor: Clicker.game().items[key].color,
						fillColor: false,
	//					chartRangeMax: max,
						composite: drawn
					});

					drawn = true;
				}
				
			});
		}
		
		$(document).on('click', '#graphclose', closeDialog);
		$(document).on('click', '#redraw', drawgraph);

		$(document).on('click','#graphbtn', function () {
			var src = $('#graphsrc').val();
			data = Clicker.game().stats[src];
			if (!data) {
				return;
			}

			if (!graphDiv) {
				graphDiv = $('#graphdiv-container');
			}
			
			$('#graphoptions').css('height', '50px');

			var graphItems = $('#graphitems');
			graphItems.empty();

			for (var key in data) {
				if (key === 'max_val') {
					continue;
				}
				var opt = $('<input type="checkbox" name="graphitem">');
				opt.val(key);

				graphItems.append($('<label>').append(opt).append(key));
			}
			
			showDialog(graphDiv);
			drawgraph();
		});

		function showDialog(html) {
			if (!dialogDiv) {
				dialogDiv = $('#dialog-div');
				dialogDiv.css({
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
				
				var dialogContent = $('<div class="dialog-content">');
				dialogDiv.append(dialogContent);
				
				var closer = $('<a href="#">close</a>');
				closer.css({
					position: 'absolute',
					top: '3px',
					right: '2px'
				});
				
				closer.click(closeDialog);
				dialogDiv.append(closer);
			}

			dialogDiv.find('.dialog-content').html(html);
			dialogDiv.show();
		};
		
		$(document).on('click', '.dialog-link', function (e) {
			e.preventDefault();
			
			var elem = $($(this).attr('href'));
			if (elem.length) {
				showDialog(elem.html());
			}
			return false;
		})
	});
})(jQuery);