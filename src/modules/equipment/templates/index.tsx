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
import Image from 'next/image'

type EquipmentTemplateProps = {
  equipment: any
}

const imageLoader = ({ src, width } : {src:any, width:any}) => {
  return `${process.env.apiDomain}/file/${src}`
}

const EquipmentTemplate: React.FC<EquipmentTemplateProps> = ({ equipment }) => {
  const t = useTranslations("Menu");
  const equipmentt = useTranslations("Equipment");

  const equipmentDetail = equipment
  const settings = {
    // customPaging: function(i:any) {
    //   return (
    //     <a>
    //       <img src={`https://webapi.barloworld.mn/file/${equipmentDetail.data.images[i].path}?thumb=1`} />
    //     </a>
    //   );
    // },
    arrows: false,
    dots: false,
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
            <Image loader={imageLoader} 
                src={equipmentDetail.data.img_path} 
                alt={equipmentDetail.data.name} 
                priority
                width={600}
                height={500}
                className="img-responsive js-image-popup"/>
            {equipmentDetail.data.images.map((item:any, index:any) => (
              <Image key={index}
                loader={imageLoader} 
                src={item.path} 
                alt={item.product_id} 
                priority
                width={600}
                height={500}
                className="img-responsive js-image-popup"/>
            ))}
        </Slider>
      ),
      content: (
        <div>
         
        </div>
      ),
    },
    {
      title: 'icon-play',
      image: equipmentDetail.data.video_link,
      content: (
        <div>
        </div>
      ),
    },
    {
      title: 'icon-360',
      image: equipmentDetail.data.model_3d,
      content: (
        <div>
        </div>
      ),
    },
  ];
  const detailsTab = [
    {
      title: 'Specifications',
      image: {},
      content: equipmentDetail.data.attribute_values,
    },
    {
      title: 'Benefits and Features',
      image: {},
      content: equipmentDetail.data.description,
    },
    // {
    //   title: 'Related Attachments',
    //   image:  {},
    //   content: {},
    // },
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
    <PageHeader title={equipmentDetail.data.name}/>
    <article className="page-body container post-7 page type-page status-publish hentry" id="page-body">
      <div className="row test ">
        <main className="page-content col-md-9 col-md-push-3">
        <Tabs tabs={tabs} />
        <div className="row">
          <div className="col-xs-6 col-md-7">
            <div className="product__overview"></div>
          </div>
          <div className="col-xs-6 col-md-5">
            <Link href={`/quote?equipment=${equipmentDetail.data.name}`} className="button button--primary button--block">Request a Quote</Link>
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