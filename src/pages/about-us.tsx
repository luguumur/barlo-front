import Beside from "@modules/layout/components/beside-menu";
import PageHeader from "@modules/layout/components/page-header"
import { HeaderData } from "@data/menu";
import { useTranslations } from "next-intl";
import Head from "@/modules/common/components/head";
import { GetStaticPropsContext } from "next";

const About = () => {

    const t = useTranslations('Home');
    return (
        <>
        <Head title={t("title")}></Head>
        <PageHeader title={t(`about`)}/>
        <article className="page-body container post-19 page type-page status-publish hentry" id="page-body">
            <div className="row test ">
            <main className="page-content col-md-9 col-md-push-3">
                <p>On behalf of the management and staff of Barloworld Mongolia LLC, I would like to take this opportunity to welcome you to our website. Our mission is to deliver highest quality solutions to every customer and to help these key sectors of the economy to grow.</p>
                <section className="flexible-image-cards">
                    <div className="container">
                    <div className="flexible-image-cards-header"></div>
                    <div className="flexible-image-cards-listing">
                        <div className="row js-equal-heights">
                        <div className="col-sm-6">
                            <div className="image-cards-box">
                            <a href="/">
                                <div className="card-image"></div>
                                <div className="image-card-content js-equal-heights-item h-[98px]">
                                <div className="image-card-btn">
                                    <span className="image-card-btn-text">Learn More</span>
                                    <div className="image-card-btn-clippy">
                                    <span className="icon-right"></span>
                                    </div>
                                </div>
                                <h3>History</h3>
                                </div>
                            </a>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="image-cards-box">
                            <a href="/">
                                <div className="card-image"></div>
                                <div className="image-card-content js-equal-heights-item h-[98px]">
                                <div className="image-card-btn">
                                    <span className="image-card-btn-text">Learn More</span>
                                    <div className="image-card-btn-clippy">
                                    <span className="icon-right"></span>
                                    </div>
                                </div>
                                <h3>News &amp; Events</h3>
                                </div>
                            </a>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="image-cards-box">
                            <a href="/">
                                <div className="card-image"></div>
                                <div className="image-card-content js-equal-heights-item h-[98px]">
                                <div className="image-card-btn">
                                    <span className="image-card-btn-text">Learn More</span>
                                    <div className="image-card-btn-clippy">
                                    <span className="icon-right"></span>
                                    </div>
                                </div>
                                <h3>Customer Testimonials</h3>
                                </div>
                            </a>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="image-cards-box">
                            <a href="/">
                                <div className="card-image"></div>
                                <div className="image-card-content js-equal-heights-item h-[98px]">
                                <div className="image-card-btn">
                                    <span className="image-card-btn-text">Learn More</span>
                                    <div className="image-card-btn-clippy">
                                    <span className="icon-right"></span>
                                    </div>
                                </div>
                                <h3>Careers</h3>
                                </div>
                            </a>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="image-cards-box">
                            <a href="/">
                                <div className="card-image"></div>
                                <div className="image-card-content js-equal-heights-item h-[98px]">
                                <div className="image-card-btn">
                                    <span className="image-card-btn-text">Learn More</span>
                                    <div className="image-card-btn-clippy">
                                    <span className="icon-right"></span>
                                    </div>
                                </div>
                                <h3>Employee Benefits</h3>
                                </div>
                            </a>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="image-cards-box">
                            <a href="/contact-us/">
                                <div className="card-image"></div>
                                <div className="image-card-content js-equal-heights-item h-[98px]">
                                <div className="image-card-btn">
                                    <span className="image-card-btn-text">Learn More</span>
                                    <div className="image-card-btn-clippy">
                                    <span className="icon-right"></span>
                                    </div>
                                </div>
                                <h3>Contact Us</h3>
                                </div>
                            </a>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </section>
                <h2>What We Offer</h2>
                <p>Health insurance (including family), Free lunch and transportation, Normal working hours (07:30-16:00, Monday-Friday),A safe, fair, friendly working environment. <br/>
                </p>
                <p></p>
                <h3>New Equipment</h3>
                <p>We carry an entire line of brand new Cat <sup>®</sup>&nbsp;machines built to stand up to the most rugged environments. Our Cat product line of more than 300 machines shows that we’re committed to being an industry leader that supplies durable and reliable equipment. From&nbsp;telehandlers to skid steer loaders and backhoes, we carry a variety of equipment types with different dimensions, capabilities and features. We work hard to understand exactly what you need so we can help you find the perfect machine for greater efficiency and cost savings. </p>
                <h3>Used Equipment</h3>
                <p>Used Equipment</p>
                <h3>Rental Equipment</h3>
                <p>Rental Equipment</p>
                <h3>Parts and Service</h3>
                <p>Parts & Service Equipment</p>
                <h2>Contact Us Today</h2>
                <p>Do you need equipment that delivers outstanding performance at your job site? </p>
                <p>
                    <a className="button button--primary" href="contact-us/">Contact Us For More Info</a>
                </p>
                </main>
                <Beside menu={HeaderData} title={t(`about`)} translate="Menu"/>
            </div>
        </article>
        </>
    )
}

export default About


export async function getStaticProps({locale}: GetStaticPropsContext) {
    return {
      props: {
        messages: (await import(`../../messages/${locale}.json`)).default
      }
    };
}