import { EquipmentData } from "@/data/equipment"
import EquipmentTemplate from "@modules/equipment/templates"
import { GetServerSideProps, InferGetServerSidePropsType, Metadata } from "next"
import { notFound } from "next/navigation"
import { useRouter } from 'next/router'

import axios from 'axios';
import https from "https";
import React from "react"

const Types: InferGetServerSidePropsType<typeof getServerSideProps> = (params: any) => {
  return <EquipmentTemplate equipment={params} />
  return <></>
}

export default Types

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context?.params?.slug
  const instance = axios.create({
    httpsAgent: new https.Agent({  
      rejectUnauthorized: false
    })
  });
  let config = {
    method: 'get',
    rejectUnauthorized: false,
    maxBodyLength: Infinity,
    url: `${process.env.apiDomain}/store/products/${slug}`,
    headers: { }
  };
  const product = await instance.request(config)
  return {
    props: {
      data: product?.data,
      messages: (await import(`../../../../../../messages/${context.locale}.json`)).default
    },
  };
};