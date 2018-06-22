Vue.component('login', {
    props: ['loginVisible',],
    data() {
        return {
            loginData: {
                email: '',
                password: '',
            },
        }
    },
    methods: {
        loginUser() {
            AV.User.logIn(this.loginData.email, this.loginData.password).then((loggedInUser) => {
                user = loggedInUser.toJSON()
                this.$emit('login-user', user)
            }, function (error) {
                alert(error.rawMessage)
            });
        },
        onClickSignUp() {
            this.$emit('go-sign-up')
        },
    },
    template: `
        <div class="login" v-cloak>
            <div id="particles-js"></div>
            <form class="form" @submit.prevent="loginUser()">
                <h1>登录</h1>
                <div class="close" >
                    <svg class="icon" aria-hidden="true" @click="$emit('close')">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
                <div class="row">
                    <label for="">邮箱</label>
                    <input type="text" v-model="loginData.email">
                </div>
                <div class="row">
                    <label for="">密码</label>
                    <input type="password" v-model="loginData.password">
                </div>
                <div class="actions">
                    <button type="submit">提交</button>
                    <button @click="onClickSignUp" type="button">注册</button>
                </div>
            </form>
        
        </div>
    
    
    `
})