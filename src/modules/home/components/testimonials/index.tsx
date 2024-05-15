import TestiCarousel from "@modules/layout/components/testimonials-carousel"

const Testimonials = () => {
  return (
    <div className="home-testimonials clearfix">
      <div className="home-testimonials-wrapper clearfix">
        <div className="home-testimonials-banner hidden-md-down">
          <img width="831" height="625" src="/assets/img/test.jpg" className="img-responsive entered lazyloaded" alt="" data-lazy-src="/assets/img/test.jpg" data-ll-status="loaded"/>
        </div>
        <div className="home-testimonials-right-panel">
          <div className="home-testimonials-header">
            <h2>
              <span>Hear From</span> Our Customers
            </h2>
          </div>
          <div className="home-testimonials-slider-wrapper">
            <div className="home-testimonials-slider home-testimonials-slider-homepage slick-initialized slick-slider">
              <TestiCarousel />
            </div>
            <a href="/testimonials" target="_self" className="btn btn-primary"> Read all testimonials </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonials