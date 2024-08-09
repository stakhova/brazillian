let map;
const SIDEMENU = $('.sidemenu__wrap');

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = new Map(document.getElementById("map"), {
        center: { lat: 0, lng: 0 },
        zoom: 2,
        linksControl: false,
        panControl: false,
        addressControl: false,
        zoomControl: false,
        fullscreenControl: false,
        enableCloseButton: false,
        mapId: 'adfaf13712c875c8'
    });

    positionMaps.forEach(position => {
        const customMarkerImg = document.createElement("img");
        customMarkerImg.src = mapIcon;
        const marker = new AdvancedMarkerElement({
            position: { lat: position.lat, lng: position.lng },
            map: map,
            content: customMarkerImg
        });
        const info = new google.maps.InfoWindow({
            content: position.text
        });
        google.maps.event.addListener(marker, "mouseover", () => {
            info.open(map, marker);
        });
        google.maps.event.addListener(marker, "click", () => {
            info.open(map, marker);
        });
        google.maps.event.addListener(map, "click", function (event) {
            // infowindow.close();
            info.close(map, marker);
        });
        google.maps.event.addListener(marker, "mouseout", () => {
            info.close(map, marker);
        });
    });
}

function showMap() {
    const lat = 38.8951;
    const lng = -77.0364;
    const text = 'texttexttext';
    initMap();
}
function zoomMap() {
    $(document).on('click', '.map__marks', function () {
        $('.map__search input').val($(this).text());
        $('.map__search-list > *').remove();

        let lat = parseFloat($(this).data('lat'));
        let lng = parseFloat($(this).data('lng'));
        let newLocation = { lat: lat, lng: lng };
        $('.map__search-result').removeClass('show');

        map.setCenter(newLocation);
        map.setZoom(15);
    });
}
let progressNotComplite =  true
function initProgressBar() {
    if ($('.expert__progress').length > 0) {
        let block = $('.expert__progress');
        let blockTop = block.offset().top;
        let windowBottom = $(window).scrollTop() + $(window).height();
        console.log(blockTop,windowBottom, $(window).scrollTop(), $(window).height() )

        $('.expert__progress-item').each(function (index) {
            let percent = $(this).find('.expert__progress-percent span').text();

            if (windowBottom >= blockTop && progressNotComplite) {
                console.log(111,index)
                console.log(222,$('.expert__progress-item').length)
                console.log(333)
                $(this).find('.expert__progress-bar').animate({
                    width: `${percent}%`
                }, 1700);
                $('.expert__progress-percent').addClass('show');

                if( index == $('.expert__progress-item').length - 1){
                    progressNotComplite =  false
                }
            }
            if ($('.different__progress').length > 0) {
                percent -= 7;
            }

            $(this).find('.expert__progress-percent').css('left', `${percent}%`);

        });
    }
}

function showStar() {
    $('.testimonial__star').each(function () {
        let count_star = $(this).data('star');
        let fullStar = `<img src="${template_path}/img/star.svg"/>`;

        for (let i = 0; i < count_star; i++) {
            $(this).append(fullStar);
        }
    });
}

function showComment() {
    $('.comment__item').each(function () {
        if ($('.comment__item').length > 4) {
            $('.comment__button').show();
        } else {
            $('.comment__button').hide();
        }
    });
    $('.comment__button').click(function () {
        $('.comment__list .comment__item:nth-of-type(n+5)').toggleClass('show');
        let buttonText = $('.comment__list .comment__item:nth-of-type(n+5)').is(':visible') ? 'Show Less' : 'Show More';
        $('.comment__button button').text(buttonText);
    });
}

function addClassActive() {
    function checkInput() {
        let currentValue = $(this).val();
        if (currentValue !== '') {
            $(this).closest('div').addClass('active');
        } else {
            $(this).closest('div').removeClass('active');
        }
    }
    $(document).on('input', '.connect__item input', checkInput);
    $(document).on('change', '.connect__item input', checkInput);
    $(document).on('change', '.connect__item select', checkInput);
    $(document).on('input', '.connect__textarea textarea', checkInput);
}

function accordionFAQ() {
    $('.faq__item:first-child').addClass('faq__open');
    $(document).on('click', '.faq__header', function () {
        let wrap = $(this).closest('.faq__item');
        wrap.prevAll().removeClass('faq__open');
        wrap.nextAll().removeClass('faq__open');

        if (wrap.hasClass('faq__open')) {
            wrap.removeClass('faq__open');
        } else {
            wrap.addClass('faq__open');
        }
    });
}

function changeBannerCounter() {
    $(document).on('click', '.banner__prev', function () {
        $('.banner__counter').addClass('reverse');
    });
    $(document).on('click', '.banner__next', function () {
        $('.banner__counter').removeClass('reverse');
    });
}

function bannerSliderInit() {
    if ($('.banner__slider').length > 0) {
        if (window.innerWidth > 666) {
            const interleaveOffset = 0.75;
            const swiper = new Swiper('.banner__slider', {
                direction: 'vertical',
                speed: 800,
                watchSlidesProgress: true,
                mousewheel: {
                    releaseOnEdges: true
                },
                navigation: {
                    nextEl: '.banner__next',
                    prevEl: '.banner__prev'
                },
                on: {
                    init: function () {
                        updateCounter(this);
                    },
                    slideChange: function () {
                        updateCounter(this);
                    },
                    progress: function () {
                        let swiper = this;
                        for (let i = 0; i < swiper.slides.length; i++) {
                            let slideProgress = swiper.slides[i].progress;
                            let innerOffset = swiper.height * interleaveOffset;
                            let innerTranslate = slideProgress * innerOffset;
                            TweenMax.set(swiper.slides[i].querySelector(".slide-content"), {
                                y: innerTranslate
                            });
                        }
                    },
                    setTransition: function (slider, speed) {
                        let swiper = this;
                        for (let i = 0; i < swiper.slides.length; i++) {
                            swiper.slides[i].style.transition = speed + "ms";
                            swiper.slides[i].querySelector(".slide-content").style.transition = speed + "ms";
                        }
                    }
                }
            });
            swiper.on('slidePrevTransitionStart', function () {
                $('.banner__counter').addClass('reverse');
            });
            swiper.on('slideNextTransitionStart', function () {
                $('.banner__counter').removeClass('reverse');
            });

            function updateCounter(swiper) {
                const $counter = $('.swiper-counter');
                const totalSlides = swiper.slides.length;
                const currentSlide = swiper.realIndex + 1;
                $('.swiper-counter > *').remove();
                $counter.append(`<span class="banner__total">0${totalSlides - swiper.realIndex}</span><span class="banner__current">0${currentSlide}</span> `);
            }

            function handleMouseWheel(e) {
                if (swiper.isEnd && e.deltaY > 0) {
                    document.removeEventListener('wheel', handleMouseWheel, { passive: false });
                    document.removeEventListener('mousewheel', handleMouseWheel, { passive: false });
                } else {
                    e.preventDefault();
                }
            }

            let touchStartY = 0;
            let touchEndY = 0;

            function handleTouchStart(e) {
                touchStartY = e.changedTouches[0].screenY;
            }

            function handleTouchMove(e) {
                touchEndY = e.changedTouches[0].screenY;
            }

            function handleTouchEnd(e) {
                if (swiper.isEnd && touchStartY > touchEndY) {
                    document.removeEventListener('touchstart', handleTouchStart, { passive: false });
                    document.removeEventListener('touchmove', handleTouchMove, { passive: false });
                    document.removeEventListener('touchend', handleTouchEnd, { passive: false });
                } else {
                    e.preventDefault();
                }
            }

            document.querySelector('.banner__slider').addEventListener('wheel', handleMouseWheel, { passive: false });
            document.querySelector('.banner__slider').addEventListener('mousewheel', handleMouseWheel, { passive: false });

            document.querySelector('.banner__slider').addEventListener('touchstart', handleTouchStart, { passive: false });
            document.querySelector('.banner__slider').addEventListener('touchmove', handleTouchMove, { passive: false });
            document.querySelector('.banner__slider').addEventListener('touchend', handleTouchEnd, { passive: false });
        } else {
            const swiper = new Swiper('.banner__slider', {
                speed: 800,
                watchSlidesProgress: true,
                mousewheel: {
                    releaseOnEdges: true
                },
                navigation: {
                    nextEl: '.banner__next',
                    prevEl: '.banner__prev'
                },
                on: {
                    init: function () {
                        updateCounter(this);
                    },
                    slideChange: function () {
                        updateCounter(this);
                    },
                    setTransition: function (slider, speed) {
                        let swiper = this;
                        for (let i = 0; i < swiper.slides.length; i++) {
                            swiper.slides[i].style.transition = speed + "ms";
                            swiper.slides[i].querySelector(".slide-content").style.transition = speed + "ms";
                        }
                    }
                }
            });
            swiper.on('slidePrevTransitionStart', function () {
                $('.banner__counter').addClass('reverse');
            });
            swiper.on('slideNextTransitionStart', function () {
                $('.banner__counter').removeClass('reverse');
            });

            function updateCounter(swiper) {
                const $counter = $('.swiper-counter');
                const totalSlides = swiper.slides.length;
                const currentSlide = swiper.realIndex + 1;
                $('.swiper-counter > *').remove();
                $counter.append(`<span class="banner__total">0${totalSlides - swiper.realIndex}</span><span class="banner__current">0${currentSlide}</span> `);
            }
        }
    }
}

