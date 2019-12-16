import { login, logout, getInfo, getAvatar } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  userInfo: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { email, password } = userInfo

    var formdata = new FormData()
    formdata.append('email', email)
    formdata.append('password', password)

    return new Promise((resolve, reject) => {
      login(formdata).then(response => {

        commit('SET_TOKEN', email)
        setToken(email)
        resolve()
      }).catch(error => {
        console.log(error, 'error')
        reject(error)
      })
    })

  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      var formdata = new FormData()
      formdata.append('email', state.token)


      getInfo(formdata).then(response => {
        const { data } = response

        // if (!data) {
        //   reject('Verification failed, please Login again.')
        // }

        // const { name, avatar } = data

        // commit('SET_NAME', name)
        // commit('SET_AVATAR', avatar)
        resolve(response)
      }).catch(error => {
        reject(error)
      })


    })
  },

  // get user avatar
  getAvatar({ commit, state }) {
    return new Promise((resolve, reject) => {
      var formdata = new FormData()
      formdata.append('email', state.token)

      getAvatar(formdata).then(response => {
        console.log(response,2221)
        const  data  = response


        const reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onload = () => {
          console.log(reader.result,'777')
          commit('SET_AVATAR', reader.result)
        }  
        resolve(response)
      }).catch(error => {
        reject(error)
      })


    })
  },


  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
