Vue.component('resume', {
    props: ['mode', 'displayResume'],
    data() {
        return {}
    },
    methods: {
        appendSkill() {
            this.displayResume.skills.push({ name: '技能名', description: '技能描述' })
        },
        minusSkill(index) {
            this.displayResume.skills.splice(index, 1)
        },
        appendWork() {
            this.displayResume.works.push({ name: '项目名称', skills: '技术点', description: '描述' })
        },
        minusWork(index) {
            this.displayResume.works.splice(index, 1)
        },
        onEdit(k, v) {
            this.$emit('on-edit', k, v)
        },
    },
    template: `
    <main>
        <div class="banner">
            <div class="mark"></div>
        </div>
        <div class="resumeMain">
            <div class="your-element" data-tilt>
                <div data-y class="userCard" id="jAbout">
                    <div class="pictureandtext">
                        <div class="text">
                            <span class="welcome">
                                <editable-span :disabled="mode === 'preview'" :value="displayResume.job" @edit="onEdit('job', $event)"></editable-span>
                                <span class="triangle"></span>
                            </span>
                            <h1>
                                <editable-span :disabled="mode === 'preview'" :value="displayResume.name" @edit="onEdit('name', $event)"></editable-span>
                            </h1>
                            <p>
                                <editable-span :disabled="mode === 'preview'" :value="displayResume.description" @edit="onEdit('description', $event)">
                            </p>
                            <hr>
                            <dl>
                                <dt>年龄</dt>
                                <dd>
                                    <editable-span :disabled="mode === 'preview'" :value="displayResume.age" @edit="onEdit('age', $event)">
                                </dd>
                                <dt>学校</dt>
                                <dd>
                                    <editable-span :disabled="mode === 'preview'" :value="displayResume.school" @edit="onEdit('school', $event)">
                                </dd>
                                <dt>邮箱</dt>
                                <dd>
                                    <editable-span :disabled="mode === 'preview'" :value="displayResume.email" @edit="onEdit('email', $event)">
                                </dd>
                                <dt>手机</dt>
                                <dd>
                                    <editable-span :disabled="mode === 'preview'" :value="displayResume.phone" @edit="onEdit('phone', $event)"></editable-span>
                                </dd>
                            </dl>
                        </div>
                        <div class="picture">
                        </div>
                    </div>
                    <footer class="media">
                        <a href="#">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-github-square"></use>
                            </svg>
                        </a>
                        <a href="#">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-zhihu"></use>
                            </svg>
                        </a>
                        <a href="#">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-weixin"></use>
                            </svg>
                        </a>
                        <a href="#">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-gmail"></use>
                            </svg>
                        </a>
                    </footer>
                </div>
            </div>
    
            <p class="selfIntroduction">
                <editable-span :disabled="mode === 'preview'" :value="displayResume.about" @edit="onEdit('about', $event)"></editable-span>
            </p>
    
            <section data-y class="skills" id="jSkills">
                <h2>技能列表</h2>
                <ol>
                    <li v-for="skill,index in displayResume.skills">
                        <h3>
                            <editable-span :disabled="mode === 'preview'" :value="skill.name" @edit="onEdit('skills['+ index + '].name', $event)"></editable-span>
                            <svg v-if="index > 3 && mode === 'edit'" class="icon minusSkill" @click="minusSkill(index)">
                                <use xlink:href="#icon-minus"></use>
                            </svg>
                        </h3>
                        <div class="proBar"></div>
                        <h4>
                            <editable-span :disabled="mode === 'preview'" :value="skill.description" @edit="onEdit('skills['+ index + '].description', $event)"></editable-span>
                        </h4>
                    </li>
                    <svg v-if="mode === 'edit'" class="icon appendSkill" @click="appendSkill()">
                        <use xlink:href="#icon-add"></use>
                    </svg>
                </ol>
    
            </section>
            <section data-y class="works" id="jWorks">
                <h2>项目经历</h2>
                <ol>
                    <li v-for="work, index in displayResume.works">
                        <div class="skillTitile">
                            <h3>
                                <editable-span :disabled="mode === 'preview'" :value="work.name" @edit="onEdit('works[' + index + ' ].name', $event)"></editable-span>
                                <svg v-if="index > 3 && mode === 'edit'" class="icon minusWork" @click="minusWork(index)">
                                    <use xlink:href="#icon-minus"></use>
                                </svg>
                            </h3>
                            <h3>
                                <button>
                                    <a :href="work.link">源码链接</a>
                                </button>
                                <button>
                                    <a :href="work.codeLink">项目链接</a>
                                </button>
                            </h3>
                        </div>
    
                        <div class="proBar"></div>
                        <h4>技术栈:</h4>
                        <h5>
                            <editable-span :disabled="mode === 'preview'" :value="work.skills" @edit="onEdit('works[' + index + ' ].skills', $event)"></editable-span>
                        </h5>
                        <h4>项目描述:</h4>
                        <h5>
                            <editable-span :disabled="mode === 'preview'" :value="work.description" @edit="onEdit('works[' + index + ' ].description', $event)"></editable-span>
                        </h5>
                    </li>
                    <svg v-if="mode === 'edit'" class="icon appendWork" @click="appendWork()">
                        <use xlink:href="#icon-add"></use>
                    </svg>
                </ol>
            </section>
    
            <p v-if="mode === 'edit'" class="resumeDown" @click="$emit('mode-preview')">
                <a target="_blank" class="button" download="">预览 PDF 简历</a>
            </p>
            <div class="exitPreview" v-if="mode === 'preview'" @click="$emit('mode-edit')">
                <button>退出预览</button>
            </div>
        </div>
        
    </main>
    `
})