function playVideo() {
    $(document).on('click', '.video__play', function () {
        let poster = $(this).closest('.video').find('.video__poster');
        let video = '<iframe allowFullScreen allow=" fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" frameBorder="0" src="' + poster.attr('data-video') + '" title="' + poster.attr('data-title') + '"></iframe>';
        $(this).hide();
        poster.replaceWith(video);
    });
};

function animate() {

    $('.expert__gallery-img').each(function () {
        let elementTop = $(this).offset().top;
        let viewportBottom = $(window).scrollTop() + $(window).height();

        if (elementTop < viewportBottom - 100) {
            $(this).addClass('animate');
        }
    });

    $('.animate__image > *').each(function () {
        let elementTop = $(this).offset().top;
        let viewportBottom = $(window).scrollTop() + $(window).height();

        if (elementTop < viewportBottom - 100) {
            $(this).addClass('animate');
        }
    });

    $('.faq').each(function () {
        let elementTop = $(this).offset().top;
        let viewportBottom = $(window).scrollTop() + $(window).height();

        if (elementTop < viewportBottom - 50) {
            $('.faq__img').addClass('animate-right');
            $('.faq__info').addClass('animate-top');
        }
    });

    $('.testimonial').each(function () {
        let elementTop = $(this).offset().top;
        let viewportBottom = $(window).scrollTop() + $(window).height();

        if (elementTop < viewportBottom - 100) {
            $('.testimonial__info').addClass('animate-right');
            $('.testimonial__img').addClass('animate-top');
        }
    });
    $('.section__title').each(function () {

        let elementTop = $(this).offset().top;
        let viewportBottom = $(window).scrollTop() + $(window).height();

        if (elementTop < viewportBottom - 100) {
            $(this).addClass('animate-right');
        }
    });
    $('.section__caption > *').each(function () {
        let elementTop = $(this).offset().top;
        let viewportBottom = $(window).scrollTop() + $(window).height();

        if (elementTop < viewportBottom - 100) {
            $(this).addClass('animate-top');
        }
    });
    $('.choose__img img').each(function () {
        let elementTop = $(this).offset().top;
        let viewportBottom = $(window).scrollTop() + $(window).height();

        if (elementTop < viewportBottom - 100) {
            $(this).addClass('animate-right');
        }
    });
    $('.about__gallery').each(function () {
        let elementTop = $(this).offset().top;
        let viewportBottom = $(window).scrollTop() + $(window).height();

        if (elementTop < viewportBottom - 100) {
            $(this).addClass('animate-several');
        }
    });

    $('.connect__abs').each(function () {
        let elementTop = $(this).offset().top;
        let viewportBottom = $(window).scrollTop() + $(window).height();

        if (elementTop < viewportBottom - 100) {
            $(this).addClass('animate-several');
        }
    });
}

function initSliders() {
    const transform = new Swiper('.transform__slider', {
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,
        speed: 1000,
        effect: 'slide',
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        },
        navigation: {
            nextEl: ".transform__next",
            prevEl: ".transform__prev"
        },
        breakpoints: {
            '0': {
                slidesPerView: 1,
                spaceBetween: 30
            },
            '667': {
                slidesPerView: 4,
                spaceBetween: 30
            }
        }

    });
    $('.transform__slider .swiper-slide').on('mouseenter', function () {
        transform.autoplay.stop();
    });

    $('.transform__slider .swiper-slide').on('mouseleave', function () {
        transform.autoplay.start();
    });

    const solution = new Swiper('.solution__slider', {
        slidesPerView: 6,
        spaceBetween: 16,
        loop: true,
        // autoplay: {
        //     delay: 3000,
        //     disableOnInteraction: false
        // },
        breakpoints: {
            '0': {
                slidesPerView: 2,
                centeredSlides: true,
                spaceBetween: 12
            },

            '667': {
                slidesPerView: 6,
                spaceBetween: 16,
                centeredSlides: false
            }
        }
    });

    const stylish = new Swiper('.stylish__slider', {
        slidesPerView: 5,
        centeredSlides: false,
        loop: true,
        slideToClickedSlide: true,
        spaceBetween: 20,
        speed: 1000,
        effect: 'slide',
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        },
        navigation: {
            nextEl: ".stylish__next",
            prevEl: ".stylish__prev"
        },
        breakpoints: {
            '0': {
                slidesPerView: 2.2,
                centeredSlides: true,
                spaceBetween: 12
            },
            '667': {
                slidesPerView: 5,
                spaceBetween: 20,
                centeredSlides: false
            },
            '1920': {
                slidesPerView: 7,
                spaceBetween: 20,
                centeredSlides: false
                // on: {
                //     init: function () {
                //         adjustSlideWidths();
                //     },
                //     resize: function () {
                //         adjustSlideWidths();
                //     }
                // }
            } } });

    $('.stylish__slider .swiper-slide').on('mouseenter', function () {
        stylish.autoplay.stop();
    });

    $('.stylish__slider .swiper-slide').on('mouseleave', function () {
        stylish.autoplay.start();
    });

    // function adjustSlideWidths() {
    //     const slides = document.querySelectorAll('.stylish__item');
    //     let count = 5;
    //     if (window.innerWidth <= 666) {
    //         count = 2.2
    //     }
    //     slides.forEach((slide, index) => {
    //         if ((index + 1) === 3 || (index + 1) === 5 || (index + 1) === 8 || (index + 1) === 10) {
    //             slide.style.width = `calc(2 * (100% / ${count}))`; // Adjust the number based on the number of visible slides
    //         }
    //     });
    // }


    const discover = new Swiper('.discover__slider', {
        slidesPerView: 1.5,
        centeredSlides: false,
        loop: true,
        spaceBetween: 30,
        navigation: {
            nextEl: ".discover__next",
            prevEl: ".discover__prev"
        },
        breakpoints: {
            '0': {
                slidesPerView: 2.2,
                centeredSlides: true,
                spaceBetween: 12
            },

            '667': {
                slidesPerView: 1.5,
                spaceBetween: 30,
                centeredSlides: false
            }
        }

    });
    const product = new Swiper('.stylish__product-slider', {
        slidesPerView: 1,
        centeredSlides: false,
        loop: true,
        spaceBetween: 0,
        navigation: {
            nextEl: ".stylish__product__next",
            prevEl: ".stylish__product__prev"
        }
    });

    const sliderProductThumbnail = new Swiper('.product__slider-thumbnail', {
        slidesPerView: 3,
        freeMode: true,
        spaceBetween: 12,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        breakpoints: {
            // 0: {
            //     slidesPerView: 4,
            //     spaceBetween: 16
            // },
            // 666: {
            //     slidesPerView: 4
            // }
        }

    });

    const sliderProduct = new Swiper('.product__slider', {
        pagination: {
            el: '.product__pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.product__next',
            prevEl: '.product__prev'
        },
        thumbs: {
            swiper: sliderProductThumbnail
        }
    });
}

