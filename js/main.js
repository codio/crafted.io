$(function () {
    var navigation = $('#header nav'),
        navigationHeight = navigation.height(),
        minScreenSize = 650,
        scrollEl = $('html,body');


    navigation.find('.pointer').on('click', function () {
        navigation.toggleClass('open open-with-click');
        console.log(navigation[0].className)
    });

    navigation.find('a[href^=#]').add('.get-in-touch .button').on('click', function (event) {
        var winWidth = $(window).width(),
            el = $(this);
        if (!el.data('target')) el.data('target', $(this.hash));
        var target = el.data('target');

        if (!target.length) return;
        if (!el.data('targetBar')) el.data('targetBar', target.find('.bar').height());

        event.preventDefault();
        var tOffset = target.offset().top;

        if (winWidth < minScreenSize) {
            navigation.find('.pointer').trigger('click')
        } else {
            tOffset -= navigationHeight;
        }

        scrollEl.animate({scrollTop: tOffset}, 'slow');
    });

    $(window).on('scroll', function () {
        var winWidth = $(window).width(),
            position = $(document).scrollTop();

        if (winWidth < minScreenSize) return;

        if (position >= navigationHeight && !navigation.hasClass('fixed')) {
            navigation.addClass('open fixed');
            setTimeout(function () {
                navigation.addClass('fixed-after-anim');
            }, 300)
        } else if (position <= navigationHeight) {
            navigation.removeClass('fixed fixed-after-anim');

            if (!navigation.hasClass('open-with-click')) {
                navigation.removeClass('open');
            }
        }
    });
});
