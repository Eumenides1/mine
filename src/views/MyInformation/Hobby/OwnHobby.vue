<template>
  <div class="well_right">
    <h2>琵琶</h2>
    <img src="../../../assets/personal-music.jpeg" alt="" class="hobby-img" />
    <!-- 使用 v-bind 绑定文本内容，使用 v-on 添加点击事件监听器 -->
    <span @click="changeText" class="text-hobby">爱好：{{ textToChange }}</span>
    <p class="text-p" @click="changeText1">{{ textToChange1 }}</p>
    <p class="text-p" @click="changeText2">{{ textToChange2 }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 初始化要改变的文本
      textToChange: '琵琶',
      textToChange1: '琵琶弦上说相思',
      textToChange2: '当时明月在，曾照彩云归'
    }
  },
  methods: {
    // 添加一个方法来改变文本
    changeText() {
      this.textToChange = prompt('请输入新的爱好', this.textToChange)
    },
    changeText1() {
      this.textToChange1 = prompt('请输入新的文本', this.textToChange1)
    },
    changeText2() {
      this.textToChange2 = prompt('请输入新的文本', this.textToChange2)
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
h2 {
  font-size: 25px;
  text-shadow: 1px 1px 4px rgb(14, 14, 14);
}
.hobby-img {
  width: 100%;
  height: 150px;
  object-fit: cover; /* 保持图片的纵横比，同时填充元素的整个内容框 */
  margin-top: 10px; /* 图片和下方文本之间的间距 */
  padding: 10px;
  background-color: white;
  margin-left: -20px;
}
.text-hobby {
  margin-top: 50px;
  background: linear-gradient(
    to right,
    red,
    orange,
    yellow,
    green,
    blue,
    indigo,
    violet
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.text-p {
  font-size: 25px;
  margin-top: 10px;
  background: linear-gradient(
    to right,
    red,
    orange,
    yellow,
    green,
    blue,
    indigo,
    violet
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
