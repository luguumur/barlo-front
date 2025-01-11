import { useTranslations } from "next-intl";
import Image from "next/legacy/image";

type Props = {
  title?: string;
  sub?: any;
  image?: string;
};
const PageHeader = (props: Props) => {
  const t = useTranslations("Menu");
  return (
    <>
      <header className="masthead text--center clearfix" id="masthead">
        <div className="masthead-background">
          <h1> {props.title} </h1>
          <div className="masthead-dark-overlay">
            <div className="masthead-overlay-left ">
              <Image
                priority
                src={"https://d3leeb4r1qy96s.cloudfront.net/assets/img/masthead-graphic-left.png"}
                width={589}
                height={336}
                alt="barloworld mongolia"
                className="entered lazyloaded"
              />
            </div>
            <div className="masthead-overlay-right">
              <Image
                priority
                src={"https://d3leeb4r1qy96s.cloudfront.net/assets/img/masthead-graphic-right.png"}
                width={589}
                height={336}
                alt="barloworld mongolia"
                className="entered lazyloaded"
              />
            </div>
            <span className="masthead-overlay-color"></span>
          </div>
          <div className="masthead-background-image">
            <Image
              priority
              layout="fill"
              className="masthead-background-image entered lazyloaded"
              alt="barloworld mongolia"
              src={props?.image ? props?.image : ""}
            />
          </div>
        </div>
        <div className="breadcrumbs hidden-xxs hidden-xs">
          <div className="container">
            <span>
              <span>
                <a href="/">{t(`home`)}</a>
              </span>
              {props.sub && (
                <>
                  <span className="separator"></span>
                  <span className="breadcrumb_last" aria-current="page">
                    <a href={props.sub?.handle}>{props.sub?.title}</a>
                  </span>
                </>
              )}
              <span className="separator"></span>
              <span className="breadcrumb_last" aria-current="page">
                {props.title}
              </span>
            </span>
          </div>
        </div>
      </header>
    </>
  );
};

export default PageHeader;