function showFilter() {
    $(document).on('click', '.category__item-title', function () {
        let filterBlock = $(this).next();
        $(this).toggleClass('open');
        filterBlock.toggleClass('show');
        if (filterBlock.hasClass('show')) {
            filterBlock.show(100);
        } else {
            filterBlock.hide(100);
        }
    });
}

function mobFilterOpen() {}

function mapSearch() {
    function search() {

        let valueLocation = $('.map__search input')[0].value.toLowerCase();
        let arrFilter = [];

        positionMaps.filter(function (item) {
            if (item.text.toLowerCase().includes(valueLocation)) {
                let location = `${item.lat} ${item.lng}`;
                arrFilter.push(item);
            }
        });

        if (arrFilter.length > 0 && valueLocation !== "") {
            $('.map__search-list  > *').remove();
            arrFilter.forEach(function (item) {
                $('.map__search-result').addClass('show');
                $('.map__search-list').append(`<div class="map__marks" data-lng="${item.lng}" data-lat="${item.lat}">${item.text}</div>`);
            });
        } else {
            $('.map__search-result').removeClass('show');
            $('.map__search-list  > *').remove();
        }
    }

    $(document).on('keydown', '.map__search input', function () {
        clearTimeout($(this).data('timer'));
        let timer = setTimeout(function () {
            search();
        }, 500);
        $(this).data('timer', timer);
    });

    $(document).on('submit', '.map__search', function (e) {
        e.preventDefault();
        search();
    });
}

function openMenu() {
    $('.header__burger').click(function (e) {
        if (window.innerWidth <= 666) {
            $('.header__burger').toggleClass("header__burger-open");
            $('.header__menu').toggleClass('header__menu-show');
            $('body').toggleClass('hidden');
            $(document).on('click', '.header__menu-close', function () {
                $('.header__burger').removeClass("header__burger-open");
                $('.header__menu').removeClass('header__menu-show');
                'body'.removeClass('hidden');
            });
        } else {

            let target = $(e.target);
            if (target.is('span')) {
                let backgroundColor = target.css('background-color');
                $('.sidemenu').css('background-color', backgroundColor);
            }

            if (SIDEMENU.hasClass('show')) {
                SIDEMENU.removeClass("show");
            } else {
                SIDEMENU.addClass("show");
            }
        }
    });
};

function hideSideMenu() {
    $(document).on('click', '.sidemenu__back', function () {
        if (SIDEMENU.hasClass('show')) {
            SIDEMENU.removeClass("show");
        } else {
            SIDEMENU.addClass("show");
        }
    });
}

function changeMob() {
    if (window.innerWidth <= 666) {
        $('.category__mob-filter-content').append($('.category__block'));

        $('.category__mob-sort-content').append($('.category__sort'));
        $('.compare .container').prepend($('.compare__control'));

        $('.header__menu').append($('.header__bottom .section__button-wrap'));
        $('.transform .container').append($('.transform .section__nav'));
        $('.latest .container').append($('.latest__view'));
        $('.banner').append($('.banner__counter'));
        $('.testimonial__list').before($('.testimonial__img'));
        $('.stylish__nav').before($('.stylish__nav-title'));
        $('.connect__social').before($('.connect .connect__form'));
        $('.article__link a').removeClass('active');
        $('.news__flex').prepend($('.news__side-item:first-child'));
        if ($('.article').hasClass('services__one') || $('.article').hasClass('category')) {
            $('.article__link-wrap').after($('.article__content'));
            $('.article__link-wrap').after($('.category__content'));
        }

        if ($('.article').hasClass('product__wrap')) {
            $('.article__link-wrap').after($('.product__block'));
        }

        $('.solution .section__button').text('free evaluation');
        const whatWeDo = new Swiper('.do__slider', {
            slidesPerView: 1,
            spaceBetween: 40,
            loop: true,
            navigation: {
                nextEl: ".do__next",
                prevEl: ".do__prev"
            }
        });

        $('.review .testimonial__item').each(function () {
            $(this).find('.testimonial__top').append($(this).find('.testimonial__play'));
            $(this).find('.testimonial__bottom').append($(this).find('.testimonial__quote'));
        });
    }
}

function showSocial() {
    $(document).on('click', '.news__social-btn', function () {
        $(this).next().toggleClass('show');
    });
}

let page = 1;
function loadMore() {
    $(document).on('click', '.load__more .section__button', function () {
        page++;
        const obj = { action: 'load_more_projects', page };
        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            data: obj,
            method: 'POST',
            success: function (res) {
                $('.load__more').remove();
                $('.project__list').append(res);
            },
            error: function (error) {}

        });
    });
}

function showArticle() {
    let search, date;
    $(document).on('submit', '.news__search', function (e) {
        e.preventDefault();
        page = 1;
        search = $(this).find('.section__form-input input').val();
        sendAjaxArticle();
    });
    $(document).on('click', '.news__achieve > *', function () {
        date = $(this).data('date');
        page = 1;
        search = $('.news__search input').val();
        $('.news__achieve > *').removeClass('active');
        $(this).addClass('active');
        sendAjaxArticle();
    });
    $(document).on('click', '.news__more', function () {
        page++;
        search = $('.news__search input').val();
        sendAjaxArticle();
    });
    function sendAjaxArticle() {
        const obj = { action: 'show_article', search, date, page };
        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            data: obj,
            method: 'POST',
            success: function (res) {
                if (page > 1) {
                    $('.news__more').remove();
                    $('.news__list').append(res.data);
                } else {
                    $('.news__list').html(res.data);
                }
            },
            error: function (error) {
                console.log('error', error);
            }

        });
    }
}

function showTop() {
    let btn = $('.header__scroll');
    let scrolled = $(window).scrollTop();
    if (scrolled > 300) {
        btn.addClass('show');
    } else {
        btn.removeClass('show');
    }

    if (window.innerWidth > 666) {
        let footerOffset = $('.footer').offset().top;
        let windowBottom = $(this).scrollTop() + $(window).height();

        if (windowBottom > footerOffset) {
            btn.css('bottom', windowBottom - footerOffset - 32);
        } else {
            btn.css('bottom', '2.4rem');
        }
    } else {}
}

