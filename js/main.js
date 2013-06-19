$(function () {
    var navigation = $('header nav'),
        navigationHeight = navigation.height(),
        scrollEl = $('html,body');


    navigation.find('.pointer').on('click', function () {
        navigation.toggleClass('open open-with-click');
    })

    navigation.find('a[href^=#]').on('click', function (event) {
        var el = $(this);
        if (!el.data('target')) el.data('target', $(this.hash));
        var target = el.data('target');

        if (!target.length) return;
        if (!el.data('targetBar')) el.data('targetBar', target.find('.bar').height());

        event.preventDefault();
        var tOffset = target.offset().top - el.data('targetBar') - 20;
        if (!navigation.hasClass('fixed')) {
            tOffset -= navigationHeight;
        }
        scrollEl.animate({scrollTop: tOffset}, 'slow');
    });

    $(window).on('scroll', function () {
        var winWidth = $(window).width(),
            position = $(document).scrollTop()

        if (position >= navigationHeight && !navigation.hasClass('fixed') && winWidth >= 1024) {
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
})
