import FooterNav from "@/modules/layout/components/footer-nav";
import { GetServerSidePropsContext, GetStaticPropsContext } from "next";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NProgress from "nprogress";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

interface FormData {
  email: string;
}

const Footer = () => {
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const noFooterRoutes = ["/contact-us", "/signup", "/equipment"];
  const showFooter = !noFooterRoutes.some(
    (route) => router.pathname.startsWith(route) || router.pathname.startsWith("/equipment/")
  );
  const initialData = {
    email: "",
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
    e.preventDefault();
    NProgress.start();

    if (!executeRecaptcha) {
      toast.error("Recaptcha service is unavailable.");
      NProgress.done();
      return;
    }

    try {
      // Verify recaptcha
      const gRecaptchaToken = await executeRecaptcha("inquirySubmit");
      if (!gRecaptchaToken) {
        throw new Error("Failed to generate reCAPTCHA token");
      }

      const recaptchaResponse = await axios.post(
        "/api/recaptchaSubmit",
        { gRecaptchaToken },
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      );

      if (!recaptchaResponse?.data?.success) {
        throw new Error("Recaptcha validation failed");
      }

      const emailResponse = await axios.post(
        `/api/email`,
        { email: formData.email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (emailResponse.status === 200) {
        toast.success("Successfully submitted. Thank you!");
        setFormData(initialData); // Reset form after successful submission
      } else {
        throw new Error("Failed to submit information");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      NProgress.done();
    }
  };
  const t = useTranslations("Home");
  return (
    <footer>
      <div className="min-h-12">
        {showFooter && (
          <div className="container py-7 ">
            <div className="flex flex-col sm:flex-row items-center justify-between w-full">
              <span className="text-sm pb-6 sm:pb-0">{t("connect_your_email")}</span>
              <form
                onSubmit={handleSubmit}
                className="w-full sm:w-2/4" // Added specific widths for larger screens
                id="emailForm"
                aria-label="email form"
                data-status="init"
              >
                <div className="flex flex-col sm:flex-row w-full gap-4 justify-end">
                  {" "}
                  {/* Changed from row to flex with gap */}
                  <div className="w-full sm:w-1/2">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full wpcf7-form-control wpcf7-text wpcf7-validates-as-required h-[48px] bg-white text-gray-800 placeholder-gray-500 transition-all duration-300"
                      placeholder={t("email")}
                      aria-required="true"
                      aria-label="email input"
                      required
                    />
                  </div>
                  <button className="btn btn-primary w-full transition-all duration-300" type="submit">
                    {t("submit")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <FooterNav />
    </footer>
  );
};

export default Footer;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  let messages;
  try {
    messages = await import(`../../../../../messages/${locale}.json`);
  } catch (e) {
    messages = await import(`../../../../../messages/en.json`);
  }
  return {
    props: {
      messages: messages,
    },
  };
}
