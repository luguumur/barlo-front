"use client"
import { GetServerSideProps, GetStaticPropsContext, InferGetServerSidePropsType, Metadata } from "next"
import { notFound, useSearchParams } from "next/navigation"

import React, { FormEvent, useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { HeaderData } from "@data/menu"
import { EquipmentData } from "../../data/equipment"
import PageHeader from "@modules/layout/components/page-header"
import axios from 'axios';
import https from 'https';
import Link from "next/link"

import $ from 'jquery';
const Search: InferGetServerSidePropsType<typeof getServerSideProps> = (props: any) => {
    useEffect(() => {
        ($(".select-option")as any).selectric();
    }, []);
    const result = props.equipment;
    const equipmentt = useTranslations("Equipment");
    const t = useTranslations("Search");
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        e.preventDefault()
    }
    return (
    <>
    <PageHeader title={equipmentt(`equipmentSearch`)}/>
        <article className="page-body container position--relative min-h-[600px] post type-post status-publish format-standard has-post-thumbnail hentry category-events" id="page-body">
            <div className="equipment-search-wrap">
                <div className="equipment-search-wrap--background soft push--bottom">
                    <h5 className="js-equipment-search-title">Filter Your Search <span className="visible-xxs-inline-block push--left">▾</span>
                    </h5>
                    <form className="js-search-form front" onSubmit={handleSubmit}>
                        <div className="form-row row">
                            <div className="col-xs-6 col-md-12 push--bottom">
                                <div className="quick-search-options-box">
                                    <input type="radio" name="condition" value="new" id="new" defaultChecked={props.condition === "new"}/>
                                    <label htmlFor="new">{t("new")}</label>
                                    <input type="radio" name="condition" value="used" id="used" defaultChecked={props.condition === "used"}/>
                                    <label htmlFor="used">{t("used")}</label>
                                </div>
                            </div>
                            <div className="col-xs-6 col-md-12 push--bottom">
                                <label htmlFor="model">{t("model")}</label>
                                <select className="select-option" name="model" id="model">
                                    <option value="all">{t("all")}</option>
                                    {props.modelList.map((item:any, index:any) => (
                                        <option key={index} value={item.string_value}>{item.string_value}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-xs-6 col-md-12 push--bottom">
                                <label htmlFor="owner">{t("owner")}</label>
                                <select className="select-option" name="owner" id="owner">
                                    <option value="all">{t("all")}</option>
                                    {props.ownerList.map((item:any, index:any) => (
                                        <option key={index} value={item.string_value}>{item.string_value}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-xs-6 col-md-12 push--bottom">
                                <label htmlFor="location">{t("location")}</label>
                                <select className="select-option" name="location" id="location">
                                    <option value="all">{t("all")}</option>
                                    {props.locationList.map((item:any, index:any) => (
                                        <option key={index} value={item.string_value}>{item.string_value}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="row">
                <main className="page-content col-md-9 col-md-push-3">
                    <div>
                    <div className="facetwp-template">
                    {result.map((item:any, index: any) => (
                        <Link key={index} className="card card--product js-cat-filterable test" href={"/equipment/"+props.condition+"/"+item.category_id+"/"+item.id}>
                            <figure className="card__primary-info">
                                <img src={`https://webapi.barloworld.mn/file/${item.img_path}`} alt="" className="img-responsive entered lazyloaded" data-lazy-src={item.image}  data-ll-status="loaded"/>
                            </figure>
                            <figcaption className="card__secondary-info">
                                <h4 className="card__title">{item.title}</h4>
                                <dl className="product-stats-summary clearfix">
                                <div className="product-stats-summary__row">
                                    <dt>Name</dt>
                                    <dd>{item.name}</dd>
                                </div>
                                <div className="product-stats-summary__row">
                                    <dt>Category</dt>
                                    <dd>{item.category.name}</dd>
                                </div>
                                <div className="product-stats-summary__row">
                                    <dt>{item.attribute_values.length > 0 ? item.attribute_values[0].attribute.name : ""}</dt>
                                    <dd >{item.attribute_values.length > 0 ? item.attribute_values[0].string_value : ""} </dd>
                                </div>
                                </dl>
                                <button className="button button--primary text--left">View Details</button>
                            </figcaption>
                        </Link>
                    ))}
                    </div>
                    </div>
                </main>
            </div>
    </article>
    </>
  )
}

export default Search


export const getServerSideProps: GetServerSideProps = async (context) => {
    const queryParams = context.query;
    const instance = axios.create({
        httpsAgent: new https.Agent({  
          rejectUnauthorized: false
        })
    });
    let apiUrl = `${process.env.apiDomain}/store/products`;
    const filterParam:any = {};
    Object.entries(queryParams).forEach(([key, value], index) => {
        if (value !== 'all' && key !== 'condition') {
            const mapping:any = {
              'location': 'clwactkq600056j9zrtau9gxa',
              'model': 'clx2rlgzv0005w3hvkqzb1fyo',
              'owner': 'clx2rl7l30004w3hv38mtjjbq'
            };
            filterParam[mapping[key]] = value;
          }
    });
    let urlParams = [];
    if (queryParams.condition) {
    urlParams.push(`type=${queryParams.condition}`);
    }
    if (Object.keys(filterParam).length > 0) {
    urlParams.push(`filter=${encodeURIComponent(JSON.stringify(filterParam))}`);
    }
    apiUrl = `${apiUrl}?${urlParams.join('&')}`;
    let filterconfig = {
        method: 'get',
        maxBodyLength: Infinity,
        url: apiUrl,
        headers: { }
    };
    
    const equipment = await instance.request(filterconfig)

    let modelConfig = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.apiDomain}/store/attribute-values?attribute_id=clx2rlgzv0005w3hvkqzb1fyo`,
        headers: { }
      };
    
      const model = await instance.request(modelConfig)
    
      let ownerConfig = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.apiDomain}/store/attribute-values?attribute_id=clx2rl7l30004w3hv38mtjjbq`,
        headers: { }
      };
    
      const owner = await instance.request(ownerConfig)
    
      let locationConfig = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.apiDomain}/store/attribute-values?attribute_id=clx2rkyy60003w3hvmr8tg2e5`,
        headers: { }
      };
    
      const location = await instance.request(locationConfig)
    return {
        props: {
            equipment: equipment.data,
            condition: queryParams.condition,
            model: queryParams.model,
            modelList: model?.data,
            owner: queryParams.owner,
            ownerList: owner?.data,
            location: queryParams.location,
            locationList: location?.data,
            messages: (await import(`../../../messages/${context.locale}.json`)).default
        },
    };
};