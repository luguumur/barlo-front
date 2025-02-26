import PageHeader from "@modules/layout/components/page-header";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import NProgress from "nprogress";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Head from "@/modules/common/components/head";
import Nav from "@/modules/layout/templates/nav";
import Footer from "@/modules/layout/templates/footer";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  comment: string;
}
const Location = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const t = useTranslations("Home");
  const initialData: any = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    comment: "",
  };

  const [formData, setFormData] = useState<FormData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    NProgress.start();
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
      try {
        const response = await axios.post(`/api/contact`, {
          headers: {
            "Content-Type": "application/json", // Example header
          },
          data: JSON.stringify({
            name: formData["name"],
            email: formData["email"],
            phone: formData["phone"],
            subject: formData["subject"],
            comment: formData["comment"],
          }),
        });
        if (response.status == 200) {
          NProgress.done();
          toast.success(`Амжилттай илгээгдлээ. Баярлалаа`);
        } else {
          NProgress.done();
          toast.error(`Алдаа гарлаа.`);
          // toast.success(`Амжилттай илгээгдлээ. Баярлалаа`);
        }
      } catch (error: any) {
        console.log(error);
        NProgress.done();
        toast.error(`error`);
      }
    } else {
      console.log(`Failure with score: ${response?.data?.score}`);
      toast.error(`Recaptcha error`);
      NProgress.done();
    }
  };
  return (
    <>
      <Head title={t("locations")}></Head>
      <Nav />
      <header className="masthead text--center clearfix">
        <div className="masthead-background">
          <img src="https://d3leeb4r1qy96s.cloudfront.net/assets/img/hr/location.png" alt="Barloworld Mongolia" />
        </div>
      </header>
      <Footer />
    </>
  );
};

export default Location;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    messages = {};
  }
  return {
    props: {
      messages,
    },
  };
}
