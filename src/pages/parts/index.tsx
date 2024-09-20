import Beside from "@modules/layout/components/beside-menu"
import PageHeader from "@modules/layout/components/page-header"
import { HeaderData } from "@data/menu";
import { PartsData } from "@data/parts";

import { useTranslations } from "next-intl";
import { GetStaticPropsContext } from "next";
type Props = {
  params: { title: string[] }
}
const Parts = ({ params }: Props) => {
  const t = useTranslations("Menu");
  return (
    <>
      <PageHeader title={t(`parts`)} image="https://d3leeb4r1qy96s.cloudfront.net/assets/img/cta-banner-image-1536x306.jpg"/>
      <article className="page-body container page type-page status-publish hentry" id="page-body">
      <div className="row">
        <main className="page-content col-md-9 col-md-push-3">
        <section className="flexible-image-cards">
            <div className="container">
              <div className="flexible-image-cards-header"></div>
              <div className="flexible-image-cards-listing">
                <div className="row js-equal-heights">
                {PartsData.map((item:any, index: any) => (
                  <div key={index} className="col-sm-4">
                    <div className="image-cards-box">
                      <a href={item.handle}>
                        <div className="card-image">
                          <img width="600" height="500" src={item.image} className="img-responsive entered lazyloaded cover" alt={t(`${item.title}`)} data-lazy-src={item.image} data-ll-status="loaded"/>
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
          {/* <section>
            <h3>
              <a href="#">
                <strong>СЭЛБЭГ / ХҮЧ ДАМЖУУЛАХ ЭД АНГИ</strong>
              </a>
            </h3>
            <p>
              <img className="alignleft size-full wp-image-4686 entered lazyloaded" src="https://www.barloworld.mn/images/drivetrain.png" alt="used-parts" width="350" height="250" />
            </p>
            <p>Дэлхий даяар бүх төрлийн ажлын талбарт Cat тоног төхөөрөмжүүд нь захын дамжуулагч болон хурдны хайрцгийн тусламжтайгаар хүч дамжуулж урагш хөдлөн, газар шорооны ажил хийдэг. Caterpillar-ын оригинал хүч дамжуулах эд ангийн сэлбэгүүдийг тогтмол засвар үйлчилгээ, засварын хувилбаруудтай хамтад нь ашигласнаар тоног төхөөрөмжийн бүтээмжийг хамгийн өндөр түвшинд хүргэж, ашиглалтын зардлыг бууруулах боломжтой. Cat хүч дамжуулах эд анги нь дараах ачааллыг тэсвэрлэх чадвартай хийгдсэн байдаг: Их хэмжээний мушгих момент Цохилт ихтэй хөрсөн дээр ажиллах Хөдөлгөөний чиглэл болон арааг олон дахин солих г.м Катерпиллар нь эдгээр хэрэгцээ шаардлагыг бүрэн хангасан хурдны хайрцаг, захын дамжуулагчийг зохион бүтээж үйлдвэрлэдэг ба бодит ажлын талбартай ижилхэн нөхцөлд туршилтад оруулж тестлэдэг. Үүний үр дүнд тоног төхөөрөмжийн насжилтын хугацаанд удаан ашиглагдаж, илүү сайн ажиллах хүч дамжуулах эд анги бий болдог.</p>
            <h5>ХҮЧ ДАМЖУУЛАХ АНГИ:</h5>
            <ul>
              <li>Холхивч</li>
              <li>Тоормос</li>
              <li>Дифференциал</li>
              <li>Кардан Гол</li>
              <li>Захын Дамжуулагч</li>
              <li>Үрэлтийн Материал</li>
              <li>Гидротрансформатор</li>
              <li>Хурдны Хайрцаг</li>
            </ul>
            <p>
              <img decoding="async" className="alignright size-full wp-image-25264 entered lazyloaded" src="https://www.barloworld.mn/images/drivetrain2.png" alt="Barloworld Mongolia" height="108" data-ll-status="loaded"/>
            </p>
          </section>
          <section>
            <h2>ЯВАХ АНГИ</h2>
            <p>
              <img decoding="async" className="alignright wp-image-120042 entered lazyloaded" src="https://www.barloworld.mn/images/Undercarriage.png" alt="Undercarriage parts" width="400" height="300" />
            </p>
            <p>Катерпиллар® нь 100 гаруй жилийн турш гинжит явах эд анги бүхий машины сэлбэг хэрэгслийг зохион бүтээж, үйлдвэрлэж ирсэн. Бид таны машиныг ямар нөхцөлд илүү бүтээмжтэй, үр ашигтай ажиллуулахыг сайн мэднэ. Хамгийн чухал зүйл нь явах ангидаа хэрхэн хөрөнгө оруулалахаас шалтгаалж машины бүтээл байж болох хамгийн дээд түвшинд хүрч ажиллах ба бид үүнийг л танд зөвлөх үүрэгтэй. Гинжит машиныг эзэмших болон ашиглах зардлын 50% нь явах ангийн зардлаас хамаардаг гэж үзвэл хамгийн их үнэ цэнэтэй зөвлөгөөг бид таны системд зориулан хүргэх учиртай юм. Бид таны санхүүгийн байдал болон ажлын шаардлагад нийцүүлэн явах ангийг хэд хэдэн төрлөөр санал болгож байна. Таны машины болон ажлын сонголт тус бүр өөрийн гэсэн нөлөөтэй байдаг.</p>
            <p>Таны гүйцэтгэх ажил болон боломжуудыг судалж, тухайн нөхцөлд тань зориулж хамгийн сайн бүтээмж, удаан эдэлгээ болон үнэ цэнэ бүхий сонголт хийхэд тань бид тусална. Та явах ангиа хэр зэрэг нарийвчлалтай тохируулан сонгох тусам таны ажил төдий чинээ үр дүнтэй, байх болно. Иймээс бид бусад ямар ч үйлдвэрлэгчдээс илүү олон төрлийн явах ангийн сонголтыг Cat® машинууддаа санал болгодог. Бидний санал болгож буй явах ангийн сэлбэг бүрийг Катерпиллар компанийн мэргэжлийн инженерүүд зохион бүтээсэн бөгөөд үйлчлүүлэгчдийнхээ бодит туршлага дээр үндэслэн нарийвчилсан үзүүлэлтүүдийн дагуу үйлдвэрлэсэн. Тиймээс, та Кат явах ангийг сонгохдоо энэ нь зүгээр нэг зөв сонголт ч биш, хамгийн шилдэг сонголт гэдэгт итгэлтэй байж болно.</p>
            <p>&nbsp;</p>
            <h2>Бидэнтэй зөвлөлдөөрэй!</h2>
            <p>Манай мэргэжилтнүүд таны явах ангид тусгай багаж хэрэгсэл болон програм ашиглан хэмжилт, үзлэгийг үнэ төлбөргүй хийж, үүн дээрээсээ үндэслэн зөв тохиргоо, засвар болон дараагийн сонголтыг тань ямар байхад зөвлөж туслах болно. </p>
            <p>Тиймээс та явах ангидаа аль сонголт тохирох болохыг манай бүтээгдэхүүн дэмжих хэлтсийн мэргэжилтнүүдтэй зөвлөлдөөрэй.</p>
            <h3>Cat явах ангийн үнэгүй үзлэгээ захиал!</h3>
            <p>7018-7588</p>
            
            <h3>Явах ангийн элэгдлийг хэрхэн удирдах вэ?</h3>
            <iframe width="1020" height="590" src="https://www.youtube.com/embed/JIcqePEw138?wmode=transparent" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
          </section> */}
        </main>
        <Beside menu={HeaderData} title={t(`parts`)} translate="Menu"/>
      </div>
      </article>
    </>
  )
  }
  
export default Parts


export async function getStaticProps({locale}: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default
    }
  };
}