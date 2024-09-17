import PageHeader from "@modules/layout/components/page-header";
import { useTranslations } from "next-intl";
import {
    GetServerSideProps,
    GetStaticPropsContext,
    InferGetServerSidePropsType,
} from "next";
import NProgress from "nprogress";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "@/modules/common/components/head";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Questions from "@/modules/layout/components/questions";
import Beside from "@/modules/layout/components/beside-menu";
import { HeaderData } from "@/data/menu";
import MultiStepForm from "@/modules/layout/components/forms/multiple-form";

const careerPage = () => {
    const router = useRouter();
    const { title } = router.query;
    const job = title ? title : null;
    return (
        <>
            <Head title={"Анкет бөглөх"}></Head>
            <PageHeader
                title={"Анкет бөглөх"}
                image="/assets/img/hr/wae_mendchilgee.jpg"
            />
            <article className="page-body container post-97908 deals_specials type-deals_specials status-publish has-post-thumbnail hentry" id="page-body">
                <div className="row">
                    <main className="page-content col-md-9 col-md-push-3">
                        <MultiStepForm job={job}/>
                    </main>
                    <Beside menu={HeaderData} title={"Анкет бөглөх"} translate="Menu" />
                </div>
            </article>
        </>
    )
}
export default careerPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            messages: (await import(`../../../messages/${context.locale}.json`))
                .default,
        },
    };
};

