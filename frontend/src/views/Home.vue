<template>
  <div class="home">
    <Header msg="Welcome" />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";

export default {
  name: "Home",
  components: {
    Header,
  },
  beforeMount() {
    this.$store.commit("testAuth");
  },
};
</script>

<style scoped></style>
