<template>
  <div>
    <!-- 顶部 -->
    <div class="top">
      <!-- 顶部轮播图 -->
      <div class="TopCarousel" @click="navigateToYouthLiterature1">
        <el-carousel :interval="2000" arrow="always">
          <el-carousel-item v-for="(image, index) in imageList" :key="index">
            <img
              :src="image"
              :alt="`image ${index + 1}`"
              class="TopCarousel-img"
            />
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 右侧，今日发布最新书籍 -->
      <div class="top-new" @click="navigateToYouthLiterature5">
        <div class="new">
          <div class="new_book">
            <img
              src="../../../assets//HotBook/HotTop3.jpg"
              alt=""
              class="new_img"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 中间书籍 -->
    <div class="middle">
      <div class="middle_book" @click="navigateToYouthLiterature2">
        <img
          src="../../../assets/HotBook/picture1.jpg"
          alt=""
          class="middle_img"
        />
      </div>
      <div class="middle_book" @click="navigateToYouthLiterature3">
        <img
          src="../../../assets/HotBook/picture2.jpg"
          alt=""
          class="middle_img"
        />
      </div>
      <div class="middle_book" @click="navigateToYouthLiterature3">
        <img
          src="../../../assets/HotBook/picture3.jpg"
          alt=""
          class="middle_img"
        />
      </div>
    </div>
    <!-- 底部 -->
    <div class="youth" @click="navigateToYouthLiterature">
      <div class="youth_left">
        <img
          src="../../../assets/HotBook/youth.jpg"
          alt=""
          class="youth_left_img"
        />
      </div>
      <!--底部中间  -->
      <div class="youth_middle" @click="navigateToYouthLiterature">
        <span class="youth_middle_text">文学</span>
        <div>
          <span class="youth_middle_txt">
            <p class="youth_middle_p">
              在那个梦的年华，文学的书籍如一缕清风，轻轻拂过心灵的琴弦。
              在这些书籍中，我们遇见了每个人的故事，虽然我们没有见过面，但我熟知你的故事。
            </p></span
          >
        </div>
      </div>
      <!-- 底部左侧 -->
      <div class="youth_right">
        <span class="youth_left_span">马上上架</span>
        <div class="shang">
          <div class="youth_left_book">
            <img
              src="../../../assets/HotBook/picture6.jpg"
              alt=""
              class="youth_left_img"
            />
          </div>
          <div class="youth_left_book">
            <img
              src="../../../assets/HotBook/picture7.jpg"
              alt=""
              class="youth_left_img"
            />
          </div>
          <div class="youth_left_book">
            <img
              src="../../../assets/HotBook/picture5.jpg"
              alt=""
              class="youth_left_img"
            />
          </div>
        </div>
      </div>
    </div>
    <FooterContainer></FooterContainer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageList: [
        'https://img0.baidu.com/it/u=1005121352,391987874&fm=253&fmt=auto&app=138&f=JPEG?w=780&h=400',
        'https://img2.baidu.com/it/u=2092526957,160654507&fm=253&fmt=auto&app=138&f=JPEG?w=707&h=500',
        'https://img1.baidu.com/it/u=3963917091,3569148566&fm=253&fmt=auto&app=138&f=JPEG?w=833&h=500'
      ]
    }
  },
  methods: {
    navigateToYouthLiterature() {
      this.$router.push('/Book/YouthBook/YouthBook') // 假设你已经在Vue实例中注入了router
    },
    navigateToYouthLiterature1() {
      this.$router.push('/Book/OtherBook/OtherBook') // 假设你已经在Vue实例中注入了router
    },
    navigateToYouthLiterature2() {
      this.$router.push('/Book/ComicBook/ComicBook') // 假设你已经在Vue实例中注入了router
    },
    navigateToYouthLiterature3() {
      this.$router.push('/Book/ChildrenBook/ChildrenBook') // 假设你已经在Vue实例中注入了router
    },
    navigateToYouthLiterature4() {
      this.$router.push('/Book/BrightBook/BrightBook') // 假设你已经在Vue实例中注入了router
    },
    navigateToYouthLiterature5() {
      this.$router.push('/Shang') // 假设你已经在Vue实例中注入了router
    }
  }
}
</script>

<style scoped>
.top {
  display: flex;
  background-color: rgb(231, 226, 226);
}
/* 轮播图 */
.TopCarousel {
  flex-grow: 1; /* 允许轮播图占据剩余空间 */
}
.TopCarousel-img {
  width: 100%;
  height: 100%;
}

/* 最新书籍 */
.top-new {
  width: 300px; /* 设置.top-new的宽度 */
  margin-left: 4px; /* 设置左边距，以增加与轮播图的间隔 */
  background-color: #ffffff;
}
.new {
  width: 96.5%;
  margin-left: 10px;
  background-color: rgb(231, 226, 226);
}
.new_img {
  width: 280px;
  height: 280px;
  padding: 5px;
}
/* 中间 */
.middle {
  display: flex;
  box-sizing: border-box;
  background-color: rgb(246, 238, 227);
  justify-content: space-between;
}
.middle_book {
  margin-left: 20px;
  margin-top: 5px;
}
.middle_img {
  width: 230px;
  height: 100px;
  box-shadow: 2px 2px 3px rgb(99, 98, 98);
}
/* 底部 */
.youth {
  display: flex;
  padding: 20px;
  background-color: rgb(201, 220, 241);
}
.youth_left {
  margin: 20px 0;
}
.youth_middle {
  margin-top: -10px;
  height: 360px;
  margin-left: 8px;
}
.youth_left_img {
  padding: 10px;
  width: 200px;
  height: 320px;
  box-shadow: 2px 2px 5px rgb(99, 98, 98);
}
.youth_middle_text {
  font-size: 30px;
  color: #e87324;
  text-shadow: 2px 2px 2px rgb(99, 98, 98);
}
.youth_middle_p {
  font-size: 23px;
  text-indent: 2em;
}
.youth_left_span {
  color: rgb(91, 130, 153);
  font-size: 28px;
}
.shang {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.youth_right {
  width: 100%;
  margin-left: 20px;
}
</style>
