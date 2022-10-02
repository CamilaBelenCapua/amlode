//importar la dependecia de vue
import Vue from 'vue'

//importar la dependecia de Vuex
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'
import buffer from 'buffer'

console.log("process.env.NODE_ENV " + process.env.NODE_ENV)

const url = (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:1026') + ''
const url_auth = (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000') + ''

export default new Vuex.Store({
    state: {
        usuarios: [],
        deas: [],
        usuario: '',
        dea: '',
        token: '',
        expires: ''
    },

    getters: {
        deas: state => state.deas
    },

    actions: {

        //APIS USUARIOS//

        async getUsuarios({ commit }) {
            try {
                const usuarios = await axios.get(url + "/v2/entities?type=user")
                commit('GET_Usuarios', usuarios.data)
                return usuarios.data
            }
            catch (error) {
                alert("Problema al cargar los usuarios")
            }
        },

        async eliminarUsuario({ commit }, id) {
            try {
                await axios.delete(url + "/v2/entities/" + id + "?type=user")
                commit('DELETE_Usuario', id)
                return true
            }
            catch (error) {
                return false
            }
        },

        async agregarUsuario({ commit }, usuarioNuevo) {
            try {
                const { data: usuario } = await axios.post(url + "/v2/entities",
                    usuarioNuevo,
                    { 'Content-Type': 'application/json' })
                commit('POST_Usuario', usuario)
                return true
            }
            catch (error) {
                return false
            }
        },

        async actualizarDeasByUsuario({ commit }, deaUsuario) {
            const { data: usuario } = await axios.get(url + "/v2/entities/" + deaUsuario.idUsuario + "?type=user")
            const idDeas = usuario.deas.value
            const newArray = [...idDeas, deaUsuario.idDea];

            let body = {
                deas: { type: "StructuredValue", value: newArray }
            }
            try {
                const { data: usuario } = await axios.patch(url + "/v2/entities/" + deaUsuario.idUsuario +
                    "/attrs?type=user", body, { 'content-type': 'application/json' })
                commit('PATCH_Usuario', usuario)
                return true
            }
            catch (error) {
                return false
            }
        },

        async actualizarUsuario({ commit }, usuarioModificado) {
            let body = {
                active: {type: "Boolean", value: usuarioModificado.active.value},
                points: {type: "Number", value: usuarioModificado.points.value}
            }

            try {
                const { data: usuario } = await axios.patch(url + "/v2/entities/" + usuarioModificado.id +
                    "/attrs?type=user", body, { 'content-type': 'application/json' })
                commit('PATCH_Usuario', usuario)
                return true
            }
            catch (error) {
                alert(error)
                return false
            }
        },

        async loguearUsuario({ commit }, credenciales) {
            try {
                const { data: usuario } = await axios.post(url + "/api/usuarios/login", credenciales, { 'content-type': 'application/json' })
                commit('SET_USUARIO', usuario)
                return true
            }
            catch (error) {
                return false
            }
        },

        async loguearAdmin({ commit }, credenciales) {
            try {
                const params = new URLSearchParams()
                params.append("username", credenciales.name)
                params.append("password", credenciales.password)
                params.append("grant_type", "password")

                const usuario = await axios.post(url_auth + "/oauth2/token", params,
                {headers:{'content-type': 'application/x-www-form-urlencoded',
                  'Authorization': 'Basic ' + buffer.Buffer.from(process.env.VUE_APP_ID_CLIENT + ':' + 
                                    process.env.VUE_APP_ID_SECRET).toString('base64')}
                })
                commit('Login', usuario)
                return true
            }
            catch (error) {
                return false
            }
        },

        async getUsuarioByMail({ commit }, mail) {
            try {
                const usuario = await axios.get(url + "/v2/entities/" + mail + "?type=user")
                commit('GET_USUARIO', usuario.data)
                return usuario.data
            }
            catch (error) {
                return null
            }
        },

        //APIS DEAS//

        async getDeas({ commit }) {
            try {
                const { data: deas } = await axios.get(url + "/v2/entities?type=dea")
                commit('GET_Deas', deas)
            }
            catch (error) {
                alert("Problema al cargar los DEAS")
            }
        },

        async agregarDea({ commit }, deaNuevo) {
            try {
                const { data: dea } = await axios.post(url + "/v2/entities", deaNuevo, { 'content-type': 'application/json' })
                commit('POST_Dea', dea)
                return true
            }
            catch (error) {
                return false
            }
        },

        async actualizarDea({ commit }, deaAModificar) {
            let body = {
                latitude: {type: "String", value: deaAModificar.latitude.value},
                longitude: {type: "String", value: deaAModificar.longitude.value},
                active: {type: "Boolean", value: deaAModificar.active.value}
            }

            try {
                const { data: dea } = await axios.patch(url + "/v2/entities/" + deaAModificar.id +
                "/attrs?type=dea",body,{ 'content-type': 'application/json' })
                commit('PATCH_Dea', dea)
                return true
            }
            catch (error) {
                alert(error)
                return false
            }
        },

        async borrarDea({ commit }, id) {
            try {
                const { data: dea } = await axios.delete(url + "/v2/entities" + id + "?type=dea")
                commit('DELETE_Dea', dea)
                return true
            }
            catch (error) {
                return false
            }
        },

        async getDeaById({ commit }, id) {
            try {
                const { data: dea } = await axios.get(url + "/v2/entities/" + id + "?type=dea")
                commit('GET_Dea', dea)
                return true
            }
            catch (error) {
                return false
            }
        },

    },

    mutations: {

        Login(state, usuario){
            state.token = usuario.data['access_token']
            state.expires = usuario.data['expires_in']
        },

        //USUARIOS//

        GET_Usuarios(state, data) {
            state.usuarios = data
        },

        DELETE_Usuario(state, id) {
            let index = state.usuarios.findIndex(usuario => usuario.id == id)
            state.usuarios.splice(index, 1)
        },

        POST_Usuario(state, data) {
            state.usuarios.push(data)
        },

        PATCH_Usuario(state, data) {
            let index = state.usuarios.findIndex(usuario => usuario.id == data.id)
            state.usuarios.splice(index, 1, data)
            state.usuario = data
        },

        GET_USUARIO(state, data) {
            state.usuario = data
        },

        PUT_results(state, data) {
            state.usuario.results = data
        },

        //DEAS//

        GET_Deas(state, data) {
            state.deas = data
        },

        POST_Dea(state, data) {
            state.deas.push(data)
        },

        GET_Dea(state, data) {
            state.dea = data
        },

        PATCH_Dea(state, data) {
            let index = state.deas.findIndex(dea => dea.id == data.id)
            state.deas.splice(index, 1, data)
            state.dea = data
        },

        DELETE_Dea(state, data) {
            let index = state.deas.findIndex(dea => dea.id == data.id)
            if (index == -1) throw new Error('dea no encontrado')
            state.deas.splice(index, 1)
        },
    }

})