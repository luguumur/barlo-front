import Head from 'next/head';
import {useTranslations} from 'next-intl';
import {ReactNode, Suspense} from 'react';
import Nav from '@/modules/layout/templates/nav';
import Footer from '@/modules/layout/templates/footer';
import Sidebar from '@/modules/common/components/sidebar';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Loading from '@/modules/layout/components/loading';
type Props = {
  children?: ReactNode;
  title?: string;
};

export default function PageLayout({children, title}: Props) {
  return (
    <>
      <Nav/>
        <Suspense fallback={ <Loading />}>
          {children}
        </Suspense>
        <ToastContainer position="top-right" autoClose={3000} className="font-light text-[13px]" />
      <Footer/>
    </>
  );
}