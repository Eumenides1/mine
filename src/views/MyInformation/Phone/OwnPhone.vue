<template>
  <div class="well_right">
    <img src="../../../assets/personal.jpeg" alt="" class="well_know_img" />
    <!-- 使用 v-bind 绑定文本内容，使用 v-on 添加点击事件监听器 -->
    <span @click="changeText" class="phone-sapn"
      >手机号：{{ textToChange }}</span
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 初始化要改变的文本
      textToChange: '18900133346'
    }
  },
  methods: {
    // 添加一个方法来改变文本
    changeText() {
      this.textToChange = prompt('请输入新的文本', this.textToChange)
    }
  }
}
</script>

<style scoped>
.well_right {
  flex-grow: 1;
  margin-left: 20px;
  display: flex;
  flex-direction: column; /* 使子元素垂直排列 */
  justify-content: center; /* 在垂直方向上居中子元素 */
  align-items: center; /* 在水平方向上居中子元素 */
  text-align: center; /* 使文本内容水平居中 */
}
.well_know_img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover; /* 保持图片的纵横比，同时填充元素的整个内容框 */
  margin-top: 50px; /* 图片和下方文本之间的间距 */
  box-shadow: 2px 2px 5px;
}
.phone-sapn {
  margin-top: 60px;
}
</style>
