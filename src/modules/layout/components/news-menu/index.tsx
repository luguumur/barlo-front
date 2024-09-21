"use client"

import clsx from "clsx"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import Image from "next/image"
import mainlogo from "../../../../../public/logo.jpg"
import { Field, Form, Formik } from 'formik'
import FormField from '../../components/form/field';
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@modules/layout/components/i18n/LanguageSwitcher"
import { toast } from 'react-toastify';

import axios from 'axios';
import { GetStaticPropsContext } from "next"
import Questions from "../questions"

type Props = {
    category?: any,
    menu?: any,
}

const NewsBeside = (props: Props) => {
  const {locale, locales, route, asPath} = useRouter();
  const pathname = usePathname()
  const category = props?.category
  return (
  <aside className="page-sidebar  col-md-3 col-md-pull-9">
    <div className="widget-even widget-2 .page-sidebar .textwidget .sidebar-events widget widget_text" id="text-5">
      <h6 className="heading-title accent">Upcoming Events</h6>
      <div className="textwidget">
        <p>
          <a href="/news?category=clwadxh5j000m6j9zyotqcbgi">View Upcoming Events</a>
        </p>
      </div>
    </div>
    <div className="widget-odd widget-3 widget widget_categories" id="categories-3">
      <h6 className="heading-title accent">Categories</h6>
        <ul className="!pt-5">
          {category?.map((item:any, index: any) => ( 
            <li key={index} className="cat-item cat-item-866">
              <a href={'/news?category='+item.id}>{locale === "mn" ? item.name : item.name_en}</a>
            </li>
          ))}
        </ul>
    </div>
    <Questions/>
  </aside>
)
}

export default NewsBeside

