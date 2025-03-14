import Beside from "@modules/layout/components/beside-menu";
import PageHeader from "@modules/layout/components/page-header";
import { HeaderData } from "@data/menu";
import { useTranslations } from "next-intl";
import Head from "@/modules/common/components/head";
import { GetStaticPropsContext } from "next";
import Nav from "@/modules/layout/templates/nav";
import Footer from "@/modules/layout/templates/footer";
import { AboutMenuData } from "@/data/aboutMenu";

const About = () => {
  const t = useTranslations("Home");
  const menu = useTranslations("Menu");
  const about = useTranslations("About");
  return (
    <>
      <Head title={t("title")}></Head>
      <Nav />
      <PageHeader
        title={t(`about`)}
        image="https://d3leeb4r1qy96s.cloudfront.net/assets/img/hr/A4_Company_Profile_Inside4_11zon.png"
      />
      <article className="page-body container page type-page status-publish hentry" id="page-body">
        <div className="row">
          <main className="page-content col-md-9 col-md-push-3">
            <div className="row">
              <main className="page-content lg:max-w-[900px] mx-auto">
                <p>{about("on_behalf")}</p>
                <section className="flexible-image-cards">
                  <div className="container">
                    <div className="flexible-image-cards-header"></div>
                    <div className="flexible-image-cards-listing">
                      <div className="row js-equal-heights">
                        <div className="col-sm-6">
                          <div className="image-cards-box">
                            <a href="/management">
                              <div className="card-image"></div>
                              <div className="image-card-content js-equal-heights-item h-[98px]">
                                <h3>{t("board")}</h3>
                                <div className="image-card-btn">
                                  <span className="image-card-btn-text">{menu("learnmore")}</span>
                                  <div className="image-card-btn-clippy">
                                    <span className="icon-right"></span>
                                  </div>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="image-cards-box">
                            <a href="/careers">
                              <div className="card-image"></div>
                              <div className="image-card-content js-equal-heights-item h-[98px]">
                                <h3>{menu("careers")}</h3>
                                <div className="image-card-btn">
                                  <span className="image-card-btn-text">{menu("learnmore")}</span>
                                  <div className="image-card-btn-clippy">
                                    <span className="icon-right"></span>
                                  </div>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="image-cards-box">
                            <a href="/news">
                              <div className="card-image"></div>
                              <div className="image-card-content js-equal-heights-item h-[98px]">
                                <h3>{menu("news_event")}</h3>
                                <div className="image-card-btn">
                                  <span className="image-card-btn-text">{menu("learnmore")}</span>
                                  <div className="image-card-btn-clippy">
                                    <span className="icon-right"></span>
                                  </div>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="image-cards-box">
                            <a href="/testimonials">
                              <div className="card-image"></div>
                              <div className="image-card-content js-equal-heights-item h-[98px]">
                                <h3>{menu("testimonials")}</h3>
                                <div className="image-card-btn">
                                  <span className="image-card-btn-text">{menu("learnmore")}</span>
                                  <div className="image-card-btn-clippy">
                                    <span className="icon-right"></span>
                                  </div>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="image-cards-box">
                            <a href="/magazine">
                              <div className="card-image"></div>
                              <div className="image-card-content js-equal-heights-item h-[98px]">
                                <h3>{t("magazine")}</h3>
                                <div className="image-card-btn">
                                  <span className="image-card-btn-text">{menu("learnmore")}</span>
                                  <div className="image-card-btn-clippy">
                                    <span className="icon-right"></span>
                                  </div>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="image-cards-box">
                            <a href="/contact-us/">
                              <div className="card-image"></div>
                              <div className="image-card-content js-equal-heights-item h-[98px]">
                                <h3>{t("contact")}</h3>
                                <div className="image-card-btn">
                                  <span className="image-card-btn-text">{menu("learnmore")}</span>
                                  <div className="image-card-btn-clippy">
                                    <span className="icon-right"></span>
                                  </div>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section>
                  <img src="https://d3leeb4r1qy96s.cloudfront.net/assets/img/hr/home.png" alt="Barloworld Mongolia" />
                </section>
                {/* <h3>{about("what_we_offer")}</h2>
                            <p>{about("health_insurance")} <br />
                            </p>
                            <h3>{about("new_equipment")}</h3>
                            <p>{about("we_carry")} </p>
                            <h3>{about("used_equipment")}</h3>
                            <p>{about("some_companies")}</p>
                            <h3>{about("rental_equipment")}</h3>
                            <p>{about("if_you_want_to")}</p>
                            <h3>{about("parts_and_service")}</h3>
                            <p>{about("service_support")}</p>
                            <h3>{about("contact_us_today")}</h2>
                            <p>{about("do_you_need_equipment")} </p>
                            <p>
                                <a className="btn btn-primary" href="contact-us/">Contact Us For More Info</a>
                            </p> */}
              </main>
            </div>
          </main>
          <Beside menu={AboutMenuData} title={t(`about`)} translate="Menu" />
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
