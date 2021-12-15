import base from './base'
import axios from 'axios'
// const qs = require('querystring')
import qs from 'querystring'

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

const api = {
    getGoods(page) {
        return axios.get(base.goodsUrl + '?page=' + page)
    },
    getSearch(search) {
        return axios.get(base.searchUrl, {
            params: {
                search
            }
        })
    },
    getCategory(id) {
        return axios.get(base.categoryUrl, {
            params: {
                id
            }
        })
    },
    addGoods(params) {
        return axios.get(base.addGoods, { params })
    },
    delGoods(id) {
        return axios.get(base.delGoods, {
            params: {
                id
            }
        })
    },
    updateGoods(params) {
        return axios.get(base.updateGoods, { params })
    },
    // 登录
    login(params) {
        return axios.post(base.loginUrl, qs.stringify(params))
    },
    // 获取统计数据-销售信息
    getSellInfo() {
        return axios.get(base.sellInfoUrl)
    },
    getCompareInfo() {
        return axios.get(base.compareUrl)
    },
    // 获取规格参数列表
    getParams(page) {
        return axios.get(base.paramsList, {
            params: {
                page
            }
        })
    },
    searchParams(search) {
        return axios.get(base.searchParamsUrl, {
            params: {
                search
            }
        })
    },
    // 添加规格参数
    addParams(params) {
        return axios.get(base.addParamsUrl, { params })
    },
    // 删除规格参数
    delParams(id) {
        return axios.get(base.delParams, { params: { id } })
    },
    // 获取规格参数配置
    getRulesParams(cid) {
        return axios.get(base.getRulesParams, {
            params: {
                cid
            }
        })
    },
    // 获取订单列表
    getOrderList(currPage) {
        return axios.get(base.orderListUrl, { params: { currPage } })
    }
}

export default api