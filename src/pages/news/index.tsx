import Beside from "@modules/layout/components/beside-menu"
import PageHeader from "@modules/layout/components/page-header"
import { HeaderData } from "@data/menu";
import { PartsData } from "@data/parts";

import { useTranslations } from "next-intl";
import { GetStaticPropsContext } from "next";
import TestiCarousel from "@/modules/layout/components/testimonials-carousel";
import { News } from "@/data/news";
import MasonryGrid from "@/modules/layout/components/masonry";
type Props = {
  params: { title: string[] }
}
const Testimonial = ({ params }: Props) => {
  const t = useTranslations("Menu");
  return (
    <>
      <PageHeader title={t(`news`)} image="https://thompsonmachinery.com/content/uploads/2022/06/cta-banner-image-1536x306.jpg"/>
      <article className="page-body container post-7 page type-page status-publish hentry" id="page-body">
      <main className="page-content col-md-9 col-md-push-3">
        {News.map((item:any, index: any) => ( 
            <div id={index} key={index} className="post">
                <h2 className="post__title" id="post-121718">
                    <a href={`/news/${item.id}`} rel="bookmark" title={item.title}> {item.title}</a>
                </h2>
                <div className="post__date-categories">
                <span>{item.date}</span>
                <span className="pull--right push--right">
                    <b>Categories: </b>
                    <span className="categories">
                    <b>{item.categories}</b>
                    </span>
                </span>
                </div>
                <div className="post__entry min-h-[130px]">
                    <img width="300" height="200" src={item.image}className="alignleft img-responsive wp-post-image" alt="" decoding="async" sizes="(max-width: 300px) 100vw, 300px" /> 
                        {item.desc}
                    <p>
                        <a className="button button--primary" href={`/news/${item.id}`} title="Read the full article entitled 'Thompson Machinery partners with The Nashville Jr. Predators'"> Read More </a>
                    </p>
                </div>
                {/* <h5 className="post__metadata--comments-link"></h5>
                <div className="blog-share-icons">
                <ul className="pull--left hard--left">
                    <li>
                    <h4>Share:</h4>
                    </li>
                    <li>
                    <a className="js-social-share icon-facebook" href="https://www.facebook.com/sharer/sharer.php?u=https://thompsonmachinery.com/jrpredators/&amp;title=Thompson Machinery partners with The Nashville Jr. Predators"></a>
                    </li>
                    <li>
                    <a className="js-social-share icon-twitter" href="https://twitter.com/intent/tweet?status=Thompson Machinery partners with The Nashville Jr. Predators+https://thompsonmachinery.com/jrpredators/"></a>
                    </li>
                    <li>
                    <a className="js-social-share icon-linkedin2" href="https://www.linkedin.com/shareArticle?mini=true&amp;url=https://thompsonmachinery.com/jrpredators/&amp;title=Thompson Machinery partners with The Nashville Jr. Predators&amp;source=https://thompsonmachinery.com"></a>
                    </li>
                    <li>
                    <a className="js-social-share icon-google-plus" href="https://plus.google.com/share?url=https://thompsonmachinery.com/jrpredators/"></a>
                    </li>
                    <li>
                    <a className="js-social-share icon-mail" href="mailto:?subject=Thompson Machinery partners with The Nashville Jr. Predators&amp;body=https://thompsonmachinery.com/jrpredators/"></a>
                    </li>
                </ul>
                </div> */}
            </div>
            ))}
        </main>
        <aside className="page-sidebar  col-md-3 col-md-pull-9">
          <div className="widget-even widget-2 .page-sidebar .textwidget .sidebar-events widget widget_text" id="text-5">
            <h6 className="heading-title accent">Upcoming Events</h6>
            <div className="textwidget">
              <p>
                <a href="http://TMCat.com/events">View Upcoming Events</a>
              </p>
            </div>
          </div>
          <div className="widget-odd widget-3 widget widget_categories" id="categories-3">
            <h6 className="heading-title accent">Categories</h6>
            <ul className="!pt-5">
              <li className="cat-item cat-item-866">
                <a href="">Customer Days</a>
              </li>
              <li className="cat-item cat-item-633">
                <a href="">Events</a>
              </li>
              <li className="cat-item cat-item-632">
                <a href="">News</a>
              </li>
            </ul>
          </div>
            <div className="widget-odd widget-2 widget widget_black_studio_tinymce" id="black-studio-tinymce-2">
              <h6 className="heading-title accent">
                <b>Questions?</b>
                <span>Get In Touch Today</span>
              </h6>
              <div className="textwidget">
                <p></p>
                <div className="wpcf7 js" id="wpcf7-f233-p7-o1" lang="en-US" dir="ltr">
                  <div className="screen-reader-response">
                    <p role="status" aria-live="polite" aria-atomic="true"></p>
                    <ul></ul>
                  </div>
                  <form action="/used/#wpcf7-f233-p7-o1" method="post" className="wpcf7-form init" id="sidebarForm" aria-label="Contact form"  data-status="init">
                    <div className="row">
                      <div className="col-xs-6 col-md-12 form-row">
                        <label>Your Name*</label>
                        <span className="wpcf7-form-control-wrap" data-name="your-name">
                          <input  className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" aria-required="true" aria-invalid="false" type="text" name="your-name"/>
                        </span>
                      </div>
                      <div className="col-xs-6 col-md-12 form-row">
                        <label>Email*</label>
                        <span className="wpcf7-form-control-wrap" data-name="email">
                          <input  className="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email" aria-required="true" aria-invalid="false" type="email" name="email"/>
                        </span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 form-row">
                        <label>Message</label>
                        <span className="wpcf7-form-control-wrap" data-name="message">
                          <textarea  className="wpcf7-form-control wpcf7-textarea textarea-short" aria-invalid="false" name="message"></textarea>
                        </span>
                      </div>
                    </div>
                    <div className="form-row">
                      <input name="imahuman" className="imahuman" type="hidden"/>
                      <noscript>
                        <div className="row no-js-hidden-captcha">
                          <label htmlFor="captcha">Is fire hot or cold?</label>
                          <input name="captcha" className="hidden-captcha" type="text" />
                        </div>
                      </noscript>
                    </div>
                    <input className="wpcf7-form-control wpcf7-currentpage" type="hidden" name="currentpage" />
                    <div className="row">
                      <div className="col-xs-6 col-md-12 form-row">
                        <button className="button button--primary button--block" type="submit" disabled>Submit</button>
                      </div>
                    </div>
                    <div className="wpcf7-response-output" aria-hidden="true"></div>
                  </form>
                </div>
                <p></p>
              </div>
            </div>
        </aside>
      </article>
    </>
  )
}
  
export default Testimonial


export async function getStaticProps({locale}: GetStaticPropsContext) {

    return {
        props: {
            messages: (await import(`../../../messages/${locale}.json`)).default
        }
    };
}