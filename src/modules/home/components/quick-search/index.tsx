import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useRef, useState } from "react";
// import $ from 'jquery';

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

  // useEffect(() => {
  //   ($(".select-option") as any).selectric();
  // }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const searchParams = new URLSearchParams();

    formData.forEach((value, key) => {
      searchParams.append(key, value.toString());
    });

    const queryString = searchParams.toString();
    router
      .push(`/search?${queryString}`)
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  };

  return (
    <div className="bg-[#f5f5f5]">
      <div className="container ">
        <div className="quick-search-wrapper">
          <div className="quick-search-layout bg-white">
            <div className="quick-search-layout-header">
              <h4>{t("main")}</h4>
            </div>
            <div className="quick-search-control">
              <form className="js-search-form front" onSubmit={handleSubmit}>
                <div className="quick-search-control-flex-box">
                  <div className="quick-search-field quick-search-options">
                    <div className="quick-search-options-box">
                      <input
                        type="radio"
                        name="condition"
                        value="new"
                        id="new"
                        className="bg-[#EAEAEA] text-black" // Darker background, black text for contrast
                        defaultChecked
                      />
                      <label htmlFor="new" className="bg-[#EAEAEA] text-black">
                        {t("new")}
                      </label>

                      <input
                        type="radio"
                        name="condition"
                        value="used"
                        id="used"
                        className="bg-[#EAEAEA] text-black" // Darker background, black text for contrast
                      />
                      <label htmlFor="used" className="bg-[#EAEAEA] text-white">
                        {t("used")}
                      </label>
                    </div>
                  </div>

                  <div className="quick-search-field">
                    <label htmlFor="model">{t("model")}</label>
                    <div className="selectric-wrapper">
                      <select
                        className="selectric" // Ensure the text is dark enough for white background
                        name="model"
                        id="model"
                        aria-labelledby="model"
                        aria-required="true"
                      >
                        {model?.map((item, index) => (
                          <option className="selectric-items" key={index} value={item.string_value}>
                            {item.string_value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="quick-search-field">
                    <label htmlFor="owner">{t("owner")}</label>
                    <div className="selectric-wrapper">
                      <select
                        className="selectric"
                        name="owner"
                        id="owner"
                        aria-labelledby="owner"
                        aria-required="true"
                      >
                        <option value="all">{t("all")}</option>
                        {owner?.map((item, index) => (
                          <option key={index} value={item.string_value}>
                            {item.string_value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="quick-search-field">
                    <label htmlFor="location">{t("location")}</label>
                    <div className="selectric-wrapper">
                      <select
                        className="selectric"
                        name="location"
                        id="location"
                        aria-labelledby="location"
                        aria-required="true"
                      >
                        <option value="all">{t("all")}</option>
                        {location?.map((item, index) => (
                          <option key={index} value={item.string_value}>
                            {item.string_value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="quick-search-field-button h-[50px]">
                    <button
                      type="submit"
                      className="btn btn-primary text-white" // Ensure text is readable on the button
                      disabled={isLoading}
                      aria-live="polite"
                    >
                      {isLoading ? "Loading..." : t("search")}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickSearch;
