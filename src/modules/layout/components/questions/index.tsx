"use client"

import { useEffect, useState } from "react"

import { GetStaticPropsContext } from "next"
import NProgress from 'nprogress';
import { toast } from 'react-toastify';
import axios from 'axios';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Questions = () => {
  const initialData = {
    email : '',
    name : '',
    message : ''
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
      const response = await axios.post(`/api/questions`, {
        headers: {
          'Content-Type': 'application/json', // Example header
        },
        data: JSON.stringify({
          "name": formData['name'],
          "email": formData['email'],
          "message": formData['message'],
        })
      });
      if(response.status == 200){
        NProgress.done();
        toast.success(`Амжилттай илгээгдлээ. Баярлалаа`);
      } else {
        NProgress.done();
        toast.error(`Мэдээлэл олдохгүй байна.`);
      }
    } catch (error:any) {
      console.log(error)
      toast.error(`error`);
      NProgress.done();
    }
  };
  return (
    <div className="widget-even widget-2 widget widget_black_studio_tinymce" id="black-studio-tinymce-2">
      <h6 className="heading-title accent">
        <b>Questions?</b>
        <span>Get In Touch Today</span>
      </h6>
      <div className="textwidget">
        <p></p>
        <div className="wpcf7 js" id="wpcf7-f233-p7-o1" lang="en-US" dir="ltr">
          <div className="screen-reader-response">
            <p role="status" aria-live="polite" aria-atomic="true"></p>
            <ul></ul>
          </div>
          <form onSubmit={handleSubmit} className="wpcf7-form init" id="sidebarForm" aria-label="Question form"  data-status="init">
            <div className="row">
              <div className="col-xs-6 col-md-12 form-row">
                <label>Your Name*</label>
                <span className="wpcf7-form-control-wrap" data-name="your-name">
                  <input value={formData.name} onChange={handleChange} className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" aria-required="true" aria-invalid="false" type="text" name="name" required/>
                </span>
              </div>
              <div className="col-xs-6 col-md-12 form-row">
                <label>Email*</label>
                <span className="wpcf7-form-control-wrap" data-name="email">
                  <input value={formData.email} onChange={handleChange} className="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email" aria-required="true" aria-invalid="false" type="email" name="email" required/>
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 form-row">
                <label>Message</label>
                <span className="wpcf7-form-control-wrap" data-name="message">
                  <textarea value={formData.message} onChange={handleChange} className="wpcf7-form-control wpcf7-textarea textarea-short" aria-invalid="false" name="message" required></textarea>
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6 col-md-12 form-row">
                <button className="button button--primary button--block" type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
        <p></p>
      </div>
    </div>
  )
}

export default Questions

export async function getStaticProps({locale}: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../../messages/${locale}.json`)).default
    }
  };
}