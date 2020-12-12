$(window).on('load',function () {
    initOwlCarousel()
});

$(document).ready(function () {
    homepage()
    // initOwlCarousel()
    // let owl = $('.custom1')
    // owl.trigger('initialized.owl.carousel').show();
    // // owl.trigger("refresh.owl.carousel");
    // owl.owlCarousel({
    //     opacity: 0,
    //     autoplay: true,
    //     autoplayTimeout: 4000,
    //     animateOut: 'fadeOut',
    //     animateIn: 'fadeIn',
    //     items: 1,
    //     margin: 10,
    //     stagePadding: 10,
    //     smartSpeed: 400,
    //     autoHeight: true,
    // })
})

function initOwlCarousel()
{
    let owl = $('.custom1')
    owl.owlCarousel({
        autoHeight: true,
        lazyLoad: true,
        items: 1,
        autoplay: true,
        nav: false,
        dots: true,
        loop: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        autoplayTimeout: 2000
        // autoHeight: true,
        // lazyLoad: true,
        // items: 1,
        // autoplay: true,
        // nav: false,
        // dots: true,
        // loop: true,
        // autoplayTimeout: 4000,
        // animateOut: 'fadeOut',
        // animateIn: 'fadeIn',
        // margin: 10,
        // stagePadding: 10,
        // smartSpeed: 400,
    });
}

$(window).resize(function() {
    homepage()
});

function homepage()
{
    if ($(window).width() < 995) {
        $("#primary_nav").find('.menu_close_btn').removeAttr("style","display: none");
        // console.log("small")
    }
    else {
        $("#primary_nav").find('.menu_close_btn').attr("style","display: none");
        // console.log("big")
    }
}

// $("#btn-1").click(function() {
//     $([document.documentElement, document.body]).animate({
//         scrollTop: $("#our_product_spec").offset().top
//     }, 1000);
// });
//
// $("#btn-2").click(function() {
//     $([document.documentElement, document.body]).animate({
//         scrollTop: $("#our_product_cert").offset().top
//     }, 1000);
// });


// $('.owl-carousel').owlCarousel({
//     loop:true,
//     margin:10,
//     nav:true,
//     responsive:{
//         0:{
//             items:1
//         },
//         600:{
//             items:3
//         },
//         1000:{
//             items:5
//         }
//     }
// })