
function initProgressBar(){
    $('.expert__progress-item').each(function (){

        let percent = $(this).find('.expert__progress-percent span').text()

        $(this).find('.expert__progress-percent').css('left',`${percent}%`)
        $(this).find('.expert__progress-bar').css('width',`${percent}%`)
    })
}

function showStar(){
    $('.testimonial__star').each(function () {
        let count_star = $(this).data('star');
        let fullStar = `<img src="../../img/star.svg"/>`;

        for (let i = 0; i < count_star; i++) {
            $(this).append(fullStar);
        }
    });
}

function accordionFAQ() {
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
function playVideo() {
    $(document).on('click', '.video__poster', function () {
        let video = '<iframe allowFullScreen allow=" fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" frameBorder="0" src="' + $(this).attr('data-video') + '" title="' + $(this).attr('data-title') + '"></iframe>';
        $(this).next(".video__play").hide();
        $(this).replaceWith(video);
    });
};

function initSliders(){
    const transform = new Swiper('.transform__slider', {
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,
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
                spaceBetween: 30,
            }
        }

    });
    const banner = new Swiper('.banner__slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: ".banner__next",
            prevEl: ".banner__prev"
        }

    });
    const solution = new Swiper('.solution__slider', {
        slidesPerView: 6,
        spaceBetween: 16,
        loop: true,
        breakpoints: {
            '0': {
                slidesPerView: 2,
                centeredSlides: true,
                spaceBetween: 12
            },

            '666': {
                slidesPerView: 6,
                spaceBetween: 16,
                centeredSlides: false,
            }
        }
    });
    const stylish = new Swiper('.stylish__slider', {
        slidesPerView: 3.3,
        // centeredSlides: false,
        loop: true,
        slideToClickedSlide: true,
        spaceBetween: 20,
        // centeredSlides: true,
        navigation: {
            nextEl: ".stylish__next",
            prevEl: ".stylish__prev"
        }

    });

}


const openMenu = () => {
    console.log( window.innerWidth)
    if (window.innerWidth <= 666) {
        $('.header__burger').toggleClass("header__burger-open");
        $('.header__menu').toggleClass('header__menu-show');
        $('body').toggleClass('hidden');
        $(document).on('click', '.header__menu-close', function () {
            $('.header__burger').removeClass("header__burger-open");
            $('.header__menu').removeClass('header__menu-show');
            'body'.removeClass('hidden');
        });
    }
};




function changeMob() {
    if (window.innerWidth <= 666) {
       $('.header__menu').append($('.header__bottom .section__button'))
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

function openModal(modal, func) {
    modal.show();
    $('body').css('overflow', 'hidden');

    $('.modal__close').click(function () {
        $(this).closest(modal).hide();
        $('body').css('overflow', 'visible');
        func();
        return false;
    });
    $(document).keydown(function (e) {
        if (e.keyCode === 27) {
            e.stopPropagation();
            modal.hide();
            $('body').css('overflow', 'visible');
            func();
        }
    });
    modal.click(function (e) {
        if ($(e.target).closest('.modal__content').length == 0) {
            $(this).hide();
            $('body').css('overflow', 'visible');
            func();
        }
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
            lastname: {
                required: true,
                goodMessage: true
            },
            company_name: {
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
            password: {
                required: true
            },
            passwordOld: {
                required: true,
                minlength: 8
            },
            passwordNew: {
                required: true,
                minlength: 8
            },
            passwordNewRepeat: {
                required: true,
                minlength: 8,
                equalTo: "#passwordNew"
            },
            passwordReg: {
                required: true,
                minlength: 8
            },
            passwordRegRepeat: {
                required: true,
                minlength: 8,
                equalTo: "#passwordReg"
            },
            country: {
                required: true
            },
            city: {
                required: true
            },
            zip: {
                required: true
            },
            street: {
                required: true
            },
            vat: {
                required: true
            },
            accept: {
                required: true
            }

        },
        messages: {
            name: {
                required: "This field is required",
                email: "Please enter correct name"
            },
            lastname: {
                required: "This field is required",
                email: "Please enter correct last name"
            },
            company_name: {
                required: "This field is required",
                email: "Please enter correct company name"
            },
            email: {
                required: "This field is required",
                email: "Please enter correct email"
            },
            phone: {
                required: "This field is required"
            },
            password: {
                required: "This field is required",
                minlength: "First name can't be shorter than 2 characters",
                maxLength: "First name can't be longer than 100 characters "
            },
            passwordOld: {
                required: "This field is required",
                minlength: "Password can't be shorter than 8 characters"
            },
            passwordNew: {
                required: "This field is required",
                minlength: "Password can't be shorter than 8 characters"
            },
            passwordNewRepeat: {
                required: "This field is required",
                equalTo: "Password not equal"
            },
            passwordReg: {
                required: "This field is required",
                minlength: "Password can't be shorter than 8 characters"
            },
            passwordRegRepeat: {
                required: "This field is required",
                equalTo: "Password not equal"
            },
            country: {
                required: "This field is required"
            },
            city: {
                required: "This field is required"
            },
            zip: {
                required: "This field is required"
            },
            street: {
                required: "This field is required"
            },
            vat: {
                required: "This field is required"
            },
            accept: {
                required: "This field is required"
            }

        },
        submitHandler: function () {
            func();
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
        },
    });
}



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
    $('.modal__btn-close').click(function () {
        $(this).closest(modal).hide();
        $('body').css('overflow', 'visible');
        resetModal();
        return false;
    });
    $(document).keydown(function (e) {
        if (e.keyCode === 27) {
            e.stopPropagation();
            resetModal();
            $('body').css('overflow', 'visible');
        }
    });
    modal.click(function (e) {
        if ($(e.target).closest('.modal__content').length == 0) {
            $(this).hide();
            resetModal();
            $('body').css('overflow', 'visible');
        }
    });
}


function search() {
    $(document).on('submit', '.header__search-form', function (e) {
        e.preventDefault();
        let data = $(this).serialize();
        console.log(44444, data);
        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            data: data,
            method: 'POST',
            success: function (res) {
                console.log('success ajax');
            },
            error: function (error) {
                console.log('error ajax');
            }
        });
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





$(document).ready(function () {
    initSliders()
    initProgressBar()
    accordionFAQ()
    showStar()
    playVideo()
    $('.header__burger').on('click', openMenu);
    changeMob();

    let formFooter = $('.footer__form');
    validateForm(formFooter, function () {
        ajaxSend(formFooter);
    });








    toggleModal($('.account__invite-button'), $('.modal__invite'));

    loadMore();
    counter();
    tab();

    showPassword();
    search();


});

$(window).load(function () {});

$(window).resize(function () {});
$(window).scroll(function () {});
//# sourceMappingURL=index.js.map
