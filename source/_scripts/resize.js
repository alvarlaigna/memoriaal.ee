$(function () {
    var windowResized = function () {
        var tallest = 0

        $('.nav-title').css('height', '')
        $('.nav-title').each(function () {
            var eleHeight = $(this).outerHeight(true)
            tallest = eleHeight > tallest ? eleHeight : tallest
        })
        $('.nav-title').css('height', tallest + 'px')

        $('#navigation img').addClass('d-none')
        $('#navigation p').addClass('d-none')

        if ($(window).width() > 1200) {
            if ($(window).height() > 800) {
                $('#navigation p').removeClass('d-none')
                $('#navigation img').removeClass('d-none')
            } else if ($(window).height() > 600) {
                $('#navigation img').removeClass('d-none')
            }
        } else {
            if ($(window).height() > 1200) {
                $('#navigation p').removeClass('d-none')
                $('#navigation img').removeClass('d-none')
            } else if ($(window).height() > 800) {
                $('#navigation img').removeClass('d-none')
            }
        }

        if ($(window).width() < 768) {
            $('#navigation').removeClass('fixed-bottom')
            $('#text').css('min-height', 'inherit')
            $('#text').css('padding-bottom', '')
        } else {
            $('#navigation').addClass('fixed-bottom')
            $('#text').css('min-height', '100%')
            $('#text').css('padding-bottom', $('#navigation').outerHeight(true) + 'px')
        }
    }

    windowResized()

    var doit
    $(window).on('resize', function () {
        clearTimeout(doit)

        doit = setTimeout(windowResized, 100)
    })
})