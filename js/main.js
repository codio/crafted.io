$(function () {
    var navigation = $('header nav'),
        navigationHeight = navigation.height(),
        scrollEl = $('html,body');


    navigation.find('.pointer').on('click', function () {
        navigation.toggleClass('open open-with-click');
    });

    navigation.find('a[href^=#]').on('click', function (event) {
        var winWidth = $(window).width(),
            el = $(this);
        if (!el.data('target')) el.data('target', $(this.hash));
        var target = el.data('target');

        if (!target.length) return;
        if (!el.data('targetBar')) el.data('targetBar', target.find('.bar').height());

        event.preventDefault();
        var tOffset = target.offset().top;
        if (navigation.hasClass('fixed')) {
            tOffset -= navigationHeight;
        }

        if (winWidth < 1024) {
            navigation.find('.pointer').trigger('click')
        }
        scrollEl.animate({scrollTop: tOffset}, 'slow');
    });

    $(window).on('scroll', function () {
        var winWidth = $(window).width(),
            position = $(document).scrollTop();

        if (winWidth < 1024) return;

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
