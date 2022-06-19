const Menu = Vue.component('menu-component', {
    data: function (){
        return {
            apps: [
                {
                    name: "Datos",
                    app: 0
                }
            ]
        }
    },
    methods: {
        changeAppTrigger: function (appNumber){
            app.changeApp(appNumber)
        }
    },
    template: `
        <ul id="menu-component">
            <li v-for="item in apps">
                <a href="#" @click="changeAppTrigger(item.app)">{{item.name}}</a>
            </li>
        </ul>
    `
})