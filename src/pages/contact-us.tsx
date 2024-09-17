import PageHeader from "@modules/layout/components/page-header"
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import NProgress from 'nprogress';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Head from "@/modules/common/components/head";


interface FormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    comment: string;
}
const Contact = () => {

    const { executeRecaptcha } = useGoogleReCaptcha();
    const t = useTranslations("Menu");
    const initialData: any = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        comment: '',
    }

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
            try {
                const response = await axios.post(`/api/contact`, {
                    headers: {
                        'Content-Type': 'application/json', // Example header
                    },
                    data: JSON.stringify({
                        "name": formData['name'],
                        "email": formData['email'],
                        "phone": formData['phone'],
                        "subject": formData['subject'],
                        "comment": formData['comment'],
                    })
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
                console.log(error)
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
            <Head title={t("contact")}></Head>
            <header className="masthead text--center clearfix" id="masthead">
                <div className="masthead-background">
                <img src="/assets/img/hr/location.png" alt="Barloworld Mongolia" />
                    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2674.5867562554454!2d106.86322311587898!3d47.90568317526192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9693197317afc7%3A0x6358104e5496994a!2sWagner%20Asia%20Equipment%20LLC!5e0!3m2!1sen!2smn!4v1569379371193!5m2!1sen!2smn&amp;wmode=transparent" width="100%" height="350" ></iframe> */}
                </div>
            </header>

            <section className="wysiwyg-section">
                    <div>
                        
                    </div>
                <div className="container">
                    <main className="page-content lg:max-w-[900px] mx-auto">
                        <h2>{t("contact")}</h2>
                        <div className="wpcf7 js" id="wpcf7-f317-p19-o1" lang="en-US" dir="ltr">
                            <div className="screen-reader-response">
                                <p role="status" aria-live="polite" aria-atomic="true"></p>
                                <ul></ul>
                            </div>
                            <form onSubmit={handleSubmit} className="wpcf7-form init" id="contactForm" aria-label="contact form" data-status="init">
                                <div className="row form-row">
                                    <div className="col-sm-6 form-field">
                                        <label>Name*</label>
                                        <span className="wpcf7-form-control-wrap" data-name="name">
                                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" required />
                                        </span>
                                    </div>
                                    <div className="col-sm-6 form-field">
                                        <label>Email*</label>
                                        <span className="wpcf7-form-control-wrap" data-name="email">
                                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email" required />
                                        </span>
                                    </div>
                                </div>
                                <div className="row form-row">
                                    <div className="col-sm-6 form-field">
                                        <label>Phone</label>
                                        <span className="wpcf7-form-control-wrap" data-name="phone">
                                            <input type="text" maxLength={8} min="0" max="99999999" step="1" placeholder="--------" pattern="[0-9]{8}" name="phone" value={formData.phone} onChange={handleChange} className="wpcf7-form-control wpcf7-tel wpcf7-text wpcf7-validates-as-tel" />
                                        </span>
                                    </div>
                                    <div className="col-sm-6 form-field">
                                        <label>Subject</label>
                                        <span className="wpcf7-form-control-wrap" data-name="subject">
                                            <div className="selectric-wrapper selectric-wpcf7-form-control selectric-wpcf7-select">
                                                <select className="wpcf7-form-control wpcf7-select" name="subject" value={formData.subject} onChange={handleChange} required>
                                                    <option value="">-</option>
                                                    <option value="New Machines">New Machines</option>
                                                    <option value="Used Machines">Used Machines</option>
                                                    <option value="Power Systems">Power Systems</option>
                                                    <option value="Parts">Parts</option>
                                                    <option value="Service">Service</option>
                                                    <option value="Solar">Solar</option>
                                                    <option value="Technology">Technology</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                <div className="row form-row">
                                    <div className="col-sm-12 form-field">
                                        <label>Question/Comment*</label>
                                        <span className="wpcf7-form-control-wrap" data-name="comment">
                                            <textarea name="comment" value={formData.comment} onChange={handleChange} className="wpcf7-form-control wpcf7-textarea wpcf7-validates-as-required" required></textarea>
                                        </span>
                                    </div>
                                </div>
                                <div className="row form-row">
                                    <div className="col-sm-5 form-field">
                                        <button className="button button--primary button--block" type="submit">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </section>
        </>
    )
}

export default Contact

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../messages/${locale}.json`)).default
        }
    };
}