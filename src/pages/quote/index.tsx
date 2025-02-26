import PageHeader from "@modules/layout/components/page-header";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import { toast } from "react-toastify";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Head from "@/modules/common/components/head";
import Nav from "@/modules/layout/templates/nav";
import Footer from "@/modules/layout/templates/footer";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  state: string;
  machine?: any;
  message: string;
}

const RequestAQuote = () => {
  const router = useRouter();
  const { equipment } = router.query;
  // console.log(equipment)
  const { executeRecaptcha } = useGoogleReCaptcha();
  const t = useTranslations("Menu");
  const initialData: any = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    title: "",
    state: "",
    machine: "",
  };

  const [formData, setFormData] = useState<FormData>(initialData);
  useEffect(() => {
    if (equipment) {
      setFormData((prevData) => ({
        ...prevData,
        machine: equipment,
      }));
      // console.log(formData)
    }
  }, [equipment]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        const response = await axios.post(`/api/lead`, {
          headers: {
            "Content-Type": "application/json", // Example header
          },
          data: JSON.stringify({
            firstName: formData["firstName"],
            lastName: formData["lastName"],
            email: formData["email"],
            phone: formData["phone"],
            message: formData["message"],
            title: formData["title"],
            state: formData["state"],
            machine: formData["machine"],
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
      } else {
        console.log(`Failure with score: ${response?.data?.score}`);
        toast.error(`Recaptcha error`);
        NProgress.done();
      }
    } catch (error: any) {
      console.log(error);
      NProgress.done();
      toast.error(`error`);
    }
  };
  return (
    <>
      <Head title={t(`requestaquote`)}></Head>
      <Nav />
      <PageHeader
        title={t(`requestaquote`)}
        image="https://d3leeb4r1qy96s.cloudfront.net/assets/img/cta-banner-image-1536x306.jpg"
      />
      <article className="page-body container page type-page status-publish hentry" id="page-body">
        <div className="row">
          <main className="page-content col-md-9 col-md-push-3">
            <div className="row">
              <main className="page-content lg:max-w-[900px] mx-auto">
                <h2>{t("requestaquote")}</h2>
                <p>Please provide your information below and we will contact you shortly!</p>
                <div className="wpcf7 js" id="wpcf7-f317-p19-o1" lang="en-US" dir="ltr">
                  <div className="screen-reader-response">
                    <p role="status" aria-live="polite" aria-atomic="true"></p>
                    <ul></ul>
                  </div>
                  <form
                    onSubmit={handleSubmit}
                    className="wpcf7-form init"
                    id="quoteForm"
                    aria-label="Quote form"
                    data-status="init"
                  >
                    <div className="row">
                      <div className="col-md-6 form-row">
                        <label>First Name*</label>
                        <span className="wpcf7-form-control-wrap" data-name="firstName">
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required"
                            aria-required="true"
                            aria-invalid="false"
                            required
                          />
                        </span>
                      </div>
                      <div className="col-md-6 form-row">
                        <label>Last Name*</label>
                        <span className="wpcf7-form-control-wrap" data-name="lastName">
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email"
                            aria-required="true"
                            aria-invalid="false"
                            required
                          />
                        </span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 form-row">
                        <label>Title*</label>
                        <span className="wpcf7-form-control-wrap" data-name="title">
                          <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required"
                            aria-required="true"
                            aria-invalid="false"
                            required
                          />
                        </span>
                      </div>
                      <div className="col-sm-6 form-field">
                        <label>State*</label>
                        <span className="wpcf7-form-control-wrap" data-name="state">
                          <div className="selectric-wrapper selectric-wpcf7-form-control selectric-wpcf7-select">
                            <select
                              className="wpcf7-form-control wpcf7-select"
                              name="state"
                              value={formData.state}
                              onChange={handleChange}
                            >
                              <option value="Ulaanbaatar">Ulaanbaatar</option>
                            </select>
                          </div>
                        </span>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 form-row">
                        <label>Phone*</label>
                        <span className="wpcf7-form-control-wrap" data-name="phone">
                          <input
                            type="text"
                            name="phone"
                            maxLength={8}
                            min="0"
                            max="99999999"
                            step="1"
                            placeholder="--------"
                            pattern="[0-9]{8}"
                            value={formData.phone}
                            onChange={handleChange}
                            className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required"
                            required
                          />
                        </span>
                      </div>
                      <div className="col-md-6 form-row">
                        <label>Email*</label>
                        <span className="wpcf7-form-control-wrap" data-name="email">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email"
                            aria-required="true"
                            aria-invalid="false"
                            required
                          />
                        </span>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 form-row">
                        <label>Machine*</label>
                        <span className="wpcf7-form-control-wrap" data-name="machine">
                          <input
                            type="text"
                            name="machine"
                            value={formData.machine}
                            onChange={handleChange}
                            className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required"
                            aria-required="true"
                            aria-invalid="false"
                            required
                          />
                        </span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 form-row">
                        <label>Message</label>
                        <span className="wpcf7-form-control-wrap" data-name="message">
                          <textarea
                            value={formData.message}
                            onChange={handleChange}
                            className="wpcf7-form-control wpcf7-textarea textarea-short"
                            aria-invalid="false"
                            name="message"
                          ></textarea>
                        </span>
                      </div>
                    </div>
                    <div className="form-row">
                      <input name="imahuman" className="imahuman" type="hidden" />
                    </div>
                    <input className="wpcf7-form-control wpcf7-currentpage" type="hidden" name="currentpage" />
                    <div className="row">
                      <div className="col-md-6 form-row">
                        <button className="btn btn-primary button--block" type="submit">
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </main>
            </div>
          </main>
          <aside className="page-sidebar col-md-3 col-md-pull-9">
            <div className="widget-even widget-2 black widget wpcm_closest_location" data-template="expanded">
              <div className="row">
                <div className="col-xs-12 text--center">
                  <h3 className="bordered-headline--small">{t("location")}</h3>
                </div>
              </div>
              <div className="loading"></div>
            </div>
          </aside>
        </div>
      </article>
      <Footer />
    </>
  );
};

export default RequestAQuote;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    messages = {};
  }
  return {
    props: {
      messages,
    },
  };
}
