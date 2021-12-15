export default {
    namespaced: true,
    state: {
        userInfo: {
            username: '',
            token: ''
        }
    },
    mutations: {
        changeUser(state, params) {
            state.userInfo = params;
        }
    }
}