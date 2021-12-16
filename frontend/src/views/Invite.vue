<template>
  <div class="about">
    <div class="invite-box">
      <h1 class="heading">Welcome To NAME_HERE</h1>
      <form @submit.prevent="inviteSubmit" class="form" action="">
        <input
          type="password"
          required
          placeholder="invite code"
          name="invite"
          class="form-control"
        />
      </form>
      <br /><span>Already A Member? , Login <a href="/login">Here</a></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Invite",
  methods: {
    inviteSubmit(e) {
      e.preventDefault();
      var code = document.querySelector("input[name=invite]");
      fetch("/invite", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ invite: code.value }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.body === "accepted") {
            this.$store.commit("setAuth");
            this.$store.commit("setCode", code.value);
            this.$router.push("/register");
          }
        });
    },
  },
  beforeMount() {
    if (this.$store.state.logged.state == true) {
      this.$router.push("/");
    } else if (this.$store.state.auth == true) {
      this.$router.push("/register");
    }
  },
};
</script>

<style scoped>
.about {
  display: flex;
  justify-content: center;
}
.invite-box {
  margin: 5%;
  text-align: center;
  max-width: 900px;
  border-width: 2px;
  border-color: var(--fg-alt);
  border-style: solid;
  padding: 3rem;
}
</style>
