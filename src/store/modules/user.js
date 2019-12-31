import { login, logout, getInfo, getAvatar, sendVerificationCode, queryVerifyStatus } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  userInfo: {},
  verifyStatus: '',
  publicAddress: localStorage.publicAddress || ''
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
  },
  SET_VERIFYSTATUS: (state, verifyStatus) => {
    state.verifyStatus = verifyStatus
  },
  SET_PUBLICADRESS: (state, publicAddress) => {
    state.publicAddress = publicAddress
  },

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
        const { name } = data

        commit('SET_NAME', name)
        commit('SET_USERINFO', data)
        resolve(response)
      }).catch(error => {
        reject(error)
      })


    })
  },
  // get verify status
  queryVerifyStatus({ commit, state }) {
    return new Promise((resolve, reject) => {
      var formdata = new FormData()
      formdata.append('email', state.token)


      queryVerifyStatus(formdata).then(response => {
        const { data } = response

        commit('SET_VERIFYSTATUS', data)
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
        const  data  = response

        if(/text+/.test(data.type)){
          var reader = new FileReader();//new一个FileReader实例
          reader.onload = function() {
            if(this.result.length>200){
               commit('SET_AVATAR', this.result)
            }
          }
          reader.readAsText(data);
        }else{
            const reader = new FileReader();
            reader.readAsDataURL(data);
            reader.onload = () => {
              commit('SET_AVATAR', reader.result)
            }  
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })


    })
  },

  // user logout
  logout({ commit, state }) {
    commit('SET_TOKEN', '')
    removeToken()
    resetRouter()
    // return new Promise((resolve, reject) => {
    //   logout(state.token).then(() => {
    //     commit('SET_TOKEN', '')
    //     removeToken()
    //     resetRouter()
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
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
