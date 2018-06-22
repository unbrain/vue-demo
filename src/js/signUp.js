Vue.component('signUp', {
    data() {
        return {
            signUpData: {
                email: '',
                password: '',
            },
        }
    },
    methods: {
        saveUser() {
            // 新建 AVUser 对象实例
            var user = new AV.User()
            // 设置用户名
            user.setUsername(this.signUpData.email)
            // 设置密码
            user.setPassword(this.signUpData.password)
            // 设置邮箱
            user.setEmail(this.signUpData.email)
            user.signUp().then((loggedInUser) => {
                this.$emit('saveUser', loggedInUser.toJSON())                
            }, function (error) {
                alert(error.rawMessage)
            });
        },
        onClickLogin(){
            this.$emit('go-login')
        },
    },
    template: `
        <div  class="signUp" v-cloak>
            <div id="particles-js"></div>
            <form class="form" @submit.prevent="saveUser()">
                <h1>注册</h1>
                <div class="close" @click="$emit('close')">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
                <div class="row">
                    <label for="">邮箱</label>
                    <input type="text" v-model="signUpData.email">
                </div>
                <div class="row">
                    <label for="">密码</label>
                    <input type="password" v-model="signUpData.password">
                </div>
                <div class="actions">
                    <button type="submit">提交</button>
                    <button @click="onClickLogin" type="button">登录</button>
                </div>
            </form>
        </div>
    `
})
