import { useTranslations } from "next-intl";
import Image from "next/legacy/image";
const Cta = () => {
    const home = useTranslations("Home");
    const menu = useTranslations("Menu");
    return (
        <>
            <section className="cta">
                <div className="cta-banner">
                    <Image priority src={"/assets/img/cta-banner-image.jpg"} width={831} height={165}/>
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