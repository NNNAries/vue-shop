import Vue from 'vue'
import Element from 'element-ui'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

import enLocale from 'element-ui/src/locale/lang/en'
import zhLocale from 'element-ui/src/locale/lang/zh-CN'

import English from './English'
import Chinese from './Chinese'

const messages = {
    en: {
        ...English,
        ...enLocale
    },
    zh: {
        ...Chinese,
        ...zhLocale
    }
}

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
    locale: 'zh', // 设置地区
    messages, // 设置地区信息
})
//配置element支持vuei18n 
Element.i18n((key, value) => i18n.t(key, value))
export default i18n
