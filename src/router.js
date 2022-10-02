//importar la dependecia de vue
import Vue from 'vue'

//importar la dependecia de vue router
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* componentes backOffice */
import BackOffice from './componentesBackOffice/BackOffice.vue'
import FormularioAltaUsuario from './componentesBackOffice/FormularioAltaUsuario.vue'
import FormularioEditarUsuario from './componentesBackOffice/FormularioEditarUsuario.vue'
import Usuarios from './componentesBackOffice/Usuarios.vue'
import Deas from './componentesBackOffice/Deas.vue'
import FormularioEditarDea from './componentesBackOffice/FormularioEditarDea'
import LoginBackOffice from './componentesBackOffice/LoginBackOffice'

/*front*/
import Inicio from './componentes/Inicio.vue'

export const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '*', redirect: '/' },
        { path: '/', redirect: '/inicio' },
        { path: '/BackOffice', component: BackOffice },        
        { path: '/formularioAltaUsuario', component: FormularioAltaUsuario },
        { path: '/editarUsuario/:mail', name: 'editarUsuario', component: FormularioEditarUsuario, props: true },
        { path: '/usuarios', component: Usuarios },    
        { path: '/deas', component: Deas }, 
        { path: '/Login', component:LoginBackOffice},  
        { path: '/editarDea/:id', name: 'editarDea', component: FormularioEditarDea, props: true },


        /*front*/
        { path: '/inicio', component: Inicio },   

             
    ]
})