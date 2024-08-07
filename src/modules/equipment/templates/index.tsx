"use client"

import usePreviews from "@lib/hooks/use-previews"
import {
  ProductCategoryWithChildren,
  getProductsByCategoryHandle,
} from "@lib/data"
import getNumberOfSkeletons from "@lib/util/get-number-of-skeletons"
import repeat from "@lib/util/repeat"
import React, { useEffect, useState } from "react"
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
import Head from "@/modules/common/components/head"
import EmblaCarouselComponent from "@/modules/layout/components/EmblaCarousel"
import styles from '../../../modules/layout/components/EmblaCarousel.module.css';

type EquipmentTemplateProps = {
  equipment: any
}

const imageLoader = ({ src, width }: { src: any, width: any }) => {
  return `${process.env.apiDomain}/file/${src}`
}

type MachineCheckboxProps = {
  machine: any;
  isSelected: boolean;
  isEnabled: boolean;
  onCheckboxChange: (id: number, checked: boolean) => void;
};

const MachineCheckbox: React.FC<MachineCheckboxProps> = ({ machine, isSelected, isEnabled, onCheckboxChange }) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(machine.id, e.target.checked);
  };
  return (
    <>
      <li data-bind="css: {'scl-selected': isSelected, 'scl-locked': !isEnabled(), 'scl-highlighted': machine.IsHighlighted}" className="scl-selected scl-locked">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckboxChange}
          disabled={!isEnabled}
          id={`sclCbxModel${machine.Id}`}
        />
        <label data-bind="attr: {for: 'sclCbxModel' + machine.Id }" htmlFor="sclCbxModel27475">
          <span data-bind="template: {name: $parent.labelTemplateName, data: machine }">
            <span data-bind="text: Model">{machine.name}</span>
          </span>
          <span data-bind="if: machine.Attribute">
            <span data-bind="template: {name: $parent.attributeValueTemplateName, data: machine.Attribute}">
              <span className="scl-attrval">
                <span className="scl-attrval-imperial" data-bind="text: imperial">50975</span><span className="scl-attrval-unit" data-bind="text: imperialUnit">lb</span>
                (<span className="scl-attrval-metric" data-bind="text: metric">23122</span><span className="scl-attrval-unit" data-bind="text: metricUnit">kg</span>)
              </span>
            </span>
          </span>
        </label>
      </li>
    </>
  );
};

interface Attribute {
  id: string;
  name: string;
  name_en: string;
  data_type: string;
  created_at: string;
  updated_at: string;
}

interface Group {
  id: string;
  name: string;
  name_en: string;
  created_at: string;
  updated_at: string;
}

interface AttributeValue {
  id: string;
  product_id: string;
  attribute_id: string;
  group_id: string;
  string_value: string | null;
  int_value: number | null;
  datetime_value: string | null;
  boolean_value: boolean | null;
  decimal_value: number | null;
  created_at: string;
  updated_at: string;
  attribute: Attribute;
  group: Group;
}

interface Product {
  id: string;
  name: string;
  name_en: string;
  description: string;
  description_en: string;
  price: number | null;
  img_path: string;
  brochure_path: string | null;
  model_3d: string;
  video_link: string;
  product_types: string;
  status: string;
  category_id: string;
  created_at: string;
  updated_at: string;
  attribute_values: AttributeValue[];
}

interface ProductProps {
  products: Product[];
}

