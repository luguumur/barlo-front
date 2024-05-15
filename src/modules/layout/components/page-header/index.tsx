import { useTranslations } from "next-intl";

type Props = {
    title?: string,
    image?: string
}
const PageHeader = (props: Props) => {
    const t = useTranslations("Menu");
    return (
        <>
        <header className="masthead text--center clearfix" id="masthead">
            <div className="masthead-background">
                <h1> {props.title} </h1>
                <div className="masthead-dark-overlay">
                    <img width="589" height="336" className="masthead-overlay-left entered lazyloaded" src="https://thompsonmachinery.com/content/uploads/2021/10/masthead-graphic-left.png" data-lazy-src="/content/uploads/2021/10/masthead-graphic-left.png" data-ll-status="loaded"/>
                    <img width="588" height="336" className="masthead-overlay-right entered lazyloaded" src="https://thompsonmachinery.com/content/uploads/2021/10/masthead-graphic-right.png" data-lazy-src="/content/uploads/2021/10/masthead-graphic-right.png" data-ll-status="loaded"/>
                    <span className="masthead-overlay-color"></span>
                </div>
                <img width="1920" height="382" className="masthead-background-image entered lazyloaded" src={props.image} data-lazy-src="/content/uploads/2021/10/cta-banner-image.jpg" data-ll-status="loaded"/>
            </div>
            <div className="breadcrumbs hidden-xxs hidden-xs">
                <div className="container">
                <span>
                    <span>
                    <a href="/">{t(`home`)}</a>
                    </span>
                    <span className="separator"></span>
                    <span className="breadcrumb_last" aria-current="page">{props.title}</span>
                </span>
                </div>
            </div>
            </header>
        </>
    )
}

export default PageHeader