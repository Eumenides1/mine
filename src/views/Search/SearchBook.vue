<template>
  <div class="box">
    <div class="Header">
      <div class="hai">你好！欢迎来到七彩书屋</div>
      <div class="exit">
        <img src="../../assets/a.jpg" alt="" class="head_img" />
        <div>
          <ul>
            <li>
              <router-link to="/Login" class="Header-li">退出登录</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="search">
      <div>
        <img src="../../assets/知云-汉字-RGB (1).png" alt="" class="zhi_img" />
      </div>
      <div class="search-container">
        <input
          type="text"
          class="search_input"
          v-model="searchQuery"
          placeholder="请输入要搜索的书籍..."
          @keyup.enter="searchBooks"
        />
        <button class="search_button" @click="searchBooks">搜索</button>
      </div>
    </div>
    <div class="content">
      <div class="content_top">
        <span>推荐搜索</span>
      </div>
      <div class="a"></div>
      <div class="content_text">
        <span class="book">斗破苍穹</span>
        <span class="book">最好的我们</span>
        <span class="book">暗恋·橘生淮南</span>
        <span class="book">小作精嫁入豪门后</span>
      </div>
      <div class="content_text">
        <span class="book">少年啊，前路漫漫</span>
        <span class="book">时光里的蜜果</span>
        <span class="book">活出生命的意义</span>
      </div>
      <div class="shu">
        <div v-if="showSearchResults" class="content_text">
          <div
            v-for="(book, index) in searchResults"
            :key="index"
            class="content_book"
          >
            <img :src="book.details.image" alt="" class="book-img" />
            <div class="book-book">
              <!-- 显示书籍的details.name -->

              <span class="book-name">《{{ book.details.name }}》</span>
              <span class="book-author">作者：{{ book.details.author }}</span>
              <span class="book-content">简介：{{ book.details.content }}</span>
              <span class="book-price">{{ book.details.price }}￥</span>
              <!-- 显示书籍的details.image -->
              <div class="car_price">
                <span class="car_buy" @click="showBookDetails(book)"
                  >查看详情</span
                >
              </div>
            </div>
          </div>
          <div class="none">
            <img src="../../assets/抱歉-copy (1).png" alt="" class="none-img" />
            <span class="none-text">暂时只要这么多了,请搜索其他书籍</span>
          </div>
        </div>
        <div v-else class="No">
          <img src="../../assets/没有东西-空白页.png" alt="" class="no-img" />
          <span class="no-txt">空空如也,请搜索书籍</span>
        </div>
      </div>
    </div>
    <div class="book_modal" v-if="showBuyModal">
      <div class="book_modal-content">
        <span class="close" @click="showBuyModal = false">&times;</span>
        <h2 class="detail">书籍详情</h2>
        <img :src="selectedBook.details.image" alt="" class="buy_img1" />
        <div class="Shopping-price">
          价格:{{ selectedBook.price }}￥
          <div class="Shopping-span">
            <span class="shapping-text">正品保障</span>
            <span class="shapping-text1">买的安心，买的放心</span>
          </div>
        </div>

        <p class="buy_name2">商品名称：《{{ selectedBook.details.name }}》</p>
        <p class="buy_author">作者名：{{ selectedBook.details.author }}</p>

        <p class="buy_content">商品简介：{{ selectedBook.details.content }}</p>
        <div class="car_num2">
          购买数量：
          <div class="ok">
            <button class="car_num_jia2" @click="increaseQuantity">+1</button>
            <span class="car_num_span2">{{
              selectedBook.details.quantity
            }}</span>
            <button class="car_num_jian2" @click="decreaseQuantity">-1</button>
          </div>
        </div>
        <p class="buy_total1">
          商品总价：<span class="buy_t1">{{ getTotalPrice() }}￥</span>
        </p>
        <el-button
          type="danger"
          size="large"
          round
          @click="confirmPurchase"
          class="buy_Sure"
          >确认购买</el-button
        >
      </div>
    </div>
    <div class="success_modal" v-if="showSuccessModal">
      <div class="success_modal-content">
        <h2 class="start_name_ok">购买成功！</h2>
        <p class="start_name_ok1">感谢你的购买！</p>
        <p class="start_name_ok1">欢迎你下次购买</p>
        <div class="demo-rate-block">
          <span class="demonstration">请为商品评分</span>
          <el-rate v-model="value2" :colors="colors" class="start_start" />
        </div>
        <button @click="showSuccessModal = false" class="close_btnn">
          关闭
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const searchQuery = ref('')
const searchResults = ref([])
const showSearchResults = ref(false)
const showBuyModal = ref(false)
const selectedBook = ref(null) // 当前选中的书籍对象
const showSuccessModal = ref(false)
const value2 = ref(null)
const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900']) // same as { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
const increaseQuantity = () => {
  if (selectedBook.value && selectedBook.value.details) {
    selectedBook.value.details.quantity =
      (selectedBook.value.details.quantity || 0) + 1
  }
}

