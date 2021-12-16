<template>
  <div id="auth">
    <h1 class="heading">Register</h1>
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
        <input
          required
          type="password"
          name="confirm-password"
          class="form-control"
          placeholder="confirm password"
        />
        <button class="btn" type="submit">Register</button>
        <span class="err">{{ err }}</span
        ><br />
        <span>Already A Member? , Login <a href="/login">Here</a></span>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      err: "",
    };
  },
  beforeMount() {
    if (this.$store.state.auth == false) {
      this.$router.push("/invite");
    }
  },
  methods: {
    validate(e) {
      e.preventDefault();
      var username = document.querySelector("input[name=username]");
      var password = document.querySelector("input[name=password]");
      var confirmPassword = document.querySelector(
        "input[name=confirm-password]"
      );
      if (password.value != confirmPassword.value) {
        this.err = "Passwords Do Not Match";
      } else {
        fetch("/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username.value,
            password: password.value,
            code: this.$store.state.code,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.body === "user created") {
              this.$router.push("/login");
            } else if (data.body === "user exists") {
              this.err = data.body;
            } else {
              this.err = "An Unexpected error occured please try again later";
            }
          });
      }
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
