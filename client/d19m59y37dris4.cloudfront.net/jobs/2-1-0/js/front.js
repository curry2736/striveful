/*!
 * Bootstrap Job Board Template
 * Copyright 2016-2020, Bootstrapious
 */

$(function () {

    menuSliding();

    // ------------------------------------------------------- //
    // Testimonials Slider
    // ------------------------------------------------------ //
    $(".testimonials").owlCarousel({
        nav: false,
        dots: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    });


    // ------------------------------------------------------- //
    // Bootstrap Select
    // ------------------------------------------------------ //
    $('.select2').selectpicker();

});


// ------------------------------------------------------- //
// Sliding dropdowns
// ------------------------------------------------------ //

function menuSliding() {


    var dropdowns = $('.dropdown');

    dropdowns.on('show.bs.dropdown', function (e) {

            var dropdownMenu = $(this).find('.dropdown-menu').first();

            if ($(window).width() > 750) {
                dropdownMenu.stop(true, true).slideDown();

            } else {
                dropdownMenu.stop(true, true).show();
            }
        }

    );
    dropdowns.on('hide.bs.dropdown', function (e) {

        var dropdownMenu = $(this).find('.dropdown-menu').first();

        if ($(window).width() > 750) {
            dropdownMenu.stop(true, true).slideUp();
        } else {
            dropdownMenu.stop(true, true).hide();
        }
    });

}

// ------------------------------------------------------- //
// Utilities - tooltips, external links, scroll-to links
// ------------------------------------------------------ //

function utils() {

    /* tooltips */

    $('[data-toggle="tooltip"]').tooltip();

    /* click on the box activates the radio */

    $('#checkout').on('click', '.box.shipping-method, .box.payment-method', function (e) {
        var radio = $(this).find(':radio');
        radio.prop('checked', true);
    });
    /* click on the box activates the link in it */

    $('.box.clickable').on('click', function (e) {

        window.location = $(this).find('a').attr('href');
    });
    /* external links in new window*/

    $('.external').on('click', function (e) {

        e.preventDefault();
        window.open($(this).attr("href"));
    });
    /* animated scrolling */

    $('.scroll-to, .scroll-to-top').click(function (event) {

        var full_url = this.href;
        var parts = full_url.split("#");
        if (parts.length > 1) {

            scrollTo(full_url);
            event.preventDefault();
        }
    });

    function scrollTo(full_url) {
        var parts = full_url.split("#");
        var trgt = parts[1];
        var target_offset = $("#" + trgt).offset();
        var target_top = target_offset.top - 100;
        if (target_top < 0) {
            target_top = 0;
        }

        $('html, body').animate({
            scrollTop: target_top
        }, 1000);
    }
}

// ------------------------------------------------------ //
// For demo purposes, can be deleted
// ------------------------------------------------------ //

var stylesheet = $('link#theme-stylesheet');
$("<link id='new-stylesheet' rel='stylesheet'>").insertAfter(stylesheet);
var alternateColour = $('link#new-stylesheet');

if ($.cookie("theme_csspath")) {
    alternateColour.attr("href", $.cookie("theme_csspath"));
}

$("#colour").change(function () {

    if ($(this).val() !== '') {

        var theme_csspath = 'css/style.' + $(this).val() + '.css';

        alternateColour.attr("href", theme_csspath);

        $.cookie("theme_csspath", theme_csspath, {
            expires: 365,
            path: document.URL.substr(0, document.URL.lastIndexOf('/'))
        });

    }

    return false;
});