function moveCursor() {
    let cursor = $('.cursor');

    $(document).mousemove(function (e) {
        let mouseX = e.clientX;
        let mouseY = e.clientY;

        cursor.stop().animate({
            left: mouseX,
            top: mouseY
        }, {
            duration: 100,
            easing: 'linear'
        });
    });
    let cursorLittle = $('.cursor__little');

    $(document).mousemove(function (e) {
        let mouseX = e.clientX;
        let mouseY = e.clientY;

        cursorLittle.stop().animate({
            left: mouseX,
            top: mouseY
        }, {
            duration: 50,
            easing: 'linear'
        });
    });

    $(document).mousedown(function () {
        $('.cursor__little').css({
            transform: 'translate(-50%, -50%) scale(3)',
            backgroundColor: 'rgba(180, 156, 134, 0.5)'
        });
    });

    $(document).mouseup(function () {
        $('.cursor__little').css({
            transform: 'scale(1) translate(-50%, -50%)'
            // backgroundColor: 'rgba(255, 0, 0, 0)'
        });
    });

    // $('a, button').hover(
    //     function() {
    //         $('.cursor').css({
    //             transform: 'scale(1.2) translate(-50%, -50%)',
    //         });
    //     },
    //     function() {
    //         $('.cursor').css({
    //             transform: 'scale(1) translate(-50%, -50%)',
    //         });
    //     }
    // );
}

function removeFromCompare() {
    $(document).on('change', '.compare .category__list-main input[type="checkbox"]', function () {
        let product = $(this).closest('.category__product');
        let id = product.data('id');
        product.remove();
        $('.compare__item-block span').each(function () {
            if ($(this).data('value') == id) {
                $(this).remove();
            }
        });
        if ($('.category__list-main .category__product').length < 1) {
            // $('.compare__title').remove();
            $('.category__list-main > *').remove();
            // $('.compare__totop').remove();
            // $('.compare__control-remove').remove();
        }
    });
    $(document).on('click', '.compare__control-remove', function () {
        $('.compare .category__list-main input[type="checkbox"]').each(function () {
            $(this).click();
        });
        // $('.compare__title').remove();
        $('.category__list-main > *').remove();
        $('.compare__item-block').remove();
        // $('.compare__totop').remove();
        // $('.compare__control-remove').remove();
        // $('.category__list-main').remove();
    });
}

function compareChange() {
    if (window.innerWidth <= 666) {
        $('.compare__item-title').each(function () {
            let title = $(this).text();
            $(this).next().find('span').prepend(`<p>${title}</p>`);
        });
        if ($('.compare__block').length > 0) {
            let widthCompare = $('.compare__block').get(0).scrollWidth;
            $('.compare__title').css('width', widthCompare);
        }
    }
}
function countCompare() {
    let checkedCount = $('.category__list-main input[type="checkbox"]:checked').length;
    let checkedCountOffer = $('.category__list-off input[type="checkbox"]:checked').length;

    if (checkedCount >= 4 || checkedCountOffer >= 4) {
        $('.category__list input[type="checkbox"]').not(':checked').prop('disabled', true).closest('.category__product').addClass('disabled');
        $('.disabled').each(function () {
            $(this).append('<p class="section__checkbox-hint">Max 4 items to compare</p>');
        });
    } else {
        $('.category__list input[type="checkbox"]').prop('disabled', false).closest('.category__product').removeClass('disabled');
        $('.section__checkbox-hint').remove();
    }
}

function addToCompare() {
    $(document).on('change', '.category__list input[type="checkbox"]', function (e) {
        e.preventDefault();
        let currentCheckbox = $(this);
        let parentCategoryProduct = currentCheckbox.closest('.category__product');

        let id = parentCategoryProduct.data('id');

        let adding = true;
        if (!$(this).is(':checked')) {
            adding = false;
        }

        $('.category__product').each(function () {
            if ($(this).data('id') == id && $(this).find('input[type="checkbox"]')[0] !== currentCheckbox[0]) {
                let checkbox = $(this).find('input[type="checkbox"]');
                if (checkbox.length) {
                    checkbox.prop('checked', !checkbox.prop('checked'));
                }
                if ($(this).closest('.compare__top').length > 0) {
                    $(this).remove();
                }
            }
        });

        if ($(this).closest('.compare__offer').length > 0 && adding == true) {
            let product = $(this).closest('.category__product').clone();
            $('.compare__top .category__list').append(product);
            let checkbox = product.find('input');
            let label = checkbox.next('label');

            let newId = checkbox.attr('id').replace('_', '');
            checkbox.attr('id', newId);
            let newFor = label.attr('for').replace('_', '');
            label.attr('for', newFor);
        }

        const obj = { action: 'to_compare', adding, id };
        if ($('.compare').length > 0) {
            obj['compare_page'] = "";
        }

        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            data: obj,
            method: 'POST',
            success: function (res) {
                $('.category__mob-compare span').text(res.count);
                if (res.count > 0) {
                    $('.category__mob-compare').addClass('count');
                } else {
                    $('.category__mob-compare').removeClass('count');
                }

                if ($('.compare').length > 0) {
                    $('.compare__list').html(res.data.html);
                }
            },
            error: function (error) {
                console.log('error', error);
            }

        });
        countCompare();
    });
}

function showFilterMob() {
    $(document).on('click', '.category__mob-sort', function () {
        $('.category__mob-block').addClass('show');
        $('.category__mob-top h3').text('Sort By');
        $('.category__mob-filter-content').hide();
        $('.category__mob-sort-content').show();
    });
    $(document).on('click', '.category__mob-filter', function () {
        $('.category__mob-block').addClass('show');
        $('.category__mob-top h3').text('Filter');
        $('.category__mob-sort-content').hide();
        $('.category__mob-filter-content').show();
    });
    $(document).on('click', '.category__mob-close', function () {
        $('.category__mob-block').removeClass('show');
    });
}

function showProduct() {
    let sort;
    let obj = { action: 'show-products' };

    $(document).on('click', '.category__sort-list  button', function () {
        $('.category__sort-list  button').removeClass('active');
        $('.category__mob-block').removeClass('show');
        $(this).addClass('active');
        sort = $(this).data('sort');
        obj['sort'] = sort;
        ajaxShowProduct();
    });

    $(document).on('change', '.category__item-list input[type="checkbox"]', function () {
        $('.category__item').each(function () {
            const categoryTitle = $(this).find('.category__item-title').text().trim();
            const checkedCheckboxes = $(this).find('.category__item-list input[type="checkbox"]:checked');
            const checkedNames = checkedCheckboxes.map(function () {
                return $(this).val();
            }).get();
            obj[categoryTitle] = checkedNames;
        });
        ajaxShowProduct();
    });

    $(document).on('input', '.category__item-input input', function () {
        let name = $(this).attr('name');
        obj[name] = $(this).val();
        ajaxShowProduct();
    });

    $(document).on('click', '.category__reset-btn', function () {
        $('.category__item-list input[type="checkbox"]').prop('checked', false);
        $('.category__sort-list button').removeClass('active');
        $('.category__sort-list button:first-child').addClass('active');

        $('.category__mob-block').removeClass('show');
        obj = { action: 'show-products' };
        ajaxShowProduct();
    });

    function ajaxShowProduct() {

        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            data: obj,
            method: 'POST',
            success: function (res) {
                $('.category__list-main').html(res);
            },
            error: function (error) {
                console.log('error', error);
            }

        });
    }
}

function hideTopMenu() {
    $(window).load(function () {
        if ($(this).scrollTop() > 0) {
            $('.header__top').slideUp();
        } else {
            $('.header__top').show();
        }
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.header__top').slideUp();
        } else {
            $('.header__top').slideDown();
        }
    });
}
function scrollToTop() {
    $(document).on('click', '.header__scroll', function (e) {
        $('html, body').animate({ scrollTop: 0 }, 100);
        // return false;
    });
}

