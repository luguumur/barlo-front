import Beside from "@modules/layout/components/beside-menu"
import PageHeader from "@modules/layout/components/page-header"
import { HeaderData } from "@data/menu";
import { PartsData } from "@data/parts";

import { useTranslations } from "next-intl";
import { GetStaticPropsContext } from "next";
import TestiCarousel from "@/modules/layout/components/testimonials-carousel";
import { Testimonials } from "@/data/testimonials";
import MasonryGrid from "@/modules/layout/components/masonry";
type Props = {
  params: { title: string[] }
}
const Testimonial = ({ params }: Props) => {
  const t = useTranslations("Menu");
  return (
    <>
      <PageHeader title={t(`testimonials`)} image="https://thompsonmachinery.com/content/uploads/2022/06/cta-banner-image-1536x306.jpg"/>
      <article className="page-body container post-7 page type-page status-publish hentry" id="page-body">
      <div className="row test ">
        <main className="page-content col-md-9 col-md-push-3">
            <section className="customer-block">
            <div className="customers">
                    <MasonryGrid  gap={20}> 
                    {Testimonials.map((item:any, index: any) => (
                        <div className="customer-container" data-customer-category="customer-stories" key={item.id}>
                            <article className="customer customer--customer-stories">
                                <div className="customer__media-container customer__media-container--quote">
                                    <img decoding="async" className="customer__media customer__media--img" src="https://thompsonmachinery.com/content/uploads/2022/01/watco.jpg"/>
                                </div>
                                <div className="customer__details">
                                    <h3 className="customer__name">{item.title}</h3>
                                    <div className="customer__desc">
                                        <p>{item.desc}</p>
                                    </div>
                                    <a className="customer__link button button--primary" href={`/testimonials/${item.id}`}>Read more</a>
                                </div>
                            </article>
                        </div>
                    ))}
                </MasonryGrid>
            </div>
            </section>
        </main>
        <Beside menu={HeaderData} title={t(`testimonials`)} translate="Menu"/>
      </div>
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