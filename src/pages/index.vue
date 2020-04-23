<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">nuxt-firebase-ssr-auth</h1>
      <h2 class="subtitle">Nuxt + Firebase hosted on Cloud Functions with SSR Auth</h2>
      <div class="links">
        <button v-if="!user" @click="signIn" class="button--green">Sign In</button>
        <button v-if="user" @click="signOut" class="button--grey">Sign Out</button>
      </div>
      <div v-if="user">
        <h5 class="subtitle">Signed in as {{ user.displayName }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo
  },
  computed: {
    user() {
      return this.$store.getters["currentUser"];
    }
  },
  methods: {
    signIn() {
      this.$store.dispatch("signIn");
    },
    signOut() {
      this.$store.dispatch("signOut");
    }
  }
};
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
