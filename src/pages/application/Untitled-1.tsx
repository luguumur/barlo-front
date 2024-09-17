import PageHeader from "@modules/layout/components/page-header";
import { useTranslations } from "next-intl";
import {
    GetServerSideProps,
    GetStaticPropsContext,
    InferGetServerSidePropsType,
} from "next";
import NProgress from "nprogress";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "@/modules/common/components/head";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

interface FormData {
    obog: string;
    ner: string;
    work_type: string;
    city: string;
    address: string;
    phone1: string;
    phone2: string;
    mail: string;
    born1: string;
    born2: string;
    born3: string;
    married: string;
    register: string;
    gender: string;
    v_education1_1: string;
    v_education1_2: string;
    v_education1_3: string;
    v_education1_4: string;
    v_education2_1: string;
    v_education2_2: string;
    v_education2_3: string;
    v_education2_4: string;
    v_education3_1: string;
    v_education3_2: string;
    v_education3_3: string;
    v_education3_4: string;
    v_education4_1: string;
    v_education4_2: string;
    v_education4_3: string;
    v_education4_4: string;
    v_education5_1: string;
    v_education5_2: string;
    v_education5_3: string;
    v_education5_4: string;
    v_career1_1: string;
    v_career1_2: string;
    v_career1_3: string;
    v_career2_1: string;
    v_career2_2: string;
    v_career2_3: string;
    v_career3_1: string;
    v_career3_2: string;
    v_career3_3: string;
    v_career4_1: string;
    v_career4_2: string;
    v_career4_3: string;
    v_career5_1: string;
    v_career5_2: string;
    v_career5_3: string;
    v_learn1_1: string;
    v_learn1_2: string;
    v_learn2_1: string;
    v_learn2_2: string;
    v_learn3_1: string;
    v_learn3_2: string;
    v_learn4_1: string;
    v_learn4_2: string;
    v_learn5_1: string;
    v_learn5_2: string;
    ex1_1: string;
    ex1_2: string;
    ex1_3: string;
    ex1_4: string;
    ex1_5: string;
    ex1_6: string;
    ex1_7: string;
    ex2_1: string;
    ex2_2: string;
    ex2_3: string;
    ex2_4: string;
    ex2_5: string;
    ex2_6: string;
    ex2_7: string;
    ex3_1: string;
    ex3_2: string;
    ex3_3: string;
    ex3_4: string;
    ex3_5: string;
    ex3_6: string;
    ex3_7: string;
    car_learn: string;
    salary: string;
    sale_learn: string;
    computer1: string;
    computer2: string;
    computer3: string;
    computer4: string;
    computer5: string;
    lg1_1: string;
    lg1_2: string;
    lg1_3: string;
    lg2_1: string;
    lg2_2: string;
    lg2_3: string;
    lg3_1: string;
    lg3_2: string;
    lg3_3: string;
    lg4_1: string;
    lg4_2: string;
    lg4_3: string;
    lg5_1: string;
    lg5_2: string;
    lg5_3: string;
    other_talent: string;
    car_password: string;
    car_password_type: string;
    career_skill1: string;
    career_skill2: string;
    hobby: string;
    other_add: string;
    job_contact: string;
    wish_message: string;
    f1_1: string;
    f2_1: string;
    f3_1: string;
    f4_1: string;
    f5_1: string;
    f6_1: string;
    f1_2: string;
    f2_2: string;
    f3_2: string;
    f4_2: string;
    f5_2: string;
    f6_2: string;
    f1_3: string;
    f2_3: string;
    f3_3: string;
    f4_3: string;
    f5_3: string;
    f6_3: string;
    f1_4: string;
    f2_4: string;
    f3_4: string;
    f4_4: string;
    f5_4: string;
    f6_4: string;
    f1_5: string;
    f2_5: string;
    f3_5: string;
    f4_5: string;
    f5_5: string;
    f6_5: string;
    pain: string;
    friend_in_job: string;
    friend_in_job_text: string;
    friend_in_job2: string;
    send_word: string;
    biznes_travel: string;
    last_check: string;
    reason: string;
}

interface Checkbox {
    label: string;
    value: string;
}

const checkboxes: Checkbox[] = [
    { label: "General Shop Technician", value: "General Shop Technician" },
    { label: "Field Service Technician", value: "Field Service Technician" },
    {
        label: "Electric Power Generation (EPG) Technician",
        value: "Electric Power Generation (EPG) Technician",
    },
    { label: "Other (fill in blank)", value: "Other (fill in blank)" },
];

