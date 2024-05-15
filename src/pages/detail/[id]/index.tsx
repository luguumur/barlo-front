import { EquipmentData } from "@/data/equipment"
import EquipmentTemplate from "@modules/equipment/templates"
import { GetServerSideProps, InferGetServerSidePropsType, Metadata } from "next"
import { notFound } from "next/navigation"
import { useRouter } from 'next/router'

import React from "react"
import axios from 'axios';

const Types: InferGetServerSidePropsType<typeof getServerSideProps> = (params: any) => {
  return <EquipmentTemplate equipment={params.detail} />
return <></>
}

export default Types

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.params?.id
    let detailConfig = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://52.77.143.7:8000/store/products/${id}`,
        headers: { }
      };
    
    const detail = await axios.request(detailConfig)
    return {
        props: {
            detail: detail.data,
            messages: (await import(`../../../../messages/${context.locale}.json`)).default
        },
    };
};