const decreaseQuantity = () => {
  if (
    selectedBook.value &&
    selectedBook.value.details &&
    selectedBook.value.details.quantity > 1
  ) {
    selectedBook.value.details.quantity -= 1
  }
}

const getTotalPrice = () => {
  if (selectedBook.value && selectedBook.value.details) {
    return (
      selectedBook.value.details.quantity * selectedBook.value.details.price
    )
  }
  return 0
}
// 模块
function showBookDetails(book) {
  selectedBook.value = book
  showBuyModal.value = true
}
const confirmPurchase = () => {
  // 在这里可以添加处理购买逻辑的代码，比如发送购买请求到服务器
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0)'
  })
  setTimeout(() => {
    showBuyModal.value = false
    showSuccessModal.value = true
    // 重置购买弹窗的状态，以便下次使用
    selectedBook.value = null
    loading.close()
  }, 500)
}
// 可能还需要一个方法来关闭模态框
// 初始化时不加载书籍，保持 searchResults 为空数组
onMounted(() => {
  // 可以在这里执行任何需要在组件挂载后执行的代码
})

function loadBooksFromLocalStorage(query) {
  try {
    const storedData = localStorage.getItem('myAppDbData')
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      const allBooks = flattenBooks(parsedData)
      searchResults.value = allBooks.filter((book) => {
        return book.details.name.toLowerCase().includes(query.toLowerCase())
      })
      showSearchResults.value = searchResults.value.length > 0
    } else {
      searchResults.value = []
      showSearchResults.value = false
    }
  } catch (error) {
    console.error('Error retrieving books data:', error)
    searchResults.value = []
    showSearchResults.value = false
  }
}

function flattenBooks(data) {
  // 假设数据是一个对象，包含多个书籍数组属性（cart, build, cc）
  return [
    ...data.cart,
    ...data.youth,
    ...data.art,
    ...data.funny,
    ...data.bright,
    ...data.comic,
    ...data.children,
    ...data.other
  ].map((book) => ({
    ...book,
    id: book.id || generateBookId() // 如果书籍没有ID，生成一个
  }))
}

function generateBookId() {
  return Math.random().toString(36).substr(2, 9)
}

function searchBooks() {
  const query = searchQuery.value.trim()
  if (query) {
    loadBooksFromLocalStorage(query)
  } else {
    searchResults.value = []
    showSearchResults.value = false
  }
}
</script>

<style scoped>
.box {
  margin: 0 auto;
  width: 1400px;
  background-color: rgb(228, 225, 228);

  padding: 10px;
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
  font-size: 25px;
  position: absolute;
  color: #90d;
  margin-left: 80px;
}
.exit {
  font-size: 25px;
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: space-between;
}
.head_img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 1100px;
}
.exit li {
  list-style-type: none;
}
.Header-li {
  text-decoration: none;
  color: rgb(197, 31, 31);
}
.search {
  width: 100%;
  height: 130px;
  display: flex; /* 使用flex布局来垂直居中 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  background-color: #ffffff;
}
.zhi_img {
  width: 250px;
  height: 100px;
  margin-left: -250px;
  margin-top: 20px;
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
  margin-left: 200px;
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
.content {
  width: 98%;
  background-color: #ffffff;
  border-radius: 20px;
  margin-left: 15px;
}
.content_top {
  padding: 15px;
  margin-top: 30px;
  font-size: 30px;
  font-weight: 700;
  margin-left: 30px;
}
.a {
  width: 100%;
  border-bottom: 1px solid rgb(184, 181, 181);
}
.content_text {
  font-size: 24px;
  padding: 10px;
  margin-top: 20px;
}
.book {
  padding: 10px 60px;
  background-color: #dedddd;
  margin-left: 70px;
  border-radius: 40px;
}
.No {
  display: flex;
  text-align: center;
  flex-direction: column;
  margin: 50px auto;
}
.no-img {
  height: 300px;
  width: 300px;
  margin-left: 540px;
  margin-top: 100px;
}
.no-txt {
  font-size: 30px;
  color: #b1afaf;
  margin-bottom: 200px;
}
.shu {
  margin-top: 20px;
  border-top: 1px solid #b1afaf;
}
/* <div class="none">
            <img src="../../assets/抱歉-copy (1).png" alt="" class="none-img" />
            <span class="none-text">暂时只要这么多了,请搜索其他</span>
          </div> */
.none {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
}
.none-img {
  width: 200px;
  margin-left: 600px;
}
.none-text {
  font-size: 30px;
  color: #767575;
  text-align: center;
}
.content_book {
  border: 1px solid #767575;
  padding: 20px;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}
.book-img {
  width: 210px;
}
.book-book {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}
.book-name {
  margin-left: -25px;
  font-size: 34px;
  font-family: '华文行楷';
}
.book-author {
  font-size: 25px;
  margin-top: 10px;
}
.book-content {
  font-size: 24px;
  margin-top: 10px;
  color: #767575;
}
.book-price {
  font-size: 35px;
  margin-top: 10px;
  color: red;
}
.car_buy {
  position: absolute;
  color: red;
  width: 200px;
  margin: -40px 800px;
  font-size: 30px;
  font-weight: 700;
}
.book_modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* 确保它位于其他元素之上 */
  background-color: rgba(0, 0, 0, 0.5); /* 半透明背景，以便看到后面的内容 */
}

