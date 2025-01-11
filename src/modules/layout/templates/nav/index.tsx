"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/modules/layout/components/i18n/LanguageSwitcher";

import { HeaderData } from "@/data/menu";
import { GetStaticPropsContext } from "next";

import FX from "@/lib/util/custom-fx";
import React, { useEffect, useState } from "react";
import Image from "next/legacy/image";

const Nav = () => {
  const homet = useTranslations("Menu");
  const home = useTranslations("Home");

  useEffect(() => {
    FX.MobileNavigation.init();
    FX.StickyPageHeader.init();
    FX.MobileSearch.init();
  }, []);

  const initialData: any = {
    search: "",
  };

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
  };

  return (
    <>
      <div className="mobile-search-form clearfix">
        <form className="search-form" action="/" method="get" role="search">
          <input
            className="search-form--field"
            type="search"
            title="Search"
            value={formData.search}
            onChange={handleChange}
            placeholder={home("search")}
            aria-label="When autocomplete results are available use up and down arrows to review and enter to go to the desired page. Touch device users, explore by touch or with swipe gestures."
          />
          <button
            className="absolute pr-0 right-4 top-[50%] translate-x-[50%] translate-y-[-50%] flex items-center justify-center"
            aria-label="icon-search"
          >
            <Image
              src="https://d3leeb4r1qy96s.cloudfront.net/assets/img/icon-search.png"
              height={16}
              width={16}
              alt="icon-search"
              priority
            />
          </button>
        </form>
      </div>
      <header className="page-header sticky-page-header bg-white" id="page-header">
        <div className="page-header__mobile-buttons hidden-sm hidden-md hidden-lg clearfix">
          <Link
            className="page-header__mobile-button mobile--phone-btn"
            href={"https://click.callpro.mn/mbifA6W5F03wSWFs5anFx1IM6p6RkA6r4G1GanpO"}
            target="_blank"
          >
            <span className="icon-mobile2"></span> Tap to Call
          </Link>
          <div className="page-header__mobile-button">
            <LanguageSwitcher />
          </div>
        </div>
        <div className="page-header__bottom-row">
          <div className="container h-[50px] sm:h-14">
            <div className="row ">
              <div className="col-xxs-7 col-xs-6 col-sm-4 col-md-3">
                <div className="page-header--logo flex items-center">
                  <Link href="https://www.barloworld.mn/" className="h-[50px] sm:h-14">
                    <Image
                      width={208}
                      height={56}
                      className="w-auto h-full max-h-[56px] max-w-[208px]"
                      src="/belogo.jpg"
                      alt="Barloworld Mongolia"
                    />
                  </Link>
                </div>
              </div>
              <div className="col-xxs-5 col-xs-6 col-sm-8 col-md-9 text--right header-top-right-section">
                <div className="header-right-top flex items-center justify-end h-[50px] sm:h-14">
                  <Link
                    href={"https://click.callpro.mn/mbifA6W5F03wSWFs5anFx1IM6p6RkA6r4G1GanpO"}
                    target="_blank"
                    className="inline-block hidden-xxs hidden-xs hidden-sm pr-5"
                  >
                    <div className="sc-17sh5d6-0 hVYMdc telcocom-call-component z-10">
                      <button type="button">
                        <span className="flex justify-center items-center">
                          <img width={12} height={12} src="/phone.svg" alt="phone" />
                        </span>
                      </button>
                      <div className="bg-anime"></div>
                    </div>
                  </Link>
                  <div className="page-header--search flex items-center">
                    <button
                      className="js-mobile-trigger-button--search mobile-trigger-button mobile-trigger-button--search hidden-md hidden-lg"
                      aria-label="Search"
                    >
                      <span className="icon-search"></span>
                    </button>

                    <div className="visible-md visible-lg">
                      <form className="search-form relative" action="/" method="get" role="search">
                        <input
                          id="search-field"
                          className="search-form--field w-full p-4"
                          type="search"
                          name="search"
                          placeholder="Хайлт"
                          aria-label="When autocomplete results are available use up and down arrows to review and enter to go to the desired page. Touch device users, explore by touch or with swipe gestures."
                        />
                        <button
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-12 w-12 flex items-center justify-center"
                          aria-label="icon-search"
                        >
                          <Image
                            src="https://d3leeb4r1qy96s.cloudfront.net/assets/img/icon-search.png"
                            alt="icon-search"
                            className="h-6 w-6"
                            height={17}
                            width={17}
                            priority
                          />
                        </button>
                      </form>
                    </div>
                  </div>
                  <nav className="nav--top-menu hidden-xxs hidden-xs hidden-sm">
                    <ul id="menu-top-menu" className="menu flex items-center">
                      <li className="menu-item menu-item-type-post_type menu-item-object-page min-w-[80px] text-center">
                        <Link href="/about" aria-label="About Us" className="block px-2">
                          {homet("about")}
                        </Link>
                      </li>
                      <li className="menu-item menu-item-type-post_type menu-item-object-page min-w-[80px] text-center">
                        <Link href="/careers" aria-label="Career" className="block px-2">
                          {homet("careers")}
                        </Link>
                      </li>
                      <li className="menu-item menu-item-type-post_type menu-item-object-page min-w-[80px] text-center">
                        <Link href="/deals-specials" aria-label="Specials" className="block px-2">
                          {homet("specials")}
                        </Link>
                      </li>
                      <li className="menu-item menu-item-type-post_type menu-item-object-page min-w-[40px] text-center">
                        <LanguageSwitcher />
                      </li>
                    </ul>
                  </nav>

                  <button
                    className="js-mobile-trigger-button--menu mobile-trigger-button mobile-trigger-button--menu hidden-md hidden-lg"
                    aria-label="Menu"
                  >
                    {/* <span className="icon-menu"></span> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="36"
                      height="28"
                      viewBox="0 8 36 24"
                      fill="currentColor"
                      style={{ marginTop: 0 }}
                    >
                      <path d="M3 18h30v-2H3v2zm0-5h30v-2H3v2zm0-7v2h30V6H3z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 bg-white">
                <nav className="nav--primary">
                  <ul id="menu-main-navigation" className="menu">
                    {HeaderData.map((item, index) => (
                      <li key={item.id} className={`menu-item-${item.id} min-h-[40px]`}>
                        <Link href={item.handle}>{homet(`${item.title}`)}</Link>
                        {item.submenu && (
                          <>
                            <button
                              className="sub-menu-toggle icon-chevron-down hidden-md hidden-lg"
                              onClick={(e) => {
                                e.preventDefault();
                                const parent = e.currentTarget.closest("li");
                                parent?.classList.toggle("toggled");
                                e.currentTarget.classList.toggle("toggled");
                                parent?.querySelector(".sub-menu")?.classList.toggle("toggled");
                              }}
                            />
                            <ul className="sub-menu">
                              {item.sub?.map((item: any, i: any) => (
                                <li
                                  key={i}
                                  className={`menu-item menu-item-type-post_type menu-item-object-page menu-item-${item.id}`}
                                >
                                  <Link href={item.handle}>{homet(`${item.title}`)}</Link>
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
  );
};

export default Nav;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  let messages;
  try {
    messages = await import(`../../../../../messages/${locale}.json`);
  } catch (e) {
    messages = await import(`../../../../../messages/en.json`);
  }
  return {
    props: {
      messages: messages,
    },
  };
}
