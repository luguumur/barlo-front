import { EquipmentData } from "@/data/equipment"
import EquipmentTemplate from "@modules/equipment/templates"
import { GetServerSideProps, InferGetServerSidePropsType, Metadata } from "next"
import { notFound } from "next/navigation"
import { useRouter } from 'next/router'

import React from "react"

const Types: InferGetServerSidePropsType<typeof getServerSideProps> = (params: any) => {
  return <EquipmentTemplate equipment={params} />
}

export default Types

export const getServerSideProps: GetServerSideProps = async (context) => {
  let machines:any = EquipmentData.filter(function (data) { 
    return data.title == context?.params?.machines
  })
  let list: any = machines[0].types.filter(function (data: { title: any }) { 
      return data.title == context?.params?.list
  })
  let submenu:any = EquipmentData.filter(function (data) { 
      return data.title == context?.params?.machines; 
  })
  let equipmentDetail:any = list[0].equipment.filter(function (data: { title: any }) { 
    return data.title == context?.params?.slug
  })

  return {
    props: {
      machines: JSON.stringify(machines[0]),
      list: JSON.stringify(list[0]),
      submenu: JSON.stringify(submenu[0]),
      equipmentDetail: JSON.stringify(equipmentDetail[0]),
      messages: (await import(`../../../../../../../messages/${context.locale}.json`)).default
    },
  };
};