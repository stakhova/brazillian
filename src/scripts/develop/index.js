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
function initProgressBar() {
    if ($('.expert__progress').length > 0) {
        let block = $('.expert__progress');
        let blockTop = block.offset().top;
        let windowBottom = $(window).scrollTop() + $(window).height();

        $('.expert__progress-item').each(function () {
            let percent = $(this).find('.expert__progress-percent span').text();



            if (windowBottom >= blockTop) {
                $(this).find('.expert__progress-bar').animate({
                    width: `${percent}%`
                }, 700);
                $('.expert__progress-percent').addClass('show');
            }
            if($('.different__progress').length>0){
                percent -= 7
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

function showComment(){
    $('.comment__item').each(function (){
        if ($('.comment__item').length > 4) {
            $('.comment__button').show();
        } else {
            $('.comment__button').hide();
        }
    })
    $('.comment__button').click(function() {
        $('.comment__list .comment__item:nth-of-type(n+5)').toggleClass('show');
        let buttonText = $('.comment__list .comment__item:nth-of-type(n+5)').is(':visible') ? 'Show Less' : 'Show More';
        $('.comment__button').text(buttonText);
    });
}




function addClassActive(){
    function checkInput (){
        let currentValue = $(this).val();
        if( currentValue!== ''){
            $(this).closest('div').addClass('active')
        }else{
            $(this).closest('div').removeClass('active')
        }
    }
    $(document).on('input','.connect__item input', checkInput)
    $(document).on('change','.connect__item input', checkInput)
    $(document).on('change','.connect__item select', checkInput)
    $(document).on('input','.connect__textarea textarea', checkInput)
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



function bannerSliderInit(){
    if($('.banner__slider').length > 0){


    const interleaveOffset = 0.75;
    const swiper = new Swiper('.banner__slider', {
        direction: 'vertical',
        speed: 800,
        watchSlidesProgress: true,
        mousewheel: {
            releaseOnEdges: true,
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
            progress: function() {
                let swiper = this;
                for (let i = 0; i < swiper.slides.length; i++) {
                    let slideProgress = swiper.slides[i].progress;
                    let innerOffset = swiper.height * interleaveOffset;
                    let innerTranslate = slideProgress * innerOffset;
                    TweenMax.set(swiper.slides[i].querySelector(".slide-content"), {
                        y: innerTranslate,
                    });
                }
            },
            setTransition: function(slider, speed) {
                let swiper = this;
                for (let i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = speed + "ms";
                    swiper.slides[i].querySelector(".slide-content").style.transition = speed + "ms";
                }
            }
        },
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
            console.log(5555)
            document.removeEventListener('wheel', handleMouseWheel, { passive: false });
            document.removeEventListener('mousewheel', handleMouseWheel, { passive: false });
        } else {
            console.log(4444)
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
            console.log(33333)
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
    }
}



function playVideo() {
    $(document).on('click', '.video__play', function () {
        let poster = $(this).closest('.video').find('.video__poster')
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
}

function initSliders() {
    const transform = new Swiper('.transform__slider', {
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
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
            '666': {
                slidesPerView: 4,
                spaceBetween: 30
            }
        }

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

            '666': {
                slidesPerView: 6,
                spaceBetween: 16,
                centeredSlides: false
            }
        }
    });
    const stylish = new Swiper('.stylish__slider', {
        slidesPerView: 4,
        centeredSlides: false,
        loop: true,
        slideToClickedSlide: true,
        spaceBetween: 20,
        autoplay: {
            delay: 3000,
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

            '666': {
                slidesPerView: 4,
                spaceBetween: 20,
                centeredSlides: false
            }
        }

    });
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

            '666': {
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

const openMenu = () => {
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
        if (SIDEMENU.hasClass('show')) {
            SIDEMENU.removeClass("show");
        } else {
            SIDEMENU.addClass("show");
        }
    }
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

        $('.header__menu').append($('.header__bottom .section__button'));
        $('.transform .container').append($('.transform .section__nav'));
        $('.latest .container').append($('.latest__view'));
        $('.banner').append($('.banner__counter'));
        $('.testimonial__list').before($('.testimonial__img'));
        $('.stylish__nav').before($('.stylish__nav-title'));
        $('.connect__social').before($('.connect .connect__form'));
        $('.article__link a').removeClass('active');
        $('.news__flex').prepend($('.news__side-item:first-child'));
        if ($('.article').hasClass('services__one')) {
            $('.article__banner').before($('.article__content '));
        }
        if ($('.article').hasClass('category')) {
            $('.article__banner').before($('.category__content'));
        }
        if ($('.article').hasClass('product__wrap')) {
            $('.article__banner').before($('.product__block'));
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
            error: function (error) {
                console.log('error', error);
                // $('.load__more').remove();
                // $('.project__list').append(res);
            }

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
        search = $('.news__search input').val()
        $('.news__achieve > *').removeClass('active');
        $(this).addClass('active');
        sendAjaxArticle();
    });
    $(document).on('click', '.news__more', function () {
        page++;
        search = $('.news__search input').val()
        sendAjaxArticle();
    });
    function sendAjaxArticle() {
        const obj = { action: 'show_article', search, date, page };
        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            data: obj,
            method: 'POST',
            success: function (res) {
                console.log('res', res)
                console.log('res.data', res.data)
                if(page > 1){
                    $('.news__more').remove();
                    $('.news__list').append(res.data)
                }else{
                    $('.news__list').html(res.data)
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

    let footerOffset = $('.footer').offset().top;
    let windowBottom = $(this).scrollTop() + $(window).height();
    console.log('footerOffset', footerOffset);
    console.log('windowBottom', windowBottom);
    if (windowBottom > footerOffset) {
        btn.css('bottom', windowBottom - footerOffset - 32);
    } else {
        btn.css('bottom', '2.4rem');
    }
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

function addToCompare() {
    $(document).on('change', '.category__list .section__checkbox', function () {
        let id = $(this).closest('.category__product').data('id');
        let adding = true;
        if (!$(this).find('input').is(':checked')) {
            adding = false;
        }
        const obj = { action: 'to_compare', adding, id };
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
            },
            error: function (error) {
                console.log('error', error);
            }

        });
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
        console.log(3333);
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
        dateFormat: 'dd/mm/yy'
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
        rules: {
            name: {
                required: true,
                goodMessage: true
            },
            email: {
                required: true,
                goodEmail: true,
                email: true
            },
            phone: {
                required: true
            },
            service: {
                required: true
            },
            date: {
                required: true
            }

        },
        messages: {
            name: {
                required: "This field is required",
                email: "Please enter correct name"
            },
            email: {
                required: "This field is required",
                email: "Please enter correct email"
            },
            phone: {
                required: "This field is required"
            },
            service: {
                required: "This field is required"
            },
            date: {
                required: "This field is required"
            }
        },
        submitHandler: function () {
            func();
            $("select").select2("val", "");
            form[0].reset();
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
    const duration = 2000; // Duration of the animation in milliseconds

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
}

function showLink() {
    $(document).on('click', '.article__link-btn', function () {
        $('.article__link').toggleClass('show');
    });
}

function toogleModalWithoutClick(modal) {
    modal.show();
    $('.modal__close').click(function () {
        $(this).closest(modal).hide();
        return false;
    });
    $(document).keydown(function (e) {
        if (e.keyCode === 27) {
            e.stopPropagation();
            modal.hide();
        }
    });
    modal.click(function (e) {
        if ($(e.target).closest('.modal__content').length == 0) {
            $(this).hide();
        }
    });
}

$(document).ready(function () {
    $('.connect__select select').select2({});
    bannerSliderInit()
    initSliders();
    showLink();
    accordionFAQ();
    showStar();
    playVideo();
    $('.header__burger').on('click', openMenu);
    changeMob();

    let formFooter = $('.footer__form-bottom ');
    validateForm(formFooter, function () {
        ajaxSend(formFooter);
    });
    let sidemenuForm = $('.sidemenu__form');
    validateForm(sidemenuForm, function () {
        ajaxSend(sidemenuForm);
    });

    let connectForm = $('.connect__form-section');
    validateForm(connectForm, function () {
        ajaxSend(connectForm);
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
        ajaxSend(reviewSearch);
    });

    let articleReview = $('.news__review-form');
    validateForm(articleReview, function () {
        ajaxSend(articleReview, function () {
            toogleModalWithoutClick($('.modal__thank'));
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

    $(window).on('load scroll', checkCounters);
    $(window).on('load scroll', initProgressBar);
    $(window).on('load scroll', animate);
    $(window).on('load scroll', showTop);
    // $(window).on('load scroll', hideTopMenu);
    hideTopMenu();
    hideSideMenu();
    showComment();
    addClassActive()
});

$(window).load(function () {});

$(window).resize(function () {});
$(window).scroll(function () {});