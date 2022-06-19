const API   = 'https://crudcrud.com/api/4f21865f7a014a81937f18f564786846'
const model = '/personas'

const Productos = {
    todos: function (cb){
        const url = API + model
        axios.get(url).then( response => {
            // Me devuelve una funcion que tiene un array
            cb(response.data)
        }).catch( err => {
            cb({
                error: `${err}`
            })
        })
    },
    crear: function (obj, cb){
        const url = API + model
        axios.post(url, obj).then( response => {
            cb(response.data)
        }).catch( err => {
            cb({
                error: `${err}`
            })
        })
    },
    eliminar: function (id, cb){
        const url = API + model + '/' + id
        axios.delete(url).then( response => {
            // Me devuelve una funcion que tiene un array
            cb(response.data)
        }).catch( err => {
            cb({
                error: `${err}`
            })
        })
    },
    editar: function (id, obj, cb){
        const url = API + model + '/' + id
        axios.put(url, obj).then( response => {
            cb(response.data)
        }).catch( err => {
            cb({
                error: `${err}`
            })
        })
    },
}
const CrudDatos = Vue.component('datos-componente', {
    data: function (){
        return {
            persona: {},
            items: []
        }
    },
    methods: {
        guardarItem: function (){
            if(!this.persona._id){
                Productos.crear(this.persona, response => {
                    if(!response.error){
                        this.cargaItems()
                    }
                })
            } else {
                // Si me llega la _id edito
                let id      = this.persona._id
                let persona = {...this.persona}
                delete persona._id

                Productos.editar(id, persona, response => {
                    if(!response.error){
                        this.cargaItems()
                    }
                })
            }
            
        },
        cargaItems: function (){ 
            Productos.todos( response => {
                if(!response.error){
                    this.items = response
                    this.persona = {}
                }
                console.log("response :: ", response)
            })
        },
        eliminarItem: function (_id){ 
            Productos.eliminar(_id, response => {
                if(!response.error){
                    this.cargaItems()
                }
            })
        },
        editarItem: function (obj){
            this.persona = {...obj}
        }
    },
    mounted: function (){
        console.log("APP lista :: ")
        this.cargaItems()
    },
    template: `
     <div id="datos-componente">
        <input type="text" v-model="persona.nombre" placeholder="Nombre">
        <input type="text" v-model="persona.apellido" placeholder="Apellido">
        <input type="number" v-model="persona.edad">
        <button @click="guardarItem()">Agregar</button>
        <hr>
        <ul>
            <li v-for="(itm, index) in items" :key="index">
                <span>{{itm.nombre}} {{itm.apellido}} {{itm.edad}}</span>
                <button @click="eliminarItem(itm._id)">Eliminar</button>
                <button @click="editarItem(itm)">Editar</button>
            </li>
        </ul>
     </div>
    `

    // <div id="datos-persona-component">
    //         <input type="text" v-model="nombre" placeholder="Nombre">
    //         <input type="text" v-model="apellido" placeholder="Apellido">
    //         <input type="number" v-model="edad" placeholder="Edad">
    //         <input type="email" v-model="email" placeholder="Correo">
    //         <button @click="guardarItem()">Agregar</button>
    //         <hr>
    //         <ul>
    //             <li v-for="(itm) in items" :key="index">
    //                 <span>{{itm.nombre}} {{itm.apellido}} | Edad: {{itm.edad}} | Correo: {{itm.email}}</span>
    //                 <button @click="eliminarItem(itm._id)">Eliminar</button>
    //                 <button @click="editarItem(itm)">Editar</button>
    //             </li>
    //         </ul>
    //     </div>
})