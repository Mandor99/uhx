$(function () {

    // $(window).on('load', function () {
    //     console.log('Window fully loaded');
    //     $('#loader').fadeOut('slow', function () {
    //         $('body').removeClass('no-scroll');
    //         $('#all-content').show();
    //         setTimeout(() => {
    //             $('#loader').addClass('hidden');
    //             $('#loader').hide()
    //             console.log('Loader hidden');
    //         }, 1300);
    //     });
    // });

    $(window).on("scroll", function (e) {
        if ($(this).scrollTop() > 80) {
            $(".navbar").addClass("navbar-shrink");
        } else {
            $(".navbar").removeClass("navbar-shrink");
        }
    })

    $('#scrollableDiv').on('mouseover', function () {
        $('#marquee').removeClass('running').addClass('pause');
    });

    $('#scrollableDiv').on('mouseleave', function () {
        $('#marquee').removeClass('pause').addClass('running');
    });

    $("#navbarSupportedContent a:not(.dropdown-toggle)").on('click', function () {
        $("#navbarSupportedContent").collapse("hide");
    });

    $(".owl-carousel").owlCarousel({
        loop: true,
        rtl: true,
        margin: 30,
        autoplay: true,
        autoplayTimeout: 3000,
        nav: true,
        navText: ['<img src="../imgs/icons/arrow-left.png" class="slider-my-arrow-left"></img>', '<img src="../imgs/icons/arrow-right.png" class="slider-my-arrow-right"></img>'],
        dots: false,
        center: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        }
    });

    AOS.init();
})
