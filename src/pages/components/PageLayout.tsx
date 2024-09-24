import { ReactNode } from 'react';
import Nav from '@/modules/layout/templates/nav';
import Footer from '@/modules/layout/templates/footer';
import Sidebar from '@/modules/common/components/sidebar';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import GoogleCaptchaWrapper from '../googleCaptchaWrapper';
type Props = {
  children?: ReactNode;
  title?: string;
};

export default function PageLayout({ children }: Props) {

  return (
    <>
      <GoogleCaptchaWrapper>
        <Nav />
        {children}
        {/* <Sidebar /> */}
        <ToastContainer position="top-right" autoClose={3000} className="font-light text-[13px]" />
        <Footer />
      </GoogleCaptchaWrapper>
    </>
  );
}