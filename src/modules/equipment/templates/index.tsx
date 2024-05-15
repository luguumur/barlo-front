"use client"

import usePreviews from "@lib/hooks/use-previews"
import {
  ProductCategoryWithChildren,
  getProductsByCategoryHandle,
} from "@lib/data"
import getNumberOfSkeletons from "@lib/util/get-number-of-skeletons"
import repeat from "@lib/util/repeat"
import React, { useEffect } from "react"
import Link from "next/link"
import UnderlineLink from "@modules/common/components/underline-link"
import { notFound } from "next/navigation"
import { useTranslations } from "next-intl"
import PageHeader from "@modules/layout/components/page-header"
import Beside from "@modules/layout/components/beside-menu"
import { EquipmentData } from "@data/equipment"
import Tabs from "@modules/layout/components/tabs"
import { Component } from "react"
import Slider from "react-slick"
import DetailsTab from "@modules/layout/components/detail-tabs"
import { GetStaticPropsContext } from "next"
import { MenuData } from "@/data/home"

type EquipmentTemplateProps = {
  equipment: any
}

const EquipmentTemplate: React.FC<EquipmentTemplateProps> = ({ equipment }) => {
  const t = useTranslations("Menu");
  const equipmentt = useTranslations("Equipment");

  const equipmentDetail = equipment
  console.log(equipmentDetail)
  const settings = {
    customPaging: function(i:any) {
      return (
        <a>
          <img src={`https://webapi.barloworld.mn/file/${equipmentDetail.img_path}`} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  
  const tabs = [
    {
      title: 'icon-camera',
      image: (
        <Slider {...settings}>
            <img src={`https://webapi.barloworld.mn/file/${equipmentDetail.img_path}`} alt="" className="img-responsive entered lazyloaded" data-lazy-src={equipmentDetail.image} data-ll-status="loaded"/>
            <img src={`https://webapi.barloworld.mn/file/${equipmentDetail.img_path}`} alt="" className="img-responsive entered lazyloaded" data-lazy-src={equipmentDetail.image} data-ll-status="loaded"/>
            <img src={`https://webapi.barloworld.mn/file/${equipmentDetail.img_path}`} alt="" className="img-responsive entered lazyloaded" data-lazy-src={equipmentDetail.image} data-ll-status="loaded"/>
        </Slider>
      ),
      content: (
        <div>
         
        </div>
      ),
    },
    {
      title: 'icon-play',
      image: equipmentDetail.youtube,
      content: (
        <div>
        </div>
      ),
    },
    {
      title: 'icon-360',
      image: equipmentDetail.view,
      content: (
        <div>
        </div>
      ),
    },
  ];
  const detailsTab = [
    {
      title: 'Specifications',
      image: (
        <div>
          asd
        </div>
      ),
      content: equipmentDetail.attribute_values,
    },
    {
      title: 'Benefits and Features',
      image: (
        <div>
          asd
        </div>
      ),
      content: equipmentDetail.description,
    },
    {
      title: 'Related Attachments',
      image: (
        <div>
          asd
        </div>
      ),
      content: (
        <div>
        Under construction
        </div>
      ),
    },
    // {
    //   title: 'Compare Models',
    //   image: (
    //     <div>
    //       asd
    //     </div>
    //   ),
    //   content: (
    //     <div>
    //     Under construction..
    //     </div>
    //   ),
    // }
  ];
  return (
    <>
    <PageHeader title={equipmentDetail.name}/>
    <article className="page-body container post-7 page type-page status-publish hentry" id="page-body">
      <div className="row test ">
        <main className="page-content col-md-9 col-md-push-3">
        <Tabs tabs={tabs} />
        <div className="row">
          <div className="col-xs-6 col-md-7">
            <div className="product__overview"></div>
          </div>
          <div className="col-xs-6 col-md-5">
            <a href="#" className="button button--primary button--block">Request a Quote</a>
            <ul className="product__actions">
              <li>
                <a href="#" target="_blank" rel="nofollow">
                  <span className="icon-pdf-01"></span> Download Brochure </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon-share"></span> Share </a>
              </li>
              <li className="hidden-xxs hidden-xs hidden-sm">
                <a href="#">
                  <span className="icon-print"></span> Print </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="product__details tabs">
          <DetailsTab tabs={detailsTab} />
        </div>
        </main>
        <Beside menu={MenuData} title={equipmentDetail.name} translate="Menu"/> 
      </div>
    </article>
    </>
  )
}

export default EquipmentTemplate

export async function getStaticProps({locale}: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../messages/${locale}.json`)).default
    }
  };
}