function calendar() {

    $(".modal__datepicker").datepicker({
        dateFormat: 'dd.mm.yy'
    });
}

function validateForm(form, func) {
    form.on("submit", function (e) {
        e.preventDefault();
    });
    $.validator.addMethod("goodMessage", function (value, element) {
        return this.optional(element) || /^[\sаА-яЯіІєЄїЇґҐa-zA-Z0-9._-]{2,100}$/i.test(value);
    }, "Please enter correct");

    $.validator.addMethod("goodEmail", function (value, element) {
        return this.optional(element) || /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,62}$/i.test(value);
    }, "Please enter correct email");

    form.validate({
        errorPlacement: function (error, element) {
            if (element.attr("type") === "checkbox") {
                error.insertAfter(element.next("label"));
            } else {
                error.insertAfter(element);
            }
        },
        rules: {
            name: {
                required: true,
                goodMessage: true
            },
            lastname: {
                required: true,
                goodMessage: true
            },
            email: {
                required: true,
                goodEmail: true,
                email: true
            },
            emailConfirm: {
                required: true,
                equalTo: "#email"
            },
            phone: {
                required: true
            },
            service: {
                required: true
            },
            request: {
                required: true
            },
            date: {
                required: true
            },
            city: {
                required: true
            },
            zip: {
                required: true
            },
            birth: {
                required: true
            },
            individualNumber: {
                required: true
            },
            terms: {
                required: true
            },
            housingStatus: {
                required: true
            },
            securityNumber: {
                required: true
            },
            securityNumberConfirm: {
                required: true,
                equalTo: "#securityNumber"
            }
        },
        messages: {
            name: {
                required: "This field is required",
                email: "Please enter correct name"
            },
            lastname: {
                required: "This field is required",
                email: "Please enter correct name"
            },
            email: {
                required: "This field is required",
                email: "Please enter correct email"
            },
            emailConfirm: {
                required: "This field is required",
                equalTo: "Email not equal"
            },
            phone: {
                required: "This field is required"
            },
            service: {
                required: "This field is required"
            },
            date: {
                required: "This field is required"
            },
            terms: {
                required: "This field is required"
            },
            city: {
                required: "This field is required"
            },
            zip: {
                required: "This field is required"
            },
            birth: {
                required: "This field is required"
            },

            individualNumber: {
                required: "This field is required"
            },
            housingStatus: {
                required: "This field is required"
            },
            securityNumber: {
                required: "This field is required"
            },
            securityNumberConfirm: {
                required: "This field is required",
                equalTo: "Security numbers not equal"
            }

        },
        submitHandler: function () {
            func();
            form[0].reset();
            form.find('select').val(null).trigger('change');
        }
    });
};

function ajaxSend(form, funcSuccess, funcError) {
    let data = form.serialize();
    $.ajax({
        url: '/wp-admin/admin-ajax.php',
        data: data,
        method: 'POST',
        success: function (res) {
            console.log('success ajax');
            funcSuccess(res);
        },
        error: function (error) {
            console.log('error ajax');
            funcError(error);
        }
    });
}

