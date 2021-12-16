<template>
  <div id="auth">
    <h1 class="heading">Login</h1>
    <div id="box">
      <form
        @submit.prevent="validate"
        action=""
        class="register"
        name="register"
      >
        <input
          required
          type="text"
          name="username"
          class="form-control"
          id=""
          placeholder="username"
        />
        <input
          required
          type="password"
          name="password"
          class="form-control"
          placeholder="password"
        />
        <button class="btn" type="submit">Register</button>
        <span class="err">{{ err }}</span>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      err: "",
    };
  },
  methods: {
    validate(e) {
      e.preventDefault();
      var username = document.querySelector("input[name=username]");
      var password = document.querySelector("input[name=password]");
      fetch("/login", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.body == "accepted") {
            this.$store.commit("logIn", username.value);
            this.$router.push("/");
          } else if (data.body == "denied") {
            this.err = "Invalid username or password";
          } else {
            this.err = "An unexpected error occured";
          }
        });
    },
  },
};
</script>

<style scoped>
#auth {
  border-color: var(--fg-alt);
  border-width: 2px;
  border-style: solid;
  margin: 10% 1rem;
  padding: 2rem 1.25rem 4rem 1.25rem;
}
.heading {
  text-align: center;
}
.form-control {
  margin: 0.25rem 0;
}
.register {
  width: 90%;
}
#box {
  display: flex;
  justify-content: center;
}
.btn {
  background: var(--fg-alt);
  color: var(--fg);
  width: 100%;
}
.err {
  color: red;
}
</style>
