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
          <h3>Нээлттэй ажлын байр</h3>
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
          <h3 className="asd">Бидэнтэй нэгдэх шалтгаанууд</h3>
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
