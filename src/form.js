//importar la dependecia de vue
import Vue from 'vue'

//importar la dependecia de vue-form
import VueForm from 'vue-form'

var options = {
    validators: {
        'menoredad': function (value) {
            var noPasa = false
            if (568025136000 <= (new Date() - new Date(value))) {
                console.log("ES MAYOR")
                noPasa = true
            }
            return noPasa
        },

        'validateemail': function(value){
            var email = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,4})+$/
            return email.test(value)
        },

        'validatename': function(value){
            var name = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
            return name.test(value)
        },

        'validateaddress': function(value){
            var name = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]*[A-Za-z0-9\s]+$/g;
            return name.test(value)
        },

        'validateprovstate': function(value){
            var name = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
            return name.test(value)
        },

        

        'validatelatitude': function(value){
            var coordenada = /^[-+]?((0|([1-8]\d?))(\.\d{1,15})?|90(\.0{1,10})?)$/
            return coordenada.test(value)
        },

        'validatelongitude': function(value){
            var coordenada = /^[+-]?((([1-9]?[0-9]|1[0-7][0-9])(\.[0-9]{1,15})?)|180(\.0{1,6})?)$/
            return coordenada.test(value)
        },

       
    }
}

Vue.use(VueForm, options);



