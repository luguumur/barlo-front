var FX = (function(FX, $) {
    FX.Preloader = {
        init: function() {
            $(window).on('load', function() {
                $('.page-preloader').fadeOut('slow', function() {
                    $(this).remove()
                })
            })
        }
    };
    FX.ImagePopUp = {
        init: function() {
            $('.js-image-popup').magnificPopup({
                type: 'image'
            })
        }
    };
    FX.VideoPopUp = {
        init: function() {
            $('.js-video-popup').magnificPopup({
                type: 'iframe',
                iframe: {
                    markup: '<div class="mfp-iframe-scaler">' + '<div class="mfp-close"></div>' + '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' + '</div>',
                    patterns: {
                        youtube: {
                            index: 'youtube.com/',
                            id: 'v=',
                            src: '//www.youtube.com/embed/%id%?autoplay=1'
                        },
                        vimeo: {
                            index: 'vimeo.com/',
                            id: '/',
                            src: '//player.vimeo.com/video/%id%?autoplay=1'
                        },
                        gmaps: {
                            index: '//maps.google.',
                            src: '%id%&output=embed'
                        }
                    },
                    srcAction: 'iframe_src',
                }
            })
        }
    };
    FX.MobileNavigation = {
        init: function() {
            $(".js-mobile-trigger-button--menu").click(function() {
                $(".js-mobile-trigger-button--menu").toggleClass("js-active");
                $(".nav--primary").toggleClass("js-visible")
            });
            $('.nav--primary li.menu-item-has-children > a').after('<span class="sub-menu-toggle icon-chevron-down hidden-md hidden-lg"></span>');
            $('.js-mobile-navigation-trigger').on('click', this.toggleMenu);
            $('.sub-menu-toggle').on('click', this.toggleSubMenu)
        },
        toggleMenu: function() {
            $('.nav--primary__wrapper').toggleClass('active');
            $('.js-mobile-navigation-trigger').toggleClass('toggled')
        },
        toggleSubMenu: function() {
            var $this = $(this)
              , $parent = $this.parent("li")
              , $wrap = $parent.children(".sub-menu");
            $wrap.toggleClass("toggled");
            $parent.toggleClass("toggled");
            $this.toggleClass("toggled")
        }
    };
    FX.MobileSearch = {
        init: function() {
            $(".js-mobile-trigger-button--search").click(function() {
                $(".js-mobile-trigger-button--search").toggleClass("js-active");
                $(".mobile-search-form").toggleClass("js-visible");
                $(".page-header").toggleClass("js-move-down")
            })
        }
    };
    FX.Forms = {
        init: function() {
            $('.select-option').selectric();
        }
    };
    FX.ExternalLinks = {
        init: function() {
            $('a[href$=".pdf"]').attr('target', '_blank')
        }
    }
    FX.StickyPageHeader = {
        init: function() {
            $(window).scroll(function() {
                var $body = $(document.body);
                var value = $(this).scrollTop();
                if (value > [1]) {
                    $body.addClass('page-header-is-sticky');
                    $('.sticky-page-header').addClass('active')
                } else {
                    $body.removeClass('page-header-is-sticky');
                    $('.sticky-page-header').removeClass('active')
                }
            })
        }
    }
    FX.Social = {
        init: function() {
            $(".js-social-share").on("click", this.open)
        },
        open: function(event) {
            event.preventDefault();
            FX.Social.windowPopup($(this).attr("href"), 500, 300)
        },
        windowPopup: function(url, width, height) {
            var left = (screen.width / 2) - (width / 2)
              , top = (screen.height / 2) - (height / 2);
            window.open(url, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left)
        }
    }
    FX.ImAHuman = {
        num: "0xFF9481",
        forms: void 0,
        init: function() {
            this.setup()
        },
        setup: function() {
            this.forms = document.getElementsByTagName("form");
            this.bind()
        },
        bind: function() {
            for (var i = 0; this.forms.length > i; i++) {
                $(this.forms[i]).on("focus click", this.markAsHuman)
            }
        },
        markAsHuman: function() {
            $(this).find('.imahuman, [name="imahuman"]').attr("value", parseInt(FX.ImAHuman.num, 16))
        }
    }
    FX.Affix = {
        windowHeight: 0,
        init: function() {
            this.windowHeight = $(window).height();
            this.bind()
        },
        bind: function(e) {
            $(window).on('scroll', this.scroll);
            $(window).on('resize', this.updateWindowHeight)
        },
        scroll: function(e) {
            var scrolltop = $(this).scrollTop()
              , fixPoint = FX.Affix.windowHeight - $('#masthead').height();
            if (scrolltop >= fixPoint) {
                $('body').addClass('affix-head')
            } else {
                $('body').removeClass('affix-head')
            }
        },
        updateWindowHeight: function(e) {
            FX.Affix.windowHeight = $(window).height()
        }
    };
    FX.Parallax = {
        init: function() {
            this.bind()
        },
        bind: function() {
            $(window).scroll(this.scroll)
        },
        scroll: function(e) {
            $('[parallax]').each(function() {
                var $this = $(this)
                  , $speed = $this.data('speed') || 6
                  , $window = $(window);
                var yPos = -($window.scrollTop() / $speed);
                var coords = 'center ' + yPos + 'px';
                $this.css({
                    backgroundPosition: coords
                })
            })
        }
    };
    FX.SmoothAnchors = {
        init: function() {
            this.bind()
        },
        bind: function() {
            $('a[href^=#]').on('click', this.scrollToSmooth)
        },
        scrollToSmooth: function(event) {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var $target = $(this.hash);
                $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
                if ($target.length) {
                    var targetOffset = $target.offset().top;
                    $('html,body').animate({
                        scrollTop: targetOffset
                    }, 600);
                    return !1
                }
            }
        }
    }
    FX.Tabs = {
        init: function() {
            $('.js-tabs').on('click touchstart', 'a', this.switchTab)
        },
        switchTab: function(event) {
            event.preventDefault();
            var $this = $(this)
              , tab = $($this.attr('href'));
            $this.parent().addClass('active').siblings().removeClass('active');
            tab.addClass('active').siblings().removeClass('active')
        }
    }
    FX.CategorySelect = {
        init: function() {
            if ($(window).width() > 1024) {
                return
            } else {
                $('.js-category-button').click(function() {
                    if ($(this).hasClass('clicked')) {
                        $(this).removeClass('clicked');
                        return
                    } else {
                        $('.js-category-button').removeClass('clicked');
                        $(this).addClass('clicked')
                    }
                })
            }
        }
    };
    FX.EqualHeights = {
        init() {
            $(document).on('ready', this.applySameHeights);
            $(window).on('load resize', this.applySameHeights)
        },
        applySameHeights() {
            const $root = $('.js-equal-heights');
            const $items = $root.find('.js-equal-heights-item');
            const heights = $items.map((i,el)=>parseInt($(el).height()));
            const maxHeights = Math.max(...heights);
            $items.height(maxHeights)
        }
    }
    $(window).resize(function() {
        if ($(window).width() > 1024) {
            return
        } else {
            $('.js-category-button').click(function() {
                if ($(this).hasClass('clicked')) {
                    $(this).removeClass('clicked');
                    return
                } else {
                    $('.js-category-button').removeClass('clicked');
                    $(this).addClass('clicked')
                }
            })
        }
    });
    $(function() {
        FX.Preloader.init();
        // FX.ExternalLinks.init();
        // FX.Promo.init();
        // FX.MobileSearch.init();
        FX.MobileNavigation.init();
        // FX.Social.init();
        FX.Forms.init();
        // FX.ImAHuman.init();
        // FX.Tabs.init();
        // FX.VideoPopUp.init();
        // FX.ImagePopUp.init();
        // FX.UsedFilterSearch.init();
        // FX.StickyPageHeader.init();
        // FX.CategorySelect.init();
        // FX.EqualHeights.init();
        // if ($('.tab-link').length) {
        //     $('.tab-link').on('click', function(e) {
        //         e.preventDefault();
        //         var shouldOpen = $(this).find('a').attr('href');
        //         $(this).addClass('active');
        //         $(this).siblings().removeClass('active');
        //         console.log(shouldOpen);
        //         $.each($('.tabs__tab'), function() {
        //             console.log($(this).attr('id'));
        //             if ('#' + $(this).attr('id') == shouldOpen) {
        //                 $(this).addClass('active')
        //             } else {
        //                 $(this).removeClass('active')
        //             }
        //         })
        //     })
        // }
    });
    return FX
}(FX || {}, jQuery))
console.log('main.js loaded');