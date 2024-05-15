import Beside from "@modules/layout/components/beside-menu";
import PageHeader from "@modules/layout/components/page-header"
import { HeaderData } from "@data/menu";
import { useTranslations } from "next-intl";
import Management from "../management";
import { GetStaticPropsContext } from "next";

const Careers = () => {

    const t = useTranslations("Menu");
    return (
        <>
        <PageHeader title={t(`careers`)}/>
        <article className="page-body container post-19 page type-page status-publish hentry" id="page-body">
            <div className="row test ">
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
                            <div className="row position" data-location="La Vergne, TN">
                                <div className="col-xxs-12">
                                    <a className="position-link" href="/careers/crm">CRM Champions</a>
                                    <span className="position-location"> - Ulaanbaatar,</span>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="pt-5">
                        <p>Listings are current as of Apr 16, 2024 06:45 PM</p>
                        <h2 className="job-app-title">Connect with a Recruiter</h2>
                        <div className="wpcf7 js" id="wpcf7-f30538-p105561-o1" lang="en-US" dir="ltr">
                        
                            <div className="screen-reader-response">
                                <p role="status" aria-live="polite" aria-atomic="true"></p>
                                <ul></ul>
                            </div>
                            
                            <form action="/thompson-careers/#wpcf7-f30538-p105561-o1" method="post" className="wpcf7-form init" aria-label="Contact form" noValidate={false} data-status="init">
                                <div className="pb-2">Fill out the form below to request more information and a member of our team will be in touch with you shortly.</div>
                                <div className="row form-row">
                                    <div className="col-sm-6 form-field">
                                        <label>Name</label>
                                        <span className="wpcf7-form-control-wrap" data-name="your-name">
                                        <input size={40} className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" aria-required="true" aria-invalid="false" value="" type="text" name="your-name"/>
                                        </span>
                                    </div>
                                    <div className="col-sm-6 form-field">
                                        <label>Email</label>
                                        <span className="wpcf7-form-control-wrap" data-name="email">
                                        <input size={40} className="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email" aria-required="true" aria-invalid="false" value="" type="email" name="email"/>
                                        </span>
                                    </div>
                                </div>
                                <div className="row form-row">
                                    <div className="col-sm-4 form-field">
                                        <label>Phone</label>
                                        <span className="wpcf7-form-control-wrap" data-name="phone">
                                        <input size={40} className="wpcf7-form-control wpcf7-tel wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-tel" aria-required="true" aria-invalid="false" value="" type="tel" name="phone"/>
                                        </span>
                                    </div>
                                    <div className="col-sm-4 form-field">
                                        <label>Zip</label>
                                        <span className="wpcf7-form-control-wrap" data-name="zip">
                                        <input className="wpcf7-form-control wpcf7-number wpcf7-validates-as-required wpcf7-validates-as-number" min="00000" max="99999" aria-required="true" aria-invalid="false" value="" type="number" name="zip"/>
                                        </span>
                                    </div>
                                    <div className="col-sm-4 form-field">
                                    <label>Years of Experience</label>
                                    <span className="wpcf7-form-control-wrap" data-name="experience">
                                    <input className="wpcf7-form-control wpcf7-number wpcf7-validates-as-required wpcf7-validates-as-number" min="0" max="99" aria-required="true" aria-invalid="false" value="" type="number" name="experience"/>
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
                                        <button className="button button--primary button--block" type="submit">Submit</button>
                                    </div>
                                </div>
                                <div className="wpcf7-response-output" aria-hidden="true"></div>
                            </form>
                        </div>
                    </section>
                </main>
                <Beside menu={HeaderData} title={t(`careers`)} translate="Menu"/>
            </div>
        </article>
        </>
    )
}

export default Careers

export async function getStaticProps({locale}: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../messages/${locale}.json`)).default
        }
    };
}