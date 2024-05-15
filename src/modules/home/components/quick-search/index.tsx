

import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

type Props = {
    model?: any
    owner?: any
    location?: any
}

const QuickSearch: React.FC<Props> = ({ model, owner, location }) => {
    const t = useTranslations("Search");
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()
    const [route, setRoute] = useState()
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        e.preventDefault()
        try {
            console.log(e.currentTarget)
            const formData = new FormData(e.currentTarget)
            
            const rawFormData = {
                condition: formData.get('condition'),
                model: formData.get('model'),
                owner: formData.get('owner'),
                location: formData.get('location'),
            }
            console.log(rawFormData)
            setIsLoading(false)
            router.push(`/search?condition=${rawFormData.condition}&model=${rawFormData.model}&owner=${rawFormData.owner}&location=${rawFormData.location}`)
        } catch (error) {
            setIsLoading(false)
        }
        
    }
    return (
    <div className="quick-search" id="masthead">
        <div className="container">
            <div className="quick-search-wrapper">
                <div className="quick-search-layout">
                    <div className="quick-search-layout-header">
                        <h4>{t("main")}</h4>
                    </div>
                    <div className="quick-search-control">
                        <form className="js-search-form front" onSubmit={handleSubmit}>
                            <div className="quick-search-control-flex-box">
                                <div className="quick-search-field quick-search-options">
                                    <label>{t("type")}</label>
                                    <div className="quick-search-options-box">
                                        <input type="radio" name="condition" value="new" id="new" defaultChecked/>
                                        <label htmlFor="new">{t("new")}</label>
                                        <input type="radio" name="condition" value="used" id="used"/>
                                        <label htmlFor="used">{t("used")}</label>
                                    </div>
                                </div>
                                <div className="quick-search-field">
                                    <label htmlFor="type">{t("model")}</label>
                                    <select className="select-option" name="model" id="model">
                                        <option value="all">{t("all")}</option>
                                        {model.map((item:any, index:any) => (
                                            <option key={index} value={item.attribute_id}>{item.string_value}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="quick-search-field">
                                    <label htmlFor="hours">{t("owner")}</label>
                                    <select className="select-option"  name="owner" id="owner">
                                        <option value="all">{t("all")}</option>
                                        {owner.map((item:any, index:any) => (
                                            <option key={index} value={item.attribute_id}>{item.string_value}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="quick-search-field">
                                    <label htmlFor="price">{t("location")}</label>
                                    <select className="select-option" name="location" id="location">
                                        <option value="all">{t("all")}</option>
                                        {location.map((item:any, index:any) => (
                                            <option key={index} value={item.attribute_id}>{item.string_value}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="quick-search-field-button">
                                    <button type="submit" className="btn btn-primary" disabled={isLoading}>{isLoading ? 'Loading...' : t("search")}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default QuickSearch

