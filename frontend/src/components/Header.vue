<template>
  <div class="header">
    <span class="heading">{{ msg }}</span>
    <div class="dropdown">
      <button class="btn right dropbtn"><i class="fas fa-bars"></i></button>
      <div class="dropdown-content">
        <a href="/">Home</a>
        <hr />
        <a href="/chat">Chat</a>
        <hr />
        <a href="/games">Money</a>
      </div>
    </div>
    <div class="strip">
      <span class="user"
        >Logged In As:
        <span class="name">{{ this.$store.state.logged.username }}</span></span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    msg: {
      type: String,
      default: "test",
    },
  },
};
</script>

<style scoped>
.heading {
  font-size: 2.5rem;
  margin: 0.5rem 0.5rem;
}

.dropdown {
  float: right;
}

.strip {
  background: var(--fg-alt);
  text-align: center;
  padding: 0.1rem;
  margin: 0.25rem 0;
}

.btn {
  margin: 0.5rem;
  color: white;
  font-size: 1.5rem;
}

.right {
  float: right;
}

hr {
  margin: 0;
  padding: 0;
}

.dropdown-content a:hover {
  color: white;
  background: var(--bg);
  border-color: var(--fg-alt);
  border-width: 2px;
  border-style: solid;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: var(--fg-alt);
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  right: 0;
  top: 3rem;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
