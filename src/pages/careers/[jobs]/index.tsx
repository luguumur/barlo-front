import { HeaderData } from "@/data/menu";
import Beside from "@/modules/layout/components/beside-menu";
import PageHeader from "@modules/layout/components/page-header"
import { GetServerSideProps, GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import { useTranslations } from "next-intl";

const Careers: InferGetServerSidePropsType<typeof getServerSideProps> = (props: any) => {
    const t = useTranslations("Menu");
    return (
        <>
        <PageHeader title="CRM"/>
        <article className="page-body container post-19 page type-position status-publish hentry" id="page-body">
            <div className="row test ">
            <main className="page-content col-md-9 col-md-push-3">
                <div>
                <div className="center"><b>CRM Champion</b></div>

                <div><b>ABOUT THE COMPANY</b></div>
                <div>&quot;Барловорлд Монголия&quot; ХХК нь Катерпиллар корпорацийн Монгол дахь албан ёсны дилер юм.1996 онд байгуулагдсанаасаа хойш &quot;Барловорлд Монголия&quot; ХХК нь Монголын уул уурхай, эрчим хүч, барилга, зам барилга, дэд бүтэц болон хөдөө аж ахуйн салбарт дэвшилтэт технологи, шинэ техник тоног төхөөрөмжүүдийг нэвтрүүлсээр ирлээ.</div>
                <div>
                    <div>&nbsp;</div>
                    <div>
                        <b>JOB PROFILE&nbsp;</b>
                    </div>
                    <div>To manage & develop a CRM (Customer Relationship Management) system, To manage & develop corporate websites</div>
                    <div>&nbsp;</div>
                    <div>
                        <b>BASIC REQUIREMENTS</b>
                    </div>
                    <ul>
                        <li>A university degree is required.</li>
                        <li>Minimum of 1-2 years experience in the IT field.</li>
                        <li>Data Management and analytical skills.</li>
                        <li>Powerbi & Database management experience required.</li>
                        <li>Web Development knowledge would be preferred.</li>
                        <li>Intermediate English level required.</li>
                        <li>Excellent communication skills.&nbsp;</li>
                        <li>Competent user of MS Office programs</li>
                        <li>Working with a multinational staff environment</li>
                        <li>Must be a self-starter.</li>
                        <li>Must be a team player.</li>
                        <li>Must be eager to learn.</li>
                        <li>Maintain confidentiality of all company information.</li>
                    </ul>
                    <div>
                        <b>RESPONSIBILITIES</b>
                    </div>
                    <div>The Employee should be able to read and interpret technical instruction, service and safety manuals, company policies and procedures.&nbsp; Works with mechanical, hydraulic, and wiring diagrams; and demonstrates proficiency in the use of test equipment. &nbsp;The position is responsible for high quality repair service on equipment and engines, responding to customer needs in a positive, safe, and timely manner, and ensuring maximum value for work performed.</div>
                    <div>
                        <u>Safety</u>
                    </div>
                    <ul>
                        <li>Know and follow all Company and customer safety rules, including maintaining a safe, clean, and orderly work area, fully participating in Company accident prevention and safety improvement activities.</li>
                        <li>Must have the physical ability to wear Personal Protective Equipment (PPE), including protective glasses, protective gloves, and protective clothing and footwear as required by the job.</li>
                    </ul>
                    <div>
                        <u>Customer Satisfaction</u>
                    </div>
                    <ul>
                        <li>Respond to all customer requests in a professional and courteous, timely and responsive manner.</li>
                        <li>Maintain a clean, professional personal appearance at all times, meeting all Company standards for professionalism.</li>
                        <li>Keep the Manager continually apprised to assist in answering customer questions and problems when necessary.&nbsp;</li>
                    </ul>
                    <div>
                        <u>Business</u>
                    </div>
                    <ul>
                        <li>Supports the organization’s mission, vision, and values by exhibiting the following behaviors: honesty, integrity, and respect while delivering high quality solutions and maintaining a positive attitude and a safe work environment.</li>
                        <li>Accepts responsibility for mistakes or problems. Maintains “ownership” of assigned tasks.</li>
                        <li>Demonstrate a positive attitude and a high level of personal credibility and integrity with customers, management, and dealership co-workers.&nbsp;</li>
                        <li>Must be dependable. Consistently arrives at work on time when scheduled, fully ready to work.</li>
                        <li>Maintain company and product confidentiality.&nbsp;</li>
                        <li>Attend and participate in all meetings, training, and activities as required.&nbsp;</li>
                        <li>Adhere to all Company policies and departmental procedures and rules.&nbsp;</li>
                        <li>All other duties as assigned.</li>
                    </ul>
                    <div>
                        <u>Work Conditions</u>
                    </div>
                    <ul>
                        <li>All locations offer clean, safe working conditions; however, the position may work in situations where hazards may be present.&nbsp; Therefore, a detailed knowledge of equipment and engines is a must as well as a demonstrated proficiency in service and repair of equipment using standard safety procedures.</li>
                        <li>Communicate effectively, verbally and in writing.&nbsp;</li>
                        <li>Must be honest, reliable, and dependable, and display a positive attitude.</li>
                        <li>Must be able to work well under occasional pressure or within work standards and deadlines.&nbsp;</li>
                        <li>Must be able to work independently and/or with others in a team environment.&nbsp;</li>
                        <li>Able to work standard five-day schedule, including daily overtime and occasional weekend hours as needed.</li>
                        <li>Meet all eligibility requirements to drive Company vehicles, including a current, valid driver’s license issued by the resident State, and maintain current motor vehicle liability insurance.&nbsp;</li>
                    </ul>
                    <div>
                        <u>Physical Requirements</u>
                    </div>
                    <ul>
                        <li>Pass pre-employment background check, physical exam including drug screen, and meet all physical requirements for the position.&nbsp;</li>
                        <li>Able to lift up to 50-80 pounds occasionally.&nbsp;</li>
                    </ul>
                </div>
               </div>
                </main>
                <Beside menu={HeaderData} title={t('home')} translate="Menu"/>
            </div>
        </article>
        </>
    )
}

export default Careers

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
      props: {
          data: "",
          messages: (await import(`../../../../messages/${context.locale}.json`)).default
      },
    };
  };