import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import VueI18n from 'vue-i18n';

Vue.use(Vuetify);
Vue.use(VueI18n);

const messages = {
    en: {
        $vuetify: {
            title: {
                pageTitle: 'Dashboard'
            }
        },
    },
    fa: {
        $vuetify: {
            title: {
                pageTitle: 'داشبورد'
            }
        },
    }
}

const i18n = new VueI18n({
    locale: 'fa', // set locale
    messages, // set locale messages
})

export default new Vuetify({
    rtl: true,
    lang: {
        t: (key, ...params) => i18n.t(key, params),
    },
});
