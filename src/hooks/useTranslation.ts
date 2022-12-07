import { useRouter } from 'next/router';
import en from '@/locales/en/index.json';
import vi from '@/locales/vi/index.json';

const useTranslation = () => {
  const router = useRouter();

  if (!router) {
    return en;
  }

  const { locale } = router;

  return locale === 'en' ? en : vi;
};

export default useTranslation;
