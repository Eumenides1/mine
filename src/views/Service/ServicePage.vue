<template>
  <div class="customer-service-dialog">
    <div class="dialog-header">
      <h2>售后客服</h2>
      <button @click="isOpen = !isOpen">关闭</button>
    </div>
    <div class="dialog-body" v-if="isOpen">
      <div class="message-list">
        <div class="message" v-for="(message, index) in messages" :key="index">
          <span
            class="avatar"
            :class="{
              'user-avatar': !message.isBot,
              'bot-avatar': message.isBot
            }"
          ></span>
          <span class="message-time">{{ message.time }}</span>
          <div
            :class="{
              'user-message': !message.isBot,
              'bot-message': message.isBot
            }"
          >
            {{ message.text }}
          </div>
        </div>
      </div>
      <div class="message-input">
        <input
          type="text"
          v-model="newMessage"
          placeholder="输入消息..."
          @keyup.enter="sendMessage"
        />
        <button @click="sendMessage">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: true,
      messages: [],
      newMessage: '',
      botResponses: {
        你好: '你好，有什么可以帮助你的吗？',
        谢谢: '不客气，很高兴能为你服务！',
        goodbye: '再见，如有任何问题，请随时联系。',
        再见: '欢迎你下次访问哦'
        // 你可以根据需要添加更多的回复
      }
    }
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        const now = new Date()
        const time = now.toLocaleTimeString()

        this.messages.push({
          text: this.newMessage,
          isBot: false,
          time: time
        })

        if (this.botResponses[this.newMessage.toLowerCase()]) {
          this.messages.push({
            text: this.botResponses[this.newMessage.toLowerCase()],
            isBot: true,
            time: time
          })
        } else {
          this.messages.push({
            text: '对不起，我不理解你的问题。请重新输入或尝试其他方式联系我们。',
            isBot: true,
            time: time
          })
        }

        this.newMessage = ''

        // 滚动到消息列表底部
        this.$nextTick(() => {
          const messageList = this.$el.querySelector('.message-list')
          messageList.scrollTop = messageList.scrollHeight
        })
      }
    }
  }
}
</script>
<style scoped>
.customer-service-dialog {
  width: 400px;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 100px auto;
  z-index: 1000;
  border: 1px solid #919191;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.dialog-header h2 {
  margin: 0;
}

.message-list {
  margin-bottom: 20px;
  padding: 0;
  list-style: none;
}

.message {
  text-align: center;
  border-radius: 5px;
  margin-bottom: 10px; /* 强制所有单词在达到容器边界时换行 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center; /* 对齐到右边 */
}

.user-message {
  width: 200px;
  background-color: #eca47f;
  border: 1px solid #919191;
  padding: 3px;
  margin-top: 18px;
  margin-left: 200px;
  word-break: break-all;
  white-space: normal;
}
.bot-message {
  width: 200px;
  background-color: #b7ede2;
  border: 1px solid #919191;
  padding: 3px;
  margin-top: 18px;
  margin-left: -200px;
}

.message-text {
  display: block;
  word-wrap: break-word;
  margin-bottom: 5px;
}

.message-input {
  display: flex;
}

.message-input input[type='text'] {
  flex: 1;
  padding: 5px;
}
.message-time {
  font-size: 0.8em;
  color: #666;
  /* 调整位置到文本下方 */
  margin-top: 5px;
}
</style>
