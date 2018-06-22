Vue.component('app-aside', {
    props: ['currentUserId'],
    methods: {
        share() {
            if (!currentUser) {
                this.$emit('on-click-save')
            } else {
                this.$emit('share')
            }
        },
    },
    template: `
        <aside>
            <div class="up">
                <div @click="$emit('on-click-save')">保存</div>
                <div @click="share">分享</div>
                <div>换肤</div>
                <div @click="window.print()">打印</div>
            </div>


            <div class="down" v-cloak>
                <div @click="$emit('logout')" v-show="currentUserId">登出</div>
                <div @click="$emit('signup')" v-show="!currentUserId">注册</div>
            </div>
        </aside>
    `
})