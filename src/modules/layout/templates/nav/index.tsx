"use client"

import Link from "next/link"
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/modules/layout/components/i18n/LanguageSwitcher"

import { HeaderData } from "@/data/menu"
import { GetStaticPropsContext } from "next"

import FX from "@/lib/util/custom-fx";
import React, { useEffect, useState } from 'react';
import Image from "next/legacy/image";

const Nav = () => {

  const homet = useTranslations("Home");
  const t = useTranslations("Menu");

  useEffect(() => {
    FX.MobileNavigation.init();
    FX.StickyPageHeader.init();
    FX.MobileSearch.init();
  }, []);

  const initialData: any = {
    search: '',
  }

  interface FormData {
    search: string;
  }
  const [formData, setFormData] = useState<FormData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  return (
    <>
      <div className="mobile-search-form clearfix">
        <form className="search-form" action="/" method="get" role="search">
          <input className="search-form--field" type="search" title="Search" name="s" value={formData.search} onChange={handleChange} placeholder="Find what you're looking for" aria-label="When autocomplete results are available use up and down arrows to review and enter to go to the desired page. Touch device users, explore by touch or with swipe gestures." />
          <input className="search-form--submit" type="submit" />
        </form>
      </div>
      <header className="page-header sticky-page-header" id="page-header">
        <div className="page-header__bottom-row">
          <div className="container">
            <div className="row">
              <div className="col-xxs-7 col-xs-6 col-sm-4 col-md-3">
                <div className="page-header--logo">
                  <Link href="/">
                    <Image priority width="190" height="51" className="site-logo entered lazyloaded" src="/logo.jpg" alt="Barloworld Mongolia" />
                  </Link>
                </div>
              </div>
              <div className="col-xxs-5 col-xs-6 col-sm-8 col-md-9 text--right pull--right header-top-right-section">
                <div className="header-right-top">
                  <Link href={"https://click.callpro.mn/mbifA6W5F03wSWFs5anFx1IM6p6RkA6r4G1GanpO"} target="_blank" className="inline-block hidden-xxs hidden-xs hidden-sm pr-5">
                    <div className="sc-17sh5d6-0 hVYMdc telcocom-call-component">
                      <button type="button">
                        <span className="flex justify-center items-center">
                          <img width={12} height={12} src="/phone.svg" alt="phone" />
                        </span>
                      </button>
                      <div className="bg-anime"></div>
                    </div>
                  </Link>
                  <div className="page-header--search">
                    <button
                      className="js-mobile-trigger-button--search mobile-trigger-button mobile-trigger-button--search hidden-md hidden-lg"
                      aria-label="Search"
                    >
                      <span className="icon-search"></span>
                    </button>

                    <div className="visible-md visible-lg">
                      <form className="search-form" action="/" method="get" role="search">
                        <label htmlFor="search-field" className="sr-only">Search</label>
                        <input id="search-field" className="search-form--field" type="search" title="Search" name="s" data-swplive="true" data-swpengine="default" data-swpconfig="default" placeholder={homet(`search`)} aria-owns="searchwp_live_search_results_6538ffce134f9" aria-autocomplete="both" aria-label="Search input field" />
                        <input className="search-form--submit" type="submit" value="" />
                      </form>
                    </div>
                  </div>
                  <nav className="nav--top-menu hidden-xxs hidden-xs hidden-sm">
                    <ul id="menu-top-menu" className="menu">
                      <li id="menu-item-186" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-186">
                        <Link href="/" className="p-3 block" aria-label="Home">
                          {t("home")}
                        </Link>
                      </li>
                      <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-105843">
                        <Link href="/about-us" className="p-3 block">
                          {homet("about")}
                        </Link>
                      </li>
                      <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-105843">
                        <Link href="/careers" className="p-3 block">
                          {t("careers")}
                        </Link>
                      </li>
                      <li id="menu-item-5639" className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item menu-item-5639">
                        <Link href="/deals-specials" className="p-3 block" aria-current="page">
                          {homet("specials")}
                        </Link>
                      </li>
                      <li className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item">
                        <LanguageSwitcher />
                      </li>
                    </ul>
                  </nav>

                  <button className="js-mobile-trigger-button--menu mobile-trigger-button mobile-trigger-button--menu hidden-md hidden-lg" aria-label="Menu">
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
                        <div>
                          <Link href={item.handle}>{t(`${item.title}`)}</Link>
                        </div>
                        {item.submenu && (
                          <>
                            <span className="sub-menu-toggle icon-chevron-down hidden-md hidden-lg"></span>
                            <ul className="sub-menu">
                              {item.sub?.map((item: any, i: any) => (
                                <li key={i} id={`menu-item-${item.id}`} className={`menu-item menu-item-type-post_type menu-item-object-page menu-item-${item.id}`}>
                                  <Link href={item.handle}>{t(`${item.title}`)}</Link>
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

export async function getStaticProps({ locale }: GetStaticPropsContext) {

  return {
    props: {
      messages: (await import(`../../../../../messages/${locale}.json`)).default
    }
  };
}