const AttributeComparisonTable: React.FC<{ products: Product[] }> = ({ products }) => {
  // Combine attributes from all products
  const combinedAttributes = new Map<string, AttributeValue[]>();

  const addAttributes = (attributes: AttributeValue[], productId: string) => {
    attributes.forEach(attr => {
      const key = attr.attribute.id;
      if (!combinedAttributes.has(key)) {
        combinedAttributes.set(key, []);
      }
      combinedAttributes.get(key)!.push({ ...attr, product_id: productId });
    });
  };

  products.forEach(product => addAttributes(product.attribute_values, product.id));

  return (
    <>
      <h1 >Compare</h1>
      <table>
        <thead>
          <tr>
            <th>&nbsp;</th>
            {products.map(product => (
              <>
                <th key={product.id} className="text-center">
                  <span>CATERPILLAR</span><br />
                  <span className="scl-font-bold">{product.name}</span>
                </th>
              </>
            ))}
          </tr>
        </thead>
        <tbody className="scl-section">
          <tr>
            <th colSpan={99} data-bind="click: toggleExpansion, css: {'scl-expanded': expanded}" className="scl-expanded">
              <span>Driveline</span>
            </th>
          </tr>
        </tbody>
        <tbody className="data">
          {Array.from(combinedAttributes.values()).map(attrs => {
            return (
              <tr key={attrs[0].attribute.id} className="scl-data-row">
                <th className="scl-modelAttrData">{attrs[0].attribute.name}</th>
                {products.map(product => {
                  const attr = attrs.find(a => a.product_id === product.id);
                  return (
                    <td className="scl-attrval text-center" key={product.id}>
                      {attr?.string_value || attr?.int_value || attr?.decimal_value || attr?.boolean_value || attr?.datetime_value || "-"}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

const EquipmentTemplate: React.FC<EquipmentTemplateProps> = ({ equipment }) => {
  const t = useTranslations("Menu");
  const equipmentt = useTranslations("Equipment");

  const { data: equipmentDetail, products: compareModels } = equipment
  const sortedItems = compareModels.sort((a: any, b: any) => {
    if (a.id === equipmentDetail.id) return -1;
    if (b.id === equipmentDetail.id) return 1;
    return 0;
  });

  const sliderSettings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false,
    className: "equipment-detail"
  };

  const tabs = [
    {
      title: 'icon-camera',
      image: (
        <div className={styles.carouselWrapper}>
          <EmblaCarouselComponent alt={equipmentDetail?.name_en} main={equipmentDetail?.img_path} slides={equipmentDetail?.images} />
        </div>
      ),
      content: (
        <div>
        </div>
      ),
    },
    {
      title: 'icon-play',
      image: equipmentDetail?.video_link,
      content: (
        <div>
        </div>
      ),
    },
    {
      title: 'icon-360',
      image: equipmentDetail?.model_3d,
      content: (
        <div>
        </div>
      ),
    },
  ];

  const [selections, setSelections] = useState<{ [key: string]: boolean }>({});
  const [enabledStates, setEnabledStates] = useState<{ [key: string]: boolean }>({});

  const handleCheckboxChange = (id: any, checked: boolean) => {
    setSelections(prevSelections => ({ ...prevSelections, [id]: checked }));
  };

  const getSelectedModels = () => {
    const defaultModel = [equipmentDetail];
    const selectedModels = compareModels.filter((model: any) => selections[model.id] && model.id !== equipmentDetail.id);
    const limitedProducts = [...defaultModel, ...selectedModels].slice(0, 5);
    return limitedProducts;
  };

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const detailsTab = [
    {
      title: 'Specifications',
      image: {},
      content: equipmentDetail?.attribute_values,
    },
    {
      title: 'Benefits and Features',
      image: {},
      content: equipmentDetail?.description,
    },
    {
      title: 'Compare Models',
      image: {},
      content: (
        <div className="specCheckLite">
          <div className="scl-screen" id="sclMachineSelectionScreen" >
            <button className="scl-button scl-button-compare " onClick={toggleVisibility}>
              {isVisible ? 'Select' : 'Compare'}
            </button>
          </div>
          {isVisible ? (
            <>
              <div id="sclComparisonScreen" className="scl-screen">
                <AttributeComparisonTable products={getSelectedModels()} />
              </div>
            </>
          ) : (
            <>
              <div id="sclMachineSelectionScreen" className="scl-screen">
                <h1 >Compare</h1>
                <h2 data-bind="text: subTitle">Select Models to Compare (Maximum of 5)</h2>
                <div id="sclAttributeSelection" data-bind="css: { sclDisabled: comparisonAttributes().length <= 1 }">
                  <label htmlFor="attributeSelect" data-bind="text: comparisonAttrLabel">Closest Comparison By: </label>
                  <select id="attributeSelect" data-bind="value: selectedComparisonAttribute, options: comparisonAttributes, optionsText: 'name', enable: comparisonAttributes().length > 1">
                    <option value="">Cycle Time - Lower Power</option>
                    <option value="">Cycle Time - Raise</option>
                    <option value="">Displacement</option>
                    <option value="">Dump Angle</option>
                    <option value="">Engine Output - Net</option>
                    <option value="">Gross Weight</option>
                    <option value="">Heaped Capacity</option>
                    <option value="">Net Weight</option>
                    <option value="">Payload</option>
                    <option value="">Struck Capacity</option>
                  </select>
                </div>
                <div id="sclMachineSelection">
                  <div id="sclInternalMachineSelectPane" className="scl-machineSelectPane">
                    <div className="scl-paneHead">
                      <span className="scl-title" data-bind="text: internalMachines.title">CATERPILLAR Models</span>
                      <ul>
                        {sortedItems.map((item: any, index: any) => (
                          <div key={item.id}>
                            <MachineCheckbox
                              machine={item}
                              isSelected={!!selections[item.id]}
                              isEnabled={item.id === equipmentDetail.id ? false : true}
                              onCheckboxChange={handleCheckboxChange}
                            />
                          </div>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      ),
    }
  ];


  return (
    <>
      <Head title={equipmentDetail?.name} />
      <PageHeader title={equipmentDetail?.name} />
      <article className="page-body container page type-page status-publish hentry" id="page-body">
        <div className="row">
          <main className="page-content col-md-9 col-md-push-3">
            <Tabs tabs={tabs} />
            <div className="row">
              <div className="col-xs-6 col-md-7">
                <div className="product__overview"></div>
              </div>
              <div className="col-xs-6 col-md-5">
                <Link href={`/quote?equipment=${equipmentDetail?.name}`} className="button button--primary button--block">Request a Quote</Link>
                {/* <ul className="product__actions">
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
            </ul> */}
              </div>
            </div>
            <div className="product__details tabs">
              <DetailsTab tabs={detailsTab} />
            </div>
          </main>
          <Beside menu={MenuData} title={equipmentDetail.name} translate="Menu" />
        </div>
      </article>
    </>
  )
}



export default EquipmentTemplate

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../messages/${locale}.json`)).default
    }
  };
}