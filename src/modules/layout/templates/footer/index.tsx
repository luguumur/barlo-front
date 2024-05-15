import FooterNav from "@modules/layout/components/footer-nav"

const Footer = () => {
  return (
    <footer>
      <div className="container py-[30px]">
        <div className="col-md-6 h-[48.65px] flex items-center ">
          <span className="text-sm">Та сүүлийн үеийн мэдээлэл авахыг хүсвэл имэйлээ холбоно уу</span>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-sm-6 form-field !pr-0">
              <input className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required h-[48.65px]" placeholder="Цахим хаяг" aria-required="true" aria-invalid="false"  type="text" name="your-name"/>
            </div>
            <div className="col-sm-6 form-field">
            <button className="button button--primary button--block" type="submit">Submit</button>
            </div>
          </div>
        </div>
      </div>
      <FooterNav />
    </footer>
  )
}

export default Footer
