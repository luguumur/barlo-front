import { GetServerSideProps, InferGetServerSidePropsType, Metadata } from "next";
import { notFound } from "next/navigation";
import { useRouter } from "next/router";

import React from "react";
import { useTranslations } from "next-intl";
import { HeaderData } from "@data/menu";
import { EquipmentData } from "@data/equipment";
import PageHeader from "@modules/layout/components/page-header";
import ProductBeside from "@modules/layout/components/product-menu";

import axios from "axios";
import https from "https";
import Image from "next/image";
import Link from "next/link";
import Head from "@/modules/common/components/head";
import Footer from "@/modules/layout/templates/footer";
import Nav from "@/modules/layout/templates/nav";

const imageLoader = ({ src, width }: { src: any; width: any }) => {
  return `${process.env.apiDomain}/file/${src}`;
};
const Types: InferGetServerSidePropsType<typeof getServerSideProps> = (props: any) => {
  const menut = useTranslations("Menu");
  const equipmentt = useTranslations("Equipment");
  const { locale, locales, route, asPath } = useRouter();
  return (
    <>
      <Head title={locale === "mn" ? props.data.name : props.data.name_en}></Head>
      <Nav />
      <PageHeader
        title={locale === "mn" ? props.data.name : props.data.name_en}
        image="https://d3leeb4r1qy96s.cloudfront.net/assets/img/cta-banner-image-1536x306.jpg"
      />
      <article className="page-body container page type-page status-publish hentry" id="page-body">
        <div className="row">
          <main className="page-content col-md-9 col-md-push-3">
            <ul className="row button-image--container">
              {props.data.products.map((item: any, index: any) => (
                <Link
                  key={index}
                  className="card card--product js-cat-filterable test"
                  data-type="excavators"
                  href={asPath + "/" + item.id}
                >
                  <figure className="card__primary-info">
                    <Image
                      loader={imageLoader}
                      src={item.img_path}
                      priority
                      alt={item.name}
                      width={600}
                      height={500}
                      className="img-responsive"
                    />
                  </figure>
                  <figcaption className="card__secondary-info">
                    <h4 className="card__title">{locale === "mn" ? item.name : item.name_en}</h4>
                    <dl className="product-stats-summary clearfix">
                      {item.attribute_values &&
                        item.attribute_values.slice(0, 3).map((tab: any, index: any) => (
                          <div key={index} className="product-stats-summary__row">
                            <dt>{tab.attribute.name}</dt>
                            <dd>{tab.string_value.substring(0, 40)}</dd>
                          </div>
                        ))}
                    </dl>
                    <button className="button button--primary text--left">View Details</button>
                  </figcaption>
                </Link>
              ))}
            </ul>
          </main>
          <ProductBeside menu={props.categories} title={locale === "mn" ? props.data.name : props.data.name_en} />
        </div>
      </article>
      <Footer />
    </>
  );
};

export default Types;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context?.params?.categories;
  const instance = axios.create({
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });
  let config = {
    method: "get",
    rejectUnauthorized: false,
    maxBodyLength: Infinity,
    url: `${process.env.apiDomain}/store/categories/${params}`,
    headers: {},
  };
  const products = await instance.request(config);

  let category = {
    method: "get",
    rejectUnauthorized: false,
    maxBodyLength: Infinity,
    url: `${process.env.apiDomain}/store/categories?type=${products.data?.types?.toString().toUpperCase()}`,
    headers: {},
  };
  const categories = await instance.request(category);
  // let newEquipments:any = EquipmentData.filter(function (data) {
  //   return data.title == context?.params?.machines;
  // })
  // let submenu:any = HeaderData.filter(function (data) {
  //   return data.title == context?.params?.types;
  // })
  return {
    props: {
      data: products?.data,
      categories: categories?.data,
      messages: (await import(`../../../../../messages/${context.locale}.json`)).default,
    },
  };
};
