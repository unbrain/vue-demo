
let app = new Vue({
    el: '#app',
    data: {
        loginVisible: false,
        signUpVisible: false,
        shareVisible: false,
        themeVisible: false,
        shareURL: '',
        previewResume: {},
        mode: 'edit',
        resume: {
            name: '李安',
            age: '22',
            gender: '男',
            phone: '——————',
            school: '二本',
            email: 'marsorsun@gmil.com',
            description: '心猿码意',
            job: '前端工程师',
            skills: [
                { name: 'HTML5 & CSS3', description: '能独立制作精美网页，掌握 CSS 3 动画、过渡效果、响应式等常用技术。' },
                { name: '移动端页面 ', description: '会使用 REM、vw/vh、FastClick 等技术制作适配手机设备的页面。' },
                { name: 'jQuery', description: '熟悉 jQuery 的常用 API，能使用 jQuery 制作网站、轮播、Tab 组件等。' },
                { name: 'Vue', description: '熟悉 Vue 常用功能，如组件、Vue-Router、双向绑定等。' },
                { name: '前端框架', description: '理解 MVC、MVVM 等思想，可以熟练使用相关的库。' },
            ],
            works: [
                { name: '极简画板', link: 'https://github.com/unbrain/myCanvas', codeLink: 'https://unbrain.github.io/myCanvas/', skills: '原生 JavaScript、Canvas、响应式，iconfont', description: '该项目使用原生JS实现，主要调用 Canvas API，实现了划线、调色与粗细、橡皮擦、保存和清屏功能。对移动端进行兼容。' },
                { name: '键盘书签 ', skills: '原生 JavaScript、LocalStorage', description: '该项目使用原生 JS，动态生成键盘，使用LocalStorage 保存书签。' },
                { name: 'F&I CSS', skills: 'CSS', description: '该项目使用 CSS 实现好看的图标及有意思的动态效果。' },
                { name: '无脸人', skills: '原生 JavaScript、响应式，Prism.js, CSS annimation', description: '该项目使得代码展示在屏幕，并根据代码画出了一个无脸人' },
                { name: '网易云音乐', skills: 'jQuery，leandcloud，七牛云', description: '该项目使用 jQuery 模仿网易云音乐手机端，完成手机端功能并写有 PC 端后台。' },
            ],

        },
        currentUser: {
            objectId: undefined,
            email: '',
        },
        previewUser: {
            objectId: undefined,
        }
    },
    watch: {
        'currentUser.objectId': function (newVal, oldVal) {
            if (newVal) {
                this.getResume(this.currentUser)
            }
        }
    },
    computed: {
        displayResume() {
            return this.mode === 'preview' ? this.previewResume : this.resume
        }
    },
    methods: {
        onEdit(key, value) {
            // skill[2].name
            let reg = /\[(\d+)\]/g
            key = key.replace(reg, (match, number) => '.' + number)
            let keys = key.split('.')
            let result = this.resume
            for (let i = 0; i < keys.length; i++) {
                if (i === keys.length - 1) {
                    result[keys[i]] = value
                } else {
                    result = result[keys[i]]
                }
            }
        },
        onClickSave() {
            let currentUser = AV.User.current()
            console.log(currentUser)
            if (!currentUser) {
                this.signUpVisible = true
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
        saveUser(user) {
            this.signUpVisible = false
            this.currentUser.objectId = user.objectId
            this.currentUser.email = user.email
            alert('注册成功')
        },
        loginUser(user) {
            this.loginVisible = false
            this.currentUser.objectId = user.objectId
            this.currentUser.email = user.email
            alert('登录成功')
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
            window.location.reload()
        },
        getResume(user) {
            var query = new AV.Query('User')
            return query.get(user.objectId).then((user) => {
                return user.toJSON().resume
            }, (error) => {
                // 异常处理
            });
        },
    },
})

// 获取当前用户
let currentUser = AV.User.current()
if (currentUser) {
    app.currentUser = currentUser.toJSON()
    app.getResume(app.currentUser).then(resume => {
        app.resume = resume
    })
    app.shareURL = location.origin + location.pathname + '?user_id' + app.currentUser.objectId
}
// 获取预览用户的 id

let search = location.search
//?user_id5b29f2c09f5454003bbd901f
let reg = /user_id([^&]+)/
let matches = search.match(reg)
if (matches) {
    app.previewUser.objectId = matches[1]
    app.mode = 'preview'
    app.getResume(app.previewUser).then(resume => {
        app.previewResume = resume
    })
}

