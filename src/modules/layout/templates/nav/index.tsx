"use client"

import { useMobileMenu } from "@lib/context/mobile-menu-context"
import Hamburger from "@modules/common/components/hamburger"
import CartDropdown from "@modules/layout/components/cart-dropdown"
import DropdownMenu from "@modules/layout/components/dropdown-menu"
import MobileMenu from "@modules/mobile-menu/templates"
import DesktopSearchModal from "@modules/search/templates/desktop-search-modal"
import clsx from "clsx"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import mainlogo from "../../../../../public/logo.jpg"
import { Field, Form, Formik } from 'formik'
import FormField from '../../components/form/field';
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@modules/layout/components/i18n/LanguageSwitcher"

import { HeaderData } from "@data/menu"
// import { dictionary } from '@lang/content';


const Nav = () => {

  const homet = useTranslations("Home");
  const t = useTranslations("Menu");
  
  // const params = useParams()
  // const lang = params.lang+""
  const pathname = usePathname()
  const [isHome, setIsHome] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)

  //useEffect that detects if window is scrolled > 5px on the Y axis
  useEffect(() => {
    if (isHome) {
      const detectScrollY = () => {
        if (window.scrollY > 5) {
          setIsScrolled(true)
        } else {
          setIsScrolled(false)
        }
      }

      window.addEventListener("scroll", detectScrollY)

      return () => {
        window.removeEventListener("scroll", detectScrollY)
      }
    }
  }, [isHome])

  useEffect(() => {
    pathname === "/" ? setIsHome(true) : setIsHome(false)
  }, [pathname])

  const { toggle } = useMobileMenu()
  const onSubmit = async (values: any, { setSubmitting }: any) => {
    // console.log(values)

    setSubmitting(false);
  };
  return (
    <>
    <div className="mobile-search-form clearfix">
      <form className="search-form" action="/" method="get" role="search">
        
      </form>    
    </div>
    <header className="page-header sticky-page-header active" id="page-header">
      <div className="page-header__bottom-row">
        <div className="container">
          <div className="row">
            <div className="col-xxs-7 col-xs-6 col-sm-4 col-md-3">
              <div className="page-header--logo">
                <a href="/">
                  <img width="209" height="51" className="site-logo entered lazyloaded" src="/logo.jpg" alt="Thompson Machinery" data-lazy-src="/logo.jpg" data-ll-status="loaded"/>
                </a>
              </div>
            </div>
            <div className="col-xxs-5 col-xs-6 col-sm-8 col-md-9 text--right pull--right header-top-right-section">
              <div className="header-right-top">
                <div className="page-header--search">
                  <button className="js-mobile-trigger-button--search mobile-trigger-button mobile-trigger-button--search hidden-md hidden-lg">
                    <span className="icon-search"></span>
                  </button>
                  <div className="visible-md visible-lg">
                    <form className="search-form" action="/" method="get" role="search">
                      <input className="search-form--field" type="search" title="Search" name="s" data-swplive="true" data-swpengine="default" data-swpconfig="default" placeholder={homet(`search`)} autoComplete="off" aria-owns="searchwp_live_search_results_6538ffce134f9" aria-autocomplete="both" aria-label="When autocomplete results are available use up and down arrows to review and enter to go to the desired page. Touch device users, explore by touch or with swipe gestures."/>
                      <input className="search-form--submit" ></input>
                    </form>
                  </div>
                </div>
                <nav className="nav--top-menu hidden-xxs hidden-xs hidden-sm">
                  <ul id="menu-top-menu" className="menu">
                    <li id="menu-item-186" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-186">
                      <a href="/">&nbsp;</a>
                    </li>
                    <li  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-105843">
                      <a href="/about-us">{homet("about")}</a>
                    </li>
                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-105843">
                      <a href="/careers">{t("careers")}</a>
                    </li>
                    <li id="menu-item-5639" className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item menu-item-5639">
                      <a href="/deals-specials" aria-current="page">{homet("specials")}</a>
                    </li>
                    {/* <li className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item">
                      <Link href="/account">{homet("account")}</Link>
                    </li>
                    <li>
                    <CartDropdown />
                    </li> */}
                    <li className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item">
                      <LanguageSwitcher />
                    </li>
                  </ul>
                </nav>
                <button className="js-mobile-trigger-button--menu mobile-trigger-button mobile-trigger-button--menu hidden-md hidden-lg">
                  <span className="icon-menu"></span>
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <nav className="nav--primary">
                <ul id="menu-main-navigation" className="menu">
                  {HeaderData.map((item, index) => (
                  <li key={item.id} id={`menu-item-${item.id}`} className={`menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-${item.id}`}>
                    <a href={item.handle}>{t(`${item.title}`)}</a>
                    {item.submenu && (
                      <>
                        <span className="sub-menu-toggle icon-chevron-down hidden-md hidden-lg"></span>
                        <ul className="sub-menu">
                        {item.sub.map((item: any, i: any) => (
                          <li key={i} id={`menu-item-${item.id}`} className={`menu-item menu-item-type-post_type menu-item-object-page menu-item-${item.id}`}>
                            <a href={item.handle}>{t(`${item.title}`)}</a>
                          </li>
                        ))}
                        </ul>
                      </>
                    )}
                  </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
    </>
  )
}

export default Nav
