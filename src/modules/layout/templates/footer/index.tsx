import FooterNav from "@/modules/layout/components/footer-nav";
import { GetStaticPropsContext } from "next";
import { useState } from "react";
import { toast } from 'react-toastify';
import NProgress from 'nprogress';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import axios from 'axios';
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

interface FormData {
  email: string;
}

const Footer = () => {
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const noFooterRoutes = ['/contact-us', '/signup'];
  const showFooter = !noFooterRoutes.includes(router.pathname);

  const initialData = {
    email: '',
  };

  const [formData, setFormData] = useState<FormData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    NProgress.start();

    if (!executeRecaptcha) {
      console.log("Recaptcha not available");
      toast.error('Recaptcha service is unavailable.');
      NProgress.done();
      return;
    }

    try {
      const gRecaptchaToken = await executeRecaptcha('inquirySubmit');
      const recaptchaResponse = await axios.post("/api/recaptchaSubmit", {
        gRecaptchaToken,
      }, {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });

      if (recaptchaResponse?.data?.success) {
        const emailResponse = await axios.post(`/api/email`, {
          email: formData.email,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (emailResponse.status === 200) {
          toast.success('Successfully submitted. Thank you!');
        } else {
          toast.error('Failed to submit information.');
        }
      } else {
        toast.error('Recaptcha validation failed.');
      }
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      NProgress.done();
    }
  };

  const home = useTranslations("Home");

  return (
    <>
      {showFooter && (
        <div className="container py-[30px]">
          <div className="col-md-6 h-[48.65px] flex items-center">
            <span className="text-sm">{home("connect_your_email")}</span>
          </div>
          <form onSubmit={handleSubmit} className="wpcf7-form init" id="emailForm" aria-label="email form" data-status="init">
            <div className="col-md-6">
              <div className="row">
                <div className="col-sm-6 form-field !pr-0">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required h-[48.65px]"
                    placeholder="Цахим хаяг"
                    aria-required="true"
                    required
                  />
                </div>
                <div className="col-sm-6 form-field">
                  <button className="button button--primary button--block" type="submit">Submit</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
      <FooterNav />
    </>
  );
};

export default Footer;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../../messages/${locale}.json`)).default
    }
  };
}
