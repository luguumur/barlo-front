import Button from "@modules/common/components/button"
import { useTranslations } from "next-intl";
import Image from "next/legacy/image";

const About = () => {

  const homet = useTranslations("Home");
  return (
    <section className="home-about">
      <div className="home-about-graphics-right hidden-xs-down">
        <Image priority src={"/assets/img/graphics1-497x283.png"} className="img-responsive entered lazyloaded" width={497} height={283} layout="intrinsic"  />
      </div>
      <div className="home-about-graphics-left hidden-sm-down">
        <Image priority src={"/assets/img/graphics2-585x272.png"} className="img-responsive entered lazyloaded" width={585} height={272} layout="intrinsic" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="home-about-right-panel">
              <h2>{homet("welcome")}</h2>
              <p>{homet("description")}</p>
              <p>
                <a className="button button--primary" href="/about-us/">{homet("more")}</a>
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="home-about-left-panel">
              <div className="home-about-image">
                <Image src="/assets/img/HOME_Parts.jpg" width={643} height={364} className="lazyloaded" alt="Barloworld Mongolia" layout="intrinsic" />
                <div className="home-about-image-overlay">
                  <a className="video-button-link external" data-fancybox="goal-video" href="https://www.youtube.com/watch?v=sds1NxKwucM&ab_channel=BarloworldMongolia" target="_blank" rel="noopener">
                    <div className="video-button-outer">
                      <div className="video-button-inner">
                        <span className="play-btn"></span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="home-about-short-content">
                <div className="home-about-short-content-flex-box">
                  <div className="home-about-short-content-heading">
                    <h5>Vision</h5>
                  </div>
                  <div className="home-about-short-content-info">
                    <p>To be the best Cat dealer, period.</p>
                  </div>
                </div>
                <div className="home-about-short-content-flex-box">
                  <div className="home-about-short-content-heading">
                    <h5>Mission</h5>
                  </div>
                  <div className="home-about-short-content-info">
                    <p>Superior Services. Lasting Relationships. Stronger Communities.</p>
                  </div>
                </div>
                <div className="home-about-short-content-flex-box">
                  <div className="home-about-short-content-heading">
                    <h5>Values</h5>
                  </div>
                  <div className="home-about-short-content-info">
                    <p>Barloworld Mongolia is committed to honesty, integrity, respect, safety, high quality, and positive attitude.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About