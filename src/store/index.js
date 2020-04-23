export default {
  state: () => {
    return {
      user: null
    };
  },
  getters: {
    currentUser(state) {
      return state.user;
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    async nuxtServerInit({ dispatch, commit }, { res }) {
      console.log("nuxt server init", res.locals);
      if (res && res.locals && res.locals.user) {
        console.log("server user", res.locals.user);
        const { allClaims: claims, ...authUser } = res.locals.user;

        await dispatch("onAuthStateChangedAction", { authUser, claims });
      }
    },
    onAuthStateChanged({ commit }, { authUser, claims }) {
      if (authUser) {
        const { uid, displayName, email } = authUser;
        commit("setUser", { uid, displayName, email });
      } else {
        commit("setUser", null);
      }
    },
    async signIn() {
      const provider = new this.$fireAuthObj.GoogleAuthProvider();
      try {
        console.log("signing in...");
        await this.$fireAuth.signInWithPopup(provider);
        console.log("signed in");
      } catch (e) {
        console.error(e);
      }
    },
    async signOut() {
      try {
        console.log("signing out...");
        await this.$fireAuth.signOut();
        console.log("signed out");
      } catch (e) {
        console.error(e);
      }
    }
  }
};
