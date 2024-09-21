import Link from 'next/link';
import {useRouter} from 'next/router';
import {useTranslations} from 'next-intl';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');

  const {locale, locales, route, asPath} = useRouter();
  const otherLocale = locales?.find((cur) => cur !== locale);

  return (
    <Link href={asPath} locale={otherLocale} className='locale'>
      {t('switchLocale', {locale: otherLocale})}
    </Link>
  );
}