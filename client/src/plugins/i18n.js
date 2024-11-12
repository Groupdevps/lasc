import Vue from 'vue';
import VueI18n from 'vue-i18n';
import enLenguage from '@/plugins/lenguages/en.js'
import esLenguage from '@/plugins/lenguages/es.js'


Vue.use(VueI18n);

const messages = {
    'en'    : enLenguage,
    'es'    : esLenguage
};

const i18n = new VueI18n({
    locale  : 'es', // set locale
    fallbackLocale  : 'es', // set fallback locale
    messages, // set locale messages
});

export default i18n;