.book_modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 450px;

  /* 其他样式，如宽度、高度等 */
}
.close {
  padding: 5px;
  float: right;
  font-size: 40px;
  margin: -20px 10px;
  cursor: pointer;
}

.detail {
  text-align: center;
  font-size: 27px;
  color: #ef3434;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
}
.buy_img1 {
  width: 230px;
  margin-top: -20px;
  margin-left: 100px;
}
.buy_author {
  font-size: 20px;
  margin-top: -25px;
  color: #616161;
  margin-left: 20px;
}
.Shopping-price {
  display: flex;
  flex-direction: row;
  width: 470px;
  color: white;
  font-size: 28px;
  padding: 10px;
  background-color: rgb(208, 67, 67);
  margin-left: -20px;
}
.Shopping-span {
  display: flex;
  text-align: center;
  flex-direction: column;
  margin-left: 40px;
  width: 300px;
}
.shapping-text {
  width: 100px;
  margin-left: 150px;
  color: white;
  font-size: 20px;
}
.shapping-text1 {
  font-size: 20px;
  color: white;
  margin-left: 100px;
}
.buy_name2 {
  margin-left: 10px;
  font-size: 30px;
  font-family: '华文行楷';
}
.buy_content {
  margin-left: 20px;
  margin-top: -20px;
  font-size: 20px;
  color: #616161;
}
.car_num2 {
  display: flex;
  font-size: 24px;
  color: rgb(220, 88, 6);
  margin-left: 10px;
}
.car_num_jia2 {
  font-size: 20px;
}
.car_num_jian2 {
  font-size: 20px;
}
.car_num_span2 {
  padding: 10px;
}
.buy_total1 {
  margin-left: 10px;
  margin-top: 10px;
  font-size: 25px;
}
.buy_Sure {
  width: 450px;
  font-size: 25px;
}
.success_modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* 确保它位于其他元素之上 */
  background-color: rgba(0, 0, 0, 0.5);
}
.success_modal-content {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 450px;
  height: 700px;
  border-radius: 5px;
  overflow: auto;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
}
/* 评分 */
.demo-rate-block {
  padding: 30px 0;
  text-align: center;
  display: inline-block;
  width: 99%;
  box-sizing: border-box;
}
.demo-rate-block:last-child {
  border-right: none;
}
.demo-rate-block .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 28px;
  text-align: center;
  margin-left: 70px;
  width: 300px;
}
.start_name_ok {
  margin-top: 70px;
  font-size: 40px;
  text-align: center;
  color: #e73c11;
}
.start_name_ok1 {
  margin-top: 40px;
  font-size: 30px;
  text-align: center;
}
.el-rate {
  margin-top: 40px;
}
.close_btnn {
  position: relative;
  top: 100px;
  width: 400px;
  margin-left: 25px;
  height: 50px;
  background-color: rgb(130, 126, 126);
  font-size: 30px;
  color: #ffffff;
  border: 1px solid #767676;
  border-radius: 30px;
}
</style>
