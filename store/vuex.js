import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: function () {
            return {
                bg_color: [],
                div_color: []
            }
        },
        mutations: {



        },
        created: {

        }
    })
}

export default createStore