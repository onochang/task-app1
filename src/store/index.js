import { createStore } from 'vuex'
// Googleプロバイダをimport
import { GoogleAuthProvider } from "firebase/auth";
// Google認証機能、認証後リダイレクト機能をimport
import { getAuth, signInWithRedirect, signOut } from "firebase/auth";
// firestoreをimport
import { getFirestore } from "firebase/firestore"
import { collection, addDoc, getDocs, doc, updateDoc,  deleteDoc } from "firebase/firestore";


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
    // stateのtasksの中からURLのパラメーターに一致するtaskを参照する。
    getAddressById: state => id => state.tasks.find( task => task.id === id)

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
    addTask(state, { id, task }) {
      // taskオブジェクトにidを追加
      task.id = id
      state.tasks.push(task)
    },
    updateTask(state, { id, task }) {
      // 一致するタスクのインデックスを返す
      const index = state.tasks.findIndex(task => task.id === id)
      state.tasks[index] = task
    },
    deleteTask(state, id) {
      // 削除するtaskのインデックスを取得
      const index = state.tasks.findIndex(task => task.id === id)
      state.tasks.splice(index, 1)
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
          // firestoreに接続してパスを参照してtaskを追加
          const docRef = await addDoc(collection(db, `users/${getters.uid}/tasks`), task);
          console.log("Document written with ID: ", docRef.id);
          // addTaskにtaskのIDと内容を渡す
          commit('addTask', { id: docRef.id,  task })
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    async fetchTasks({ getters, commit }) {
      // firestoreに接続
      const db = getFirestore();
      // firestoreからデータを取得
      const querySnapshot = await getDocs(collection(db, `users/${getters.uid}/tasks`));
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        // 取得した情報からtaskオブジェクトを取得してaddTaskに渡す
        commit('addTask', { id: doc.id, task: doc.data() })
        console.log(`${doc.id} => ${doc.data()}`);
      });
    },
    async updateTask({ getters, commit }, { id, task }) {
      const db = getFirestore();
      // 編集中のtaskを参照
      const editTask = doc(db, `users/${getters.uid}/tasks`, id);
      // 取得したtaskを更新
      await updateDoc(editTask, {
        title: task.title,
        start: task.start,
        end: task.end
      });
      commit('updateTask',{id,task})
    },
    async deleteTask({ getters, commit }, id) {
      const db = getFirestore();
      await deleteDoc(doc(db, `users/${getters.uid}/tasks`, id));
      commit('deleteTask', id)
    }
  },
  modules: {
  }
})
