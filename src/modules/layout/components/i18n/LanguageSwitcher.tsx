import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { GetStaticPropsContext } from "next";

export default function LocaleSwitcher() {
  const { locale, locales, asPath } = useRouter();
  const otherLocale = locales?.find((cur) => cur !== locale);

  // Simple text display based on current locale
  const switchText = locale === "en" ? "mn" : "en";

  return (
    <Link href={asPath} locale={otherLocale} className="locale text-black bg-white hover:bg-gray-100">
      {switchText}
    </Link>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  let messages;
  try {
    messages = await import(`../../../../../messages/${locale}.json`);
  } catch (e) {
    messages = await import(`../../../../../messages/mn.json`); // Fallback to English
  }
  return {
    props: {
      messages: messages,
    },
  };
}
