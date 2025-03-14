import Beside from "@modules/layout/components/beside-menu";
import PageHeader from "@modules/layout/components/page-header";
import { HeaderData } from "@data/menu";
import { useTranslations } from "next-intl";
import Head from "@/modules/common/components/head";
import { GetStaticPropsContext } from "next";
import Nav from "@/modules/layout/templates/nav";
import Footer from "@/modules/layout/templates/footer";

const About = () => {
  const t = useTranslations("Home");
  const menu = useTranslations("Menu");
  const about = useTranslations("About");
  return (
    <>
      <Head title={t("title")}></Head>
      <Nav />
      <PageHeader title={t(`rent`)} image="https://d3leeb4r1qy96s.cloudfront.net/assets/img/hr/rent.jpg" />
      <article className="page-body container page type-page status-publish hentry" id="page-body">
        <div className="row">
          <div className="container mx-auto py-8">
            <div>
              <div className="absolute z-10">
                <img src="/rent.png" alt="Barloworld Mongolia" width={300} />
              </div>
              <span className="absolute text-[#ad0f0e] z-10 font-bold text-[40px] pt-28 pl-10 indent-0 flex-col">
                <div>ТҮРЭЭСИЙН САЛБАР БАЙРШЛУУД</div>
                <div className="text-[20px] indent-0 font-light">RENTAL OFFICE LOCATION</div>
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="relative group">
                  <img
                    src="https://d3leeb4r1qy96s.cloudfront.net/assets/img/specials/GDC_Main_011_5_11zon.png"
                    alt="Image 1"
                    className="w-full mx-auto opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <p className="bg-[#ad0f0e] text-white p-4 min-h-[100px] flex flex-col justify-center">
                  <span>ӨМНӨГОВЬ АЙМАГ, ЦОГЦЭЦИЙ СУМ</span>
                  <strong>GDC САЛБАР</strong>
                </p>
              </div>
              <div className="text-center">
                <div className="relative group">
                  <img
                    src="https://d3leeb4r1qy96s.cloudfront.net/assets/img/specials/22_branch_041_11zon.png"
                    alt="Image 2"
                    className="w-full mx-auto opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <p className="bg-[#ad0f0e] text-white p-4 min-h-[100px] flex flex-col justify-center">
                  <span>УЛААНБААТАР ХОТ, СХДҮҮРЭГ</span>
                  <strong>22-ЫН ТОВЧОО САЛБАР</strong>
                </p>
              </div>
              <div className="text-center">
                <div className="relative group">
                  <img
                    src="https://d3leeb4r1qy96s.cloudfront.net/assets/img/specials/Khanbogd_01_2_11zon.png"
                    alt="Image 3"
                    className="w-full mx-auto opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <p className="bg-[#ad0f0e] text-white p-4 min-h-[100px] flex flex-col justify-center">
                  <span>ӨМНӨГОВЬ АЙМАГ, ХАНБОГД СУМ</span>
                  <strong>ХАНБОГД САЛБАР</strong>
                </p>
              </div>
              <div className="text-center">
                <div className="relative group">
                  <img
                    src="https://d3leeb4r1qy96s.cloudfront.net/assets/img/specials/rental_office_02_3_11zon.png"
                    alt="Image 4"
                    className="w-full mx-auto opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <p className="bg-[#ad0f0e] text-white p-4 min-h-[100px] flex flex-col justify-center">
                  <span>УЛААНБААТАР ХОТ, БГДҮҮРЭГ</span>
                  <strong>ТҮРЭЭСИЙН ТӨВ САЛБАР</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
};

export default About;

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
