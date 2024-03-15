<template>
  <el-carousel :interval="4000" type="card" height="150px">
    <div v-for="(image, index) in imageList" :key="index" class="carousel-item">
      <el-carousel-item>
        <img :src="image" :alt="`image ${index + 1}`" class="carousel-img" />
        <!-- <img src="../../../assets/personal-1.png" alt="" /> -->
      </el-carousel-item>
    </div>
  </el-carousel>
  <div class="well_right">
    <div class="text-container">
      <span @click="changeText">姓名：{{ textToChange }}</span>
    </div>
    <div class="text-container">
      <span @click="changeText1">性别：{{ textToChange1 }}</span>
    </div>
    <div class="text-container1">
      <span @click="changeText2">{{ textToChange2 }}</span>
    </div>
    <div class="warn">
      <p>！点击文字即可更换内容</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 初始化要改变的文本
      textToChange: '嘟嘟',
      textToChange1: '女',
      textToChange2:
        '世界很多美好的事物，并非是触手不及的，经过了时间的酥酿和打磨等待才会显得更加珍贵。',
      imageList: [
        'https://img2.baidu.com/it/u=1336821333,1113889882&fm=253&fmt=auto?w=800&h=500',
        'https://img1.baidu.com/it/u=586908610,497682163&fm=253&fmt=auto?w=1280&h=800',
        'https://img1.baidu.com/it/u=926064830,1234521476&fm=253&fmt=auto?w=1422&h=800',
        'https://img2.baidu.com/it/u=203736612,807096665&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313'
        // ... 更多的图片路径
      ]
    }
  },
  methods: {
    // 添加一个方法来改变文本
    changeText() {
      this.textToChange = prompt('请输入新的姓名', this.textToChange)
    },
    changeText1() {
      this.textToChange1 = prompt('请输入新的性别', this.textToChange1)
    },
    changeText2() {
      this.textToChange2 = prompt('请输入人生格言', this.textToChange2)
    }
  }
}
</script>

<style scoped>
.well_right {
  display: flex;
  flex-direction: column; /* 垂直排列子元素 */
  align-items: flex-start; /* 子元素靠左边对齐 */
}

.text-container {
  margin-top: 30px; /* 可选：为每行文本添加一些底部间距 */
  margin-left: 150px;
}

.text-container span {
  cursor: pointer; /* 可选：为可点击的文本添加鼠标指针样式 */
  color: rgb(162, 68, 234);
  font-size: 26px;
  text-shadow: 1px 1px 4px rgb(14, 14, 14);
}
.carousel-item {
  /* 设置固定高度，或者根据需要设置为 auto */
  height: 150px; /* 例如，您可以根据需要调整这个值 */
  overflow: hidden; /* 隐藏超出容器的内容 */
}

.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 图片将保持其宽高比并覆盖整个容器 */
  display: block;
}
.text {
  width: 450px;
  margin-top: 40px;
  margin-left: 20px;
}
.text-container1 {
  margin-top: 30px;
}
.text-container1 span {
  color: rgb(83, 81, 214);
  font-size: 26px;
  text-shadow: 1px 1px 4px rgb(14, 14, 14);
}
.warn {
  margin-top: 55px;
}
.warn p {
  font-size: 15px;
  color: red;
}
</style>
