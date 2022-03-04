<template>
    <div class="page-wrap">
        <h1 class="app-name">Add To Do</h1>
        <div class="form">
            <div class="form-to-do">
                <label for="" class="form__label">To-do</label>
                <input v-model="task.title" type="text" name="text" class="form-to-do__input">
            </div>
            <div class="form-time-wrap">
                <div class="form-time">
                    <label for="" class="form__label">Start-time</label>
                    <input v-model="task.start" type="time" name="start" class="form-time__input" >
                </div>
                <div class="form-time">
                    <label for="" class="form__label">End-time</label>
                    <input v-model="task.end" type="time" name="end" class="form-time__input" >
                </div>
            </div>
            <button @click="submit" class="submit" :class="{ disabled : nullCheck}" type="submit" :disabled="nullCheck">OK</button>
        </div>
    </div>  
</template>

<script>
import { mapActions } from "vuex"
    export default{
        name: 'FormView',
        data(){
            return{
                task: {
                    title: '',
                    start: '',
                    end: ''
                }
            }
        },
        created(){
            // パラメーターがなければ/formに遷移
            if(!this.$route.params.task_id){
                return
            }
            // storeのgetAddressByIdにURLのパラメーターを渡して呼び出す
            const task = this.$store.getters.getAddressById(this.$route.params.task_id)
            if(task){
                // パラメーターに一致するtaskがあればフォームにデータを復元
                this.task=task
            } else {
                // パラメーターに一致するtaskがなければlistに遷移
                this.$router.push({ name: 'list'})
            }
        },
        methods: {
            submit(){
                if(this.$route.params.task_id){
                    this.updateTask({id:this.$route.params.task_id, task: this.task})
                } else {
                    // storeのtasksにtaskオブジェクトを格納
                    this.addTask(this.task)
                }
                this.$router.push({name: 'list'})
                this.task = {}
            },
            ...mapActions(['addTask','updateTask'])
        },
        computed: {
            nullCheck(){
                // title,start,endいずれかが空の場合nullCheckはtrueを返す
                return this.task.title === '' || this.task.start === '' || this.task.end === ''
            }
        }
    }
</script>

<style lang="scss" scoped>
.page-wrap{
    padding-top: 72px;
    padding-bottom: 72px;
}

.app-name {
    color: #FFFFFF;
    font-size: 24px;
    text-align: center;
    margin-bottom: 48px;
}

.form {
    background-color: #FFFFFF;
    border-radius: 2px;
    box-shadow: 0px 3px 6px rgba($color: #000000, $alpha: 0.16);
    height: 300px;
    width: 300px;
    margin: 0 auto;
    padding: 30px;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
}

.form__label {
    color: #404040;
    display: block;
    font-size: 12px;
    margin-bottom: 4px;
}

.form-to-do__input{
    border: none;
    border-bottom: 1px solid rgba($color: #404040, $alpha: 0.5);
    width: 100%;
    font-size: 14px;
}

input[type="text"]:focus{
    outline: 0;
}

.form-time-wrap{
    display: flex;
    justify-content: space-between;
}

.form-time__input{
    height: 32px;
    width: 112px;
    border-color: rgba($color: #404040, $alpha: 0.5);
    border-radius: 2px;
    font-size: 14px;
}

.submit {
    background-color: #CC4799;
    border-radius: 50px;
    border: none;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: bold;
    display: block;
    height: 32px;
    width: 240px;

    &.disabled {
        opacity: 0.5;
    }
}


</style>