Vue.component('theme',{
    methods:{
        changeTheme(name){
            document.body.className = name
        },
    },
    template:`
        <div  class="theme" v-cloak>
            <h1>主题选择</h1>
            <div class="close" @click="$emit('close')">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-close"></use>
                </svg>
                
            </div>
            <button @click="changeTheme('dark')">耀影黑</button>
            <button @click="changeTheme('white')">汝窑白</button>
        </div>
    `
})