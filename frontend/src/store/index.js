import { createStore } from "vuex";
import VuexPersist from "vuex-persist";
import router from "../router";

const vuexPersist = new VuexPersist({
  key: "localStorageKeyHere",
  storage: window.localStorage,
});

export default createStore({
  state: {
    auth: false,
    code: "",
    logged: { state: false, username: "NOT_LOGGED_IN" },
    session_id: "",
    checking: "",
  },
  mutations: {
    setAuth(state) {
      state.auth = true;
    },
    logIn(state, value) {
      state.logged.state = true;
      state.logged.username = value;
    },
    setCode(state, value) {
      state.code = value;
    },
    testAuth(state) {
      console.log("ran");
      if (state.logged.state == false) {
        console.log("state.auth = false");
        if (state.auth == true) {
          console.log("pushing to reg");
          router.push("/register");
        } else {
          router.push("/invite");
        }
      } else if (state.auth == false) {
        if (state.logged.state == true) {
          console.log("not pushing");
        } else {
          console.log("pushing to invite");
          router.push("/invite");
        }
      } else {
        console.log("no condiditions true ");
      }
    },
    setId(state){
      var session = Math.random().toString(16).substr(2, 6);
      state.session_id = session
    }
  },
  actions: {},
  modules: {},
  plugins: [vuexPersist.plugin],
});
