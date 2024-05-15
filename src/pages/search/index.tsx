"use client"
import { GetServerSideProps, GetStaticPropsContext, InferGetServerSidePropsType, Metadata } from "next"
import { notFound, useSearchParams } from "next/navigation"
 

import React, { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { HeaderData } from "@data/menu"
import { EquipmentData } from "../../data/equipment"
import PageHeader from "@modules/layout/components/page-header"
import axios from 'axios';
import https from 'https';

const Search: InferGetServerSidePropsType<typeof getServerSideProps> = (props: any) => {
    const result = props.equipment;
    const menut = useTranslations("Menu");
    const equipmentt = useTranslations("Equipment");
    // const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
    // const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    // const [searchTerm, setSearchTerm] = useState<string>('');
    // const [selectedType, setSelectedType] = useState<string | null>(null);
    // const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);

    // const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     const id = parseInt(e.target.value, 10);
    //     setSelectedItemId(id);

    //     const selectedItem = items.find(item => item.id === id) || null;
    //     setSelectedItem(selectedItem);
    // };

    // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearchTerm(e.target.value);
    //     setSelectedItem(null); // Reset selected item when searching
    // };

    // const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     const type = e.target.value;
    //     setSelectedType(type);
    //     setSelectedItem(null); // Reset selected item when changing type
    // };

    // const handlePriceRangeChange = (price: number) => {
    //     setSelectedPriceRange(price);
    //     setSelectedItem(null); // Reset selected item when changing price range
    // };

    // const filteredItems = items.filter(item =>
    //     item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    //     (selectedType ? item.type === selectedType : true) &&
    //     (selectedPriceRange ? item.price <= selectedPriceRange : true)
    // );
    return (
    <>
    <PageHeader title={equipmentt(`equipmentSearch`)}/>
    <article className="page-body container post-7 page type-page status-publish hentry" id="page-body">
        <div className="row test ">
            <main className="page-content col-md-9 col-md-push-3">
                <div>
                <div className="facetwp-template">
                {result.map((item:any, index: any) => (
                    <a key={index} className="card card--product js-cat-filterable test" data-type="excavators" href={"/detail/"+item.id}>
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
                                <dt>Net Power</dt>
                                <dd >{item.attribute_values[0].string_value} </dd>
                            </div>
                            </dl>
                            <button className="button button--primary text--left">View Details</button>
                        </figcaption>
                    </a>
                ))}
                </div>
                </div>
            </main>
            <div className="equipment-search-wrap">
            <div className="equipment-search-wrap--background soft push--bottom">
                <h5 className="js-equipment-search-title">Filter Your Search <span className="visible-xxs-inline-block push--left">▾</span>
                </h5>
                <div>
                    
                </div>
            </div>
            </div>
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
    // let url = `https://webapi.barloworld.mn/store/products?filter={"clvng1q8t00006vk64asepsji": "NEW", "clvng290z00026vk6y7g1zcdv":"ULAANBAATAR"}`
    const apiUrl = `${process.env.apiDomain}/store/products`;

    let filterParam = '{';
    Object.entries(queryParams).forEach(([key, value], index) => {
        if ( value!="all"){
            if (index > 0) filterParam += ', ';
            filterParam += `"${key == "condition" ? "clvng1q8t00006vk64asepsji" : key == "location" ? "clvng290z00026vk6y7g1zcdv" : key == "model" ? "clvng290z00026vk6y7g1zcdv" : key == "owner" ? "clvng1v3k00016vk6acetabj5" : ""}": "${value}"`;
        }
    });
    filterParam += '}';

    const finalUrl = `${apiUrl}?filter=${(filterParam)}`;

    let filterconfig = {
        method: 'get',
        maxBodyLength: Infinity,
        url: finalUrl,
        headers: { }
    };
    
    const equipment = await instance.request(filterconfig)

    return {
        props: {
            equipment: equipment.data,
            condition: queryParams.condition,
            model: queryParams.model,
            owner: queryParams.owner,
            location: queryParams.location,
            messages: (await import(`../../../messages/${context.locale}.json`)).default
        },
    };
};