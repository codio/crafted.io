$(function () {
    var navigation = $('#main-nav'),
        navigationHeight = navigation.height(),
        minScreenSize = 650,
        scrollEl = $('html,body'),
        conversionTraking = [
            '<noscript>',
            '<div style="display:inline;">',
            '<img height="1" width="1" style="border-style:none;" alt="" src="//www.googleadservices.com/pagead/conversion/994924973/?value=0&amp;label=ndt-COvQxgUQrbO12gM&amp;guid=ON&amp;script=0"/>',
            '</div>',
            '</noscript>'
        ].join('');


    navigation.find('.pointer').on('click', function () {
        navigation.toggleClass('open open-with-click');
    });

    $('a[href^=#]').add('.get-in-touch .button').on('click', function (event) {
        var winWidth = $(window).width(),
            el = $(this);
        if (!el.data('target')) el.data('target', $(this.hash));
        var target = el.data('target');

        if (!target.length) return;
        if (!el.data('targetBar')) el.data('targetBar', target.find('.bar').height());

        event.preventDefault();
        var tOffset = target.offset().top;

        if (winWidth < minScreenSize) {
            navigation.hasClass('open') && navigation.find('.pointer').trigger('click')
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


    $.fn.contactForm = function () {
        var form = this,
            regEmail = /[\w\.+]{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,5}$/ig,
            regPhoneTpl = /[^0-9\+\(\)\s-]/g,
            regPhoneCheck = /([0-9]){3,}/,
            fields = $('input,textarea', form),
            submit = $('[type="submit"]', form);


        submit.on('click', function (event) {
            event.preventDefault();
            disableForm();

            var phone = fields.filter('[name=phone]');
            phone.val(phone.val().replace(regPhoneTpl, ''));

            fields.each(function (i, field) {
                validateField($(field));
            });

            if (fields.filter('.error').length) return enableForm();

            sendForm();
        });

        function sendForm() {
            $.post('http://peaceful-castle-1581.herokuapp.com/', {
                name: fields.filter('[name=name]').val(),
                email: fields.filter('[name=email]').val(),
                phone: fields.filter('[name=phone]').val(),
                text: fields.filter('[name=text]').val()
            }, 'json')
                .done(function (data) {
                    if (data.success) {
                        fields.add(submit).hide();
                        form.find('.success-message').show();
                        $('body').append(conversionTraking)
                        return;
                    }

                    $.each(data.errors, function (key) {
                        setFieldError(fields.filter('[name=' + key + ']'));
                    });

                    enableForm();
                })
                .fail(function (xhr) {
                    enableForm(xhr.responseText);
                });
        }

        function validateField(field) {
            var type = field.attr('name'),
                val = $.trim(field.val()),
                error;

            if (type == 'email') error = !regEmail.test(val);
            else if (type == 'phone') error = !regPhoneCheck.test(val);
            else error = val.length <= 0;

            if (error) setFieldError(field);
        }

        function setFieldError(field) {
            field.addClass('error');
            field.one('keyup blur', function () {
                field.removeClass('error');

                if (!fields.filter('.error').length) {
                    $('.error-message', form).hide();
                }
            });
        }

        function disableForm(message) {
            message = message || 'loading';
            submit.data('label', submit.html());
            submit.html(message + '...');
            fields.add(submit).prop('disabled', true);
            $('.error-message', form).hide();
        }

        function enableForm(error) {
            error = error || 'Check your data please';
            submit.html(submit.data('label'));
            fields.add(submit).prop('disabled', false);
            fields.filter('.error').first().focus();

            $('.error-message', form).html(error).show();
        }

        return this;
    }

    $('#contactus form').contactForm();
});
