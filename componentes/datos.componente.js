const API   = 'https://crudcrud.com/api/acd1d6876e3f4ae6b9efb5ec8af07d5d'
const model = '/personas'

const Datos = {
    todos: function (cb){
        const url = API + model
        axios.get(url).then( response => {
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
            items: [],
            pass: false
        }
    },
    methods: {
        guardarItem: function (){
            if(!this.persona._id)
            {  
                Datos.crear(this.persona,  response => {
                    if(!response.error){
                        this.cargaItems()
                    }
                })
            } else {
                let id      = this.persona._id
                let persona = {...this.persona}
                delete persona._id

                Datos.editar(id, persona, response => {
                    if(!response.error){
                        this.cargaItems()
                    }
                })
            }
            
        },
        cargaItems: function (){ 
            Datos.todos( response => {
                if(!response.error){
                    this.items = response
                    this.persona = {}
                }
                console.log("response :: ", response)
            })
        },
        eliminarItem: function (_id){ 
            Datos.eliminar(_id, response => {
                if(!response.error){
                    this.cargaItems()
                }
            })
        },
        editarItem: function (obj){
            this.persona = {...obj}
        },
        obtenerFecha(){
            const date = new Date();
            return this.fecha = date.toLocaleDateString()
        },
    },
    mounted: function(){
        this.cargaItems()
        this.obtenerFecha()
    },
    template: `
     <div id="datos-componente">
     <form>

    <label for="Nombre">Nombre</label>
    <input type="text" id="name" value="Nombre" v-model="persona.nombre">

    <label for="Apellido">Apellido</label>
    <input type="text" id="apellido" value="Apellido" v-model="persona.apellido">

    <label for="edad">Edad</label>
    <input type="number" id="edad" value="edad" v-model="persona.edad">

    <label for="Contraseña">Contraseña</label>
    <input type="password" id="password" value="password" v-model="persona.pass">

    <label for="Correo">Correo</label>
    <input type="email" id="correo" value="correo" v-model="persona.email">

    <label for="Genero">Genero</label>
    <select value="Genero "v-model="persona.genero">
        <option >Masculino</option>
        <option >Femenino</option>
        <option >Otro</option>
    </select>

    <label for="Estado">Activo</label>
    <select value="Estado" v-model="persona.activo">
        <option selected>Sí</option>
        <option>No</option>
    </select>

    <label for="Altura">Altura</label>
    <input type="number" id="altura" value="altura" v-model="persona.altura">
    </form>
    
     <button id="add__btn" @click="guardarItem()">Agregar</button>
     <hr>
     <ul>
     <thead>
     <tr>
         <th>Nombre</th>
         <th>Apellido</th>
         <th>Edad</th>
         <th>Contraseña</th> 
         <th>Correo</th> 
         <th>Genero</th> 
         <th>Altura</th> 
         <th>Activo</th> 
         <th>Fecha Creación</th>
     </tr>
     </thead>
         <li v-for="(itm, index) in items" :key="index">
         <table>
              <td >{{itm.nombre}}
              <td >{{itm.apellido}}</td>
              <td >{{itm.edad}}</td> 
              <td >{{itm.pass}}</td> 
              <td >{{itm.email}}</td> 
              <td >{{itm.genero}}</td> 
              <td >{{itm.altura}} CM</td> 
              <td >{{itm.activo}}</td> 
              <td >{{obtenerFecha()}}</td>
         <td><button id="edit__btn" @click="editarItem(itm)">Editar</button></td>
         <td> <button id="del__btn" @click="eliminarItem(itm._id)">Eliminar</button></td>

            </table>  
         </li>
     </ul>
     </div>
    `
})