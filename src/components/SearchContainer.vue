<template>
  <div class="search">
    <div class="search-text">
      <img src="./../assets/Home/书.png" alt="" class="search-text-img" />
      <span>激发阅读激情，点燃智慧之火，一本书一段人</span>
    </div>
    <div class="search-container">
      <input
        type="text"
        class="search_input"
        placeholder="活着/红楼梦/斗破苍穹......"
        @keyup.enter="navigateToB"
        @click="navigateToB"
      />
      <button class="search_button" @click="navigateToB">搜索</button>
    </div>
    <div id="results"></div>
    <div class="search_text">
      <p class="search_p">
        走进<span class="search_text1"><br />卷中世界</span>
      </p>
      <img src="../assets/Home/logo.gif" alt="" class="search_logo" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToB = () => {
  // 假设b.vue是LayoutPage的一个子路由，并且你想导航到它
  router.push({ path: '/Search' }) // 导航到b.vue的路径
}
</script>

<style scoped>
.search {
  width: 100%;
  height: 100px;
  display: flex; /* 使用flex布局来垂直居中 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
}
.search-container {
  position: relative;
  display: inline-block;
}

.search_input {
  width: 600px;
  height: 30px;
  padding: 5px;
  border: 1px solid #ec1a1a;
  border-radius: 20px 20px 20px 20px;
  overflow: hidden; /* 确保按钮不会溢出input */
  position: relative; /* 使得按钮可以相对于它定位 */
}
.input:focus {
  outline: none; /* 移除默认的轮廓线 */
  box-shadow: none; /* 移除默认的阴影 */
  /* 其他您想要重置的样式 */
}
.search_button {
  display: block;
  font-size: 25px;
  width: 100px; /* 按钮的宽度 */
  height: 40px; /* 按钮的高度与input相同 */
  padding: 0; /* 不需要内边距 */
  border: none; /* 移除边框 */
  border-radius: 20px 20px 20px 20px; /* 圆角，只在右边和底部 */
  background-color: #d82c2c; /* 设置背景色 */
  cursor: pointer; /* 鼠标悬停时的指针样式 */
  position: absolute; /* 绝对定位相对于input */
  right: 0; /* 靠右显示 */
  top: 0; /* 顶部对齐 */
  text-align: center;
  line-height: 40px;
  margin-top: 0.5px;
  color: #ffffff;
}
.search_logo {
  height: 100px;
  flex-shrink: 0; /* 防止图像收缩 */
  margin-left: 300px;
  margin-top: -100px;
  left: 95px;
}
.search_p {
  position: relative;
  width: 130px;
  font-size: 25px;
  text-align: center;
  left: 90px;
}
.search_text1 {
  border-bottom: none;
  font-size: 4vmin;
  color: #d82c2c;
  text-shadow: 1px 1px 3px rgb(72, 72, 72);
  animation: scaleAnimation 3s infinite ease-in-out;
}
@keyframes scaleAnimation {
  0%,
  100% {
    /* 在动画开始时和结束时，元素保持原始大小 */
    font-size: 30px;
    color: #f2590c;
  }
  50% {
    /* 在动画中间点，元素放大到1.2倍 */
    font-size: 32px;
    color: #d82c2c;
  }
}
.search-text {
  font-size: 23px;
  padding: 10px;
  text-indent: 1em;
  width: 200px;
  color: #475669;
  margin-right: 50px;
}
.search-text-img {
  width: 30px;
}
</style>
