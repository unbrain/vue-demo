Vue.component('editable-span', {
    props: ['value', 'disabled'],
    template: `
        <span class="editable-span">
            <span @click="editing = disabled ? editing : !editing" v-show="!editing">{{ value }}</span>
            <input v-show="editing" type="text" :value="value" @input="editTri" @keyup.enter="editing=!editing">
            <svg v-if='!disabled' class="icon" aria-hidden="true" @click="editing=!editing">
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
