"use client"

import clsx from "clsx"
import Link from "next/link"
import CountrySelect from "../country-select"
import { useTranslations } from "next-intl"

const FooterNav = () => {

  const menut = useTranslations("Menu");
  const homet = useTranslations("Home");
  return (
    <footer className="page-footer " id="page-footer">
      <div className="page-footer__main">
          <div className="container">
            <div className="row push--bottom">
                <div className="col-md-7 col-sm-9">
                  <nav className="nav--footer">
                      <ul id="menu-main-navigation-1" className="menu">
                        <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-104308"><a href="/equipment/new">{menut("new")}</a></li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-31"><a href="/equipment/used">{menut("used")}</a></li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-13463"><a href="/equipment/rental">{menut("rent")}</a></li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4893"><a href="/parts">{menut("parts")}</a></li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-34"><a href="/service">{menut("service")}</a></li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-35"><a href="/technology">{menut("technology")}</a></li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-297"><a href="/about-us">{menut("about")}</a></li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-105841"><a href="/careers">{menut("hr")}</a></li>
                      </ul>
                  </nav>
                </div>
                <div className="col-md-5 col-sm-3">
                  <ul className="page-footer__social social-links hidden-xs hidden-sm clearfix">
                      <li><a className="icon-facebook" target="_blank" rel="nofollow" href="https://www.facebook.com/"></a></li>
                      <li><a className="icon-twitter" target="_blank" rel="nofollow" href="https://twitter.com/"></a></li>
                      <li><a className="icon-instagram" target="_blank" rel="nofollow" href="https://www.instagram.com/"></a></li>
                      <li><a className="icon-linkedin2" target="_blank" rel="nofollow" href="https://www.linkedin.com/"></a></li>
                      <li><a className="icon-youtube3" target="_blank" rel="nofollow" href="https://www.youtube.com/"></a></li>
                  </ul>
                </div>
            </div>
            {/* <div className="row hidden-md hidden-lg">
                <div className="col-sm-7">
                  <nav className="nav--footer-secondary hidden-xxs hidden-xs clearfix">
                      <ul id="menu-footer-menu" className="menu">
                        <li id="menu-item-106276" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-106276"><a href="https://thompsonmachinery.com/thompson-careers/">Careers</a></li>
                        <li id="menu-item-188" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-188"><a href="https://thompsonmachinery.com/online-tools/">Online Tools</a></li>
                        <li id="menu-item-194" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-194"><a href="https://thompsonmachinery.com/privacy-policy/">Privacy Policy</a></li>
                        <li id="menu-item-195" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-195"><a href="https://thompsonmachinery.com/parts/partstore/">Parts.Cat.Com</a></li>
                        <li id="menu-item-196" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-196"><a href="https://thompsonmachinery.com/about-us/">About Us</a></li>
                        <li id="menu-item-197" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-197"><a href="https://thompsonmachinery.com/sitemap/">Sitemap</a></li>
                        <li id="menu-item-198" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-198"><a href="https://thompsonmachinery.com/site-credits/">Site Credits</a></li>
                      </ul>
                  </nav>
                </div>
                <div className="page-footer__social social-links col-sm-4 col-sm-offset-1 hidden-xxs">
                  <ul className="clearfix">
                      <li><a className="icon-facebook" target="_blank" rel="nofollow" href="https://www.facebook.com/thompsonmachinery"></a></li>
                      <li><a className="icon-twitter" target="_blank" rel="nofollow" href="https://twitter.com/ThompsonCat"></a></li>
                      <li><a className="icon-instagram" target="_blank" rel="nofollow" href="https://www.instagram.com/thompsonmachinery/"></a></li>
                      <li><a className="icon-linkedin2" target="_blank" rel="nofollow" href="https://www.linkedin.com/company/thompson-machinery"></a></li>
                      <li><a className="icon-youtube3" target="_blank" rel="nofollow" href="https://www.youtube.com/user/ThompsonMachinery"></a></li>
                  </ul>
                </div>
            </div> */}
            <div className="row">
              <div className="col-md-4 hidden-xxs hidden-xs hidden-sm">
                <nav className="nav--footer-secondary clearfix">
                  <ul id="menu-footer-menu-1" className="menu">
                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-106276">
                      <a href="/careers" aria-current="page">{homet("workat")}</a>
                    </li>
                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-106276">
                      <a href="/management" aria-current="page">{homet("board")}</a>
                    </li>
                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-188">
                      <a href="/csr">{homet("social")}</a>
                    </li>
                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-194">
                      <a href="/news">{homet("news")}</a>
                    </li>
                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-195">
                      <a href="/">{homet("frequently")}</a>
                    </li>
                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-196">
                      <a href="/magazine">{homet("magazine")}</a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-sm-8 col-sm-push-4 col-md-4 col-md-push-4 col-lg-5 col-lg-push-3">
                <div className="page-footer__extra-links clearfix">
                  <div className="flags"> {/* <a href="https://translate.google.com/">
                      <img width="26" height="18" src="https://thompsonmachinery.com/content/themes/thompsonmachinery/images/spain.png.webp" alt="">
                    </a>
                    <a href="https://translate.google.com/">
                      <img width="25" height="18" src="https://thompsonmachinery.com/content/themes/thompsonmachinery/images/china.png.webp" alt="">
                    </a>
                    <a href="https://translate.google.com/">
                      <img width="26" height="19" src="https://thompsonmachinery.com/content/themes/thompsonmachinery/images/brazil.png.webp" alt="">
                    </a>
                    <a href="https://translate.google.com/">
                      <img width="26" height="18" src="https://thompsonmachinery.com/content/themes/thompsonmachinery/images/france.png.webp" alt="">
                    </a> */}
                  </div>
                  <div className="page-footer__google-translate"></div>
                  <ul>
                    <li>
                      <a href="/locations">Locations</a>
                    </li>
                    <li className="hidden-xxs">
                      <a href="/contact-us">Contact Us</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-4 col-sm-pull-8 col-md-4 col-md-pull-4 col-lg-3 col-lg-pull-5">
                <p className="page-footer__copyright"> Copyright © 2024 Barloworld Mongolia. <br /> All Rights Reserved </p>
              </div>
            </div>
            {/* <div className="row">
                <div className="col-md-8 hidden-xxs hidden-xs hidden-sm">
                  <nav className="nav--footer-secondary clearfix">
                    <ul id="menu-footer-menu-1" className="menu">
                      <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-106276">
                        <a href="/" aria-current="page">Work at Barloworld</a>
                      </li>
                      <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-188">
                        <a href="/">Social Responsibility</a>
                      </li>
                      <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-194">
                        <a href="/">News</a>
                      </li>
                      <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-195">
                        <a href="/">Frequently asked questions</a>
                      </li>
                      <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-196">
                        <a href="/">Training catalog for customers</a>
                      </li>
                    </ul>
                  </nav>
                </div>
                
                <div className="col-md-4">
                  <p className="page-footer__copyright">
                      Copyright © 2023  Barloworld Mongolia.<br/>
                      All Rights Reserved
                  </p>
                </div>
            </div> */}
          </div>
      </div>
    </footer>
  )
}

export default FooterNav
