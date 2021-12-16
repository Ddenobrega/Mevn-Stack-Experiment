<template>
  <div class="chat">
    <Header msg="Chat Area" />
    <div class="chatbox">
    <div class="chatbox-messages" id="chat">
      <div class="chat-messages" id="old-messages"></div>
      <div class="chat-messages" id="chat-messages"></div>
    </div>
      <form action="" @submit.prevent="sendMessage" class="message-area">
        <input type="text" name="message" class="message-bar form-control" />
        <button type="submit" class="message-btn btn">
          <i class="fa fa-send"></i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import store from "@/store/";
import io from "socket.io-client";

const socket = io();

socket.on("load message", (username, msg, id) => {
  if (`${id}` == `${store.state.session_id}`) {
    var oldMessages = document.createElement("div");
    oldMessages.innerHTML = `<span>${username}: ${msg} </span>`;
    var oldDiv = document.getElementById("old-messages");
    oldDiv.appendChild(oldMessages);
  }
});

socket.on("chat message", (username, msg) => {
  console.log(username + msg);
  var messages = document.createElement("div");
  messages.innerHTML = `<span>${username}: ${msg} </span>`;
  var div = document.getElementById("chat-messages");
  div.appendChild(messages);
  document.getElementById("chat")
});

export default {
  name: "Chat",
  components: {
    Header,
  },
  beforeMount() {
    this.$store.commit("testAuth");
  },
  mounted() {
    this.$store.commit("setId")
    socket.emit("load chat", this.$store.state.session_id);
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();
      var message = document.querySelector("input[name=message]");
      if (message.value == "") {
        return;
      } else {
        socket.emit(
          "chat message",
          this.$store.state.logged.username,
          message.value
        );
        message.value = "";
      }
    },
  },
};
</script>

<style scoped>
.message-bar {
  width: 90%;
  margin: 0;
  display: inline-flex;
  font-size: 1rem;
  border-radius: 0;
  padding: 0.25rem;
  font-family: monospace;
  vertical-align: middle or top;
}
.message-btn {
  background: var(--fg-alt);
  font-size: 1rem;
  padding: 0.325rem;
  border-radius: 0;
  margin: 0;
  width: 10%;
  box-shadow: none;
  vertical-align: middle or top;
}
input,
button {
  vertical-align: middle or top;
}
.date {
  float: right;
}

.chatbox-messages{
  overflow-y: scroll;
  max-height: 60vh;
}
</style>
