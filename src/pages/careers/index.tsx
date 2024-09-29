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
      <PageHeader title={t(`careers`)} image="https://d3leeb4r1qy96s.cloudfront.net/assets/img/specials/minihr.jpg" />
      <section className="wysiwyg-section">
        <div className="container">
          <h3>Нээлттэй ажлын байр</h3>
          <div className="positions">
            {props.data.map((item: any, index: any) => (
              <div key={index} className="row position" data-location="La Vergne, TN">
                <div className="col-xxs-12">
                  <Link href={"/careers/" + item.id} className="position-link">
                    {locale === "mn" ? `${index + 1}. ${item.title}` : `${index + 1}. ${item.title_en}`}
                  </Link>
                  <span className="position-location"> -{item.location}</span>
                </div>
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
    url: `${process.env.apiDomain}/jobs`,
    headers: {},
  };
  const careers = await instance.request(config);
  return {
    props: {
      data: careers?.data,
      messages: (await import(`../../../messages/${context.locale}.json`)).default,
    },
  };
};
