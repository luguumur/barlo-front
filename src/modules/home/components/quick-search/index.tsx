import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useRef, useState } from "react";
import $ from 'jquery';

type Option = {
  string_value: string;
};

type Props = {
  model?: Option[];
  owner?: Option[];
  location?: Option[];
};

const QuickSearch: React.FC<Props> = ({ model = [], owner = [], location = [] }) => {
  const t = useTranslations("Search");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const selectOptionRef = useRef<HTMLSelectElement | null>(null);

  useEffect(() => {
    ($(".select-option") as any).selectric();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const searchParams = new URLSearchParams();

    formData.forEach((value, key) => {
      searchParams.append(key, value.toString());
    });

    const queryString = searchParams.toString();
    router.push(`/search?${queryString}`).then(() => setIsLoading(false)).catch(() => setIsLoading(false));
  };

  return (
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
                    <fieldset>
                      <legend>{t("type")}</legend>
                      <div className="quick-search-options-box">
                        <input type="radio" name="condition" value="new" id="new" defaultChecked />
                        <label htmlFor="new">{t("new")}</label>
                        <input type="radio" name="condition" value="used" id="used" />
                        <label htmlFor="used">{t("used")}</label>
                      </div>
                    </fieldset>
                  </div>

                  <div className="quick-search-field">
                    <label htmlFor="model">{t("model")}</label>
                    <select className="select-option" name="model" id="model">
                      <option value="all">{t("all")}</option>
                      {model?.map((item, index) => (
                        <option key={index} value={item.string_value}>{item.string_value}</option>
                      ))}
                    </select>
                  </div>

                  <div className="quick-search-field">
                    <label htmlFor="owner">{t("owner")}</label>
                    <select className="select-option" name="owner" id="owner">
                      <option value="all">{t("all")}</option>
                      {owner?.map((item, index) => (
                        <option key={index} value={item.string_value}>{item.string_value}</option>
                      ))}
                    </select>
                  </div>

                  <div className="quick-search-field">
                    <label htmlFor="location">{t("location")}</label>
                    <select className="select-option" name="location" id="location">
                      <option value="all">{t("all")}</option>
                      {location?.map((item, index) => (
                        <option key={index} value={item.string_value}>{item.string_value}</option>
                      ))}
                    </select>
                  </div>

                  <div className="quick-search-field-button">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isLoading}
                      aria-live="polite"
                    >
                      {isLoading ? 'Loading...' : t("search")}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
};

export default QuickSearch;
