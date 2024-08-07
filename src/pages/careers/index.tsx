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
            <Head title={t(`careers`)}></Head>
            <PageHeader title={t(`careers`)} image="/assets/img/specials/minihr.jpg" />
            <article className="page-body container page type-page status-publish hentry" id="page-body">
                <div className="row">
                    <main className="page-content col-md-9 col-md-push-3">
                        <h2>Манай баг хамт олон</h2>
                        {/* <p>"Барловорлд Монголия" ХХК нь Катерпиллар корпорацийн Монгол дахь албан ёсны дилер юм.1996 онд байгуулагдсанаасаа хойш "Барловорлд Монголия" ХХК нь Монголын уул уурхай, эрчим хүч, барилга, зам барилга, дэд бүтэц болон хөдөө аж ахуйн салбарт дэвшилтэт технологи, шинэ техник тоног төхөөрөмжүүдийг нэвтрүүлсээр ирлээ.Нэмж хэлэхэд бид уул уурхай, байгалийн хий, газрын тос, дэд бүтэц,</p><p> хөдөө аж ахуй болон бусад салбарт өргөн хэрэглэгддэг хийн компрессорын үйлдвэрлэгч Sullair, барилгын тоног төхөөрөмж ба цахилгаан үүсгүүрийн Multiquip, Miller брендын гагнуурын аппарат, Godwin Pump усны насос, Genie өргөгч төхөөрөмж, </p><p>Allmаnd brothers-ын шөнийн зөөврийн гэрэл ба өрмийн машин, SEM брендийн дугуйт ачигч, Thawzall хөрс халаагч болон бусад олон тоног төхөөрөмжүүдийг Монголд нийлүүлж, эдгээр компаниудын албан ёсны төлөөлөгчөөр ажилладаг. Мөн бид хүнд даацын дугуйн дэлхийд алдартай Michellin компанийн Монгол дахь албан ёсны дилер юм."Барловорлд Монголия" ХХК нь олон улсын хүрээнд Катерпилларын Шилдэг Дилер болж чадсанаар “Тусгаар Улсуудын Хамтын Нөхөрлөл болон Монгол” дахь Катерпилларын бүс нутгийн хэмжээнд Тэргүүний дилерийн үзүүлэлтээрээ 6 дахь жилдээ манлайлж байна. Түүнчлэн Монгол Улсын засгийн газар, Монголын худалдаа аж үйлдвэрийн тэнхимээс хамтран улс орны эдийн засаг, бизнесийн хөгжилд жинтэй хувь нэмэр оруулж буй аж ахуйн нэгжүүдийн шалгаруулалтад 16рт шалгарсан. "Барловорлд Монголия" ХХК нь шинэ технологи, шинэ бүтээгдэхүүн болон үйлчилгээг зах зээлд нэвтрүүлэгч бизнесийн туршлагатай тэргүүлэгч компани юм.</p> */}
                        <ul >
                            <li>Үйлчилгээ дэмжих газар</li>
                            <li>Борлуулалт дэмжих газар</li>
                            <li>Санхүүгийн газар</li>
                            <li>Хуулийн хэлтэс</li>
                            <li>Борлуулалт ба Түрээсийн газар</li>
                            <li>Аналитик Инновацийн газар</li>
                            <li>Бизнес эрсдлийн газар</li>
                        </ul>

                        <section className="pt-5">
                            <h2>Бидэнтэй нэгдэх шалтгаанууд</h2>
                            <ul>
                                <li>Таны эрүүл мэнд хамгаас чухал.
                                    <ol>Аюулгүй ажиллагааг эрхэмлэдэг соёл</ol>
                                    <ol>Эрүүл мэндийн даатгал</ol>
                                    <ol>Ухаалаг ажлын цаг (7.30-16.00)</ol>
                                    <ol>Эрүүл мэндийн үзлэгт хамрагдах</ol>
                                    <ol>Сэтгэл зүйчтэй уулзаж сэтгэлзүйн зөвлөгөө авах боломж</ol>
                                    <ol>Спортын тэмцээн уралдаан</ol>
                                </li>
                                <li>Сурч хөгжих боломж
                                    <ol>Ажил мэргэжил чиглэлийн хүрээнд ОУ-ын сургалт, семинарт оролцох, туршлага судлан ур чадвараа ахиулах боломж</ol>
                                    <ol>Менторшип хөтөлбөр</ol>
                                    <ol>Англи хэлний ярианы хөтөлбөр</ol>
                                    <ol>CAT-ийн магадлан итгэмжлэгдсэн техникч бэлтгэх Аппрентис сургалт</ol>
                                    <ol>CAT-ийн онлайн сургалтын эрх</ol>
                                    <ol>Хоёрдогч хэл- Англи хэлээр харилцах орчин</ol>
                                    <ol>Хувь хүний болон манлайллын дотоод сургалт</ol>
                                </li>
                                <li>Тэгш эрх, тэгш боломж
                                    <ol>Ялгаатай байдал тэгш оролцоог дэмжсэн бодлого (more+) (дэлгэрэнгүй мэдээллийг дараад харах боломжтой байх)</ol>
                                </li>
                                <li>Байгалиа орчин, тогтвортой байдал
                                    <ol>Хогоо ангилан хаядаг</ol>
                                    <ol>Ус, түлш, цахилгаан зарцуулалтын хэмнэлтийн бодлого</ol>
                                </li>
                                <li>Нийгэмдээ оруулж буй хувь нэмэр
                                    <ol>Нийгэм рүү хандаж хүүхэд, ядуурал руу чиглэн ажилладаг (more+) (дэлгэрэнгүй мэдээллийг дараад харах боломжтой байх)</ol>
                                </li>
                            </ul>
                        </section>
                        <section className="pt-5">
                            <h2>Сонгон шалгаруулалтын үе шатууд</h2>
                            <p>Анкетын сонгон шалгаруулалт-&gt; Ярилцлагууд -&gt; Англи хэлний сорил/ Оюуны ерөнхий чадварын сорил -&gt; Шийдвэр гаргалт</p>
                            <img src="/Picture1.png" alt="" />
                        </section>
                        <section className="pt-5">
                            <h2>Нээлттэй ажлын байр</h2>
                            <div className="positions">
                                {props.data.map((item: any, index: any) => (
                                    <div key={index} className="row position" data-location="La Vergne, TN">
                                        <div className="col-xxs-12">
                                            <Link href={"/careers/" + item.id} className="position-link">
                                                {locale === "mn" ? item.title : item.title_en}
                                            </Link>
                                            <span className="position-location"> -{item.location}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                        <section className="pt-28">
                            <p>Хийж бүтээх тэмүүлэл дүүрэн чадварлаг залууст ажлын байр үргэлж нээлттэй.</p>
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
                        </section>
                    </main>
                    <Beside menu={HeaderData} title={t(`careers`)} translate="Menu" />
                </div>
            </article>
        </>
    )
}

export default careerPage

export const getServerSideProps: GetServerSideProps = async (context) => {
    const instance = axios.create({
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    });

    let config = {
        method: 'get',
        rejectUnauthorized: false,
        maxBodyLength: Infinity,
        url: `${process.env.apiDomain}/jobs`,
        headers: {}
    };
    const careers = await instance.request(config)
    return {
        props: {
            data: careers?.data,
            messages: (await import(`../../../messages/${context.locale}.json`)).default
        },
    };
};
