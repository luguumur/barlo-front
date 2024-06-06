import PageHeader from "@modules/layout/components/page-header"
import axios from "axios";
import https from "https";
import { GetServerSideProps, GetStaticPropsContext } from "next";

const New = () => {
    return (
      <>
        <PageHeader title="NEW CUSTOMER OFFER"/>
        <article className="page-body container post-97908 deals_specials type-deals_specials status-publish has-post-thumbnail hentry" id="page-body">
          <div className="row">
            <main className="page-content col-md-9 col-md-push-3">
                <p>
                    <img decoding="async" className="alignnone wp-image-105324 entered lazyloaded" src="https://thompsonmachinery.com/content/uploads/2020/06/Conquest-16-Hero-300x168.jpg" alt="" width="1066" height="597" data-lazy-srcset="https://thompsonmachinery.com/content/uploads/2020/06/Conquest-16-Hero-300x168.jpg 300w, https://thompsonmachinery.com/content/uploads/2020/06/Conquest-16-Hero-1024x572.jpg 1024w, https://thompsonmachinery.com/content/uploads/2020/06/Conquest-16-Hero-768x429.jpg 768w, https://thompsonmachinery.com/content/uploads/2020/06/Conquest-16-Hero.jpg 1031w" data-lazy-sizes="(max-width: 1066px) 100vw, 1066px" data-lazy-src="https://thompsonmachinery.com/content/uploads/2020/06/Conquest-16-Hero-300x168.jpg" data-ll-status="loaded" sizes="(max-width: 1066px) 100vw, 1066px" srcSet="https://thompsonmachinery.com/content/uploads/2020/06/Conquest-16-Hero-300x168.jpg 300w, https://thompsonmachinery.com/content/uploads/2020/06/Conquest-16-Hero-1024x572.jpg 1024w, https://thompsonmachinery.com/content/uploads/2020/06/Conquest-16-Hero-768x429.jpg 768w, https://thompsonmachinery.com/content/uploads/2020/06/Conquest-16-Hero.jpg 1031w"/>
                </p>
                <h2 className="center">
                    <span className="e2ma-style">Right now, earn up to $12,000* in Cat Prepaid Credit with a qualifying new Cat® machine purchase.</span>
                </h2>
                <p>&nbsp;</p>
                <p className="center">
                    <span className="e2ma-style" >Not sure what machine is right for you?&nbsp;</span>
                </p>
                <p className="center">
                    <span className="e2ma-style" >Schedule a machine consultation with one of our equipment experts and receive a $100 Cat Prepaid Credit just for your time.</span>
                </p>
                <h3></h3>
                <p>&nbsp;</p>
                <p>
                    <span>
                    <img decoding="async" className="wp-image-132798 alignleft entered lazyloaded" src="https://thompsonmachinery.com/content/uploads/2020/06/Screenshot-2023-08-21-112427-e1692641509584-300x121.jpg.webp" alt="" width="664" height="268" data-lazy-srcset="https://thompsonmachinery.com/content/uploads/2020/06/Screenshot-2023-08-21-112427-e1692641509584-300x121.jpg.webp 300w,https://thompsonmachinery.com/content/uploads/2020/06/Screenshot-2023-08-21-112427-e1692641509584-768x309.jpg.webp 768w,https://thompsonmachinery.com/content/uploads/2020/06/Screenshot-2023-08-21-112427-e1692641509584-759x305.jpg.webp 759w,https://thompsonmachinery.com/content/uploads/2020/06/Screenshot-2023-08-21-112427-e1692641509584-500x201.jpg.webp 500w,https://thompsonmachinery.com/content/uploads/2020/06/Screenshot-2023-08-21-112427-e1692641509584-585x235.jpg.webp 585w,https://thompsonmachinery.com/content/uploads/2020/06/Screenshot-2023-08-21-112427-e1692641509584-831x334.jpg.webp 831w,https://thompsonmachinery.com/content/uploads/2020/06/Screenshot-2023-08-21-112427-e1692641509584-826x332.jpg.webp 826w,https://thompsonmachinery.com/content/uploads/2020/06/Screenshot-2023-08-21-112427-e1692641509584-646x260.jpg.webp 646w,https://thompsonmachinery.com/content/uploads/2020/06/Screenshot-2023-08-21-112427-e1692641509584-565x227.jpg.webp 565w,https://thompsonmachinery.com/content/uploads/2020/06/Screenshot-2023-08-21-112427-e1692641509584.jpg.webp 948w" data-lazy-sizes="(max-width: 664px) 100vw, 664px" data-lazy-src="https://thompsonmachinery.com/content/uploads/2020/06/Screenshot-2023-08-21-112427-e1692641509584-300x121.jpg.webp" data-ll-status="loaded" sizes="(max-width: 664px) 100vw, 664px" srcSet="https://thompsonmachinery.com/content/uploads/2020/06/Screenshot-2023-08-21-112427-e1692641509584-300x121.jpg.webp 300w,https://thompsonmachinery.com/content/uploads/2020/06/Screenshot-2023-08-21-112427-e1692641509584-768x309.jpg.webp 768w,https://thompsonmachinery.com/content/uploads/2020/06/Screenshot-2023-08-21-112427-e1692641509584-759x305.jpg.webp 759w,https://thompsonmachinery.com/content/uploads/2020/06/Screenshot-2023-08-21-112427-e1692641509584-500x201.jpg.webp 500w,https://thompsonmachinery.com/content/uploads/2020/06/Screenshot-2023-08-21-112427-e1692641509584-585x235.jpg.webp 585w,https://thompsonmachinery.com/content/uploads/2020/06/Screenshot-2023-08-21-112427-e1692641509584-831x334.jpg.webp 831w,https://thompsonmachinery.com/content/uploads/2020/06/Screenshot-2023-08-21-112427-e1692641509584-826x332.jpg.webp 826w,https://thompsonmachinery.com/content/uploads/2020/06/Screenshot-2023-08-21-112427-e1692641509584-646x260.jpg.webp 646w,https://thompsonmachinery.com/content/uploads/2020/06/Screenshot-2023-08-21-112427-e1692641509584-565x227.jpg.webp 565w,https://thompsonmachinery.com/content/uploads/2020/06/Screenshot-2023-08-21-112427-e1692641509584.jpg.webp 948w"/>
                    <br/> $500 Cat </span>Prepaid Credit <br/> WITH THE PURCHASE OF A NEW: <br/> » Compact Track Loader <br/> » Compact Wheel Loader <br/> » Utility compactor <br/> » Skid Steer Loader
                </p>
                <p>&nbsp;</p>
                <h3>To schedule your machine consultation and get your $100 Cat Prepaid Credit, call&nbsp;a Thompson Sales Rep today!</h3>
                <p>&nbsp;</p>
                <p>
                    <strong>
                    <a className="button button--primary" href="tel:615-280-9383">CALL NOW 615-280-9383</a>
                    </strong>
                </p>
                <h2></h2>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                
                <hr/>
                <p>*These offers are valid September 1, 2023 – December 31, 2023 and are subject to additional terms and conditions. Offer only valid for new Thompson Machinery customers or current Thompson customers who have not purchased a new machine in 5 or more years. Contact your Thompson sales representative for additional information.</p>
                <p>&nbsp;</p>
                <div className="blog-share-icons">
                    <ul className="pull--left hard--left">
                    <li>
                        <h4>Share:</h4>
                    </li>
                    <li>
                        <a className="js-social-share icon-facebook" href="http://www.facebook.com/sharer/sharer.php?u=https://thompsonmachinery.com/deals-specials/newcustomer/&amp;title=NEW CUSTOMER OFFER"></a>
                    </li>
                    <li>
                        <a className="js-social-share icon-twitter" href="http://twitter.com/intent/tweet?status=NEW CUSTOMER OFFER+https://thompsonmachinery.com/deals-specials/newcustomer/"></a>
                    </li>
                    <li>
                        <a className="js-social-share icon-linkedin2" href="http://www.linkedin.com/shareArticle?mini=true&amp;url=https://thompsonmachinery.com/deals-specials/newcustomer/&amp;title=NEW CUSTOMER OFFER&amp;source=https://thompsonmachinery.com"></a>
                    </li>
                    <li>
                        <a className="js-social-share icon-google-plus" href="https://plus.google.com/share?url=https://thompsonmachinery.com/deals-specials/newcustomer/"></a>
                    </li>
                    <li>
                        <a className="js-social-share icon-mail" href="mailto:?subject=NEW CUSTOMER OFFER&amp;body=https://thompsonmachinery.com/deals-specials/newcustomer/"></a>
                    </li>
                    </ul>
                </div>
            </main>
            <aside className="page-sidebar  col-md-3 col-md-pull-9">
              <div className="widget-even widget-2 widget widget_black_studio_tinymce" id="black-studio-tinymce-2">
                  <h6 className="heading-title accent">
                  <b>Questions?</b>
                  <span>Get In Touch Today</span>
                  </h6>
                  <div className="textwidget">
                    <div className="wpcf7 js" id="wpcf7-f233-o1" lang="en-US" dir="ltr">
                      <div className="screen-reader-response">
                        <p role="status" aria-live="polite" aria-atomic="true"></p>
                        <ul></ul>
                      </div>
                      <form action="/deals-specials/#wpcf7-f233-o1" method="post" className="wpcf7-form init" id="sidebarForm" aria-label="Contact form" data-status="init">
                        <div className="row">
                          <div className="col-xs-6 col-md-12 form-row">
                            <label>Your Name*</label>
                            <span className="wpcf7-form-control-wrap" data-name="your-name">
                              <input className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" aria-required="true" aria-invalid="false" type="text" name="your-name"/>
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
                              <textarea className="wpcf7-form-control wpcf7-textarea textarea-short" aria-invalid="false" name="message"></textarea>
                            </span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xs-6 col-md-12 form-row">
                            <button className="button button--primary button--block" type="submit">Submit</button>
                          </div>
                        </div>
                        <div className="wpcf7-response-output" aria-hidden="true"></div>
                      </form>
                    </div>
                  </div>
              </div>
            </aside>
          </div>
        </article>
      </>
    )
  }
  
export default New


export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id
  const instance = axios.create({
    httpsAgent: new https.Agent({  
      rejectUnauthorized: false
    })
  });
  let detailConfig = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.apiDomain}/deals/${id}`,
      headers: { }
    };
  
  const detail = await instance.request(detailConfig)
  return {
      props: {
          detail: detail.data,
          messages: (await import(`../../../../messages/${context.locale}.json`)).default
      },
  };
};