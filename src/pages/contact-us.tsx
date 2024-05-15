import PageHeader from "@modules/layout/components/page-header"
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";

const Contact = () => {

    const t = useTranslations("Menu");
    return (
        <>
        <header className="masthead text--center clearfix" id="masthead">
            <div className="masthead-background">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2674.5867562554454!2d106.86322311587898!3d47.90568317526192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9693197317afc7%3A0x6358104e5496994a!2sWagner%20Asia%20Equipment%20LLC!5e0!3m2!1sen!2smn!4v1569379371193!5m2!1sen!2smn&amp;wmode=transparent" width="100%" height="350" ></iframe>
            </div>
        </header>
        <article className="page-body container post-7 page type-page status-publish hentry" id="page-body">
        <div className="row test ">
            <main className="page-content col-md-9 col-md-push-3">
                <div className="row test ">
                    <main className="page-content lg:max-w-[900px] mx-auto">
                        <h2>{t("contact")}</h2>
                        <div className="wpcf7 js" id="wpcf7-f317-p19-o1" lang="en-US" dir="ltr">
                            <div className="screen-reader-response">
                            <p role="status" aria-live="polite" aria-atomic="true"></p>
                            <ul></ul>
                            </div>
                            <form action="/contact-us/#wpcf7-f317-p19-o1" method="post" className="wpcf7-form init" id="contact" aria-label="Contact form" data-status="init">
                            <div className="row form-row">
                                <div className="col-sm-6 form-field">
                                    <label>Name*</label>
                                    <span className="wpcf7-form-control-wrap" data-name="your-name"><input className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" aria-required="true" aria-invalid="false"  type="text" name="your-name"/></span> 
                                </div>
                                <div className="col-sm-6 form-field">
                                    <label>Email*</label>
                                    <span className="wpcf7-form-control-wrap" data-name="email"><input className="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email" aria-required="true" aria-invalid="false"  type="email" name="email"/></span> 
                                </div>
                            </div>
                            <div className="row form-row">
                                <div className="col-sm-6 form-field">
                                    <label>Phone</label>
                                    <span className="wpcf7-form-control-wrap" data-name="phone"><input className="wpcf7-form-control wpcf7-tel wpcf7-text wpcf7-validates-as-tel" aria-invalid="false"  type="tel" name="phone"/></span> 
                                </div>
                                <div className="col-sm-6 form-field">
                                    <label>Subject</label>
                                    <span className="wpcf7-form-control-wrap" data-name="subject">
                                        <div className="selectric-wrapper selectric-wpcf7-form-control selectric-wpcf7-select">
                                        <div className="selectric-hide-select">
                                            <select className="wpcf7-form-control wpcf7-select" aria-invalid="false" name="subject">
                                                <option value="New Machines">New Machines</option>
                                                <option value="Used Machines">Used Machines</option>
                                                <option value="Power Systems">Power Systems</option>
                                                <option value="Parts">Parts</option>
                                                <option value="Service">Service</option>
                                                <option value="Solar">Solar</option>
                                                <option value="Technology">Technology</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div className="selectric">
                                            <p className="label">New Machines</p>
                                            <b className="button">▾</b>
                                        </div>
                                        <div className="selectric-items">
                                            <div className="selectric-scroll">
                                                <ul>
                                                    <li data-index="0" className="selected">New Machines</li>
                                                    <li data-index="1" className="">Used Machines</li>
                                                    <li data-index="2" className="">Power Systems</li>
                                                    <li data-index="3" className="">Parts</li>
                                                    <li data-index="4" className="">Service</li>
                                                    <li data-index="5" className="">Solar</li>
                                                    <li data-index="6" className="">Technology</li>
                                                    <li data-index="7" className="last">Other</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <input className="selectric-input"/>
                                        </div>
                                    </span>
                                </div>
                            </div>
                            <div className="row form-row">
                                <div className="col-sm-12 form-field">
                                    <label>Question/Comment*</label>
                                    <span className="wpcf7-form-control-wrap" data-name="message"><textarea className="wpcf7-form-control wpcf7-textarea wpcf7-validates-as-required" aria-required="true" aria-invalid="false" name="message"></textarea></span> 
                                </div>
                            </div>
                            <div className="row form-row">
                                <div className="col-sm-12">
                                    <input name="imahuman" className="imahuman" type="hidden" value="0"/>
                                    <noscript>
                                        <div className="row no-js-hidden-captcha">
                                        <label htmlFor="captcha">Is fire hot or cold?</label>
                                        <input name="captcha" className="hidden-captcha" type="text" />
                                        </div>
                                    </noscript>
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
                    </main>
                </div>
            </main>
            <aside className="page-sidebar col-md-3 col-md-pull-9">
                <div className="widget-even widget-2 black widget wpcm_closest_location" id="wpcm_closest_location-2" data-template="expanded">    
                    <div className="row">
                        <div className="col-xs-12 text--center">
                            <h3 className="bordered-headline--small">{t("location")}</h3>
                        </div>
                    </div>
                    <div className="loading">
                    </div>
                </div>
            </aside>
        </div>
        </article>
        </>
    )
}

export default Contact

export async function getStaticProps({locale}: GetStaticPropsContext) {
    return {
      props: {
        messages: (await import(`../../messages/${locale}.json`)).default
      }
    };
}