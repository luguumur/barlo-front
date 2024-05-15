import PageHeader from "@modules/layout/components/page-header"
import { GetServerSideProps, GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import axios from 'axios';

type Repo = {
  name: string
  stargazers_count: number
}
 
export const getServerSideProps = (async () => {
  // Fetch data from external API
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const repo: Repo = await res.json()
  // Pass data to the page via props
  return { props: { repo } }
}) satisfies GetServerSideProps<{ repo: Repo }>
 
export default function Deals({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(repo)
  return (
    <>
        <PageHeader title="deals & specials"/>
        <article className="page-body container post-97908 deals_specials type-deals_specials status-publish has-post-thumbnail hentry" id="page-body">
          <div className="row">
            <main className="page-content col-md-9 col-md-push-3 specials-deals">
              <div className="row">
                  <div className="col-sm-6 box-deals">
                  <a href="/deals-specials/newcustomer" className="deal" id="deal-97908">
                      <h2 className="post__title"> NEW CUSTOMER OFFER </h2>
                      <img width="2088" height="1046" src="https://thompsonmachinery.com/content/uploads/2020/06/MicrosoftTeams-image-2.jpg" className="img-responsive wp-post-image entered lazyloaded" alt="" decoding="async" fetchPriority="high" data-lazy-srcset="https://thompsonmachinery.com/content/uploads/2020/06/MicrosoftTeams-image-2.jpg 2088w, https://thompsonmachinery.com/content/uploads/2020/06/MicrosoftTeams-image-2-300x150.jpg 300w, https://thompsonmachinery.com/content/uploads/2020/06/MicrosoftTeams-image-2-1024x513.jpg 1024w, https://thompsonmachinery.com/content/uploads/2020/06/MicrosoftTeams-image-2-768x385.jpg 768w, https://thompsonmachinery.com/content/uploads/2020/06/MicrosoftTeams-image-2-1536x769.jpg 1536w, https://thompsonmachinery.com/content/uploads/2020/06/MicrosoftTeams-image-2-2048x1026.jpg 2048w" data-lazy-sizes="(max-width: 2088px) 100vw, 2088px" data-lazy-src="https://thompsonmachinery.com/content/uploads/2020/06/MicrosoftTeams-image-2.jpg" data-ll-status="loaded" sizes="(max-width: 2088px) 100vw, 2088px" srcSet="https://thompsonmachinery.com/content/uploads/2020/06/MicrosoftTeams-image-2.jpg 2088w, https://thompsonmachinery.com/content/uploads/2020/06/MicrosoftTeams-image-2-300x150.jpg 300w, https://thompsonmachinery.com/content/uploads/2020/06/MicrosoftTeams-image-2-1024x513.jpg 1024w, https://thompsonmachinery.com/content/uploads/2020/06/MicrosoftTeams-image-2-768x385.jpg 768w, https://thompsonmachinery.com/content/uploads/2020/06/MicrosoftTeams-image-2-1536x769.jpg 1536w, https://thompsonmachinery.com/content/uploads/2020/06/MicrosoftTeams-image-2-2048x1026.jpg 2048w"/>
                      <button className="button button--primary button--block"> Read More </button>
                  </a>
                  </div>
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