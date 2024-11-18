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

    $("#langBtn").on("click", function () {
        const crtLang = $("html").attr("lang")
        const newLang = crtLang === "ar" ? "en" : "ar"
        $("html").attr("lang", newLang)
        // Get the current page path after the base URL
        const currentPath = window.location.pathname.split('/').slice(2).join('/'); // Skip the language segment

        window.location.href = `/${newLang}/${currentPath}`;
    })

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

    let directionVal = $('html').attr('dir')

    $(".owl-carousel").owlCarousel({
        loop: true,
        rtl: directionVal === "rtl" ? true : false,
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
                items: 3
            },
            1200: {
                items: 4
            }
        }
    });

    AOS.init();
})
