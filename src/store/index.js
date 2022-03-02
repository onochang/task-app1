import { createStore } from 'vuex'
// Googleプロバイダをimport
import { GoogleAuthProvider } from "firebase/auth";
// Google認証機能、認証後リダイレクト機能をimport
import { getAuth, signInWithRedirect, signOut } from "firebase/auth";
// firestoreをimport
import { getFirestore } from "firebase/firestore"
import { collection, addDoc } from "firebase/firestore";


export default createStore({
  state: {
    login_user: null,
    sideNav: false,
    tasks: []
  },
  getters: {
    userName: state => state.login_user ? state.login_user.displayName : '',
    photoURL: state => state.login_user ? state.login_user.photoURL : '',
    uid: state => state.login_user ? state.login_user.uid : '',
  },
  mutations: {
    setLoginUser(state, user) {
      state.login_user = user
    },
    deleteLoginUser(state) {
      state.login_user = null
    },
    // state内のsideNavの状態を変更
    toggleSideNav(state) {
      state.sideNav = !state.sideNav
    },
    // state内のtasksにtaskオブジェクトを格納
    addTask(state, task) {
      state.tasks.push(task)
    }
  },
  actions: {
    // ログイン後にuser情報を取得
    setLoginUser({ commit }, user) {
      commit('setLoginUser', user)
    },
    // アプリ内のログアウト処理
    deleteLoginUser({ commit }) {
      commit('deleteLoginUser')
    },
    login() {
      // Google認証機能を実行
      const provider = new GoogleAuthProvider();
      // 認証状況を取得
      const auth = getAuth();
      // 認証後にログインページにリダイレクト
      signInWithRedirect(auth, provider);
    },
    logout() {
      // firebaseからログアウト
      const auth = getAuth();
      signOut(auth);
      console.log('call logout');
    },
    // toggleSideNavが呼び出された時にmutationsを実行
    toggleSideNav({ commit }) {
      commit('toggleSideNav')
    },
    // FormViewのOKボタンが押された時にtaskを受け取りmutationsを実行
    async addTask({ getters, commit }, task) {
      // firestoreを取得
      const db = getFirestore();
      try {
        if (getters.uid) {
          const docRef = await addDoc(collection(db, `users/${getters.uid}/tasks`), task);
          console.log("Document written with ID: ", docRef.id); 
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      commit('addTask', task)
    }
  },
  modules: {
  }
})
