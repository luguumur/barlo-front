import { useTranslations } from "next-intl";
const Cta = () => {
    const home = useTranslations("Home");
    const menu = useTranslations("Menu");
    return (
        <>
            <section className="cta">
                <div className="cta-banner">
                    <img width="831" height="165" src="https://thompsonmachinery.com/content/uploads/2021/11/cta-banner-image-831x165.jpg" className="img-responsive entered lazyloaded" alt="" data-lazy-src="https://thompsonmachinery.com/content/uploads/2021/11/cta-banner-image-831x165.jpg" data-ll-status="loaded" />
                </div>
                <div className="cta-overlay">
                    <div className="container">
                        <div className="cta-content">
                            <h2>{home("wearehere")}</h2>
                            <p>{home("do_you_need_equipment")}</p>
                            <p><a className="btn btn-primary" href="/contact-us/">{menu("contact")}</a></p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cta