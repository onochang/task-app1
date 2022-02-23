import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// FontAwesomeをImport
import { library } from '@fortawesome/fontawesome-svg-core'
// solidを呼び出す
import { fas } from '@fortawesome/free-solid-svg-icons'
// regularを呼び出す
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas,far)

createApp(App).use(store).use(router).component('fa', FontAwesomeIcon ).mount('#app')
