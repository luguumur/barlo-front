import Beside from "@modules/layout/components/beside-menu";
import PageHeader from "@modules/layout/components/page-header";
import { HeaderData } from "@data/menu";
import { useTranslations } from "next-intl";
import { GetServerSideProps, GetStaticPropsContext, InferGetServerSidePropsType, InferGetStaticPropsType } from "next";

const Types: InferGetServerSidePropsType<typeof getServerSideProps> = (props: any) => {
  const t = useTranslations("Menu");
  return (
    <>
      <PageHeader title={t(`d${props.data.title}`)} image="https://thompsonmachinery.com/content/uploads/2022/06/cta-banner-image-1536x306.jpg"/>
      <article className="page-body container post-7 page type-page status-publish hentry" id="page-body">
      <div className="row test ">
        <main className="page-content col-md-9 col-md-push-3">
          <section className="flexible-image-cards">
            <div className="container">
              <div className="flexible-image-cards-header"></div>
              <div className="flexible-image-cards-listing">
                <div className="row js-equal-heights">
                {props.data && props.data.sub.map((item:any, index: any) => (
                  <div key={index} className="col-sm-6">
                    <div className="image-cards-box">
                      <a href={item.handle}>
                        <div className="card-image">
                          <img width="600" height="500" src={item.image} className="img-responsive entered lazyloaded" alt={t(`${item.title}`)} data-lazy-src={item.image} data-ll-status="loaded"/>
                        </div>
                        <div className="image-card-content js-equal-heights-item h-[98px]">
                          <div className="image-card-btn">
                            <span className="image-card-btn-text">{t('learnmore')}</span>
                            <div className="image-card-btn-clippy">
                              <span className="icon-right"></span>
                            </div>
                          </div>
                          <h3>{t(`${item.title}`)}</h3>
                        </div>
                      </a>
                    </div>
                  </div>
                ))}
                </div>
              </div>
            </div>
          </section>
        </main>
        <Beside menu={HeaderData} title={t(`d${props.data.title}`)} translate="Menu"/>
      </div>
      </article>
    </>
  )
}
  
export default Types

export const getServerSideProps: GetServerSideProps = async (context) => {
  let newEquipments:any = HeaderData.filter(function (data) { 
    return data.title == String(context?.params?.types); 
  })
  return {
    props: {
        data: newEquipments[0],
        messages: (await import(`../../../../messages/${context.locale}.json`)).default
    },
  };
};