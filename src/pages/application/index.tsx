import Beside from "@modules/layout/components/beside-menu";
import PageHeader from "@modules/layout/components/page-header"
import { HeaderData } from "@data/menu";
import { useTranslations } from "next-intl";
import Management from "../management";
import { GetServerSideProps, GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import NProgress from 'nprogress';
import { toast } from 'react-toastify';
import { useState } from "react";
import axios from 'axios';
import https from "https";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "@/modules/common/components/head";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { HrData } from "@/data/hr";

interface FormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    year_of_experience: string;
    text: string;
    other: string;
}

interface Checkbox {
    label: string;
    value: string;
}

const checkboxes: Checkbox[] = [
    { label: 'General Shop Technician', value: 'General Shop Technician' },
    { label: 'Field Service Technician', value: 'Field Service Technician' },
    { label: 'Electric Power Generation (EPG) Technician', value: 'Electric Power Generation (EPG) Technician' },
    { label: 'Other (fill in blank)', value: 'Other (fill in blank)' },
];

const careerPage: InferGetServerSidePropsType<typeof getServerSideProps> = (props: any) => {
    const t = useTranslations("Menu");
    const { locale, locales, route, asPath } = useRouter();
    const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);

    const { executeRecaptcha } = useGoogleReCaptcha();
    const [freeText, setFreeText] = useState('');

    const handleCheckboxChange = (value: string) => {
        setSelectedCheckboxes((prev) =>
            prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
        );
    };

    const handleFreeTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFreeText(event.target.value);
    };

    const initialData = {
        email: '',
        name: '',
        phone: '',
        subject: '',
        year_of_experience: '',
        text: '',
        other: ''
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
                    data: JSON.stringify({
                        "name": formData['name'],
                        "email": formData['email'],
                        "phone": formData['phone'],
                        "year_of_experience": formData['year_of_experience'],
                        "subject": formData['subject'],
                        "text": selectedCheckboxes,
                        "other": freeText,
                    })
                });
                if (response.status == 200) {
                    NProgress.done();
                    toast.success(`Амжилттай илгээгдлээ. Баярлалаа`);
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
    return (
        <>
            <Head title={'Анкет бөглөх'}></Head>
            <PageHeader title={'Анкет бөглөх'} image="/assets/img/hr/wae_mendchilgee.jpg" />
            <section className="wysiwyg-section">
                <div className="container">
                    <p><b>Бид ажилд орох өргөдөл гаргаж, шаардлага хангасан ажил горилогчдыг үндэс, угсаа, хэл, арьсны өнгө, нас, хүйс, нийгмийн гарал байдал, хөрөнгө чинээ, эрхэлсэн ажил, албан тушаал, шашин шүтлэг, үзэл бодол, хөгжлийн бэрхшээлтэй байдал зэргээр ялгаварлан гадуурхахгүйгээр ажилд орох боломжийг тэнцүү олгодог.</b>
                    </p>
                    <p><b>"БИД АЖИЛТНУУДДАА ӨРСӨЛДӨХҮЙЦ ЦАЛИН, УРАМШУУЛАЛ БОЛОН АЖИЛЛАХ ТААТАЙ ОРЧИН НӨХЦӨЛИЙГ САНАЛ БОЛГОДОГ НЬ ЧАДВАРЛАГ ХҮНИЙ НӨӨЦИЙГ ТАТАН, ТОГТВОР СУУРЬШИЛТАЙ АЖИЛЛУУЛАХ ҮНДЭС БОЛДОГ"</b>
                    </p>
                    <h2 className="job-app-title">Анкет бөглөх</h2>
                    <div className="wpcf7 js" id="wpcf7-f30538-p105561-o1" lang="en-US" dir="ltr">
                        <div className="screen-reader-response">
                            <p role="status" aria-live="polite" aria-atomic="true"></p>
                            <ul></ul>
                        </div>
                        <form onSubmit={handleSubmit} className="wpcf7-form init" id="hrForm" aria-label="Hr form" data-status="init">
                            <div className="pb-2">Fill out the form below to request more information and a member of our team will be in touch with you shortly.</div>
                            <div className="row form-row">
                                <div className="col-sm-6 form-field">
                                    <label>Name</label>
                                    <span className="wpcf7-form-control-wrap" data-name="name">
                                        <input type="text" name="name" value={formData.name} onChange={handleChange} size={40} className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" required aria-required="true" aria-invalid="false" />
                                    </span>
                                </div>
                                <div className="col-sm-6 form-field">
                                    <label>Email</label>
                                    <span className="wpcf7-form-control-wrap" data-name="email">
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} size={40} className="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email" required aria-required="true" aria-invalid="false" />
                                    </span>
                                </div>
                            </div>
                            <div className="row form-row">
                                <div className="col-sm-6 form-field">
                                    <label>Phone</label>
                                    <span className="wpcf7-form-control-wrap" data-name="phone">
                                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} size={40} className="wpcf7-form-control wpcf7-tel wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-tel" required aria-required="true" aria-invalid="false" />
                                    </span>
                                </div>
                                <div className="col-sm-6 form-field">
                                    <label>Years of Experience</label>
                                    <span className="wpcf7-form-control-wrap" data-name="year_of_experience">
                                        <input type="text" name="year_of_experience" value={formData.year_of_experience} onChange={handleChange} className="wpcf7-form-control wpcf7-number wpcf7-validates-as-required wpcf7-validates-as-number" min="0" max="99" required aria-required="true" aria-invalid="false" />
                                    </span>
                                </div>
                            </div>
                            <div className="row form-row">
                                <div className="col-sm-12 form-field">
                                    <label className="pb-3">Career Interests</label>
                                    <span className="wpcf7-form-control-wrap" data-name="interests">
                                        <span className="wpcf7-form-control wpcf7-checkbox wpcf7-validates-as-required">
                                            {checkboxes.map((checkbox, index) => (
                                                <span
                                                    className={`wpcf7-list-item ${index === 0 ? 'first' : index === checkboxes.length - 1 ? 'last' : ''
                                                        }`}
                                                    key={checkbox.value}
                                                >
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            name="text"
                                                            value={checkbox.value}
                                                            checked={selectedCheckboxes.includes(checkbox.value)}
                                                            onChange={() => handleCheckboxChange(checkbox.value)}
                                                        />
                                                        <span className="wpcf7-list-item-label">{checkbox.label}</span>
                                                    </label>
                                                    {checkbox.value === 'Other (fill in blank)' && (
                                                        <input
                                                            type="text"
                                                            name="interests_free_text"
                                                            className="wpcf7-free-text mt-5"
                                                            disabled={!selectedCheckboxes.includes('Other (fill in blank)')}
                                                            value={freeText}
                                                            onChange={handleFreeTextChange}
                                                        />
                                                    )}
                                                </span>
                                            ))}
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className="row form-row">
                                <div className="col-sm-5 form-field">
                                    <button className="button button--primary button--block" type="submit">Submit</button>
                                </div>
                            </div>
                            <div className="wpcf7-response-output" aria-hidden="true"></div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default careerPage

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            messages: (await import(`../../../messages/${context.locale}.json`)).default
        },
    };
};