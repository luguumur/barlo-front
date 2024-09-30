import React, { FC, useEffect, useState } from "react";
import Agreement from "./agreement-form";
import Application from "./application-form";
import { defaultJobFormData, jobFormData } from "@/lib/interface";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import NProgress from "nprogress";
import { toast } from "react-toastify";
import axios from "axios";

interface JobProps {
  job: string | string[] | null;
}
const MultiStepForm: FC<JobProps> = ({ job }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
  });

  const [applicationFormData, setApplicationFormData] = useState<jobFormData>(defaultJobFormData);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const submitForm = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default form submission

    // console.log("Form submitted:", formData);
    // console.log("Application form data:", applicationFormData);

    NProgress.start(); // Show loading indicator

    try {
      if (!executeRecaptcha) {
        console.log("Recaptcha not available");
        NProgress.done();
        return;
      }

      // Execute reCAPTCHA to get the token
      const gRecaptchaToken = await executeRecaptcha("inquirySubmit");

      // Send token to backend for validation
      const recaptchaResponse = await axios.post("/api/recaptchaSubmit", {
        gRecaptchaToken,
      });

      // Check if reCAPTCHA was successful
      if (recaptchaResponse?.data?.success) {
        const response = await axios.post("/api/hr", {
          data: applicationFormData, // Send form data
          headers: { "Content-Type": "application/json" },
        });

        if (response.status === 200) {
          toast.success("Амжилттай илгээгдлээ. Баярлалаа");
          setApplicationFormData(defaultJobFormData);
          setFormData({ name: "", date: "" });
        } else {
          toast.error("Мэдээлэл олдохгүй байна.");
        }
      } else {
        console.log(`Recaptcha failed with score: ${recaptchaResponse?.data?.score}`);
        toast.error("Recaptcha error");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error("Submission error, please try again later.");
    } finally {
      NProgress.done(); // Hide loading indicator
    }
  };

  useEffect(() => {
    if (formData.name) {
      setApplicationFormData((prevData) => ({
        ...prevData,
        ner: formData.name,
      }));
    }

    if (job) {
      setApplicationFormData((prevData) => ({
        ...prevData,
        work_type: job as string,
      }));
    }
  }, [formData.name, job]);

  return (
    <Application
      formData={applicationFormData}
      setFormData={setApplicationFormData}
      prevStep={prevStep}
      job={job}
      submitForm={submitForm}
    />
  );
};

export default MultiStepForm;
