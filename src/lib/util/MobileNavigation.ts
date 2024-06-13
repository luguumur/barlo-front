// MobileNavigation.ts

import { useEffect } from 'react'; // Import any necessary hooks from React if needed
import jQuery from 'jquery'; // Import jQuery (make sure to install it: npm install jquery)

// Define the namespace if needed
namespace FX {
  export const MobileNavigation = {
    init: () => {
      jQuery(".js-mobile-trigger-button--menu").click(() => {
        jQuery(".js-mobile-trigger-button--menu").toggleClass("js-active");
        jQuery(".nav--primary").toggleClass("js-visible");
      });

      jQuery('.nav--primary li.menu-item-has-children > a').after('<span class="sub-menu-toggle icon-chevron-down hidden-md hidden-lg"></span>');
      jQuery('.js-mobile-navigation-trigger').on('click', MobileNavigation.toggleMenu);
      jQuery('.sub-menu-toggle').on('click', MobileNavigation.toggleSubMenu);
    },
    toggleMenu: () => {
      jQuery('.nav--primary__wrapper').toggleClass('active');
      jQuery('.js-mobile-navigation-trigger').toggleClass('toggled');
    },
    toggleSubMenu: function() {
      const $this = jQuery(this);
      const $parent = $this.parent("li");
      const $wrap = $parent.children(".sub-menu");
      $wrap.toggleClass("toggled");
      $parent.toggleClass("toggled");
      $this.toggleClass("toggled");
    }
  };
}

export default FX;

// Initialization
useEffect(() => {
  FX.MobileNavigation.init();
}, []);

