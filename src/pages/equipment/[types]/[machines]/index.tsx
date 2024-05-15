import { GetServerSideProps, InferGetServerSidePropsType, Metadata } from "next"
import { notFound } from "next/navigation"
import { useRouter } from 'next/router'
 
import React from "react"
import { useTranslations } from "next-intl"
import { HeaderData } from "@data/menu"
import { EquipmentData } from "@data/equipment"
import PageHeader from "@modules/layout/components/page-header"
import Beside from "@modules/layout/components/beside-menu"

const Types: InferGetServerSidePropsType<typeof getServerSideProps> = (props: any) => {
  const menut = useTranslations("Menu");
  const equipmentt = useTranslations("Equipment");
  const equipment = JSON.parse(props.data)
  const sub = JSON.parse(props.submenu)
  return (
    <>
    <PageHeader title={menut(`${equipment.title}`)} image="https://thompsonmachinery.com/content/uploads/2022/06/cta-banner-image-1536x306.jpg"/>
    <article className="page-body container post-7 page type-page status-publish hentry" id="page-body">
        <div className="row test ">
          <main className="page-content col-md-9 col-md-push-3">
              <ul className="row button-image--container">
              {equipment.types.map((item:any, index: any) => (
                <li key={index} className="col-xs-6 col-sm-4">
                  <div className="button-image">
                    <a href={item.handle}>
                      <img decoding="async" src={item.image} alt="" className="img-responsive entered lazyloaded" data-lazy-src={item.image} data-ll-status="loaded"/>
                      <h6 className="button-image--name">
                        <span>{equipmentt(`${item.title}`)}</span>
                      </h6>
                    </a>
                  </div>
                </li>
              ))}
              </ul>
          </main>
          <Beside menu={sub.sub} title={menut(`${sub.title}`)} translate="Menu"/>
        </div>
        </article>
    </>
  )
}

export default Types

export const getServerSideProps: GetServerSideProps = async (context) => {
  let newEquipments:any = EquipmentData.filter(function (data) { 
    return data.title == context?.params?.machines; 
  })
  let submenu:any = HeaderData.filter(function (data) { 
    return data.title == context?.params?.types; 
  })
  return {
    props: {
        data: JSON.stringify(newEquipments[0]),
        submenu:  JSON.stringify(submenu[0]),
        messages: (await import(`../../../../../messages/${context.locale}.json`)).default
    },
  };
};