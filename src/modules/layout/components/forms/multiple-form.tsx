import React, { FC, useState } from 'react';
import Agreement from './agreement-form';
import Application from './application-form';
import { defaultJobFormData, jobFormData } from '@/lib/interface';

interface JobProps {
    job: string | string[] | null
}
const MultiStepForm:FC<JobProps> = ({ job }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    date: ''
  });

  const [applicationFormData, setApplicationFormData] = useState<jobFormData>(defaultJobFormData);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const submitForm = () => {
    console.log('Form submitted:', formData);
    console.log('Form submitted:', applicationFormData);
    // Perform the form submission logic here, like API calls
  };

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
