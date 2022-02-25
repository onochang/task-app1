<template>
    <div class="page-wrap">
        <h1 class="app-name">Add To Do</h1>
        <div class="form">
            <div class="form-to-do">
                <label for="" class="form__label">To-do</label>
                <input type="text" name="text" class="form-to-do__input">
            </div>
            <div class="form-time-wrap">
                <div class="form-time">
                    <label for="" class="form__label">Start-time</label>
                    <input type="time" name="start" class="form-time__input" >
                </div>
                <div class="form-time">
                    <label for="" class="form__label">End-time</label>
                    <input type="time" name="end" class="form-time__input" >
                </div>
            </div>
            <button class="submit" type="submit">OK</button>
        </div>
    </div>  
</template>

<script>
    export default{
        name: 'FormView'
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
}


</style>