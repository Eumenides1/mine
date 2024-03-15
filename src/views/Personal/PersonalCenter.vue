<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const currentPath = ref(null)
const route = useRoute()

const isActive = (path) => currentPath.value === path

watch(
  () => route.path,
  (newPath) => {
    currentPath.value = newPath
  }
)

onMounted(() => {
  currentPath.value = route.path
})
</script>
<template>
  <div class="box">
    <div class="Personal">
      <!-- 左侧个人简介 -->
      <div class="Introduction">
        <img src="../../assets/personal.jpeg" alt="" class="Introduction_img" />
        <span class="text1">夜色难免黑凉</span>
        <p class="text">前行必有曙光</p>
        <!-- 基本信息 -->
        <div class="tranfrom">
          <ul class="tranfrom_li">
            <li :class="{ active: isActive('/MyInformation/Name/OwnName') }">
              <router-link
                to="/MyInformation/Name/OwnName"
                class="tranfrom_link"
                >首页</router-link
              >
            </li>
            <li :class="{ active: isActive('/MyInformation/Hobby/OwnHobby') }">
              <router-link
                to="/MyInformation/Hobby/OwnHobby"
                class="tranfrom_link"
                >爱好</router-link
              >
            </li>
            <li :class="{ active: isActive('/MyInformation/Phone/OwnPhone') }">
              <router-link
                to="/MyInformation/Phone/OwnPhone"
                class="tranfrom_link"
                >手机号</router-link
              >
            </li>
            <li :class="{ active: isActive('/MyInformation/Emile/OwnEmile') }">
              <router-link
                to="/MyInformation/Emile/OwnEmile"
                class="tranfrom_link"
                >邮箱</router-link
              >
            </li>
            <li :class="{ active: isActive('/MyInformation/Many/OwnMany') }">
              <router-link
                to="/MyInformation/Many/OwnMany"
                class="tranfrom_link"
                >其他</router-link
              >
            </li>
            <li>
              <router-link to="/Books/BookPage" class="tranfrom_link"
                >返回首页</router-link
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- 右侧个人名言 -->
      <div class="well_know">
        <div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  font-family: '华文行楷';
  font-size: 20px;
}
.box {
  margin: 0 auto;
  width: 1800px;
  height: 1000px;
  background: linear-gradient(to bottom, #99ffff, #99ccff, rgb(151, 191, 231));
  border: 1px solid #f7f3f3;
}
.top-h1 {
  text-align: center;
  font-size: 30px;
  margin-top: 35px;
  color: #e17949;
  text-shadow: 1px 1px 4px rgb(14, 14, 14);
}
.Personal {
  display: flex;
  width: 800px;
  margin: 150px auto;
  background: rgba(255, 255, 255, 0.5); /* 设置半透明背景，这里是白色半透明 */
  border-radius: 20px;
}

.Introduction {
  display: flex;
  border-radius: 20px;
  flex-direction: column;
  justify-content: center;
  box-shadow: 5px 5px 10px rgb(151, 191, 231);
  flex: 0 0 35%;
  background-color: rgba(123, 196, 196, 0.3); /* 使用 RGBA 设置半透明背景 */
}
.Introduction_img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover; /* 保持图片的纵横比，同时填充元素的整个内容框 */
  margin-bottom: 10px; /* 图片和下方文本之间的间距 */
  margin-left: 90px;
  margin-top: 20px;
  animation: rotateImage3D 10s linear infinite;
  box-shadow: 1px 1px 3px rgb(124, 123, 123);
}
@keyframes rotateImage3D {
  from {
    transform: rotateY(0deg); /* 起始角度 */
  }
  to {
    transform: rotateY(360deg); /* 结束角度，360度旋转一圈 */
  }
}

.text1 {
  text-align: center;
  padding: 6px;
  color: #bdf876;
  font-size: 26px;
  text-shadow: 1px 1px 4px rgb(14, 14, 14);
}
.text {
  font-size: 24px;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ffffff;
  color: #e17949;
  text-shadow: 1px 1px 4px rgb(14, 14, 14);
}
.well_know {
  flex-grow: 1;
  margin-left: 20px;
  display: flex;
  flex-direction: column; /* 使子元素垂直排列 */
  text-align: center; /* 使文本内容水平居中 */
  border-radius: 20px;
  background-color: rgba(207, 145, 230, 0.3); /* 使用 RGBA 设置半透明背景 */
}
/* li的设置 */
.tranfrom_link {
  text-decoration: none;
  color: #f7f3f3;
  text-shadow: 1px 1px 4px rgb(14, 14, 14);
}
.tranfrom_li li {
  list-style-type: none;
  text-decoration: none;
  list-style: none;
  text-align: center;
  padding: 10px;
  border-bottom: 1px solid rgb(255, 255, 255);
  border-radius: 5px;
}
.tranfrom_li li:last-child {
  border-bottom: 0;
}

.active {
  background-color: #7f067356; /* 或者您想要的其他颜色 */
}
</style>
