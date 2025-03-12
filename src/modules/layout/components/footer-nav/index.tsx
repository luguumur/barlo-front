"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { GetStaticPropsContext } from "next";

const FooterNav = () => {
  const menut = useTranslations("Menu");
  const homet = useTranslations("Home");

  return (
    <div className="page-footer">
      <div className="page-footer__main">
        <div className="container">
          <div className="row push--bottom">
            <div className="col-md-7 col-sm-9">
              <nav className="nav--footer">
                <ul className="menu">
                  <li>
                    <Link href="/equipment/new">{menut("new")}</Link>
                  </li>
                  <li>
                    <Link href="/equipment/used">{menut("used")}</Link>
                  </li>
                  <li>
                    <Link href="/equipment/rental">{menut("rent")}</Link>
                  </li>
                  <li>
                    <Link href="/parts">{menut("parts")}</Link>
                  </li>
                  <li>
                    <Link href="/service">{menut("service")}</Link>
                  </li>
                  <li>
                    <Link href="/technology">{menut("technology")}</Link>
                  </li>
                  <li>
                    <Link href="/about">{menut("about")}</Link>
                  </li>
                  <li>
                    <Link href="/careers">{menut("hr")}</Link>
                  </li>
                </ul>
              </nav>
              <nav className="nav--footer-secondary clearfix">
                <ul id="menu-footer-menu-1" className="menu text-sm sm:text-base mb-9 float-start">
                  <li className="menu-item">
                    <Link href="/management" aria-current="page">
                      {homet("board")}
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link href="/news?category=clx2mg66j0000mgwl9dou6ek8">{homet("social")}</Link>
                  </li>
                  <li className="menu-item">
                    <Link href="/news">{homet("news")}</Link>
                  </li>
                  <li className="menu-item">
                    <Link href="/magazine">{homet("magazine")}</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-md-5 col-sm-3">
              <ul className="page-footer__social social-links hidden-xs hidden-sm clearfix">
                <li className="mr-6 sm:mr-0">
                  <a
                    className="icon-facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.facebook.com/BarloworldMongolia"
                    aria-label="Facebook"
                  ></a>
                </li>
                <li className="mr-6 sm:mr-0">
                  <a
                    className="icon-twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://x.com/BarloworldMN"
                    aria-label="Twitter"
                  ></a>
                </li>
                <li className="mr-6 sm:mr-0">
                  <a
                    className="icon-instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.instagram.com/barloworldmongolia"
                    aria-label="Instagram"
                  ></a>
                </li>
                <li className="mr-6 sm:mr-0">
                  <a
                    className="icon-linkedin2"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/company/barloworldmongolia"
                    aria-label="LinkedIn"
                  ></a>
                </li>
                <li>
                  <a
                    className="icon-youtube3"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.youtube.com/@BarloworldMongolia"
                    aria-label="YouTube"
                  ></a>
                </li>
              </ul>
              <a className="btn btn-primary phone-number" href="tel:+97670187588" aria-label="Call us">
                +976 7018-7588
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <p className="page-footer__copyright bg-[#474d59] text-white" aria-label="Copyright information">
                Copyright © 2025 Barloworld Mongolia. <br /> All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterNav;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  let messages;
  try {
    messages = (await import(`../../../../../messages/${locale}.json`)).default;
  } catch (error) {
    messages = {};
  }
  return {
    props: {
      messages,
    },
  };
}
