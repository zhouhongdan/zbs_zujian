import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex)

// https://www.cnblogs.com/chinabin1993/p/9848720.html
const state = {
    count : 0 
}
const mutations = {
    // this.$store.commit('mutationsAddCount',n);
    mutationsAddCount(state, n = 0) {
        return (state.count += n)
    },
    mutationsReduceCount(state, n = 0) {
        return (state.count -= n)
    }
}
const actions = {
    // this.$store.dispatch('actionsAddCount',n)
    actionsAddCount(context, n = 0) {
        console.log(context)
        return context.commit('mutationsAddCount', n)
    },
    actionsReduceCount({ commit }, n = 0) {
        return commit('mutationsReduceCount', n)
    }
}
const getters = {
    // this.$store.getters.getterCount
    getterCount(state, n = 0) {
        return (state.count += n)
    }
}
export default new vuex.Store({
    state,
    getters,
    mutations,
    actions
})