const careerPage: InferGetServerSidePropsType<typeof getServerSideProps> = (
    props: any
) => {
    const t = useTranslations("Menu");
    const { locale, locales, route, asPath } = useRouter();
    const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);

    const { executeRecaptcha } = useGoogleReCaptcha();
    const [freeText, setFreeText] = useState("");

    const handleCheckboxChange = (value: string) => {
        setSelectedCheckboxes((prev) =>
            prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
        );
    };

    const handleFreeTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFreeText(event.target.value);
    };

    const initialData: FormData = {
        obog: "",
        ner: "",
        work_type: "",
        city: "",
        address: "",
        phone1: "",
        phone2: "",
        mail: "",
        born1: "",
        born2: "",
        born3: "",
        married: "",
        register: "",
        gender: "",
        v_education1_1: "",
        v_education1_2: "",
        v_education1_3: "",
        v_education1_4: "",
        v_education2_1: "",
        v_education2_2: "",
        v_education2_3: "",
        v_education2_4: "",
        v_education3_1: "",
        v_education3_2: "",
        v_education3_3: "",
        v_education3_4: "",
        v_education4_1: "",
        v_education4_2: "",
        v_education4_3: "",
        v_education4_4: "",
        v_education5_1: "",
        v_education5_2: "",
        v_education5_3: "",
        v_education5_4: "",
        v_career1_1: "",
        v_career1_2: "",
        v_career1_3: "",
        v_career2_1: "",
        v_career2_2: "",
        v_career2_3: "",
        v_career3_1: "",
        v_career3_2: "",
        v_career3_3: "",
        v_career4_1: "",
        v_career4_2: "",
        v_career4_3: "",
        v_career5_1: "",
        v_career5_2: "",
        v_career5_3: "",
        v_learn1_1: "",
        v_learn1_2: "",
        v_learn2_1: "",
        v_learn2_2: "",
        v_learn3_1: "",
        v_learn3_2: "",
        v_learn4_1: "",
        v_learn4_2: "",
        v_learn5_1: "",
        v_learn5_2: "",
        ex1_1: "",
        ex1_2: "",
        ex1_3: "",
        ex1_4: "",
        ex1_5: "",
        ex1_6: "",
        ex1_7: "",
        ex2_1: "",
        ex2_2: "",
        ex2_3: "",
        ex2_4: "",
        ex2_5: "",
        ex2_6: "",
        ex2_7: "",
        ex3_1: "",
        ex3_2: "",
        ex3_3: "",
        ex3_4: "",
        ex3_5: "",
        ex3_6: "",
        ex3_7: "",
        car_learn: "",
        salary: "",
        sale_learn: "",
        computer1: "",
        computer2: "",
        computer3: "",
        computer4: "",
        computer5: "",
        lg1_1: "",
        lg1_2: "",
        lg1_3: "",
        lg2_1: "",
        lg2_2: "",
        lg2_3: "",
        lg3_1: "",
        lg3_2: "",
        lg3_3: "",
        lg4_1: "",
        lg4_2: "",
        lg4_3: "",
        lg5_1: "",
        lg5_2: "",
        lg5_3: "",
        other_talent: "",
        car_password: "",
        car_password_type: "",
        career_skill1: "",
        career_skill2: "",
        hobby: "",
        other_add: "",
        job_contact: "",
        wish_message: "",
        f1_1: "",
        f2_1: "",
        f3_1: "",
        f4_1: "",
        f5_1: "",
        f6_1: "",
        f1_2: "",
        f2_2: "",
        f3_2: "",
        f4_2: "",
        f5_2: "",
        f6_2: "",
        f1_3: "",
        f2_3: "",
        f3_3: "",
        f4_3: "",
        f5_3: "",
        f6_3: "",
        f1_4: "",
        f2_4: "",
        f3_4: "",
        f4_4: "",
        f5_4: "",
        f6_4: "",
        f1_5: "",
        f2_5: "",
        f3_5: "",
        f4_5: "",
        f5_5: "",
        f6_5: "",
        pain: "",
        friend_in_job: "",
        friend_in_job_text: "",
        friend_in_job2: "",
        send_word: "",
        biznes_travel: "",
        last_check: "",
        reason: "",
    };

    const [formData, setFormData] = useState<FormData>(initialData);
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
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
                const response = await axios.post(`/api/hr`, {
                    headers: {
                        "Content-Type": "application/json", // Example header
                    },
                    data: JSON.stringify({
                        obog: formData["obog"],
                        ner: formData["ner"],
                        work_type: formData["work_type"],
                        city: formData["city"],
                        address: formData["address"],
                        phone1: formData["phone1"],
                        phone2: formData["phone2"],
                        mail: formData["mail"],
                        born1: formData["born1"],
                        born2: formData["born2"],
                        born3: formData["born3"],
                        married: formData["married"],
                        register: formData["register"],
                        gender: formData["gender"],
                        v_education1_1: formData["v_education1_1"],
                        v_education1_2: formData["v_education1_2"],
                        v_education1_3: formData["v_education1_3"],
                        v_education1_4: formData["v_education1_4"],
                        v_education2_1: formData["v_education2_1"],
                        v_education2_2: formData["v_education2_2"],
                        v_education2_3: formData["v_education2_3"],
                        v_education2_4: formData["v_education2_4"],
                        v_education3_1: formData["v_education3_1"],
                        v_education3_2: formData["v_education3_2"],
                        v_education3_3: formData["v_education3_3"],
                        v_education3_4: formData["v_education3_4"],
                        v_education4_1: formData["v_education4_1"],
                        v_education4_2: formData["v_education4_2"],
                        v_education4_3: formData["v_education4_3"],
                        v_education4_4: formData["v_education4_4"],
                        v_education5_1: formData["v_education5_1"],
                        v_education5_2: formData["v_education5_2"],
                        v_education5_3: formData["v_education5_3"],
                        v_education5_4: formData["v_education5_4"],
                        v_career1_1: formData["v_career1_1"],
                        v_career1_2: formData["v_career1_2"],
                        v_career1_3: formData["v_career1_3"],
                        v_career2_1: formData["v_career2_1"],
                        v_career2_2: formData["v_career2_2"],
                        v_career2_3: formData["v_career2_3"],
                        v_career3_1: formData["v_career3_1"],
                        v_career3_2: formData["v_career3_2"],
                        v_career3_3: formData["v_career3_3"],
                        v_career4_1: formData["v_career4_1"],
                        v_career4_2: formData["v_career4_2"],
                        v_career4_3: formData["v_career4_3"],
                        v_career5_1: formData["v_career5_1"],
                        v_career5_2: formData["v_career5_2"],
                        v_career5_3: formData["v_career5_3"],
                        v_learn1_1: formData["v_learn1_1"],
                        v_learn1_2: formData["v_learn1_2"],
                        v_learn2_1: formData["v_learn2_1"],
                        v_learn2_2: formData["v_learn2_2"],
                        v_learn3_1: formData["v_learn3_1"],
                        v_learn3_2: formData["v_learn3_2"],
                        v_learn4_1: formData["v_learn4_1"],
                        v_learn4_2: formData["v_learn4_2"],
                        v_learn5_1: formData["v_learn5_1"],
                        v_learn5_2: formData["v_learn5_2"],
                        ex1_1: formData["ex1_1"],
                        ex1_2: formData["ex1_2"],
                        ex1_3: formData["ex1_3"],
                        ex1_4: formData["ex1_4"],
                        ex1_5: formData["ex1_5"],
                        ex1_6: formData["ex1_6"],
                        ex1_7: formData["ex1_7"],
                        ex2_1: formData["ex2_1"],
                        ex2_2: formData["ex2_2"],
                        ex2_3: formData["ex2_3"],
                        ex2_4: formData["ex2_4"],
                        ex2_5: formData["ex2_5"],
                        ex2_6: formData["ex2_6"],
                        ex2_7: formData["ex2_7"],
                        ex3_1: formData["ex3_1"],
                        ex3_2: formData["ex3_2"],
                        ex3_3: formData["ex3_3"],
                        ex3_4: formData["ex3_4"],
                        ex3_5: formData["ex3_5"],
                        ex3_6: formData["ex3_6"],
                        ex3_7: formData["ex3_7"],
                        car_learn: formData["car_learn"],
                        salary: formData["salary"],
                        sale_learn: formData["sale_learn"],
                        computer1: formData["computer1"],
                        computer2: formData["computer2"],
                        computer3: formData["computer3"],
                        computer4: formData["computer4"],
                        computer5: formData["computer5"],
                        lg1_1: formData["lg1_1"],
                        lg1_2: formData["lg1_2"],
                        lg1_3: formData["lg1_3"],
                        lg2_1: formData["lg2_1"],
                        lg2_2: formData["lg2_2"],
                        lg2_3: formData["lg2_3"],
                        lg3_1: formData["lg3_1"],
                        lg3_2: formData["lg3_2"],
                        lg3_3: formData["lg3_3"],
                        lg4_1: formData["lg4_1"],
                        lg4_2: formData["lg4_2"],
                        lg4_3: formData["lg4_3"],
                        lg5_1: formData["lg5_1"],
                        lg5_2: formData["lg5_2"],
                        lg5_3: formData["lg5_3"],
                        other_talent: formData["other_talent"],
                        car_password: formData["car_password"],
                        car_password_type: formData["car_password_type"],
                        career_skill1: formData["career_skill1"],
                        career_skill2: formData["career_skill2"],
                        hobby: formData["hobby"],
                        other_add: formData["other_add"],
                        job_contact: formData["job_contact"],
                        wish_message: formData["wish_message"],
                        f1_1: formData["f1_1"],
                        f2_1: formData["f2_1"],
                        f3_1: formData["f3_1"],
                        f4_1: formData["f4_1"],
                        f5_1: formData["f5_1"],
                        f6_1: formData["f6_1"],
                        f1_2: formData["f1_2"],
                        f2_2: formData["f2_2"],
                        f3_2: formData["f3_2"],
                        f4_2: formData["f4_2"],
                        f5_2: formData["f5_2"],
                        f6_2: formData["f6_2"],
                        f1_3: formData["f1_3"],
                        f2_3: formData["f2_3"],
                        f3_3: formData["f3_3"],
                        f4_3: formData["f4_3"],
                        f5_3: formData["f5_3"],
                        f6_3: formData["f6_3"],
                        f1_4: formData["f1_4"],
                        text: selectedCheckboxes,
                        other: freeText,
                    }),
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
            console.log(error);
            toast.error(`error`);
            NProgress.done();
        }
    };
    return (
        <>
            <Head title={"Анкет бөглөх"}></Head>
            <PageHeader
                title={"Анкет бөглөх"}
                image="/assets/img/hr/wae_mendchilgee.jpg"
            />
            <section className="wysiwyg-section">
                <div className="container">
                    <p>
                        <b>
                            Бид ажилд орох өргөдөл гаргаж, шаардлага хангасан ажил горилогчдыг
                            үндэс, угсаа, хэл, арьсны өнгө, нас, хүйс, нийгмийн гарал байдал,
                            хөрөнгө чинээ, эрхэлсэн ажил, албан тушаал, шашин шүтлэг, үзэл
                            бодол, хөгжлийн бэрхшээлтэй байдал зэргээр ялгаварлан
                            гадуурхахгүйгээр ажилд орох боломжийг тэнцүү олгодог.
                        </b>
                    </p>
                    <p>
                        <b>
                            "БИД АЖИЛТНУУДДАА ӨРСӨЛДӨХҮЙЦ ЦАЛИН, УРАМШУУЛАЛ БОЛОН АЖИЛЛАХ
                            ТААТАЙ ОРЧИН НӨХЦӨЛИЙГ САНАЛ БОЛГОДОГ НЬ ЧАДВАРЛАГ ХҮНИЙ НӨӨЦИЙГ
                            ТАТАН, ТОГТВОР СУУРЬШИЛТАЙ АЖИЛЛУУЛАХ ҮНДЭС БОЛДОГ"
                        </b>
                    </p>
                    <h2 className="job-app-title">Анкет бөглөх</h2>
                    <div
                        className="wpcf7 js"
                        id="wpcf7-f30538-p105561-o1"
                        lang="en-US"
                        dir="ltr"
                    >
                        <div className="screen-reader-response">
                            <p role="status" aria-live="polite" aria-atomic="true"></p>
                            <ul></ul>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="wpcf7-form init"
                            id="hrForm"
                            aria-label="Hr form"
                            data-status="init"
                        >
                            <div className="row form-row">
                                <div className="col-sm-6 form-field">
                                    <label>Эцэг, (Эх), Өөрийн нэр</label>
                                    <span className="wpcf7-form-control-wrap" data-name="obog">
                                        <input
                                            type="text"
                                            name="obog"
                                            value={formData.obog}
                                            onChange={handleChange}
                                            size={40}
                                            className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required"
                                            required
                                            aria-required="true"
                                            aria-invalid="false"
                                        />
                                    </span>
                                </div>
                                <div className="col-sm-6 form-field">
                                    <label>Өөрийн нэр</label>
                                    <span className="wpcf7-form-control-wrap" data-name="ner">
                                        <input
                                            type="text"
                                            name="ner"
                                            value={formData.ner}
                                            onChange={handleChange}
                                            size={40}
                                            className="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email"
                                            required
                                            aria-required="true"
                                            aria-invalid="false"
                                        />
                                    </span>
                                </div>
                            </div>

                            <div className="row form-row">
                                <div className="col-sm-12 form-field">
                                    <label>Таны өргөдөл гаргаж буй ажлын байр:</label>
                                    <span
                                        className="wpcf7-form-control-wrap"
                                        data-name="work_type"
                                    >
                                        <input
                                            type="text"
                                            name="work_type"
                                            value={formData.work_type}
                                            onChange={handleChange}
                                            size={40}
                                            className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required"
                                            required
                                            aria-required="true"
                                            aria-invalid="false"
                                        />
                                    </span>
                                </div>
                            </div>

                            <div className="row form-row">
                                {/* Хот and Гэрийн хаяг */}
                                <div className="col-sm-6 form-field">
                                    <label>Хот</label>
                                    <span className="wpcf7-form-control-wrap" data-name="city">
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            size={40}
                                            className="wpcf7-form-control wpcf7-text"
                                            required
                                            aria-required="true"
                                            aria-invalid="false"
                                        />
                                    </span>
                                </div>
                                <div className="col-sm-6 form-field">
                                    <label>Гэрийн хаяг</label>
                                    <span className="wpcf7-form-control-wrap" data-name="address">
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            size={40}
                                            className="wpcf7-form-control wpcf7-text"
                                            required
                                            aria-required="true"
                                            aria-invalid="false"
                                        />
                                    </span>
                                </div>
                            </div>

                            <div className="row form-row">
                                <div className="col-sm-6 form-field">
                                    <label>Гар утас 1</label>
                                    <span className="wpcf7-form-control-wrap" data-name="phone1">
                                        <input
                                            type="text"
                                            name="phone1"
                                            value={formData.phone1}
                                            onChange={handleChange}
                                            size={40}
                                            className="wpcf7-form-control wpcf7-text"
                                            required
                                            aria-required="true"
                                            aria-invalid="false"
                                        />
                                    </span>
                                </div>
                                <div className="col-sm-6 form-field">
                                    <label>Гар утас 2</label>
                                    <span className="wpcf7-form-control-wrap" data-name="phone2">
                                        <input
                                            type="text"
                                            name="phone2"
                                            value={formData.phone2}
                                            onChange={handleChange}
                                            size={40}
                                            className="wpcf7-form-control wpcf7-text"
                                            aria-invalid="false"
                                        />
                                    </span>
                                </div>
                            </div>

                            <div className="row form-row">
                                {/* И-мэйл хаяг */}
                                <div className="col-sm-12 form-field">
                                    <label>И-мэйл хаяг</label>
                                    <span className="wpcf7-form-control-wrap" data-name="mail">
                                        <input
                                            type="text"
                                            name="mail"
                                            value={formData.mail}
                                            onChange={handleChange}
                                            size={40}
                                            className="wpcf7-form-control wpcf7-text"
                                            maxLength={50}
                                            required
                                            aria-required="true"
                                            aria-invalid="false"
                                        />
                                    </span>
                                </div>
                            </div>
                            <div className="row form-row">
                                {/* Төрсөн он, сар, өдөр */}
                                <div className="col-sm-6 form-field ">
                                    <label>Төрсөн он, сар, өдөр</label>
                                    <div className="flex">
                                        <select
                                            name="born1"
                                            value={formData.born1}
                                            onChange={handleChange}
                                            className="wpcf7-form-control"
                                        >
                                            {Array.from({ length: 65 }, (_, i) => 2024 - i).map(
                                                (year) => (
                                                    <option key={year} value={year}>
                                                        {year}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                        <select
                                            name="born2"
                                            value={formData.born2}
                                            onChange={handleChange}
                                            className="wpcf7-form-control"
                                        >
                                            {Array.from({ length: 12 }, (_, i) =>
                                                String(i + 1).padStart(2, "0")
                                            ).map((month) => (
                                                <option key={month} value={month}>
                                                    {month}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            name="born3"
                                            value={formData.born3}
                                            onChange={handleChange}
                                            className="wpcf7-form-control"
                                        >
                                            {Array.from({ length: 31 }, (_, i) =>
                                                String(i + 1).padStart(2, "0")
                                            ).map((day) => (
                                                <option key={day} value={day}>
                                                    {day}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Гэрлэсэн эсэх */}
                                <div className="col-sm-6 form-field">
                                    <label>Гэрлэсэн эсэх</label>
                                    <select
                                        name="married"
                                        value={formData.married}
                                        onChange={handleChange}
                                        className="wpcf7-form-control"
                                    >
                                        <option value="Тийм">Тийм</option>
                                        <option value="Үгүй">Үгүй</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row form-row">
                                {/* Регистрийн дугаар */}
                                <div className="col-sm-6 form-field">
                                    <label>Регистрийн дугаар</label>
                                    <input
                                        type="text"
                                        name="register"
                                        value={formData.register}
                                        onChange={handleChange}
                                        maxLength={10}
                                        className="wpcf7-form-control"
                                    />
                                </div>

                                {/* Хүйс */}
                                <div className="col-sm-6 form-field">
                                    <label>Хүйс</label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="wpcf7-form-control"
                                    >
                                        <option value="Эрэгтэй">Эрэгтэй</option>
                                        <option value="Эмэгтэй">Эмэгтэй</option>
                                    </select>
                                </div>
                            </div>
                            <hr />

                            <h4>Боловсрол</h4>

                            <div className="row form-row">
                                <div className="col-sm-3 form-field">
                                    <label>Төгссөн сургуулийн нэр</label>
                                </div>
                                <div className="col-sm-3 form-field">
                                    <label>Суралцсан хэлбэр (танхим/онлайн)</label>
                                </div>
                                <div className="col-sm-3 form-field">
                                    <label>Зэрэг (Мэргэжил)</label>
                                </div>
                                <div className="col-sm-3 form-field">
                                    <label>Төгссөн огноо</label>
                                </div>
                            </div>
                            {Array.from({ length: 5 }, (_, index) => (
                                <div className="row form-row" key={index}>
                                    <div className="col-sm-3 form-field">
                                        <input
                                            type="text"
                                            name={`v_education${index + 1}_1`}
                                            className="wpcf7-form-control"
                                        />
                                    </div>
                                    <div className="col-sm-3 form-field">
                                        <input
                                            type="text"
                                            name={`v_education${index + 1}_2`}
                                            className="wpcf7-form-control"
                                        />
                                    </div>
                                    <div className="col-sm-3 form-field">
                                        <input
                                            type="text"
                                            name={`v_education${index + 1}_3`}
                                            className="wpcf7-form-control"
                                        />
                                    </div>
                                    <div className="col-sm-3 form-field">
                                        <input
                                            type="text"
                                            name={`v_education${index + 1}_4`}
                                            className="wpcf7-form-control"
                                        />
                                    </div>
                                </div>
                            ))}
                            <hr />
                            <h4>Мэргэшсэн байдал / Сургалт</h4>

                            <div className="row form-row">
                                <div className="col-sm-4 form-field">
                                    <label>Сургалтын байгууллагын нэр</label>
                                </div>
                                <div className="col-sm-4 form-field">
                                    <label>Чиглэл</label>
                                </div>
                                <div className="col-sm-4 form-field">
                                    <label>Хамрагдсан хугацаа, байршил</label>
                                </div>
                            </div>

                            {Array.from({ length: 5 }, (_, index) => (
                                <div className="row form-row" key={index}>
                                    <div className="col-sm-4 form-field">
                                        <input
                                            type="text"
                                            name={`v_career${index + 1}_1`}
                                            className="wpcf7-form-control"
                                        />
                                    </div>
                                    <div className="col-sm-4 form-field">
                                        <input
                                            type="text"
                                            name={`v_career${index + 1}_2`}
                                            className="wpcf7-form-control"
                                        />
                                    </div>
                                    <div className="col-sm-4 form-field">
                                        <input
                                            type="text"
                                            name={`v_career${index + 1}_3`}
                                            className="wpcf7-form-control"
                                        />
                                    </div>
                                </div>
                            ))}
                            <hr />
                            <h4>Бие даан суралцсан байдал</h4>

                            <div className="row form-row">
                                <div className="col-sm-6 form-field">
                                    <label>Хичээлийн нэр</label>
                                </div>
                                <div className="col-sm-6 form-field">
                                    <label>Эх сурвалж</label>
                                </div>
                            </div>

                            {Array.from({ length: 5 }, (_, index) => (
                                <div className="row form-row" key={index}>
                                    <div className="col-sm-6 form-field">
                                        <input
                                            type="text"
                                            name={`v_learn${index + 1}_1`}
                                            className="wpcf7-form-control"
                                        />
                                    </div>
                                    <div className="col-sm-6 form-field">
                                        <input
                                            type="text"
                                            name={`v_learn${index + 1}_2`}
                                            className="wpcf7-form-control"
                                        />
                                    </div>
                                </div>
                            ))}
                            <hr />
                            <h4>
                                Ажлын туршлага (Хамгийн сүүлийн туршлагаас эхлэн бичих)
                            </h4>

                            <div className="row form-row">
                                <div className="col-sm-4 form-field">
                                    <label>Компанийн нэр:</label>
                                    <textarea
                                        className="wpcf7-form-control wpcf7-textarea"
                                        name="ex1_1"
                                        defaultValue=""
                                        rows={4}
                                    />
                                </div>
                                <div className="col-sm-4 form-field">
                                    <label>Үйл ажиллагааны чиглэл:</label>
                                    <textarea
                                        className="wpcf7-form-control wpcf7-textarea"
                                        name="ex1_2"
                                        defaultValue=""
                                        rows={4}
                                    />
                                </div>
                                <div className="col-sm-4 form-field">
                                    <label>Ажлаас гарах болсон шалтгаан:</label>
                                    <textarea
                                        className="wpcf7-form-control wpcf7-textarea"
                                        name="ex1_3"
                                        defaultValue=""
                                        rows={4}
                                    />
                                </div>
                            </div>

                            <div className="row form-row">
                                <div className="col-sm-6 form-field">
                                    <label>Ажилласан хугацаа:</label>
                                    <textarea
                                        className="wpcf7-form-control wpcf7-textarea"
                                        name="ex1_4"
                                        defaultValue=""
                                        rows={4}
                                    />
                                </div>
                                <div className="col-sm-6 form-field">
                                    <label>Гүйцэтгэж байсан ажил үүргийн жагсаалт:</label>
                                    <textarea
                                        className="wpcf7-form-control wpcf7-textarea"
                                        name="ex1_5"
                                        defaultValue=""
                                        rows={4}
                                    />
                                </div>
                            </div>

                            <div className="row form-row">
                                <div className="col-sm-4 form-field">
                                    <label>Ажлын байрны нэр:</label>
                                    <textarea
                                        className="wpcf7-form-control wpcf7-textarea"
                                        name="ex1_6"
                                        defaultValue=""
                                        rows={4}
                                    />
                                </div>
                                <div className="col-sm-8 form-field">
                                    <label>Таны шууд удирдлагын нэр, холбоо барих утас:</label>
                                    <input
                                        type="text"
                                        className="wpcf7-form-control wpcf7-text"
                                        name="ex1_7"
                                    />
                                </div>
                            </div>
                            <h4>Өмнөх ажил олгогч 1</h4>

                            <div className="row form-row">
                                <div className="col-sm-4 form-field">
                                    <label>Компанийн нэр:</label>
                                    <textarea
                                        className="wpcf7-form-control wpcf7-textarea"
                                        name="ex2_1"
                                        defaultValue=""
                                        rows={4}
                                    />
                                </div>
                                <div className="col-sm-4 form-field">
                                    <label>Үйл ажиллагааны чиглэл:</label>
                                    <textarea
                                        className="wpcf7-form-control wpcf7-textarea"
                                        name="ex2_2"
                                        defaultValue=""
                                        rows={4}
                                    />
                                </div>
                                <div className="col-sm-4 form-field">
                                    <label>Ажлаас гарах болсон шалтгаан:</label>
                                    <textarea
                                        className="wpcf7-form-control wpcf7-textarea"
                                        name="ex2_3"
                                        defaultValue=""
                                        rows={4}
                                    />
                                </div>
                            </div>

                            <div className="row form-row">
                                <div className="col-sm-6 form-field">
                                    <label>Ажилласан хугацаа:</label>
                                    <textarea
                                        className="wpcf7-form-control wpcf7-textarea"
                                        name="ex2_4"
                                        defaultValue=""
                                        rows={4}
                                    />
                                </div>
                                <div className="col-sm-6 form-field">
                                    <label>Гүйцэтгэж байсан ажил үүргийн жагсаалт:</label>
                                    <textarea
                                        className="wpcf7-form-control wpcf7-textarea"
                                        name="ex2_5"
                                        defaultValue=""
                                        rows={4}
                                    />
                                </div>
                            </div>

                            <div className="row form-row">
                                <div className="col-sm-4 form-field">
                                    <label>Ажлын байрны нэр:</label>
                                    <textarea
                                        className="wpcf7-form-control wpcf7-textarea"
                                        name="ex2_6"
                                        defaultValue=""
                                        rows={4}
                                    />
                                </div>
                                <div className="col-sm-8 form-field">
                                    <label>Таны шууд удирдлагын нэр, холбоо барих утас:</label>
                                    <input
                                        type="text"
                                        className="wpcf7-form-control wpcf7-text"
                                        name="ex2_7"
                                    />
                                </div>
                            </div>
                            <h4>Өмнөх ажил олгогч 2</h4>

                            <div className="row form-row">
                                <div className="col-sm-4 form-field">
                                    <label>Компанийн нэр:</label>
                                    <textarea
                                        className="ank1_textarea ank1"
                                        name="ex3_1"
                                        defaultValue=""
                                        rows={4}
                                    />
                                </div>
                                <div className="col-sm-4 form-field">
                                    <label>Үйл ажиллагааны чиглэл:</label>
                                    <textarea
                                        className="ank1_textarea ank1"
                                        name="ex3_2"
                                        defaultValue=""
                                        rows={4}
                                    />
                                </div>
                                <div className="col-sm-4 form-field">
                                    <label>Ажлаас гарах болсон шалтгаан:</label>
                                    <textarea
                                        className="ank1_textarea ank1"
                                        name="ex3_3"
                                        defaultValue=""
                                        rows={4}
                                    />
                                </div>
                            </div>

                            <div className="row form-row">
                                <div className="col-sm-6 form-field">
                                    <label>Ажилласан хугацаа:</label>
                                    <textarea
                                        className="ank1_textarea ank1"
                                        name="ex3_4"
                                        defaultValue=""
                                        rows={4}
                                    />
                                </div>
                                <div className="col-sm-6 form-field">
                                    <label>Гүйцэтгэж байсан ажил үүргийн жагсаалт:</label>
                                    <textarea
                                        className="ank1_textarea ank1"
                                        name="ex3_5"
                                        defaultValue=""
                                        rows={4}
                                    />
                                </div>
                            </div>

                            <div className="row form-row">
                                <div className="col-sm-4 form-field">
                                    <label>Ажлын байрны нэр:</label>
                                    <textarea
                                        className="ank1_textarea ank1"
                                        name="ex3_6"
                                        defaultValue=""
                                        rows={4}
                                    />
                                </div>
                                <div className="col-sm-8 form-field">
                                    <label>Таны шууд удирдлагын нэр, холбоо барих утас:</label>
                                    <input type="text" className="ank1" name="ex3_7" />
                                </div>
                            </div>
                            <hr />

                            <div className="row form-row">
                                <div className="col-md-12 form-field">
                                    <label>
                                        CAT тоног төхөөрөмжтэй ажиллаж байсан туршлага, сурч мэдсэн
                                        зүйлс
                                    </label>
                                    <input
                                        type="text"
                                        className="ank1"
                                        maxLength={500}
                                        name="car_learn"
                                    />
                                </div>
                            </div>
                            <div className="row form-row">
                                <div className="col-md-6 form-field">
                                    <label>Таны цалингийн хүлээлт:</label>
                                    <input
                                        type="text"
                                        className="ank1"
                                        name="salary"
                                        maxLength={20}
                                    />
                                </div>
                                <div className="col-md-6 form-field">
                                    <label>
                                        Таны борлуулалтын туршлага (Байгаа бол дурдана уу):
                                    </label>
                                    <input
                                        type="text"
                                        className="ank1"
                                        name="sale_learn"
                                        maxLength={500}
                                    />
                                </div>
                            </div>
                            <hr />
                            <h4
                            >
                                Ур чадвар
                            </h4>
                            <label>
                                <strong>
                                    Компьютерийн мэдлэг
                                </strong>
                                <div>
                                    Таны хамгийн сайн ажиллаж чаддаг программуудаа жагсаана уу
                                </div>
                            </label>
                            {[1, 2, 3, 4, 5].map((item, index) => (
                                <div key={index} className="row form-row">
                                    <div className="col-md-12 form-field">
                                        <input
                                            type="text"
                                            className="ank1"
                                            name={`computer${item}`}
                                            maxLength={500}
                                        />

                                    </div>
                                </div>
                            ))}

                            <hr />
                            <h4>Гадаад хэлний мэдлэг</h4>
                            <div className="row">
                                <div className="col-sm-4 form-field">
                                    <label>Гадаад хэл</label>
                                </div>
                                <div className="col-sm-4 form-field">
                                    <label>Ярих чадвар</label>
                                </div>
                                <div className="col-sm-4 form-field">
                                    <label>Бичих чадвар</label>
                                </div>
                            </div>
                            {[1, 2, 3, 4, 5].map((item, index) => (
                                <div className="row form-row" key={index}>
                                    <div className="col-md-4 form-field"><input
                                        type="text"
                                        className="ank1"
                                        name={`lg${item}_1`}
                                    /></div>
                                    <div className="col-md-4 form-field">
                                        <select
                                            name={`lg${item}_2`}
                                        >
                                            <option>Анхан</option>
                                            <option>Дунд</option>
                                            <option>Ахисан</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4 form-field">
                                        <select
                                            name={`lg${item}_3`}
                                        >
                                            <option>Анхан</option>
                                            <option>Дунд</option>
                                            <option>Ахисан</option>
                                        </select>
                                    </div>
                                </div>
                            ))}
                            <h4>Мэргэжлийн бусад ур чадвар</h4>
                            <div className="row form-row">
                                <div className="col-md-12 form-field">
                                    <input
                                        type="text"
                                        className="ank1"
                                        name="other_talent"
                                    />
                                </div>
                            </div>
                            <div className="row form-row">
                                <div className="col-md-6 form-field">
                                    <label>Жолооны үнэмлэх</label>
                                    <input
                                        type="text"
                                        className="ank1"
                                        name="car_password"
                                        maxLength={20}
                                    />
                                </div>
                                <div className="col-md-6 form-field">
                                    <label>Ангилал</label>
                                    <input
                                        type="text"
                                        className="ank1"
                                        name="car_password_type"
                                        maxLength={10}
                                    />
                                </div>
                            </div>
                            <div className="row form-row">
                                <div className="col-md-6 form-field">
                                    <label>
                                        Мэргэжлийн ур чадвараа өөрөө дүгнэн бичнэ үү (Өөрийн
                                        сонирхож буй ажлын байранд уялдуулан бичнэ үү)
                                    </label>
                                    <input
                                        type="text"
                                        className="ank1"
                                        name="career_skill1"
                                        maxLength={300}
                                    />
                                </div>
                                <div className="col-md-6 form-field">
                                    <label>
                                        Ажлын арга барил
                                    </label>
                                    <input
                                        type="text"
                                        className="ank1"
                                        name="career_skill2"
                                        maxLength={300}
                                    />
                                </div>
                            </div>
                            <div className="row form-row">
                                <div className="col-md-6 form-field">
                                    <label>
                                        Хобби
                                    </label>
                                    <input
                                        type="text"
                                        className="ank1"
                                        name="hobby"
                                        maxLength={150}
                                    />
                                </div>
                                <div className="col-md-6 form-field">
                                    <label>
                                        Нэмэлт мэдээлэл
                                    </label>
                                    <input
                                        type="text"
                                        className="ank1"
                                        name="other_add"
                                        maxLength={150}
                                    />
                                </div>
                            </div>
                            <div className="row form-row">
                                <div className="col-md-6 form-field">
                                    <label>
                                        Та манай компанийн талаарх мэдээллийг ямар эх сурвалжаас олж
                                        мэдсэн болох
                                    </label>
                                    <input
                                        type="text"
                                        className="ank1"
                                        name="job_contact"
                                        maxLength={150}
                                    />
                                </div>
                                <div className="col-md-6 form-field">
                                    <label>
                                        Та Barloworld Mongolia LLC компанид яагаад ажиллах хүсэлтэй
                                        байгаа болох
                                    </label>
                                    <input
                                        type="text"
                                        className="ank1"
                                        name="wish_message"
                                        maxLength={150}
                                    />
                                </div>
                            </div>
                            <h4>Гэр бүлийн гишүүдийн талаарх мэдээлэл</h4>
                            <div className="row form-row">
                                <div className="col-md-2 form-field">
                                    Нэр
                                </div>
                                <div className="col-md-2 form-field">
                                    Регистрийн дугаар
                                </div>
                                <div className="col-md-2 form-field">
                                    Нас
                                </div>
                                <div className="col-md-2 form-field">
                                    Таны хэн болох
                                </div>
                                <div className="col-md-2 form-field">
                                    Утасны дугаар
                                </div>
                                <div className="col-md-2 form-field">
                                    Ажил эрхлэлт
                                </div>
                            </div>
                            {[1, 2, 3, 4, 5].map((item, index) => (
                                <div className="row form-row" key={index}>
                                    <div className="col-md-2 form-field">
                                        <input
                                            type="text"
                                            className="ank1"
                                            name={`f1_${item}`}
                                        />
                                    </div>
                                    <div className="col-md-2 form-field">
                                        <input
                                            type="text"
                                            className="ank1"
                                            name={`f2_${item}`}
                                        />
                                    </div>
                                    <div className="col-md-2 form-field">
                                        <input
                                            type="text"
                                            className="ank1"
                                            name={`f3_${item}`}
                                            maxLength={2}
                                        />
                                    </div>
                                    <div className="col-md-2 form-field">
                                        <input
                                            type="text"
                                            className="ank1"
                                            name={`f4_${item}`}
                                        />
                                    </div>
                                    <div className="col-md-2 form-field">
                                        <input
                                            type="text"
                                            className="ank1"
                                            name={`f5_${item}`}
                                            maxLength={10}
                                        />
                                    </div>
                                    <div className="col-md-2 form-field">
                                        <input
                                            type="text"
                                            className="ank1"
                                            name={`f6_${item}`}
                                        />
                                    </div>
                                </div>
                            ))}


                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "10px",
                                }}
                            >
                                {/* Family Members Section */}
                                <div
                                    style={{
                                        display: "flex",
                                        backgroundColor: "#E6E6E6",
                                        padding: "10px",
                                        fontSize: 14,
                                        fontStyle: "italic",
                                    }}
                                >
                                    <div style={{ flex: "1", textAlign: "center" }}>№</div>
                                    <div style={{ flex: "1", textAlign: "center" }}>Нэр</div>
                                    <div style={{ flex: "1", textAlign: "center" }}>
                                        Регистрийн дугаар
                                    </div>
                                    <div style={{ flex: "1", textAlign: "center" }}>Нас</div>
                                    <div style={{ flex: "1", textAlign: "center" }}>
                                        Таны хэн болох
                                    </div>
                                    <div style={{ flex: "1", textAlign: "center" }}>
                                        Утасны дугаар
                                    </div>
                                    <div style={{ flex: "1", textAlign: "center" }}>
                                        Ажил эрхлэлт
                                    </div>
                                </div>

                            </div>
                            <div
                                style={{ fontSize: 15, fontStyle: "italic", marginBottom: 20 }}
                            >
                                <strong>
                                    1. Танай ажлаа хийхэд эрсдэлд оруулж болзошгүй эрүүл мэндийн
                                    асуудал (архаг өвчин, харшил гэх мэт) байгаа юу?
                                </strong>
                                <div style={{ margin: "10px 0" }}>
                                    <select
                                        name="pain"
                                        style={{ padding: "5px", fontSize: "15px" }}
                                    >
                                        <option>Тийм</option>
                                        <option>Үгүй</option>
                                    </select>
                                </div>

                                <strong>
                                    2. Танд тус компанид ажилладаг Барловорлд ашиг сонирхлын
                                    зөрчлийн бодлогод тодорхойлсон "Найз" эсвэл "дотны гэр бүлийн
                                    гишүүн" бий юу?
                                </strong>
                                <div style={{ margin: "10px 0" }}>
                                    <select
                                        name="friend_in_job"
                                        style={{ padding: "5px", fontSize: "15px" }}
                                    >
                                        <option>Тийм</option>
                                        <option>Үгүй</option>
                                    </select>
                                </div>

                                <strong>
                                    3. Танд тус компанид ажилладаг гэр бүлийн гишүүн, хамаатан
                                    садан болон/эсвэл дотны найз бий юу?
                                    <br />
                                    (Гэр бүлийн гишүүний тодорхойлолт: эхнэр, нөхөр, хамтран
                                    амьдрагч хүүхдүүд, эцэг эх, ах эгч нар, хадам ээж, хадам аав,
                                    хадам ах, эгч, нагац, авга ба/эсвэл зээ дүү.
                                    <br />
                                    Найзын тодорхойлолт: ажилтны хамт олонд танил тал, найз нөхөд,
                                    ажилтны гэр бүлийн найз, ажил хэргийн болон мэргэжлийн нийтлэг
                                    ашиг сонирхол бүхий хамтран зүтгэгч ба/эсвэл "Гэр бүлийн
                                    гишүүн" гэсэн тодорхойлолтод ороогүй ураг төрөл.)
                                    <br />
                                    Хэрэв Тийм гэж зурсан бол нэрийг нь бичнэ үү.
                                </strong>
                                <div
                                    style={{
                                        margin: "10px 0",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <input
                                        type="text"
                                        className="ank1"
                                        name="friend_in_job_text"
                                        maxLength={200}
                                        style={{ width: "250px", padding: "5px", fontSize: "15px" }}
                                    />
                                    <select
                                        name="friend_in_job2"
                                        style={{
                                            padding: "5px",
                                            fontSize: "15px",
                                            marginLeft: "10px",
                                        }}
                                    >
                                        <option>Тийм</option>
                                        <option>Үгүй</option>
                                    </select>
                                </div>

                                <strong>4. Өөр газарт томилолтоор ажиллахад бэлэн эсэх?</strong>
                                <div style={{ margin: "10px 0" }}>
                                    <select
                                        name="send_word"
                                        style={{ padding: "5px", fontSize: "15px" }}
                                    >
                                        <option>Тийм</option>
                                        <option>Үгүй</option>
                                    </select>
                                </div>

                                <strong>
                                    5. Богино хугацаанд болон хэд хэдэн бизнес аяллаар явахад
                                    бэлэн эсэх?
                                </strong>
                                <div style={{ margin: "10px 0" }}>
                                    <select
                                        name="biznes_travel"
                                        style={{ padding: "5px", fontSize: "15px" }}
                                    >
                                        <option>Тийм</option>
                                        <option>Үгүй</option>
                                    </select>
                                </div>

                                <strong>
                                    6. Ажлын тусгай нөхцөл төлөвлөх шаардлагатай эсэх (Жишээ нь:
                                    Чөлөөний өдрөө нэмэгдүүлэх, богиносгосон цагаар ажиллах, хагас
                                    цагаар ажиллах гэх мэт)
                                </strong>
                                <div
                                    style={{
                                        margin: "10px 0",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <select
                                        name="last_check"
                                        style={{ padding: "5px", fontSize: "15px" }}
                                    >
                                        <option>Тийм</option>
                                        <option>Үгүй</option>
                                    </select>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            marginTop: "10px",
                                        }}
                                    >
                                        <input
                                            type="text"
                                            name="reason"
                                            className="ank1"
                                            style={{
                                                width: "100%",
                                                padding: "10px",
                                                marginTop: "10px",
                                            }}
                                            placeholder="Хэрвээ та ТИЙМ гэж хариулсан бол шалтгаанаа бичнэ үү."
                                        />
                                    </div>
                                </div>

                                <div style={{ textAlign: "center", marginTop: "20px" }}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="flexCheckDefault"
                                        style={{ marginRight: "10px" }}
                                    />
                                    Миний бичсэн дээрх бүх зүйл үнэн гэдгийг баталж байна
                                </div>

                                <table
                                    style={{
                                        borderCollapse: "collapse",
                                        width: "100%",
                                        marginTop: "20px",
                                    }}
                                >
                                    <tbody>
                                        <tr>
                                            <td style={{ border: "hidden", textAlign: "left" }}>
                                                Огноо: 2024/09/11
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div style={{ textAlign: "center", marginTop: "20px" }}>
                                    <button className="btn btn-success" type="button" id="sende">
                                        ИЛГЭЭХ
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default careerPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            messages: (await import(`../../../messages/${context.locale}.json`))
                .default,
        },
    };
};
