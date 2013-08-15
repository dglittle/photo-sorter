$(function() {
	$.get('/api/albums', function(albums) {
		$('#albums').html(albums);
		$('.selectAlbum').on('click', function(event) {
			event.preventDefault();
			var url = $(event.target).closest('a').attr('href');
			$.get('/api' + url, function(album) {
				$('.content').html(album);
			});
		});
	});
	$('#name').on('submit', function(event) {
		event.preventDefault();
		$.post('/api/albums', {name : $('#newName').val()}, function() {
			$('#add').modal('hide');
			location.reload();
		});
	});
});