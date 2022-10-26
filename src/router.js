//importar la dependecia de vue
import Vue from 'vue'

//importar la dependecia de vue router
import VueRouter from 'vue-router'

import axios from 'axios'
const url_auth = (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000') + ''

Vue.use(VueRouter)

/* componentes backOffice */
import BackOffice from './componentesBackOffice/BackOffice.vue'
import Inicio from './componentesBackOffice/Inicio.vue'
import Deas from './componentesBackOffice/Deas.vue'
import Usuarios from './componentesBackOffice/Usuarios.vue'
import FormularioEditarUsuario from './componentesBackOffice/FormularioEditarUsuario.vue'
import FormularioEditarDea from './componentesBackOffice/FormularioEditarDea'

//Contemplar eliminar
import FormularioAltaUsuario from './componentesBackOffice/FormularioAltaUsuario.vue'

export const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '*', redirect: '/' },
        { path: '/', redirect: '/login',  meta:{ requireAuth: true} },        
        { path: '/login', component:BackOffice,  meta:{ requireAuth: false}}, 
        { path: '/inicio', component: Inicio, meta:{ requireAuth: true} },                  
        { path: '/usuarios', component: Usuarios, meta:{ requireAuth: true} },
        { path: '/editarUsuario/:mail', name: 'editarUsuario', component: FormularioEditarUsuario, props: true,  meta:{ requireAuth: true} },
        { path: '/deas', component: Deas,  meta:{ requireAuth: true} },
        { path: '/editarDea/:id', name: 'editarDea', component: FormularioEditarDea, props: true,  meta:{ requireAuth: true} },

        //Contemplar eliminar
        { path: '/formularioAltaUsuario', component: FormularioAltaUsuario, meta:{ requireAuth: true} },
    ]
})

async function checkLogin(){
    try{
        const token =  localStorage.getItem('access_token')
            if(token){
                const res = await axios.get(url_auth + "/user?access_token=" + token)
                if(res.status === 200){
                    return true
                }else{
                    return false
                }
            }
    }catch(error){
        console.log(error)
        return false
    }
}

router.beforeResolve(async (to, from, next) => {
    try{
        let isUserAuthenticated = await checkLogin(); 
        if (!isUserAuthenticated && to.meta.requireAuth) {
            location.replace("/Login");
            return false;
        }
        next();
    }catch(error) {
        console.log('Autenticación', await checkLogin())
            console.log(error)
    }
});