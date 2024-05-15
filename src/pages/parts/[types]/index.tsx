import Beside from "@modules/layout/components/beside-menu"
import PageHeader from "@modules/layout/components/page-header"
import { HeaderData } from "@data/menu";
import { PartsData } from "@data/parts";

import { useTranslations } from "next-intl";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const Parts: InferGetServerSidePropsType<typeof getServerSideProps> = (props: any) => {
    const t = useTranslations("Menu");
    const data = props.data
    return (
        <>
            <PageHeader title={t(`parts`)} image="https://thompsonmachinery.com/content/uploads/2022/06/cta-banner-image-1536x306.jpg"/>
            <article className="page-body container post-7 page type-page status-publish hentry" id="page-body">
                <div className="row test ">
                    <main className="page-content col-md-9 col-md-push-3" dangerouslySetInnerHTML={{ __html: data.content }}>
                    </main>
                    <Beside menu={HeaderData} title={t(`parts`)} translate="Menu"/>
                </div>
            </article>
        </>
    )
}
  
export default Parts

export const getServerSideProps: GetServerSideProps = async (context) => {

    const part = PartsData.find(part => part.title === context?.params?.types);
  
    return {
      props: {
          data: part,
          messages: (await import(`../../../../messages/${context.locale}.json`)).default
      },
    };
};