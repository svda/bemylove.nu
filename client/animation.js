$(function() {

	var current = '#home';

	$(document).on( 'click', '#continue a', function (e) {
		$('#continue a').removeClass('last');

        var target = $(current).next('section');
        if(!target.length) {
        	target = '#home';
        }
        goto(target);

        if(!target.next('section').length)
        	$('#continue a').addClass('last');
        return false;
	});

	function goto(target) {
        $("html:not(:animated),body:not(:animated)").animate({
            scrollTop: $(target).offset().top
        }, 400 );
        current = '#' + $(target).attr('id');
        console.log(current);
	}
});