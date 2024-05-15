import PageHeader from "@modules/layout/components/page-header"
import { teamData } from "@data/teamData";
import { useTranslations } from "next-intl";
import { GetStaticPropsContext } from "next";
import { Magazines } from "@/data/magazine";

const Management = () => {

    const t = useTranslations("Home");
    return (
        <>
        <PageHeader title={t(`magazine`)}/>
        <section className="services-card-section">
            <div className="container">
                <div className="services-card-wrapper desktop">
                    {Magazines.map((item, index) => (
                        <a className="hover:bg-white rounded mb-5 pb-2" href={item.link} target="blank_">
                            <div className="px-5 max-w-[255px]">
                            <span className="text-[22px] text-[#ffcc03]">{item.title}</span>
                            <img className="content-center services-card-img-icon" src={item.image} alt="" />
                            <span className="services-card-title text-right text-gray-500 text-[15px]">{item.date}</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
        </>
    )
}

export default Management


export async function getStaticProps({locale}: GetStaticPropsContext) {
    return {
      props: {
        messages: (await import(`../../../messages/${locale}.json`)).default
      }
    };
}