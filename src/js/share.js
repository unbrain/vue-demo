Vue.component('share', {
    props: ['shareUrl'],
    template: `
        <div class="share" v-cloak>
            <h1>分享链接</h1>
            <div class="close" @click="$emit('close')">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-close"></use>
                </svg>
            </div>
            <textarea readonly>{{ shareUrl }}</textarea>
        </div>
    `
})