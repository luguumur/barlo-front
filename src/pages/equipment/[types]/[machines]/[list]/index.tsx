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
    const list = JSON.parse(props.list)
    return (
    <>
    <PageHeader title={equipmentt(`${list.title}`)}/>
    <article className="page-body container post-7 page type-page status-publish hentry" id="page-body">
        <div className="row test ">
            <main className="page-content col-md-9 col-md-push-3">
                <div>
                <div className="facetwp-template">
                {list.equipment.map((item:any, index: any) => (
                    <a key={index} className="card card--product js-cat-filterable test" data-type="excavators" href={item.handle}>
                        <figure className="card__primary-info">
                            <img src={item.image} alt="" className="img-responsive entered lazyloaded" data-lazy-src={item.image}  data-ll-status="loaded"/>
                        </figure>
                        <figcaption className="card__secondary-info">
                            <h4 className="card__title">{item.title}</h4>
                            <dl className="product-stats-summary clearfix">
                            <div className="product-stats-summary__row">
                                <dt>Engine Model</dt>
                                <dd data-english="C1.1 " data-metric=" ">{item.engineModel}</dd>
                            </div>
                            <div className="product-stats-summary__row">
                                <dt>Net Power</dt>
                                <dd data-english="21 HP" data-metric="16 kW">{item.stroke}</dd>
                            </div>
                            <div className="product-stats-summary__row">
                                <dt>Operating Weight</dt>
                                <dd data-english="4,222 lb" data-metric="1,915 kg">{item.operatingWeight} </dd>
                            </div>
                            </dl>
                            <button className="button button--primary text--left">View Details</button>
                        </figcaption>
                    </a>
                ))}
                </div>
                </div>
            </main>
            <Beside menu={equipment.types} title={equipmentt(`${list.title}`)} translate="Equipment"/>
        </div>
    </article>
    </>
  )
}

export default Types

export const getServerSideProps: GetServerSideProps = async (context) => {

    let newEquipments:any = EquipmentData.filter(function (data) { 
        return data.title == context?.params?.machines
    })
    let list: any = newEquipments[0].types.filter(function (data: { title: any }) { 
        return data.title == context?.params?.list
    })

    return {
      props: {
          data: JSON.stringify(newEquipments[0]),
          list:  JSON.stringify(list[0]),
          messages: (await import(`../../../../../../messages/${context.locale}.json`)).default
      },
    };
  };