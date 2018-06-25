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
                <wired-button elevation="3" @click="$emit('on-click-save')">保存</wired-button>
                <wired-button elevation="3" @click="share">分享</wired-button>
                <wired-button elevation="3" @click="$emit('theme')">换肤</wired-button>
                <wired-button elevation="3" @click="window.print()">打印</wired-button>
            </div>


            <div class="down" v-cloak>
                <wired-button elevation="3" @click="$emit('logout')" v-show="currentUserId">登出</wired-button>
                <wired-button elevation="3" @click="$emit('signup')" v-show="!currentUserId">注册</wired-button>
            </div>
        </aside>
    `
})