"use client";
import { useParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { GetStaticPropsContext } from "next";
import Questions from "../questions";
type Props = {
  title?: string;
  menu?: any;
  translate: string;
};

const Beside = (props: Props) => {
  const pathname = usePathname();
  let translat1e = props.translate;
  const translate = useTranslations(translat1e);
  return (
    <aside className="page-sidebar col-md-3 col-md-pull-9">
      <div className="widget-even widget-2 black widget wpcm_closest_location">
        <h5>{props.title}</h5>
        <nav className="sublist-pages">
          <ul id="menu-main-navigation-1" className="menu">
            {props.menu.map((item: any, index: any) => (
              <li
                key={index}
                id={`menu-item-${item.id}`}
                className={`menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children ${
                  item.handle == pathname ? "current-menu-item page_item current_page_item" : ""
                }`}
              >
                <a href={item.handle}>{translate(`${item.title}`)}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <Questions />
    </aside>
  );
};

export default Beside;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../../messages/${locale}.json`)).default,
    },
  };
}
