Vue.component('editable-span', {
    props: ['value'],
    template: `
        <span class="editable-span">
            <span @click="editing=!editing" v-show="!editing">{{ value }}</span>
            <input v-show="editing" type="text" :value="value" @input="editTri" @keyup.enter="editing=!editing">
            <svg class="icon" aria-hidden="true" @click="editing=!editing">
                <use xlink:href="#icon-edit"></use>
            </svg>
        </span>
    `,
    data() {
        return { editing: false }
    },
    methods: {
        editTri(e) {
            this.$emit('edit', e.target.value)
        }
    },
})

let app = new Vue({
    el: '#app',
    data: {

        login: false,
        signUp: false,
        resume: {
            name: '李安',
            age: '22',
            gender: '男',
            phone: '——————',
            school: '二本',
            email: 'marsorsun@gmil.com',
            description: '心猿码意',
            job: '前端工程师',
            about: `Now I have come to the crossroads in my life. I always knew what the right path was. Without exception, I knew. But I never
                    took it, you know why? It was too damn hard`,
        },
        signUpData: {
            email: '',
            password: '',
        },
        loginData: {
            email: '',
            password: '',
        },
        currentUser: {
            objectId: undefined,
            email: '',
        },
    },
    methods: {
        onEdit(key, value) {
            this.resume[key] = value
        },
        onClickSave() {
            let currentUser = AV.User.current()
            console.log(currentUser)
            if (!currentUser) {
                this.signUp = true
            } else {
                this.saveResume()
            }
        },
        saveResume() {
            let { objectId } = AV.User.current().toJSON()
            var todo = AV.Object.createWithoutData('User', objectId)
            // 修改属性
            todo.set('resume', this.resume)
            // 保存到云端
            todo.save().then(() => {
                alert("保存成功")
            });

        },
        saveUser() {
            console.log(this.signUpData)
            // 新建 AVUser 对象实例
            var user = new AV.User()
            // 设置用户名
            user.setUsername(this.signUpData.email)
            // 设置密码
            user.setPassword(this.signUpData.password)
            // 设置邮箱
            user.setEmail(this.signUpData.email)
            user.signUp().then((loggedInUser) => {
                this.signUp = false
                this.currentUser.objectId = loggedInUser.toJSON().objectId
                this.currentUser.email = loggedInUser.toJSON().email
                alert('注册成功')
                console.log(loggedInUser)
            }, function (error) {
                alert(error.rawMessage)
            });
        },
        loginUser() {
            AV.User.logIn(this.loginData.email, this.loginData.password).then((loggedInUser) => {
                this.login = false
                this.currentUser.objectId = loggedInUser.toJSON().objectId
                this.currentUser.email = loggedInUser.toJSON().email
                alert('登录成功')
                console.log(loggedInUser)
            }, function (error) {
                alert(error.rawMessage)
            });
        },
        logOut() {
            if (!this.currentUser.objectId) {
                alert('请先登录')
            } else {
                this.currentUser = {
                    objectId: undefined,
                    email: '',
                },
                    AV.User.logOut()// 现在的 currentUser 是 null 了
                alert("用户已登出")
            }
            window.location.reload
        },
        getResume() {
            var query = new AV.Query('User')
            query.get(this.currentUser.objectId).then((user) => {
                this.resume = user.toJSON().resume
            }, (error) => {
                // 异常处理
            });
        },
    },
})

let currentUser = AV.User.current()
if (currentUser) {
    app.currentUser = currentUser.toJSON()
    console.log(app.currentUser)
    app.getResume()
}