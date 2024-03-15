<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const books = ref([
  '首页标签',
  '文学/小说',
  '青春校园',
  '艺术鉴赏',
  '搞笑轻松',
  '励志爽文',
  '精彩漫画',
  '儿童启蒙',
  '其他作品',
  '我的书籍'
])
const expanded = ref(0) // 默认高亮显示第一个分类

const routes = {
  首页标签: '/Book/HotBook/HotBook',
  '文学/小说': '/Book/LiteratureBook/LiteratureBook',
  青春校园: '/Book/YouthBook/YouthBook',
  艺术鉴赏: '/Book/ArtBook/ArtBook',
  搞笑轻松: '/Book/FunnyBook/FunnyBook',
  励志爽文: '/Book/BrightBook/BrightBook',
  精彩漫画: '/Book/ComicBook/ComicBook',
  儿童启蒙: '/Book/ChildrenBook/ChildrenBook',
  其他作品: '/Book/OtherBook/OtherBook',
  我的书籍: '/Book/MyBook/MyBook'
}

const navigateToPage = (book) => {
  const route = routes[book] || '/' // 如果没有匹配的路由，则默认回到首页
  expanded.value = books.value.indexOf(book) // 重置展开状态并高亮显示当前分类
  router.push(route) // 导航到新的页面
}

const router = useRouter() // 获取 router 实例

onMounted(() => {
  // 确保内容页显示第一个分类对应的路径
  if (router.currentRoute.value.path !== routes[books.value[0]]) {
    navigateToPage(books.value[0]) // 导航到第一个分类对应的页面
  }
})
const imageList = ref([
  'https://img1.baidu.com/it/u=2016949990,192207594&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=753',
  'https://img1.baidu.com/it/u=171346518,2146622815&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=707'
])
</script>

<template>
  <div class="All">
    <div>
      <!-- 头部Header -->
      <div class="Header">
        <div class="hai">你好！欢迎来到七彩书屋</div>
        <div class="exit">
          <img src="../../assets/a.jpg" alt="" class="head_img" />
          <div>
            <ul>
              <li>
                <router-link to="/" class="Header-li">退出登录</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 搜索栏carousel -->
      <div class="carousel">
        <img src="../../assets/Home/top.png" alt="" class="carousel-img" />
      </div>
    </div>
    <SearchContainer></SearchContainer>
    <!-- 导航栏navigation -->
    <div class="navigation">
      <p class="navigation_p">图书分类</p>
      <img src="../../assets/tushu.jpg" alt="" class="navigation_img" />
      <ul class="navigation_li">
        <li>
          <router-link to="/Collect" class="link">我的收藏</router-link>
        </li>
        <li><router-link to="/Layout" class="link">我的购物车</router-link></li>
        <li>
          <router-link to="/Service" class="link">售后服务</router-link>
        </li>
        <li>
          <router-link to="/AddBook" class="link">添加图书</router-link>
        </li>
        <li><router-link to="/More" class="link">图书笔记</router-link></li>
        <li><router-link to="/Personal" class="link">个人中心</router-link></li>
      </ul>
    </div>
    <!-- 主要切换部分 -->
    <div class="Container">
      <!-- 左侧列表 -->
      <div class="Aside">
        <div
          v-for="(book, index) in books"
          :key="index"
          :class="{ Aside_books: true, expanded: expanded === index }"
          @click="navigateToPage(book, index)"
        >
          {{ book }}
        </div>
        <div class="Picture">
          <span class="Picture_text">更多书籍，等你来</span>
          <el-carousel :interval="2000" arrow="always">
            <el-carousel-item v-for="(image, index) in imageList" :key="index">
              <img :src="image" class="Picture-img" />
            </el-carousel-item>
          </el-carousel>
          <div class="Picture_botton">
            <span class="Picture_text1"
              >我们广纳世界书籍，让更多的人阅读上我们的书籍，让群书走向世界</span
            >
          </div>
        </div>
      </div>
      <!--右侧主要内容  -->
      <div class="Main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0 auto;
  padding: 0;
  font-size: 18px;
  font-family: '华文行楷';
}
.All {
  border: 1px solid rgb(209, 209, 209);
  width: 1400px;
}
.Header {
  display: flex;
  align-items: center; /* 垂直居中*/
  justify-content: space-between;
  padding: 1px; /* 可选，为头部内容添加一些内边距 */
  background-color: #f5f5f5; /* 可选，为头部添加一个背景色  */
  font-family: '华文行楷';
}

.hai {
  color: #90d;
  margin-left: 80px;
}
.exit {
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: space-between;
}
.head_img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-left: 500px;
}
.exit li {
  list-style-type: none;
}
.Header-li {
  text-decoration: none;
  color: rgb(197, 31, 31);
}
/*导航栏  */
.navigation {
  width: 95.6%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center; /* 垂直居中 */
  padding: 0 30px; /* 为导航栏添加内边距 */
  background-color: #f5f5f5;
}
.navigation_p {
  position: absolute;
  width: 200px;
  border-bottom: none;
  margin-left: 55px;
  font-size: 30px;
  color: rgb(218, 41, 41);
}
.navigation_li {
  display: flex;
  margin-left: 100px;
  padding: 3px;
  /* 使用flex-grow来使列表项填充可用空间 */
  flex-grow: 1;
}

.navigation_li li {
  /* 使用百分比宽度来使列表项宽度随容器宽度变化 */
  flex: 1; /* 等同于flex-grow: 1; */
  text-align: center; /* 文本居中 */
  min-width: 80px; /* 设置一个最小宽度，以防列表项变得太小 */
  border-right: 1px solid #475669;
  padding: 3px;
  list-style-type: none;
}
/* 移除最后一个列表项的右边距 */
.navigation_li li:last-child {
  border-right: 0;
}
.link {
  text-decoration: none;
  color: #475669;
}
.navigation_img {
  position: relative;
  width: 50px;
  height: 38px;
  margin-left: 180px;
}
/* 搜索栏 */
.carousel-img {
  width: 100%;
  height: 140px;
}

/* 主要部分 */

.Container {
  display: flex; /* 启用Flexbox布局 */
}

/* 左侧列表 */
.Aside {
  flex: 0 0 20%; /* 左侧模块固定宽度为20%，不伸缩 */
}
.Aside_books {
  padding: 10px;
  text-align: center;
  background-color: #f0f0f0; /* 初始背景色 */
  border-bottom: 1.5px solid #475669;
  box-shadow: 2px 1px 5px grey;
  cursor: pointer; /*鼠标悬停时显示手型图标   */
  transition:
    width 0.3s ease,
    background-color 0.3s ease; /*平滑过渡效果   */
}

.expanded {
  font-size: 22px;
  background-color: #4f4f94; /* 点击后的背景色 */
}
/* 右侧主要部分 */
.Main {
  flex: 1; /* 右侧模块占据剩余空间 */
  margin-left: 10px; /* 可选，为两个模块之间添加间距 */
  width: 540px;
}
.Picture {
  margin-top: 20px;
  padding: 10px;
}
.Picture_text {
  margin-top: 40px;
  font-size: 25px;
  margin-left: 20px;
  color: #52657e;
  text-shadow: 1px 1px 2px rgb(72, 72, 72);
}
.Picture-img {
  margin-top: 40px;
  width: 100%;
  height: 100%;
}
.Picture_text1 {
  font-size: 25px;
  margin-left: 20px;
  color: #52657e;
  text-shadow: 1px 1px 2px rgb(72, 72, 72);
}
.Picture_botton {
  margin-top: 20px;
}
</style>
