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
        }
    }

}


Vue.use(VueForm, options);



