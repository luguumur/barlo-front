"use client"

import clsx from "clsx"
import Link from "next/link"
import CountrySelect from "../country-select"
import { useTranslations } from "next-intl"
import { GetStaticPropsContext } from "next"

const FooterNav = () => {

  const menut = useTranslations("Menu");
  const homet = useTranslations("Home");
  return (
    <div className="page-footer " id="page-footer">
      <div className="page-footer__main">
        <div className="container">
          <div className="row push--bottom">
            <div className="col-md-7 col-sm-9">
              <nav className="nav--footer">
                <ul id="menu-main-navigation-1" className="menu">
                  <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-104308"><Link href="/equipment/new">{menut("new")}</Link></li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-31"><Link href="/equipment/used">{menut("used")}</Link></li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-13463"><Link href="/equipment/rental">{menut("rent")}</Link></li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4893"><Link href="/parts">{menut("parts")}</Link></li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-34"><Link href="/service">{menut("service")}</Link></li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-35"><Link href="/technology">{menut("technology")}</Link></li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-297"><Link href="/about-us">{menut("about")}</Link></li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-105841"><Link href="/careers">{menut("hr")}</Link></li>
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
              <a className="button phone-number" href="tel:+97670187588">+976 7018-7588</a>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 hidden-xxs hidden-xs hidden-sm">
              <nav className="nav--footer-secondary clearfix">
                <ul id="menu-footer-menu-1" className="menu">
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-106276">
                    <Link href="/careers" aria-current="page">{homet("workat")}</Link>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-106276">
                    <Link href="/management" aria-current="page">{homet("board")}</Link>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-188">
                    <Link href="/news?category=clx2mg66j0000mgwl9dou6ek8">{homet("social")}</Link>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-194">
                    <Link href="/news">{homet("news")}</Link>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-196">
                    <Link href="/magazine">{homet("magazine")}</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-sm-8 col-sm-push-4 col-md-4 col-md-push-4 col-lg-5 col-lg-push-3">
              <div className="page-footer__extra-links clearfix">
                <div className="page-footer__google-translate"></div>
                <ul>
                  <li>
                    <Link href="/locations">Locations</Link>
                  </li>
                  <li className="hidden-xxs">
                    <Link href="/contact-us">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-4 col-sm-pull-8 col-md-4 col-md-pull-4 col-lg-3 col-lg-pull-5">
              <p className="page-footer__copyright"> Copyright © 2024 Barloworld Mongolia. <br /> All Rights Reserved </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterNav

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../../messages/${locale}.json`)).default
    }
  };
}
