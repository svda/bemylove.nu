$(function() {
	$(document).on( 'click', 'a[href^="#"]', function () {
        var target = $(this).attr("href");
        $("html:not(:animated),body:not(:animated)").animate({
            scrollTop: $(target).offset().top
        }, 400 );
        return false;
	});
});