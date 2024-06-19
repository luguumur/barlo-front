import FooterNav from "@modules/layout/components/footer-nav"
import { GetStaticPropsContext } from "next";
import { useState } from "react";
import { toast } from 'react-toastify';
import NProgress from 'nprogress';

import axios from 'axios';
interface FormData {
  email: string;
}
const Footer = () => {
  const initialData = {
    email : '',
  }
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
      const response = await axios.post(`/api/email`, {
        headers: {
          'Content-Type': 'application/json', // Example header
        },
        data: JSON.stringify({
          "email": formData['email']
        })
      });
      if(response.status == 200){
        toast.success(`Амжилттай илгээгдлээ. Баярлалаа`);
        NProgress.done();
      } else {
        toast.error(`Мэдээлэл олдохгүй байна.`);
        NProgress.done();
      }
    } catch (error:any) {
      console.log(error)
      toast.error(`error`);
      NProgress.done();
    }
  };
  return (
    <footer>
      <div className="container py-[30px]">
        <div className="col-md-6 h-[48.65px] flex items-center ">
          <span className="text-sm">Та сүүлийн үеийн мэдээлэл авахыг хүсвэл имэйлээ холбоно уу</span>
        </div>
        <form onSubmit={handleSubmit} className="wpcf7-form init" id="emailForm" aria-label="email form"  data-status="init">
          <div className="col-md-6">
            <div className="row">
              <div className="col-sm-6 form-field !pr-0">
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required h-[48.65px]" placeholder="Цахим хаяг" aria-required="true" aria-invalid="false" required/>
              </div>
              <div className="col-sm-6 form-field">
              <button className="button button--primary button--block" type="submit">Submit</button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <FooterNav />
    </footer>
  )
}

export default Footer


export async function getStaticProps({locale}: GetStaticPropsContext) {
  return {
      props: {
          messages: (await import(`../../../../../messages/${locale}.json`)).default
      }
  };
}
