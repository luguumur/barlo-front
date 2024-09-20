"use client"

import Link from "next/link"
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/modules/layout/components/i18n/LanguageSwitcher"

import { HeaderData } from "@/data/menu"
import { GetStaticPropsContext } from "next"

import FX from "@/lib/util/custom-fx";
import React, { useEffect, useState } from 'react';
import Image from "next/legacy/image";
import Button from "@/modules/common/components/button";

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
          <input className="search-form--field" type="search" title="Search" value={formData.search} onChange={handleChange} placeholder="Find what you're looking for" aria-label="When autocomplete results are available use up and down arrows to review and enter to go to the desired page. Touch device users, explore by touch or with swipe gestures." />
          <button className="absolute pr-0 right-[8px] top-[10%] h-[16px] w-[16px]" aria-label="icon-search">
            <Image src="/assets/img/icon-search.png" height={16} width={16} alt="icon-search" />
          </button>
        </form>
      </div>
      <header className="page-header sticky-page-header bg-white" id="page-header">
        <div className="page-header__bottom-row">
          <div className="container">
            <div className="row">
              <div className="col-xxs-7 col-xs-6 col-sm-4 col-md-3">
                <div className="page-header--logo">
                  <a href="https://thompsonmachinery.com">
                    <Image width="209" height="51" className="site-logo" src="/logo.jpg" alt="Barloworld Mongolia" />
                  </a>
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
                      <form className="search-form relative" action="/" method="get" role="search">
                        <label htmlFor="search-field" className="sr-only">Search</label>
                        <input
                          id="search-field"
                          className="search-form--field w-full p-4 text-base rounded-md"
                          type="search"
                          name="search"
                          placeholder="Хайлт"
                        />
                        <button
                          className="absolute pr-0 right-[8px] top-[50%] transform -translate-y-1/2 h-[44px] w-[44px] flex items-center justify-center"
                          aria-label="icon-search"
                        >
                          <img
                            src="/assets/img/icon-search.png"
                            alt="icon-search"
                            className="h-4 w-4"
                          />
                        </button>
                      </form>
                    </div>

                  </div>
                  <nav className="nav--top-menu hidden-xxs hidden-xs hidden-sm">
                    <ul id="menu-top-menu" className="menu">
                      {/* <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home">
                        <Link href="/" aria-label="Home">&nbsp;
                        </Link>
                      </li> */}
                      <li className="menu-item menu-item-type-post_type menu-item-object-page">
                        <Link href="/about-us" aria-label="About Us">
                          {homet("about")}
                        </Link>
                      </li>
                      <li className="menu-item menu-item-type-post_type menu-item-object-page">
                        <Link href="/careers" aria-label="Career">
                          {t("careers")}
                        </Link>
                      </li>
                      <li id="menu-item-5639" className="menu-item menu-item-type-custom menu-item-object-custom">
                        <Link href="/deals-specials" aria-label="Specials">
                          {homet("specials")}
                        </Link>
                      </li>
                      <li className="menu-item menu-item-type-custom menu-item-object-custom ">
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
