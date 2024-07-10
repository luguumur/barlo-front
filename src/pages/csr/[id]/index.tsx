// import Beside from "@modules/layout/components/beside-menu"
// import PageHeader from "@modules/layout/components/page-header"
// import { HeaderData } from "@data/menu";
// import { PartsData } from "@data/parts";

// import { useTranslations } from "next-intl";
// import { GetServerSideProps, InferGetServerSidePropsType } from "next";
// import { ServiceData } from "@/data/service";
// import { Technology } from "@/data/technology";
// import { Testimonials } from "@/data/testimonials";
// import { News } from "@/data/news";
// import Markdown from "react-markdown";
// import { useRouter } from "next/router";

// const Parts: InferGetServerSidePropsType<typeof getServerSideProps> = (props: any) => {
//     const t = useTranslations("Menu");
//     const {locale, locales, route, asPath} = useRouter();
//     const data = props.data
//     return (
//         <>
//             <PageHeader title={t('testimonials')} image="https://thompsonmachinery.com/content/uploads/2022/06/cta-banner-image-1536x306.jpg"/>
//             <article className="page-body container post-7 page type-page status-publish hentry" id="page-body">
//                 <div className="row test ">
                
//                     <main className="page-content col-md-9 col-md-push-3" >
//                     <div className="post__date-categories">            <span>{data.date}
// 	</span>            
	            
// 	<span className="pull--right push--right"><b>Categories:</b> <span className="categories"> 
// 		<a href="" rel="category tag">{data.date}</a>			
// 		</span>
// 	</span>        
	        
// </div>
// <div className="page-content col-md-9 col-md-push-3">
//                         {data.content && <Markdown>{locale === "mn" ? data.content : data.content_en }</Markdown>}
//                     </div>
//                     </main>
                    
//                     <aside className="page-sidebar  col-md-3 col-md-pull-9">
//                     <div className="widget-even widget-2 .page-sidebar .textwidget .sidebar-events widget widget_text" id="text-5">
//                         <h6 className="heading-title accent">Upcoming Events</h6>
//                         <div className="textwidget">
//                         <p>
//                             <a href="http://TMCat.com/events">View Upcoming Events</a>
//                         </p>
//                         </div>
//                     </div>
//                     <div className="widget-odd widget-3 widget widget_categories" id="categories-3">
//                         <h6 className="heading-title accent">Categories</h6>
//                         <ul className="!pt-5">
//                         <li className="cat-item cat-item-866">
//                             <a href="">Customer Days</a>
//                         </li>
//                         <li className="cat-item cat-item-633">
//                             <a href="">Events</a>
//                         </li>
//                         <li className="cat-item cat-item-632">
//                             <a href="">News</a>
//                         </li>
//                         </ul>
//                     </div>
//                         <div className="widget-odd widget-2 widget widget_black_studio_tinymce" id="black-studio-tinymce-2">
//                         <h6 className="heading-title accent">
//                             <b>Questions?</b>
//                             <span>Get In Touch Today</span>
//                         </h6>
//                         <div className="textwidget">
//                             <p></p>
//                             <div className="wpcf7 js" id="wpcf7-f233-p7-o1" lang="en-US" dir="ltr">
//                             <div className="screen-reader-response">
//                                 <p role="status" aria-live="polite" aria-atomic="true"></p>
//                                 <ul></ul>
//                             </div>
//                             <form action="/used/#wpcf7-f233-p7-o1" method="post" className="wpcf7-form init" id="sidebarForm" aria-label="Contact form"  data-status="init">
//                                 <div className="row">
//                                 <div className="col-xs-6 col-md-12 form-row">
//                                     <label>Your Name*</label>
//                                     <span className="wpcf7-form-control-wrap" data-name="your-name">
//                                     <input  className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" aria-required="true" aria-invalid="false" type="text" name="your-name"/>
//                                     </span>
//                                 </div>
//                                 <div className="col-xs-6 col-md-12 form-row">
//                                     <label>Email*</label>
//                                     <span className="wpcf7-form-control-wrap" data-name="email">
//                                     <input  className="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email" aria-required="true" aria-invalid="false" type="email" name="email"/>
//                                     </span>
//                                 </div>
//                                 </div>
//                                 <div className="row">
//                                 <div className="col-md-12 form-row">
//                                     <label>Message</label>
//                                     <span className="wpcf7-form-control-wrap" data-name="message">
//                                     <textarea  className="wpcf7-form-control wpcf7-textarea textarea-short" aria-invalid="false" name="message"></textarea>
//                                     </span>
//                                 </div>
//                                 </div>
//                                 <div className="form-row">
//                                 <input name="imahuman" className="imahuman" type="hidden"/>
//                                 <noscript>
//                                     <div className="row no-js-hidden-captcha">
//                                     <label htmlFor="captcha">Is fire hot or cold?</label>
//                                     <input name="captcha" className="hidden-captcha" type="text" />
//                                     </div>
//                                 </noscript>
//                                 </div>
//                                 <input className="wpcf7-form-control wpcf7-currentpage" type="hidden" name="currentpage" />
//                                 <div className="row">
//                                 <div className="col-xs-6 col-md-12 form-row">
//                                     <button className="button button--primary button--block" type="submit" disabled>Submit</button>
//                                 </div>
//                                 </div>
//                                 <div className="wpcf7-response-output" aria-hidden="true"></div>
//                             </form>
//                             </div>
//                             <p></p>
//                         </div>
//                         </div>
//                     </aside>
//                 </div>
//             </article>
//         </>
//     )
// }
  
// export default Parts

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const testi = News.find(tes => String(tes.id) == context?.params?.id);
//     return {
//       props: {
//           data: testi,
//           messages: (await import(`../../../../messages/${context.locale}.json`)).default
//       },
//     };
// };