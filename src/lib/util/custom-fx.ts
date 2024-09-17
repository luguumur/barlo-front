import jQuery from 'jquery';

namespace FX {
  export const MobileNavigation = {
    init: function () {
      jQuery(".js-mobile-trigger-button--menu").click(function () {
        jQuery(".js-mobile-trigger-button--menu").toggleClass("js-active");
        jQuery(".nav--primary").toggleClass("js-visible");
      });
      jQuery('.nav--primary li.menu-item-has-children > a').after('<span class="sub-menu-toggle icon-chevron-down hidden-md hidden-lg"></span>');
      jQuery('.js-mobile-navigation-trigger').on('click', this.toggleMenu.bind(this));
      jQuery('.sub-menu-toggle').on('click', this.toggleSubMenu.bind(this));
    },
    toggleMenu: function () {
      jQuery('.nav--primary__wrapper').toggleClass('active');
      jQuery('.js-mobile-navigation-trigger').toggleClass('toggled');
    },
    toggleSubMenu: function () {
      const $this = jQuery(this);
      const $parent = $this.parent("li");
      const $wrap = $parent.children(".sub-menu");
      $wrap.toggleClass("toggled");
      $parent.toggleClass("toggled");
      $this.toggleClass("toggled");
    }
  };
  export const StickyPageHeader = {
    init: function () {
      jQuery(window).scroll(function () {
        const $body = jQuery(document.body);
        const value:any = jQuery(this).scrollTop();
        if (value > 1) {
          $body.addClass('page-header-is-sticky');
          jQuery('.sticky-page-header').addClass('active');
        } else {
          $body.removeClass('page-header-is-sticky');
          jQuery('.sticky-page-header').removeClass('active');
        }
      });
    }
  };
  export const MobileSearch = {
    init: function () {
      jQuery(".js-mobile-trigger-button--search").click(function () {
        jQuery(this).toggleClass("js-active");
        jQuery(".mobile-search-form").toggleClass("js-visible");
        jQuery(".page-header").toggleClass("js-move-down");
      });
    }
  };
}

export default FX;
