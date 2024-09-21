import { useTranslations } from "next-intl";
import Image from "next/image";
const Cta = () => {
    const home = useTranslations("Home");
    return (
        <section className="cta">
            <div className="cta-banner relative h-[500px] w-full">
                <Image
                    priority
                    src="https://d3leeb4r1qy96s.cloudfront.net/assets/img/cta-banner-image.jpg"
                    fill
                    alt="cta-banner"
                    style={{ objectFit: "cover" }}
                />
            </div>
            <div className="cta-overlay absolute inset-0 bg-black bg-opacity-50 flex items-center">
                <div className="container">
                    <div className="cta-content text-white">
                        <h2>{home("wearehere")}</h2>
                        <p>{home("do_you_need_equipment")}</p>
                        <p><a className="btn btn-primary" href="/contact-us/">{home("contact")}</a></p>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Cta