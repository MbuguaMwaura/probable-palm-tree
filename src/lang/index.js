import { addLocaleData } from 'react-intl';
import enLang from './entries/en-US';
import esLang from './entries/es-ES';
import enRtlLang from './entries/en-US-rtl';
import swLang from './entries/sw-SW';

const AppLocale = {
    en: enLang,
    es: esLang,
    enrtl:enRtlLang,
    sw: swLang
};
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.es.data);
addLocaleData(AppLocale.enrtl.data);
addLocaleData(AppLocale.sw.data);

export default AppLocale;
