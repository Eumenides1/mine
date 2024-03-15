<template>
  <div class="customer-service-dialog" v-if="showDialog">
    <div class="dialog-content">
      <h3>客服对话框</h3>
      <p>{{ message }}</p>
      <input type="text" v-model="userInput" placeholder="请输入您的问题..." />
      <button @click="sendMessage">发送</button>
      <ul>
        <li v-for="(response, index) in responses" :key="index">
          {{ response }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      userInput: '',
      responses: []
    }
  },
  methods: {
    sendMessage() {
      if (this.userInput.trim() !== '') {
        this.responses.push(this.userInput)
        this.userInput = '' // 清空输入框

        // 模拟客服回复
        this.simulateAgentResponse()
      }
    },
    simulateAgentResponse() {
      // 模拟客服正在输入...
      setTimeout(() => {
        // 假设AI服务返回了一个响应
        const aiResponse = '您好，有什么可以帮助您的吗？'

        // 将AI响应添加到响应列表中
        this.responses.push(aiResponse)
      }, 2000)
    }
  }
}
</script>

<style scoped>
.customer-service-dialog {
  width: 300px;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 20px;
  z-index: 1000;
}

.dialog-content {
  display: flex;
  flex-direction: column;
}

.dialog-content input {
  margin-top: 10px;
}

.dialog-content ul {
  list-style: none;
  padding: 0;
  margin-top: 10px;
}

.dialog-content li {
  margin-bottom: 5px;
}
</style>
