import Beside from "@modules/layout/components/beside-menu";
import PageHeader from "@modules/layout/components/page-header";
import { HeaderData } from "@data/menu";
import { useTranslations } from "next-intl";
import { GetStaticPropsContext } from "next";
import NProgress from "nprogress";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import Head from "@/modules/common/components/head";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  year_of_experience: string;
  text: string;
  other: string;
}

const Careers = () => {
  const t = useTranslations("Menu");
  const initialData = {
    email: "",
    name: "",
    phone: "",
    subject: "",
    year_of_experience: "",
    text: "",
    other: "",
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
    NProgress.start();
    try {
      e.preventDefault();
      const response = await axios.post(`/api/questions`, {
        headers: {
          "Content-Type": "application/json", // Example header
        },
        data: JSON.stringify({
          name: formData["name"],
          email: formData["email"],
          phone: formData["phone"],
          year_of_experience: formData["year_of_experience"],
          subject: formData["subject"],
          text: formData["text"],
          other: formData["other"],
        }),
      });
      if (response.status == 200) {
        NProgress.done();
        toast.success(`Амжилттай илгээгдлээ. Баярлалаа`);
      } else {
        NProgress.done();
        toast.error(`Мэдээлэл олдохгүй байна.`);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(`error`);
      NProgress.done();
    }
  };
  return (
    <>
      <Head title={t("benefits")}></Head>
      <PageHeader
        title={t(`benefits`)}
        image="https://d3leeb4r1qy96s.cloudfront.net/assets/img/cta-banner-image-1536x306.jpg"
      />
      <article className="page-body container page type-page status-publish hentry" id="page-body">
        <div className="row">
          <main className="page-content col-md-9 col-md-push-3">
            <section className="pt-5">
              <h2>Бидэнтэй нэгдэх шалтгаанууд</h2>
              <ul>
                <li>
                  Таны эрүүл мэнд хамгаас чухал.
                  <ol>Аюулгүй ажиллагааг эрхэмлэдэг соёл</ol>
                  <ol>Эрүүл мэндийн даатгал</ol>
                  <ol>Ухаалаг ажлын цаг (7.30-16.00)</ol>
                  <ol>Эрүүл мэндийн үзлэгт хамрагдах</ol>
                  <ol>Сэтгэл зүйчтэй уулзаж сэтгэлзүйн зөвлөгөө авах боломж</ol>
                  <ol>Спортын тэмцээн уралдаан</ol>
                </li>
                <li>
                  Сурч хөгжих боломж
                  <ol>
                    Ажил мэргэжил чиглэлийн хүрээнд ОУ-ын сургалт, семинарт оролцох, туршлага судлан ур чадвараа ахиулах
                    боломж
                  </ol>
                  <ol>Менторшип хөтөлбөр</ol>
                  <ol>Англи хэлний ярианы хөтөлбөр</ol>
                  <ol>CAT-ийн магадлан итгэмжлэгдсэн техникч бэлтгэх Аппрентис сургалт</ol>
                  <ol>CAT-ийн онлайн сургалтын эрх</ol>
                  <ol>Хоёрдогч хэл- Англи хэлээр харилцах орчин</ol>
                  <ol>Хувь хүний болон манлайллын дотоод сургалт</ol>
                </li>
                <li>
                  Тэгш эрх, тэгш боломж
                  <ol>
                    Ялгаатай байдал тэгш оролцоог дэмжсэн бодлого (more+) (дэлгэрэнгүй мэдээллийг дараад харах боломжтой
                    байх)
                  </ol>
                </li>
                <li>
                  Байгалиа орчин, тогтвортой байдал
                  <ol>Хогоо ангилан хаядаг</ol>
                  <ol>Ус, түлш, цахилгаан зарцуулалтын хэмнэлтийн бодлого</ol>
                </li>
                <li>
                  Нийгэмдээ оруулж буй хувь нэмэр
                  <ol>
                    Нийгэм рүү хандаж хүүхэд, ядуурал руу чиглэн ажилладаг (more+) (дэлгэрэнгүй мэдээллийг дараад харах
                    боломжтой байх)
                  </ol>
                </li>
              </ul>
            </section>

            {/* <section className="pt-5">
                        <p>Listings are current as of Apr 16, 2024 06:45 PM</p>
                        <h2 className="job-app-title">Connect with a Recruiter</h2>
                        <div className="wpcf7 js" id="wpcf7-f30538-p105561-o1" lang="en-US" dir="ltr">
                            <div className="screen-reader-response">
                                <p role="status" aria-live="polite" aria-atomic="true"></p>
                                <ul></ul>
                            </div>
                            <form onSubmit={handleSubmit} className="wpcf7-form init" id="hrForm" aria-label="Hr form"  data-status="init">
                                <div className="pb-2">Fill out the form below to request more information and a member of our team will be in touch with you shortly.</div>
                                <div className="row form-row">
                                    <div className="col-sm-6 form-field">
                                        <label>Name</label>
                                        <span className="wpcf7-form-control-wrap" data-name="name">
                                        <input type="text" name="name" value={formData.name} onChange={handleChange} size={40} className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" aria-required="true" aria-invalid="false"/>
                                        </span>
                                    </div>
                                    <div className="col-sm-6 form-field">
                                        <label>Email</label>
                                        <span className="wpcf7-form-control-wrap" data-name="email">
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} size={40} className="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email" aria-required="true" aria-invalid="false"/>
                                        </span>
                                    </div>
                                </div>
                                <div className="row form-row">
                                    <div className="col-sm-6 form-field">
                                        <label>Phone</label>
                                        <span className="wpcf7-form-control-wrap" data-name="phone">
                                            <input type="text" name="phone" value={formData.phone} onChange={handleChange} size={40} className="wpcf7-form-control wpcf7-tel wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-tel" aria-required="true" aria-invalid="false"/>
                                        </span>
                                    </div>
                                    <div className="col-sm-6 form-field">
                                        <label>Years of Experience</label>
                                        <span className="wpcf7-form-control-wrap" data-name="year_of_experience">
                                            <input type="text" name="year_of_experience" value={formData.year_of_experience} onChange={handleChange} className="wpcf7-form-control wpcf7-number wpcf7-validates-as-required wpcf7-validates-as-number" min="0" max="99" aria-required="true" aria-invalid="false"/>
                                        </span>
                                    </div>
                                </div>
                                <div className="row form-row">
                                    <div className="col-sm-12 form-field">
                                        <label className="pb-3">Career Interests</label>
                                        <span className="wpcf7-form-control-wrap" data-name="interests">
                                            <span className="wpcf7-form-control wpcf7-checkbox wpcf7-validates-as-required">
                                                <span className="wpcf7-list-item first">
                                                <label>
                                                    <input type="checkbox" name="interests[]" value="General Shop Technician"/>
                                                    <span className="wpcf7-list-item-label">General Shop Technician</span>
                                                </label>
                                                </span>
                                                <span className="wpcf7-list-item">
                                                <label>
                                                    <input type="checkbox" name="interests[]" value="Field Service Technician"/>
                                                    <span className="wpcf7-list-item-label">Field Service Technician</span>
                                                </label>
                                                </span>
                                                <span className="wpcf7-list-item">
                                                <label>
                                                    <input type="checkbox" name="interests[]" value="Electric Power Generation (EPG) Technician"/>
                                                    <span className="wpcf7-list-item-label">Electric Power Generation (EPG) Technician</span>
                                                </label>
                                                </span>
                                                <span className="wpcf7-list-item last has-free-text">
                                                <label>
                                                    <input type="checkbox" name="interests[]" value="Other (fill in blank)"/>
                                                    <span className="wpcf7-list-item-label">Other (fill in blank)</span>
                                                </label>
                                                <input type="text" name="interests_free_text" className="wpcf7-free-text mt-5" disabled={true}/>
                                                </span>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <div className="row form-row">
                                    <div className="col-sm-5 form-field">
                                        <button className="btn btn-primary button--block" type="submit">Submit</button>
                                    </div>
                                </div>
                                <div className="wpcf7-response-output" aria-hidden="true"></div>
                            </form>
                        </div>
                    </section> */}
          </main>
          <Beside menu={HeaderData} title={t(`careers`)} translate="Menu" />
        </div>
      </article>
    </>
  );
};

export default Careers;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    messages = {};
  }
  return {
    props: {
      messages,
    },
  };
}
