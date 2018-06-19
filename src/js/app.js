Vue.component('editable-span', {
    props: ['value'],
    template: `
        <span class="editable-span">
            <span v-show="!editing">{{ value }}</span>
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

var app = new Vue({
    el: '#app',
    data: {
        resume: {
            name: '李安',
            age: '22',
            gender: '男',
            phone: '——————',
            school: '二本',
            email: 'marsorsun@gmil.com',
        },
    },
    methods: {
        onEdit(key, value) { 
            this.resume[key] = value
        },
    },
})