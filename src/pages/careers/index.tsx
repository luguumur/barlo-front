import Beside from "@modules/layout/components/beside-menu";
import PageHeader from "@modules/layout/components/page-header";
import { HeaderData } from "@data/menu";
import { useTranslations } from "next-intl";
import Management from "../management";
import { GetServerSideProps, GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import NProgress from "nprogress";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import https from "https";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "@/modules/common/components/head";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { HrData } from "@/data/hr";
import Footer from "@/modules/layout/templates/footer";
import Nav from "@/modules/layout/templates/nav";
import moment from "moment";
import Image from "next/image";
import { HrCareerData, HrEducationData, HrInfoData } from "../../lib/data/careerData";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  year_of_experience: string;
  text: string;
  other: string;
}

interface Checkbox {
  label: string;
  value: string;
}

const checkboxes: Checkbox[] = [
  { label: "General Shop Technician", value: "General Shop Technician" },
  { label: "Field Service Technician", value: "Field Service Technician" },
  { label: "Electric Power Generation (EPG) Technician", value: "Electric Power Generation (EPG) Technician" },
  { label: "Other (fill in blank)", value: "Other (fill in blank)" },
];

const careerPage: InferGetServerSidePropsType<typeof getServerSideProps> = (props: any) => {
  const t = useTranslations("Menu");
  const { locale, locales, route, asPath } = useRouter();
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);

  const { executeRecaptcha } = useGoogleReCaptcha();
  const [freeText, setFreeText] = useState("");

  const handleCheckboxChange = (value: string) => {
    setSelectedCheckboxes((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

  const handleFreeTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFreeText(event.target.value);
  };

  const initialData = {
    email: "",
    name: "",
    phone: "",
    subject: "",
    year_of_experience: "",
    text: "",
    other: "",
  };
  const [formData, setFormData] = useState<FormData>(initialData);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    NProgress.start();
    try {
      e.preventDefault();
      if (!executeRecaptcha) {
        console.log("not available to execute recaptcha");
        return;
      }
      const gRecaptchaToken = await executeRecaptcha("inquirySubmit");
      const response = await axios({
        method: "post",
        url: "/api/recaptchaSubmit",
        data: {
          gRecaptchaToken,
        },
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });
      if (response?.data?.success === true) {
        const response = await axios.post(`/api/hr`, {
          headers: {
            "Content-Type": "application/json", // Example header
          },
          data: JSON.stringify({
            name: formData["name"],
            email: formData["email"],
            phone: formData["phone"],
            year_of_experience: formData["year_of_experience"],
            subject: formData["subject"],
            text: selectedCheckboxes,
            other: freeText,
          }),
        });
        if (response.status == 200) {
          NProgress.done();
          toast.success(`Амжилттай илгээгдлээ. Баярлалаа`);
        } else {
          NProgress.done();
          toast.error(`Мэдээлэл олдохгүй байна.`);
        }
      } else {
        console.log(`Failure with score: ${response?.data?.score}`);
        toast.error(`Recaptcha error`);
        NProgress.done();
      }
    } catch (error: any) {
      console.log(error);
      toast.error(`error`);
      NProgress.done();
    }
  };

  return (
    <>
      <Head title={t(`careers`)}></Head>
      <Nav />
      <PageHeader
        title={t(`careers`)}
        sub={{ title: t(`about`), handle: "/about" }}
        image="https://d3leeb4r1qy96s.cloudfront.net/assets/img/specials/minihr.jpg"
      />
      <section className="wysiwyg-section">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">1. Бидэнтэй нэгдэх шалтгаан</h2>
          <div className="bg-[#F2F2F2] px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="col-span-1 flex flex-col items-center gap-4">
                <svg width="81" height="80" viewBox="0 0 81 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" width="80" height="80" rx="40" fill="#FFCC00" />
                  <path
                    d="M40.5 56C40.5 56 21.5 43.5914 21.5 33.3091C21.5 28.1679 25.8862 24 31.2969 24C35.5247 24 39.127 26.5447 40.5 30.1102C41.873 26.5447 45.4753 24 49.7031 24C55.1138 24 59.5 28.1679 59.5 33.3091C59.5 43.5916 40.5 56 40.5 56Z"
                    fill="black"
                  />
                </svg>
                <div className="font-light text-center uppercase">Таны эрүүл мэнд хамгаас чухал</div>
              </div>
              <div className="col-span-1 flex flex-col items-center gap-4">
                <svg width="81" height="80" viewBox="0 0 81 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" width="80" height="80" rx="40" fill="#FFCC00" />
                  <path
                    d="M58.8303 56.7402C59.1529 56.7402 59.4582 56.6013 59.6614 56.3616C59.8646 56.1221 59.9438 55.8078 59.8772 55.5062L59.2033 52.459C59.5871 52.1042 59.8283 51.6089 59.8283 51.0582C59.8283 50.4785 59.5581 49.9642 59.1387 49.607V39.025L56.4376 40.6223V49.607C56.0182 49.9642 55.7479 50.4785 55.7479 51.0582C55.7479 51.609 55.9892 52.1043 56.373 52.459L55.6991 55.5062C55.6324 55.8079 55.7118 56.1221 55.9149 56.3616C56.1181 56.6012 56.4233 56.7402 56.746 56.7402H58.8303ZM59.7458 32.85L42.1737 22.455C41.659 22.1521 41.0789 22 40.4988 22C39.9186 22 39.3381 22.1519 38.8266 22.455L21.2542 32.85C20.785 33.1274 20.5 33.6175 20.5 34.1449C20.5 34.6724 20.785 35.1626 21.2542 35.4405L38.8265 45.8356C39.338 46.1388 39.9185 46.2906 40.4987 46.2906C41.0788 46.2906 41.659 46.1386 42.1736 45.8356L59.7458 35.4405C60.215 35.1627 60.5 34.6724 60.5 34.1449C60.5 33.6175 60.215 33.1273 59.7458 32.85ZM40.4987 48.8716C39.4041 48.8716 38.3358 48.5811 37.4045 48.0303L27.1545 41.9663V52.408C27.1545 55.4984 33.1317 58 40.4987 58C47.8683 58 53.845 55.4983 53.845 52.408V41.9663L43.5954 48.0303C42.6642 48.5811 41.5933 48.8716 40.4987 48.8716Z"
                    fill="black"
                  />
                </svg>

                <div className="font-light text-center uppercase">Сурч хөгжих боломж</div>
              </div>
              <div className="col-span-1 flex flex-col items-center gap-4">
                <svg width="81" height="80" viewBox="0 0 81 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" width="80" height="80" rx="40" fill="#FFCC00" />
                  <g clipPath="url(#clip0_34_94)">
                    <path
                      d="M48.1712 23.0414C48.1712 27.0065 42.7651 31.9345 40.0719 34.001C39.6505 34.324 39.1265 34.5 38.5864 34.5C38.0463 34.5 37.5223 34.324 37.1008 34.001C34.4076 31.9334 29.0015 27.0065 29.0015 23.0414C28.9411 21.7659 29.4113 20.5194 30.3094 19.5746C31.2074 18.6298 32.4602 18.0637 33.7936 18C35.1271 18.0637 36.3798 18.6298 37.2779 19.5746C38.176 20.5194 38.6462 21.7659 38.5858 23.0414C38.5253 21.7657 38.9957 20.519 39.894 19.5742C40.7924 18.6294 42.0454 18.0634 43.3791 18C44.7125 18.0637 45.9653 18.6298 46.8634 19.5746C47.7614 20.5194 48.2317 21.7659 48.1712 23.0414ZM62.2374 40.6457L47.4769 56.0583C45.6798 57.9322 43.4948 59.4282 41.0607 60.4511C38.6266 61.474 35.9965 62.0015 33.3378 62H25.1681C23.1344 62 21.184 61.2274 19.7459 59.8521C18.3079 58.4767 17.5 56.6114 17.5 54.6665V45.4993C17.5 43.5543 18.3079 41.689 19.7459 40.3137C21.184 38.9384 23.1344 38.1657 25.1681 38.1657H40.0954C40.729 38.167 41.3543 38.3036 41.9256 38.5656C42.4969 38.8277 42.9998 39.2085 43.3974 39.6803C43.795 40.1521 44.0774 40.7029 44.2239 41.2925C44.3703 41.882 44.3771 42.4954 44.2439 43.0878C44.0364 43.9166 43.5691 44.6649 42.9045 45.2325C42.2399 45.8001 41.4097 46.1599 40.5253 46.2637L32.5447 47.327C32.0417 47.3961 31.5879 47.6532 31.2831 48.042C30.9783 48.4308 30.8473 48.9194 30.9189 49.4005C30.9536 49.6395 31.0373 49.8695 31.1651 50.0774C31.2929 50.2854 31.4624 50.4672 31.6638 50.6124C31.8652 50.7576 32.0946 50.8633 32.3388 50.9236C32.583 50.9839 32.8373 50.9975 33.087 50.9637L41.2406 49.8637C43.1605 49.5925 44.9152 48.6724 46.1867 47.2703C47.4581 45.8681 48.1622 44.0766 48.1712 42.2206C48.1622 41.8282 48.1208 41.4371 48.0477 41.0509L54.8423 34.1983C55.7374 33.2729 56.9784 32.723 58.2953 32.6682C59.6122 32.6135 60.8984 33.0583 61.8741 33.9059C62.8498 34.7535 63.436 35.9353 63.5052 37.1942C63.5744 38.4531 63.121 39.6872 62.2436 40.628L62.2374 40.6457Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_34_94">
                      <rect width="46" height="44" fill="white" transform="translate(17.5 18)" />
                    </clipPath>
                  </defs>
                </svg>

                <div className="font-light mb-4 text-center uppercase">Тэгш эрх, тэгш боломж</div>
              </div>
              <div className="col-span-1 flex flex-col items-center gap-4">
                <svg width="81" height="80" viewBox="0 0 81 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" width="80" height="80" rx="40" fill="#FFCC00" />
                  <g clipPath="url(#clip0_34_99)">
                    <path
                      d="M32.6612 54.0008V49.8245C32.6612 48.2212 33.3761 46.6836 34.6485 45.5498C35.921 44.416 37.6469 43.7789 39.4465 43.7787H41.5849C43.3847 43.7787 45.1108 44.4157 46.3835 45.5495C47.6562 46.6833 48.3711 48.2211 48.3711 49.8245V54.0008H32.6612ZM51.0225 51.5362V49.8245C51.0219 48.1618 50.4685 46.5366 49.4322 45.1538C48.3958 43.7711 46.9229 42.6928 45.1993 42.0551C46.3567 41.0905 47.103 39.7983 47.311 38.3985C47.808 38.8321 48.3961 39.1741 49.0416 39.4052C49.687 39.6362 50.3773 39.7516 51.0729 39.7448C53.0304 39.7465 54.9351 39.1789 56.4973 38.128C58.4256 38.8616 60.0695 40.0836 61.2252 41.6422C62.3809 43.2007 62.9973 45.0274 62.9981 46.8953V51.5362H51.0225ZM18 51.5362V46.8936C18.0012 45.0259 18.6179 43.1995 19.7735 41.6411C20.9291 40.0828 22.5728 38.8609 24.5008 38.1272C26.0632 39.1776 27.9677 39.7453 29.9252 39.744C31.3288 39.7636 32.6888 39.3092 33.7318 38.4722C33.9556 39.8442 34.6974 41.1073 35.835 42.0534C34.1117 42.6912 32.6391 43.7694 31.6029 45.1519C30.5667 46.5345 30.0134 48.1595 30.0128 49.822V51.5329L18 51.5362ZM36.308 37.5981C36.311 36.7338 36.6501 35.8971 37.2676 35.2305C37.8852 34.5639 38.7429 34.1085 39.6949 33.9419C40.6469 33.7752 41.6343 33.9077 42.489 34.3166C43.3438 34.7256 44.013 35.3858 44.3828 36.1848C44.7527 36.9839 44.8002 37.8725 44.5175 38.6993C44.2347 39.5261 43.639 40.24 42.8319 40.7196C42.0247 41.1992 41.056 41.4147 40.0905 41.3296C39.125 41.2445 38.2225 40.8639 37.5365 40.2527C37.146 39.9038 36.8365 39.4898 36.6257 39.0343C36.4149 38.5788 36.3069 38.0908 36.308 37.5981ZM46.5497 35.7194C45.5041 34.7882 44.8532 33.5628 44.7081 32.252C44.563 30.9412 44.9325 29.6261 45.7537 28.5309C46.5749 27.4356 47.797 26.6279 49.2118 26.2454C50.6265 25.8628 52.1464 25.9292 53.5124 26.4331C54.8784 26.937 56.006 27.8473 56.7031 29.0088C57.4002 30.1704 57.6236 31.5113 57.3353 32.8032C57.047 34.095 56.2649 35.2579 55.1221 36.0936C53.9793 36.9293 52.5466 37.3861 51.0681 37.3862C49.3735 37.3863 47.7482 36.7867 46.5497 35.7194ZM24.0278 33.8711C23.5045 32.7432 23.4021 31.4953 23.7357 30.3116C24.0693 29.1279 24.8212 28.0711 25.8805 27.2972C26.9398 26.5233 28.2503 26.0733 29.6186 26.0136C30.9869 25.9539 32.3405 26.2878 33.4796 26.9658C34.6186 27.6438 35.4828 28.6302 35.9446 29.7792C36.4064 30.9283 36.4412 32.1791 36.0441 33.3472C35.6469 34.5152 34.8387 35.5385 33.7388 36.2661C32.6389 36.9937 31.3056 37.387 29.9357 37.3879C28.6707 37.3887 27.434 37.0549 26.3822 36.4289C25.3304 35.8028 24.511 34.9126 24.0278 33.8711Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_34_99">
                      <rect width="45" height="28" fill="white" transform="translate(18 26)" />
                    </clipPath>
                  </defs>
                </svg>

                <div className="font-light mb-4 text-center uppercase">Байгал орчин, тогтвортой байдал</div>
              </div>
            </div>
          </div>
          <div className="my-12">
            <h3 className="text-2xl font-semibold">Таны эрүүл мэнд хамгаас чухал</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {HrInfoData.map((item: any, index: any) => (
              <div className={`gap-8 mb-4`} key={index}>
                <span className="font-semibold block mb-4">{item.title}</span>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="my-12">
            <h3 className="text-2xl font-semibold">Сурч хөгжих боломж</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {HrEducationData.map((item: any, index: any) => (
              <div className={`gap-8 mb-4`} key={index}>
                <span className="font-semibold block mb-4">{item.title}</span>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="my-12">
            <h3 className="text-2xl font-semibold">Тэгш эрх, тэгш боломж</h3>
          </div>
          <div className="grid grid-cols-1">
            {HrCareerData.map((item: any, index: any) => (
              <div className={`gap-8 mb-4`} key={index}>
                <span className="font-semibold block mb-4">{item.title}</span>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="my-12">
            <h3 className="text-2xl font-semibold">Байгал орчин, тогтвортой байдал</h3>
          </div>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4">Барловорлдын тогтвортой байдлын зорилго:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: "⚡", text: "Цахилгааны хэрэглээ" },
                  { icon: "💧", text: "Ус хэрэглээ" },
                  { icon: "⛽", text: "Түлшний хэрэглээ" },
                  { icon: "♻️", text: "Хог хаягдлыг бууруулах" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                    <span className="text-2xl mr-3">{item.icon}</span>
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4">Zero waste бодлого</h4>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-700 leading-relaxed">
                  Хог хаягдлыг бууруулах бодлогын хүрээнд хогоо ангилан, цугларсан хог хаягдлыг ангиллын дагуу пресслэж,
                  дахин боловсруулах үйлдвэрт хүргүүлдэг. Химийн бодисын сав баглаа боодол, химийн бодистой арчих
                  материал, химийн бодисоор бохирдсон хөрс гм аюултай хог хаягдлыг энэ төрлийг хаягдлыг устгах тусгай
                  зөвшөөрөл бүхий байгууллагад өгч устгуулдаг
                </p>
              </div>
            </div>
          </div>
          <div className="my-12">
            <h3 className="text-2xl font-semibold mb-4">Нийгэмдээ оруулж буй хувь нэмэр</h3>
          </div>
        </div>
      </section>
      <section className="wysiwyg-section">
        <div className="container">
          <h3>2. СОНГОН ШАЛГАРУУЛАЛТЫН ҮЕ ШАТУУД</h3>

          <div className="bg-[#F2F2F2] px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="col-span-1 flex flex-col gap-4">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="80" height="80" rx="40" fill="#FFCC00" />
                  <path d="M48 22V58H40.4201V29.2246H40.2101L32 34.3926V27.6426L40.8753 22H48Z" fill="black" />
                </svg>
                <span className="font-semibold block mb-4">Анкетын сонгон шалгаруулалт</span>
                <div className="font-light text-bold">Ажлын байрны шаардлагад нийцүүлэн анкетын шүүлт явагдана.</div>
              </div>
              <div className="col-span-1 flex flex-col items-center gap-4">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="80" height="80" rx="40" fill="#FFCC00" />
                  <path
                    d="M27.8378 58V52.5896L40.152 40.8844C41.1993 39.8439 42.0777 38.9075 42.7872 38.0751C43.5079 37.2428 44.0541 36.4277 44.4257 35.6301C44.7973 34.8208 44.9831 33.948 44.9831 33.0116C44.9831 31.9711 44.7523 31.0751 44.2905 30.3237C43.8288 29.5607 43.1982 28.9769 42.3986 28.5723C41.5991 28.1561 40.6926 27.948 39.6791 27.948C38.6205 27.948 37.6971 28.1676 36.9088 28.6069C36.1205 29.0462 35.5124 29.6763 35.0845 30.4971C34.6565 31.3179 34.4426 32.2948 34.4426 33.4277H27.5C27.5 31.104 28.0124 29.0867 29.0372 27.3757C30.0619 25.6647 31.4977 24.341 33.3446 23.4046C35.1914 22.4682 37.3198 22 39.7297 22C42.2072 22 44.3637 22.4509 46.1993 23.3526C48.0462 24.2428 49.482 25.4798 50.5068 27.0636C51.5315 28.6474 52.0439 30.4624 52.0439 32.5087C52.0439 33.8497 51.7849 35.1734 51.2669 36.4798C50.7601 37.7861 49.8536 39.237 48.5473 40.8324C47.241 42.4162 45.3998 44.3179 43.0236 46.5376L37.973 51.6185V51.8613H52.5V58H27.8378Z"
                    fill="black"
                  />
                </svg>
                <span className="font-semibold block mb-4">Ярилцлага (2-3 үе шаттай)</span>
                <div className="font-light text-bold">
                  Хүний Нөөцийн мэргэжилтэн болон тухайн нэгжийн удирдлагууд ажил горилогчтай хамт ярилцлага хийнэ.
                </div>
              </div>
              <div className="col-span-1 flex flex-col items-center gap-4">
                <svg width="80" height="81" viewBox="0 0 80 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="0.5" width="80" height="80" rx="40" fill="#FFCC00" />
                  <path
                    d="M39.905 59C37.3287 59 35.0341 58.5486 33.0214 57.6459C31.0201 56.7315 29.4386 55.477 28.277 53.8826C27.1268 52.2765 26.5345 50.4241 26.5 48.3256H34.022C34.068 49.2048 34.3498 49.9786 34.8674 50.6469C35.3964 51.3034 36.098 51.8134 36.9721 52.1768C37.8463 52.5402 38.8296 52.722 39.9223 52.722C41.0609 52.722 42.0673 52.5168 42.9414 52.1065C43.8155 51.6961 44.4999 51.1275 44.9945 50.4007C45.489 49.6738 45.7363 48.8356 45.7363 47.8859C45.7363 46.9246 45.4718 46.0746 44.9427 45.336C44.4251 44.5857 43.6775 43.9995 42.6999 43.5775C41.7338 43.1554 40.5836 42.9444 39.2494 42.9444H35.9543V37.3522H39.2494C40.3766 37.3522 41.3715 37.1529 42.2341 36.7543C43.1082 36.3557 43.7868 35.8047 44.2699 35.1012C44.7529 34.3861 44.9945 33.5537 44.9945 32.6041C44.9945 31.7014 44.7817 30.91 44.3561 30.23C43.9421 29.5383 43.3555 28.9991 42.5964 28.6122C41.8488 28.2253 40.9747 28.0318 39.974 28.0318C38.9619 28.0318 38.036 28.2194 37.1964 28.5946C36.3568 28.958 35.684 29.4797 35.1779 30.1597C34.6718 30.8397 34.4015 31.6369 34.367 32.5513H27.2073C27.2418 30.4762 27.8227 28.6473 28.9498 27.0646C30.077 25.4819 31.5952 24.2451 33.5044 23.3541C35.4252 22.4514 37.5932 22 40.0085 22C42.4469 22 44.5804 22.4514 46.4091 23.3541C48.2379 24.2568 49.6583 25.4761 50.6705 27.0119C51.6941 28.536 52.2002 30.2476 52.1887 32.1469C52.2002 34.1633 51.5848 35.8457 50.3427 37.1939C49.112 38.5421 47.5075 39.398 45.5293 39.7614V40.0428C48.1286 40.3828 50.1069 41.3031 51.4641 42.8037C52.8327 44.2926 53.5113 46.1567 53.4998 48.3959C53.5113 50.4476 52.9305 52.2706 51.7574 53.865C50.5957 55.4594 48.9912 56.7139 46.944 57.6283C44.8967 58.5428 42.5504 59 39.905 59Z"
                    fill="black"
                  />
                </svg>
                <span className="font-semibold block mb-4">Англи хэлний сорил болон зан төлөвийн сорил</span>
                <div className="font-light text-bold">
                  <ul>
                    <li>
                      Ажлын байрны шаардлагатай уялдуулан англи хэлний сорил болон зан төлөвийн сорилыг ажил горилогчоос
                      авна.
                    </li>
                    <li>Мэргэжлийн шалгалтыг шаардлагатай тохиолдолд ажил горилогчоос авна</li>
                  </ul>
                </div>
              </div>
              <div className="col-span-1 flex flex-col items-center gap-4">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="80" height="80" rx="40" fill="#FFCC00" />
                  <path
                    d="M26 51.6719V45.6777L40.5003 22H45.4864V30.2969H42.5354L33.3943 45.291V45.5723H54V51.6719H26ZM42.6711 58V49.8438L42.8068 47.1895V22H49.6923V58H42.6711Z"
                    fill="black"
                  />
                </svg>

                <span className="font-semibold block mb-4">Шийдвэр гаргалт</span>
                <div className="font-light text-bold">
                  Ярилцлага болон сорилын үнэлгээн дээр үндэслэн нэгжийн удирдлага шийдвэр гаргана.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="wysiwyg-section">
        <div className="container">
          <h3>3. Нээлттэй ажлын байр</h3>
          <div className="positions">
            <div className="mt-5 mb-3 rounded-2xl py-4 bg-[#dfe4ee]">
              <div className="container px-4">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 md:col-span-6">
                    <span className="font-medium">Албан тушаал</span>
                  </div>
                  <div className="col-span-12 md:col-span-3">
                    <span className="font-medium">Нээлтийн огноо</span>
                  </div>
                  <div className="col-span-12 md:col-span-3">
                    <span className="font-medium">Хаалтын огноо</span>
                  </div>
                </div>
              </div>
            </div>

            {props.data.map((item: any, index: any) => (
              <div key={index} className="mb-4">
                <Link href={`/careers/${item.id}`} className="block hover:bg-gray-50">
                  <div className="border rounded-xl p-4">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-12 md:col-span-6">
                        <h3 className="text-base font-semibold">{locale === "mn" ? item.title : item.title_en}</h3>
                      </div>
                      <div className="col-span-12 md:col-span-3">
                        <div className="text-sm text-gray-600">{moment(item.start_date).format("YYYY.MM.DD")}</div>
                      </div>
                      <div className="col-span-12 md:col-span-3">
                        <div className="text-sm text-gray-600">{moment(item.end_date).format("YYYY.MM.DD")}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="service-card-with-featured-image">
        <div className="container">
          <div className="service-card-with-featured-image__list">
            {HrData.map((item: any, index: any) => (
              <div
                className={
                  item.id === 7 ? `service-card-with-featured-image__item-2` : "service-card-with-featured-image__item"
                }
                key={index}
              >
                <img src={item.image} alt="Barloworld Mongolia" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default careerPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const instance = axios.create({
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });

  let config = {
    method: "get",
    rejectUnauthorized: false,
    maxBodyLength: Infinity,
    url: `${process.env.apiDomain}/jobs?status=ACTIVE`,
    headers: {},
  };
  const careers = await instance.request(config);
  const careerList = careers.data;

  // // Sort the careers array by start_date
  const sortedCareers = careerList.sort((a: any, b: any) => {
    // Convert start_date strings to Date objects
    const dateA: any = new Date(a.start_date as string);
    const dateB: any = new Date(b.start_date as string);

    return dateB - dateA;
  });

  // console.log(sortedCareers);
  // // console.log(sortedCareers.data.start_date);
  return {
    props: {
      data: sortedCareers,
      messages: (await import(`../../../messages/${context.locale}.json`)).default,
    },
  };
};
