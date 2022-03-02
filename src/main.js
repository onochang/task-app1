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
// firebaseをimport
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBEhkQQ6f516RIqRc15Wm04AbXnEIzEFZ0",
  authDomain: "task-app1-58ec4.firebaseapp.com",
  projectId: "task-app1-58ec4",
  storageBucket: "task-app1-58ec4.appspot.com",
  messagingSenderId: "1038005836360",
  appId: "1:1038005836360:web:9d378c773e04890a53167d"
};

// firebaseを初期化
initializeApp(firebaseConfig);


library.add(fas,far)

createApp(App).use(store).use(router).component('fa', FontAwesomeIcon ).mount('#app')
