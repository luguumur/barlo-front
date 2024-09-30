"use client";

import clsx from "clsx";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import mainlogo from "../../../../../public/logo.jpg";
import { Field, Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@modules/layout/components/i18n/LanguageSwitcher";
import { toast } from "react-toastify";

import axios from "axios";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";

type Props = {
  title?: string;
  menu?: any;
};

interface FormData {
  name: string;
  email: string;
}

const Beside = (props: Props) => {
  // console.log(props)
  const pathname = usePathname();

  const { locale, locales, route, asPath } = useRouter();
  return (
    <aside className="page-sidebar  col-md-3 col-md-pull-9">
      <div className="widget widget-sublist-pages">
        <h5>{props.title}</h5>
        <nav className="sublist-pages">
          <ul id="menu-main-navigation-1" className="menu">
            {props.menu.map((item: any, index: any) => (
              <li
                key={index}
                id={`menu-item-${item.id}`}
                className={`menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children ${
                  item.handle == pathname ? "current-menu-item page_item current_page_item" : ""
                }`}
              >
                <a href={item.id}>{locale === "mn" ? item.name : item.name_en}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Beside;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../../messages/${locale}.json`)).default,
    },
  };
}
