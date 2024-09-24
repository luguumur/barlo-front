import React, { FC, useEffect, useState } from 'react';
import Agreement from './agreement-form';
import Application from './application-form';
import { defaultJobFormData, jobFormData } from '@/lib/interface';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import NProgress from 'nprogress';
import { toast } from 'react-toastify';
import axios from 'axios';

interface JobProps {
  job: string | string[] | null
}
const MultiStepForm: FC<JobProps> = ({ job }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    date: ''
  });

  const [applicationFormData, setApplicationFormData] = useState<jobFormData>(defaultJobFormData);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const submitForm = async () => {
    console.log('Form submitted:', formData);
    console.log('Form submitted:', applicationFormData);
    NProgress.start();
    try {
      if (!executeRecaptcha) {
        console.log("not available to execute recaptcha")
        return;
      }
      const gRecaptchaToken = await executeRecaptcha('inquirySubmit');
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
            'Content-Type': 'application/json', // Example header
          },
          data: JSON.stringify(applicationFormData)
        });
        if (response.status == 200) {
          NProgress.done();
          toast.success(`Амжилттай илгээгдлээ. Баярлалаа`);
          setApplicationFormData(defaultJobFormData);
          setFormData({ name: '', date: '' });
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
      console.log(error)
      toast.error(`error`);
      NProgress.done();
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


  switch (step) {
    case 1:
      return <Agreement formData={formData} setFormData={setFormData} nextStep={nextStep} job={job} />;
    case 2:
      return <Application formData={applicationFormData} setFormData={setApplicationFormData} prevStep={prevStep} job={job} submitForm={submitForm} />;
    default:
      return <div>Unknown step</div>;
  }
};

export default MultiStepForm;