function checkCounters() {
    const duration = 3000; // Duration of the animation in milliseconds
    function animateCounter($counter) {
        const target = parseInt($counter.attr('data-target'), 10);
        const start = 0;
        let startTime = null;

        const updateCount = function (timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const currentValue = Math.min(Math.floor(progress / duration * target), target);

            $counter.text(currentValue);

            if (progress < duration) {
                requestAnimationFrame(updateCount);
            } else {
                $counter.text(target);
            }
        };

        requestAnimationFrame(updateCount);
    };

    function isElementInView(element) {
        const elementTop = $(element).offset().top;
        const elementBottom = elementTop + $(element).outerHeight();
        const viewportTop = $(window).scrollTop();
        const viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    $('.counter').each(function () {
        const $counter = $(this);
        if (isElementInView($counter) && !$counter.hasClass('animated')) {
            $counter.addClass('animated');
            animateCounter($counter);
        }
    });
};

function toggleModal(btn, modal) {
    btn.click(function () {
        button = $(this);
        if (btn.hasClass('testimonial__play')) {
            let video = button.find('.testimonial__play-animate').attr('data-video');
            $('.modal__testimonial-video source').attr('src', video);
            $('.modal__testimonial-video video')[0].load();
        }
        calculator()
        modal.show();
        $('body').css('overflow', 'hidden');
        return false;
    });
    $('.modal__close').click(function () {
        $(this).closest(modal).hide();
        $('body').css('overflow', 'visible');
        resetModal();
        return false;
    });
    $('.modal__ok').click(function () {
        $(this).closest(modal).hide();
        $('body').css('overflow', 'visible');
        resetModal();
        return false;
    });
    $(document).keydown(function (e) {
        if (e.keyCode === 27) {
            e.stopPropagation();
            $('body').css('overflow', 'visible');
            resetModal();
        }
    });
    modal.click(function (e) {
        if ($(e.target).closest('.modal__content').length == 0) {
            $(this).hide();
            $('body').css('overflow', 'visible');
            resetModal();
        }
    });
}

function tab() {
    $(".tab__header-item").click(function () {
        $(".tab__header-item").removeClass("active").eq($(this).index()).addClass("active");
        $(".tab__content-item").hide().eq($(this).index()).fadeIn();
    }).eq(0).addClass("active");
}

function showPassword() {
    $('.login__input-eye').click(function (e) {
        $(this).toggleClass('active');
        $(this).hasClass('active') ? $(this).closest('.login__input').find('input').attr('type', 'text') : $(this).closest('.login__input').find('input').attr('type', 'password');
    });
}

function resetModal() {
    $('.modal__solution-content').show();
    $('.modal__solution-success').hide();

    $('.modal__total-content').show();
    $('.modal__total-success').hide();


}

function showLink() {
    $(document).on('click', '.article__link-btn', function () {
        $('.article__link').toggleClass('show');
    });
}

function toogleModalWithoutClick(modal) {
    modal.show();
    $('body').css('overflow', 'hidden');
    $('.modal__close').click(function () {
        modal.hide();
        $('body').css('overflow', 'visible');
        resetModal();
        return false;
    });
    $('.modal__ok').click(function () {
        modal.hide();
        $('body').css('overflow', 'visible');
        resetModal();
        return false;
    });

    $(document).keydown(function (e) {
        if (e.keyCode === 27) {
            e.stopPropagation();
            modal.hide();
            $('body').css('overflow', 'visible');
            resetModal();
            return false;
        }
    });
    modal.click(function (e) {
        if ($(e.target).closest('.modal__content').length == 0) {
            $(this).hide();
            $('body').css('overflow', 'visible');
            resetModal();
            return false;
        }
    });
}

function roomDesign() {
    $('.room__item-color').each(function () {
        let color = $(this).data('color');
        $(this).css('background', color);
    });
    $(document).on('click', '.room__item', function () {
        $(this).prevAll().removeClass('active');
        $(this).nextAll().removeClass('active');
        $(this).addClass('active');

        let img = $(this).data('src');
        $('.room__img-download').attr('href', '');
        $('.room__img-download').attr('href', img);
        $('.room__modal-img img').attr('src', '');
        $('.room__modal-img img').attr('src', img);
        if (img !== "") {
            $('.room__img img').attr('src', img);
        }
    });
    toggleModal($('.room__img-show'), $('.room__modal'));
}
function stateSelect() {
    let states = [{ id: 'Alabama', text: 'Alabama' }, { id: 'Alaska', text: 'Alaska' }, { id: 'Arizona', text: 'Arizona' }, { id: 'Arkansas', text: 'Arkansas' }, { id: 'California', text: 'California' }, { id: 'Colorado', text: 'Colorado' }, { id: 'Connecticut', text: 'Connecticut' }, { id: 'Delaware', text: 'Delaware' }, { id: 'Florida', text: 'Florida' }, { id: 'Georgia', text: 'Georgia' }, { id: 'Hawaii', text: 'Hawaii' }, { id: 'Idaho', text: 'Idaho' }, { id: 'Illinois', text: 'Illinois' }, { id: 'Indiana', text: 'Indiana' }, { id: 'Iowa', text: 'Iowa' }, { id: 'Kansas', text: 'Kansas' }, { id: 'Kentucky', text: 'Kentucky' }, { id: 'Louisiana', text: 'Louisiana' }, { id: 'Maine', text: 'Maine' }, { id: 'Maryland', text: 'Maryland' }, { id: 'Massachusetts', text: 'Massachusetts' }, { id: 'Michigan', text: 'Michigan' }, { id: 'Minnesota', text: 'Minnesota' }, { id: 'Mississippi', text: 'Mississippi' }, { id: 'Missouri', text: 'Missouri' }, { id: 'Montana', text: 'Montana' }, { id: 'Nebraska', text: 'Nebraska' }, { id: 'Nevada', text: 'Nevada' }, { id: 'New Hampshire', text: 'New Hampshire' }, { id: 'New Jersey', text: 'New Jersey' }, { id: 'New Mexico', text: 'New Mexico' }, { id: 'New York', text: 'New York' }, { id: 'North Carolina', text: 'North Carolina' }, { id: 'North Dakota', text: 'North Dakota' }, { id: 'Ohio', text: 'Ohio' }, { id: 'Oklahoma', text: 'Oklahoma' }, { id: 'Oregon', text: 'Oregon' }, { id: 'Pennsylvania', text: 'Pennsylvania' }, { id: 'Rhode Island', text: 'Rhode Island' }, { id: 'South Carolina', text: 'South Carolina' }, { id: 'South Dakota', text: 'South Dakota' }, { id: 'Tennessee', text: 'Tennessee' }, { id: 'Texas', text: 'Texas' }, { id: 'Utah', text: 'Utah' }, { id: 'Vermont', text: 'Vermont' }, { id: 'Virginia', text: 'Virginia' }, { id: 'Washington', text: 'Washington' }, { id: 'West Virginia', text: 'West Virginia' }, { id: 'Wisconsin', text: 'Wisconsin' }, { id: 'Wyoming', text: 'Wyoming' }];

    $('#state-select').select2({
        placeholder: 'Select a state',
        data: states
    });
}


function calculator(){
    let blockSqft = 0
    let generalSqft  = 0
    let validInput  = false
    let validRadio = false
    let validError = false
    let validInputSub = false
    let validMin = true
    let obj = {}



    function calc(){
        $('.calculator__item').each(function() {
            let block = $(this);


            $(document).on('change', '.calculator__item-top input[type=radio]', function (){
                    let sub = $(this).closest('.calculator__item').find('.calculator__sub')
                    blockSqft = 0;


                    if($(this).closest('.calculator__item').hasClass('calculator__item-sand')) {
                        console.log('hasClasshasClasshasClass')

                        if($(this).data('check') == 1 ){
                            sub.addClass('active')
                            sub.find('.calculator__radio-item input').prop('checked', true)
                            console.log(111111)

                        }else{
                            sub.removeClass('active')
                            console.log(2222222)
                            sub.find('.calculator__sub-input input').val('')
                            sub.find('.calculator__radio-item input').prop('checked', false)
                            sub.find('.calculator__sub-error').remove()
                            if(sub.find('.calculator__item-min').length > 0){
                                validMin = true
                                console.log('54545454545454',validMin)
                            }
                        }

                    } else{
                        if($(this).data('check') == 1 ){
                            sub.addClass('active')
                        }else{
                            sub.removeClass('active')
                            sub.find('.calculator__sub-input input').val('')
                            sub.find('.calculator__radio-item input').prop('checked', false)
                            sub.find('.calculator__sub-input').removeClass('active')
                            sub.find('.calculator__sub-error').remove()
                        }
                    }

                })

            $(document).on('change','.calculator__sub-input.big input', function (){
                console.log(5555, $(this))
                generalSqft = +$(this).val()
                $(this).closest('.calculator__item').find('.calculator__sub-error').remove()
                console.log(33,generalSqft)

                blockSqft = 0
                $('.calculator__item').find('.calculator__sub-input:not(.big):not(.unlimited) input').each(function (){
                    blockSqft += +$(this).val()
                    console.log('blockSqft1111',blockSqft)
                })

                console.log('blockSqft',blockSqft)
                if(blockSqft > generalSqft){

                    $(this).closest('.calculator__item').find('.calculator__item-top').append('<p class="calculator__sub-error">Change count of sqrt</p>')
                    validInput = false;
                } else{
                    validInput = true;
                    $(this).closest('.calculator__item').find('.calculator__sub-error').remove()

                }

            })


            block.find('input[type="radio"]').on('change', function() {
                if($(this).closest('.calculator__item').find('.calculator__sub').length == 0){
                    $(this).closest('.calculator__item').find('.calculator__sub-error').remove();
                    validRadio = true;
                }
            })




            block.find('input[type="checkbox"]').on('change', function() {
                let checkedCheckbox = block.find('input[type="checkbox"]:checked');
                let unCheckedText = block.find('.calculator__sub-input:not(.active) input');
                let checkedCount = block.find('input[type="checkbox"]:checked').length;
                unCheckedText.val('')

                $(this).closest('.calculator__item').find('.calculator__sub-error').remove();

                console.log(checkedCount)

                if (checkedCount == 0) {
                    checkedCheckbox.closest('.calculator__item').find('.calculator__sub-input').removeClass('active')
                } else{
                    $(this).closest('.calculator__sub-item').find('.calculator__sub-input').toggleClass('active')
                }
                if (checkedCount > 1) {
                    checkedCheckbox.closest('.calculator__sub-item').find('.calculator__sub-input').addClass('active')

                } else {
                    $(this).closest('.calculator__sub').find('.calculator__sub-error').remove()
                    checkedCheckbox.closest('.calculator__item').find('.calculator__sub-input').removeClass('active')
                }


            });

            block.find('.calculator__sub-input input').change(function() {
                blockSqft = 0
                block.find('.calculator__sub-input:not(.big):not(.unlimited) input').each(function (){
                    blockSqft += +$(this).val()
                })
                console.log('blockSqft',blockSqft)
                console.log('generalSqft',generalSqft)
                let errorInserted = false;
                if(blockSqft > generalSqft){
                    console.log(2222)
                    $(this).closest('.calculator__sub-item').find('.calculator__radio-item .calculator__sub-error').remove()
                    $(this).closest('.calculator__sub-item').find('.calculator__radio-item').append('<p class="calculator__sub-error">More than general sqft</p>')
                     validInputSub = false
                } else{
                    console.log(3333)
                    validInputSub = true
                    $(this).closest('.calculator__sub').find('.calculator__sub-error').remove()

                }
            })


        });
        $(document).on('change','.calculator__check', function (){

            console.log(1222222, $(this).prop('checked'))
            if($(this).prop('checked')==true){
                $('.calculator__sub-item-color').addClass('active')
            }else {
                $('.calculator__sub-item-color').removeClass('active')
            }
        })
    }
    calc()

    $(document).on('click','.calculator__button',function (){
        let fullPrice  = 0
        let blockWrap = $(this).closest('.calculator__block')
        let startPrice = +blockWrap.find('.big input').data('start')
        let addPrice = 0
        let standartAdd = 0
        let sqrtPrice = 0
        let sub_check = []
        let sqrtFull = +blockWrap.find('.big input').val()


        let total_sqrt = 0
        let total_price = 0



        calc()

        let countOfSqrtFull = 0;


        blockWrap.find('.calculator__radio-plus input:checked').each(function() {
            if($(this).data('plusprice')){

                console.log()
                standartAdd += parseFloat($(this).data('plusprice'))
            }

        })


        // blockWrap.find('input:checked').each(function() {
        //
        //
        //     console.log('checked', $(this))
        //     let countOfSqrt = +$(this).closest('.calculator__sub-item').find('.calculator__sub-input input').val()
        //     console.log('countOfSqrt',countOfSqrt)
        //
        //     if( countOfSqrt > 0 && countOfSqrt!== '' && $(this).data('plus') !== 0){
        //         countOfSqrtFull += +countOfSqrt
        //         sqrtPrice += countOfSqrt * (parseFloat($(this).data('plus')) + startPrice)
        //         console.log('sqrtPrice',sqrtPrice)
        //         console.log('sqrtPrice', countOfSqrt, parseFloat($(this).data('plus')), sqrtPrice)
        //
        //     }else{
        //         if(parseFloat($(this).data('plus')) >= 0 && !countOfSqrt){
        //             console.log('data(plus)', parseFloat($(this).data('plus')))
        //             addPrice += parseFloat($(this).data('plus'))
        //             console.log('addPrice',addPrice)
        //         }
        //     }
        //
        // })



        blockWrap.find('input:checked').each(function() {


            console.log('checked', $(this))
            let countOfSqrt = +$(this).closest('.calculator__sub-item').find('.calculator__sub-input input').val()
            console.log('countOfSqrt',countOfSqrt)
            console.log('parseFloat',parseFloat($(this).data('plus')))
            let key  = $(this).closest('.calculator__item').find('.calculator__item-top h3').text().replace(/\s+/g, '_').toLowerCase()


            if( countOfSqrt > 0 && countOfSqrt!== '' && $(this).data('plus') !== 0){
                sqrtPrice += countOfSqrt * (parseFloat($(this).data('plus')))



                let checkObject = {
                    sqrt: countOfSqrt,
                    price: countOfSqrt * (parseFloat($(this).data('plus'))),
                    name : $(this).next('label').text()
                };
                let infoObject = {};
                infoObject[key] = checkObject;
                sub_check.push(infoObject);
                console.log('sub_check1111111', sub_check);


                // let name  = $(this).next('label').text().replace(/\s+/g, '_').toLowerCase()
                // let checkObject = {
                //     sqrt: countOfSqrt,
                //     price: sqrtPrice,
                //     question: $(this).closest('.calculator__item').find('.calculator__item-top h3').text()
                // };
                // let infoObject = {};
                // infoObject[name] = checkObject;
                // sub_check.push(infoObject);
                // console.log('arrCheck22222', sub_check);


            }


            if( countOfSqrt > 0 && $(this).data('plus') == 0){

                let checkObject = {
                    sqrt: countOfSqrt,
                    price: 0,
                    name : $(this).next('label').text()
                };
                let infoObject = {};
                infoObject[key] = checkObject;
                sub_check.push(infoObject);
                console.log('sub_check5555', sub_check);


                // let name  = $(this).next('label').text().replace(/\s+/g, '_').toLowerCase()
                // let checkObject = {
                //     sqrt: countOfSqrt,
                //     price: sqrtPrice,
                //     question: $(this).closest('.calculator__item').find('.calculator__item-top h3').text()
                // };
                // let infoObject = {};
                // infoObject[name] = checkObject;
                // sub_check.push(infoObject);
                // console.log('arrCheck22222', sub_check);


            }


            if(parseFloat($(this).data('plus')) >= 0 && !countOfSqrt){

                    let pricePlus = parseFloat($(this).data('plus'))
                    console.log('data(plus)',pricePlus )
                    addPrice += pricePlus
                    console.log('addPrice',addPrice)


                    let checkObject = {
                        price: pricePlus * sqrtFull ,
                        name: $(this).next('label').text()
                    };
                    let infoObject = {};
                    infoObject[key] = checkObject;
                    sub_check.push(infoObject);
                    console.log('sub_check22222', sub_check);

                    // let name  = $(this).next('label').text().replace(/\s+/g, '_').toLowerCase()
                    // let checkObject = {
                    //     price: parseFloat($(this).data('plus')) * sqrtFull ,
                    //     question: $(this).closest('.calculator__item').find('.calculator__item-top h3').text()
                    // };
                    // let infoObject = {};
                    // infoObject[name] = checkObject;
                    // sub_check.push(infoObject);
                    // console.log('arrCheck22222', sub_check);
                }


            if( $(this).data('plusprice') > 0 ){

                let checkObject = {
                    price: $(this).data('plusprice'),
                    name: $(this).next('label').text()
                };
                let infoObject = {};
                infoObject[key] = checkObject;
                sub_check.push(infoObject);
                console.log('sub_check22222', sub_check);
            }

        })






        blockWrap.find('.calculator__radio-group').each(function() {
            console.log(1)
            if ( $(this).find('input[type="radio"]:checked').length == 0) {
                console.log(2)
                $(this).closest('.calculator__item').find('.calculator__item-top .calculator__sub-error').remove()
                $(this).closest('.calculator__item').find('.calculator__item-top').append('<p class="calculator__sub-error">This field is required</p>')
                validRadio = false
            } else{
                console.log(3)
                validRadio = true
                $(this).closest('.calculator__item').find('.calculator__sub-error').remove()
            }
        });



        blockWrap.find('.calculator__sub.active').each(function() {
            console.log('....', $(this).find('input[type="checkbox"]:checked').length)


            if(validInputSub!==false){
                console.log('....222222')
                if ($(this).find('input[type="checkbox"]:checked').length === 0) {
                    console.log('11')
                    validInputSub = false
                    $(this).closest('.calculator__item').find('.calculator__item-top .calculator__sub-error').remove()
                    $(this).closest('.calculator__item').find('.calculator__item-top').append('<p class="calculator__sub-error">This field is required</p>')
                } else{
                    console.log('22')
                    validInputSub = true
                    $(this).closest('.calculator__item').find('.calculator__sub-error').remove()
                }
                let inputValue = $(this).find('.calculator__sub-input.active input[type=number]').val()
                console.log('inputValue33333',inputValue)
                if(inputValue == "" || inputValue <= 0 ){
                    $(this).closest('.calculator__item').find('.calculator__item-top').append('<p class="calculator__sub-error">Value must be greater than 0</p>')
                    validInputSub = false
                } else{
                    validInputSub = true
                }
            }
            console.log(44444,$('.calculator__sub-input.active').length)
            if($('.calculator__sub-input.active:not(.big)').length == 0){
                validInputSub = true
            }

        });


        blockWrap.find('.calculator__item-min input').each(function() {
            if($(this).closest('.calculator__sub').hasClass('active')){
                console.log('activeactiveactive')
                if( $(this).val() < 30){
                    validMin = false
                    console.log('validMin',validMin)
                    $(this).closest('.calculator__sub-item').append('<p class="calculator__sub-error">Minimum 30sqft for this field</p>')
                } else{
                    validMin = true
                    console.log('validMin',validMin)
                    $(this).closest('.calculator__sub-item .calculator__sub-error').remove();
                }
            }
        })



        let errorCount = blockWrap.find('.calculator__sub-error').length

        console.log('errorCount',errorCount)
        if(errorCount == 0){
            validError = true
        }
        // $('.calculator__sub-error').remove();

        console.log('valid',validInput,validRadio, validInputSub, validError, validMin)

        if(validInput && validRadio && validInputSub && validError && validMin){


            console.log('startPrice', startPrice)
            console.log('addPrice', addPrice)
            console.log('sqrtFull',sqrtFull)
            console.log('sqrtPrice',sqrtPrice)
            console.log('standartAdd',standartAdd)
            console.log('countOfSqrtFull',countOfSqrtFull)
            console.log('fullPrice',fullPrice)
            fullPrice = (addPrice + startPrice)*sqrtFull + sqrtPrice + standartAdd
            // fullPrice = (startPrice + addPrice)*(sqrtFull - countOfSqrtFull) + sqrtPrice + standartAdd

            console.log('sqrtFull',sqrtFull)
            // blockWrap.find('.calculator__total span').text(`$${parseFloat(fullPrice).toFixed(2)}`)
            // blockWrap.find('.calculator__total').show()
            blockWrap.find('.calculator__total-error').remove()


            toogleModalWithoutClick($('.modal__total'));

            let calculatorForm = $('.calculator__form');
            validateForm(calculatorForm, function () {
                ajaxCalculator();
            });


        } else{
            blockWrap.find('.calculator__total-error').remove()
            blockWrap.find('.calculator__total').hide()
            blockWrap.find('.calculator__button').after('<p class="calculator__total-error" >Some items not valid</p>')


            // $('html, body').animate({
            //     scrollTop: $('.calculator__sub-error').offset().top - 170
            // }, 1000);
        }



        function ajaxCalculator(){
            let email = $('.calculator__form').find('input[name=email]').val()
            let phone = $('.calculator__form').find('input[name=phone]').val()
            total_sqrt =  sqrtFull

            basic_price = total_sqrt * startPrice
            total_price =  fullPrice
            color__stairs = $('.calculator__sub-item-color input[name=color]').val()

            obj = {action: 'calculator', email, phone, total_sqrt, basic_price, total_price, sub_check, color__stairs};
            $.ajax({
                url: '/wp-admin/admin-ajax.php',
                data: obj,
                method: 'POST',
                success: function (res) {
                    console.log('success', res);
                    $('.modal__total-content').hide();
                    $('.modal__total-success').show();
                },
                error: function (error) {
                    console.log('error', error);
                }
            });

        }

    })



}

function headerSubmenu(){
    if (window.innerWidth <= 666){
        $('.header__submenu').each(function (){
            $(this).before(`<div class="header__submenu-open"></div>`)

        })
        $(document).on('click','.header__submenu-open',function (){
            console.log(333,$(this).next('.header__submenu'))
           $(this).toggleClass('active')
           $(this).next('.header__submenu').toggleClass('active')
        })
    }
}

$(document).ready(function () {
    calculator();
    headerSubmenu()
    roomDesign();
    stateSelect();
    $('.connect__select select').select2({});
    bannerSliderInit();
    initSliders();
    showLink();
    accordionFAQ();
    showStar();
    playVideo();
    openMenu();
    changeMob();

    let formFooter = $('.footer__form-bottom ');
    validateForm(formFooter, function () {
        ajaxSend(formFooter, function () {
            formFooter.addClass('footer__form-success');
            formFooter.find('input[type="email"]').val('Email Sent!');
        });
    });
    let sidemenuForm = $('.sidemenu__form');
    validateForm(sidemenuForm, function () {
        ajaxSend(sidemenuForm, function () {
            sidemenuForm.addClass('footer__form-success');
            sidemenuForm.find('input[type="email"]').val('Email Sent!');
        });
    });

    let connectForm = $('.connect__form-section');
    validateForm(connectForm, function () {
        ajaxSend(connectForm, function () {
            toogleModalWithoutClick($('.modal__thank'));
        });
    });

    let contactBottom = $('.contact__bottom-form');
    validateForm(contactBottom, function () {
        ajaxSend(contactBottom, function () {
            $('.contact__bottom-form > *').remove();
            $('.contact__bottom-form').append(`<span class="contact__bottom-message">Great!  First letter has already sent to you!</span>`);
            $('.contact__bottom-form').addClass('justify');
        });
    });

    let touchForm = $('.touch__form');
    validateForm(touchForm, function () {
        ajaxSend(touchForm, function () {
            toogleModalWithoutClick($('.modal__thank'));
        });
    });

    let reviewSearch = $('.review__top-form');
    validateForm(reviewSearch, function () {
        ajaxSend(reviewSearch, function (res) {
            $('.testimonial__list').remove();
            $('.testimonial__not_found').remove();
            $('.review .section__title').after(res.data.html);
            showStar();
            toggleModal($('.testimonial__play'), $('.modal__testimonial'));
        });
    });

    let articleReview = $('.news__review-form');
    validateForm(articleReview, function () {
        ajaxSend(articleReview, function () {
            toogleModalWithoutClick($('.modal__thank'));
        });
    });

    let financeForm = $('.finance__form');
    validateForm(financeForm, function () {
        ajaxSend(financeForm, function () {
            toogleModalWithoutClick($('.modal__finance'));
        });
    });

    let formSolution = $('.modal__solution form');
    validateForm(formSolution, function () {
        ajaxSend(formSolution, function () {
            $('.modal__solution-content').hide();
            $('.modal__solution-success').show();
        }, function () {
            $('.modal__solution-content').hide();
            $('.modal__solution-success').show();
        });
    });
    let formAboutContact = $('.modal__contact form');
    validateForm(formAboutContact, function () {
        ajaxSend(formAboutContact, function () {
            $('.modal__solution-content').hide();
            $('.modal__solution-success').show();
        }, function () {
            $('.modal__solution-content').hide();
            $('.modal__solution-success').show();
        });
    });
    calendar();

    toggleModal($('.account__invite-button'), $('.modal__invite'));
    toggleModal($('.solution .section__button'), $('.modal__solution'));
    toggleModal($('.about__info .section__button'), $('.modal__contact'));

    toggleModal($('.testimonial__play'), $('.modal__testimonial'));
    toggleModal($('.category__banner-btn'), $('.modal__contact'));
    toggleModal($('.compare__contact'), $('.modal__contact'));
    toggleModal($('.specifications__contact'), $('.modal__contact'));
    toggleModal($('.product__info .section__button-wrap'), $('.modal__calculator'));
    toggleModal($('.banner__block .section__button-wrap'), $('.modal__calculator'));

    tab();

    showPassword();
    loadMore();
    showMap();
    zoomMap();

    showFilter();
    mapSearch();
    showSocial();
    scrollToTop();
    moveCursor();
    addToCompare();
    showProduct();
    showFilterMob();
    changeBannerCounter();
    showArticle();
    compareChange();
    animate();



    $(window).on('load scroll', checkCounters);
    $(window).on('load scroll', initProgressBar);
    $(window).on('load scroll', animate);
    $(window).on('load scroll', showTop);

    hideTopMenu();
    hideSideMenu();
    showComment();
    addClassActive();
    removeFromCompare();
    countCompare();
});

$(window).load(function () {});

$(window).resize(function () {});
$(window).scroll(function () {});