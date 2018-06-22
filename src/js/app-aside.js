Vue.component('app-aside', {
    props:['currentUser'],
    template:`
        <aside>
            <div class="up">
                <div @click="$emit('onClickSave')">保存</div>
                <div @click="$emit('share')">分享</div>
                <div>换肤</div>
                <div @click="window.print()">打印</div>
            </div>


            <div class="down" v-cloak>
                <div @click="$emit('logout')" v-show="currentUser.objectId">登出</div>
                <div @click="$emit('signup')" v-show="!currentUser.objectId">注册</div>
            </div>
        </aside>
    `
})