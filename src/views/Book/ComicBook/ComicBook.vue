<template>
  <div class="Literature">
    <h2 class="Literature_h2">文学/小说书籍</h2>
    <div v-if="data.length === 0">加载中...</div>
    <div v-else class="book-container">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="book"
        @click="showBookModal(item)"
      >
        <div class="BookContent">
          <img :src="item.image" alt="" class="Book_img" />
          <div class="Book_name">书名:《{{ item.name }}》</div>
          <div class="Book_price">价格：{{ item.price }}￥</div>
          <div class="additional-text">点击查看详情</div>
        </div>
      </div>
    </div>
    <div v-if="selectedBook" class="Shopping-car">
      <div class="Shopping-car-content">
        <button @click="closeBookModal" class="Shopping_x">x</button>
        <img :src="selectedBook.image" alt="" class="Book_img1" />
        <div class="Shopping-price">
          价格:{{ selectedBook.price }}￥
          <div class="Shopping-span">
            <span class="shapping-text">正品保障</span>
            <span class="shapping-text1">买的安心，买的放心</span>
          </div>
        </div>
        <h3 class="Shopping-name">书籍:《{{ selectedBook.name }}》</h3>
        <p class="Shopping-author">作者:{{ selectedBook.author }}</p>
        <p class="Shopping-introduction">简介:{{ selectedBook.content }}</p>
      </div>
      <!-- 详情页，底部购物车 -->
      <div class="buy">
        <!-- 收藏 -->
        <div class="start">
          <el-button
            type="warning"
            :icon="Star"
            size="large"
            circle
            @click="start(selectedBook)"
          />
        </div>

        <button @click="addToCart(selectedBook)" class="Shopping-into">
          加入购物车
        </button>
        <button @click="buyToCart(selectedBook)" class="Shopping-buy">
          立即购买
        </button>
      </div>
    </div>
    <div v-if="showPurchaseModal" class="purchase-modal">
      <div v-if="selectedBook" class="purchase-modal"></div>
      <div class="modal-content">
        <!-- 在这里添加你想要在模态框中显示的内容 -->
        <h2 class="purchase_book">确认购买书籍吗?</h2>
        <h3 class="purchase_name">商品名称：《{{ selectedBook.name }}》</h3>
        <p class="purchase_price">商品单价：{{ selectedBook.price }}￥</p>
        <p class="purchase_total">
          商品总价：<span class="red">{{ totalPrice }}￥</span>
        </p>
        <div class="purchase_num">
          购买数量：
          <div class="car_purchase">
            <button class="purchase_jia" @click="increaseQuantity">+1</button
            ><span class="purchase_span">{{ selectedBook.quantity }}</span>
            <button class="purchase_jian" @click="decreaseQuantity">-1</button>
          </div>
        </div>
        <div class="tt">
          <el-button
            type="success"
            size="large"
            round
            @click="BookModal"
            class="Sure_sure"
            >再想一想</el-button
          >
          <el-button
            type="danger"
            size="large"
            round
            @click="confirmPurchase"
            class="Sure_sure"
            >确认购买</el-button
          >
          <!-- 其他内容 -->
        </div>
      </div>
    </div>
    <div v-if="showSuccessModal" class="success-modal">
      <div class="success-content">
        <h2 class="start_name_ok">购买成功！</h2>
        <p class="start_name_ok1">感谢你的购买！</p>
        <p class="start_name_ok1">欢迎你下次购买</p>
        <div class="demo-rate-block">
          <span class="demonstration">请为商品评分</span>
          <el-rate v-model="value2" :colors="colors" class="start_start" />
        </div>
        <button @click="toggleSuccessModal" class="close_btnn">关闭</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { Star } from '@element-plus/icons-vue'
const CART_KEY = 'cartData' // 购物车数据的本地存储键
const BAY_KEY = 'bay'
const data = ref([]) // 初始化为空数组
const selectedBook = ref(null) // 选中的书籍
const showPurchaseModal = ref(false) // 控制购买信息模态框的显示与隐藏
const showSuccessModal = ref(false)
const value2 = ref(null)
const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900']) // same as { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
const totalPrice = computed(() => {
  if (
    selectedBook.value &&
    selectedBook.value.price &&
    selectedBook.value.quantity
  ) {
    return selectedBook.value.price * selectedBook.value.quantity
  }
  return 0
})

const increaseQuantity = () => {
  if (selectedBook.value) {
    selectedBook.value.quantity += 1
  }
}

const decreaseQuantity = () => {
  if (selectedBook.value && selectedBook.value.quantity > 1) {
    selectedBook.value.quantity -= 1
  }
}
const confirmPurchase = () => {
  // 在这里可以添加处理购买逻辑的代码，比如发送购买请求到服务器
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0)'
  })
  setTimeout(() => {
    showSuccessModal.value = true
    showPurchaseModal.value = false
    // 重置购买弹窗的状态，以便下次使用
    selectedBook.value = null
    loading.close()
  }, 500)
  // 假设购买成功，则显示购买成功弹窗并隐藏购买弹窗
}

// 添加一个新的函数来控制购买成功弹窗的显示与隐藏
const toggleSuccessModal = () => {
  showSuccessModal.value = !showSuccessModal.value
}
const fetchData = async () => {
  try {
    const response = await axios.get('/index.json')
    data.value = response.data.comic // 假设 response.data 是一个数组，包含对象
  } catch (error) {
    console.error(error)
  }
}

const showBookModal = async (book) => {
  try {
    const response = await axios.get('/index.json')
    const selectedBookDetails = response.data.comic.find(
      (item) => item.id === book.id
    )?.details
    if (selectedBookDetails) {
      selectedBook.value = selectedBookDetails
    }
  } catch (error) {
    console.error(error)
  }
}

const closeBookModal = () => {
  selectedBook.value = null
}
// 星星
const start = async (book) => {
  try {
    // 确保 book 对象有 name 属性
    if (!book || !book.name) {
      console.error('传递给 start 函数的 book 对象没有 name 属性')
      return
    }

    // 尝试从本地存储中获取当前的购物车数据
    let cartArray = JSON.parse(localStorage.getItem(BAY_KEY)) || []

    // 检查是否已存在这本书
    const existingBook = cartArray.find((item) => item.name === book.name)

    // 如果书籍已经存在，则显示消息并退出函数
    if (existingBook) {
      // 书籍已经存在于购物车中，不执行任何操作或仅显示一个消息
      alert('已经收藏了，请在收藏页面查看')
      return
    }

    // 如果不存在，则添加到购物车
    cartArray.push(book)
    localStorage.setItem(BAY_KEY, JSON.stringify(cartArray))
    alert('收藏成功，请在收藏页面查看')
    // 由于添加了新书籍到购物车，可以切换图片路径（如果你希望这样做的话）
    // currentImage.value = CART_HAS_BOOKS_IMAGE; // 如果你需要切换图片，取消注释这行代码
  } catch (error) {
    // 处理错误
    console.error('添加到收藏夹时发生错误:', error)
  }
}
// 显示支付弹窗
const BookModal = () => {
  showPurchaseModal.value = false
}

// 添加到购物车的逻辑
const addToCart = async (book) => {
  try {
    // 尝试从本地存储中获取当前的购物车数据
    let cartData = localStorage.getItem(CART_KEY)
    let cartArray = [] // 如果本地存储中没有数据，则初始化为空数组
    console.log(cartData)
    // 如果本地存储中有数据，则将其解析为数组
    if (cartData) {
      cartArray = JSON.parse(cartData)
    }

    // 检查购物车中是否已存在这本书
    const existingBook = cartArray.find((item) => item.name === book.name)

    // 如果不存在，则添加到购物车
    if (!existingBook) {
      cartArray.push(book)
      // 将更新后的购物车数组转换为 JSON 字符串并保存到本地存储
      localStorage.setItem(CART_KEY, JSON.stringify(cartArray))
      alert('书籍已添加到购物车,请去购物车查看', book)
    } else {
      // 如果存在，可以选择更新书籍信息或不做任何操作
      alert('购物车中已存在这本书，不重复添加.')
    }
  } catch (error) {
    // 处理错误
    console.error('添加到购物车时发生错误:', error)
  }
}
const buyToCart = async (selectedBook) => {
  // 执行购买逻辑，比如调用后端API等
  selectedBook.value = null
  // 假设购买逻辑完成后，设置 showPurchaseModal 为 true
  showPurchaseModal.value = true
  // // 同时关闭书籍详情模态框
  // selectedBook.value = null
}
// 在组件加载时获取数据
fetchData()
</script>
<style scoped>
.Literature {
  background: linear-gradient(to bottom, #dfeaf3, #c2dbeb, #b3b6f0);
}
.Literature_h2 {
  font-size: 30px;
  text-align: center;
  margin: 4px 0;
  padding: 0;
}
.Book_img {
  width: 100px;
  height: 115px;
  border: 1px solid #848484;
  box-shadow: 1px 1px 2px rgb(126, 126, 126);
}

.book-container {
  display: flex;
  flex-wrap: wrap; /* 允许换行 */
  justify-content: flex-start; /* 控制水平对齐方式 */
}

.book {
  border: 1px solid #b5b5b5;
  width: 100px;
  padding: 10px;
  margin-bottom: 10px; /* 替换掉原本的右边距，用底部边距代替 */
  margin-left: 40px;
  width: calc(25% - 105px); /* 假设一行最多四个，减去的是margin-bottom的宽度 */
  box-sizing: border-box;
  background-color: rgb(172, 191, 237);
  box-shadow: 1px 1px 2px rgb(126, 126, 126);
}
.additional-text {
  /* 默认样式 */
  opacity: 0; /* 初始时不可见 */
  transition: opacity 0.3s ease; /* 添加过渡效果 */
}

.additional-text:hover {
  color: red;
  /* 鼠标悬停时的样式 */
  opacity: 1; /* 鼠标悬停时变为可见 */
}
.BookContent {
  position: relative; /* 为 .additional-text 绝对定位做准备 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.additional-text {
  top: 20px;
  opacity: 0; /* 初始时不显示 */
  color: red;
}

.BookContent:hover .additional-text {
  opacity: 1; /* 鼠标悬停时显示 */
}
.Book_name,
.Book_price {
  margin: 6px 0;
}
.Shopping-car {
  position: absolute;
  margin-left: -290px;
  margin-top: -1400px;
  width: 1400px;
  height: 1400px;
  background-color: rgba(0, 0, 0, 0.7);
}

.Shopping-car-content {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 400px;
  margin-left: 500px;
  margin-top: 450px;
  height: 640px;
  border-radius: 5px;
  overflow: auto;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
}
.Shopping_x {
  margin-top: -10px;
  font-size: 40px;
  width: 30px;
  border: none;
  background-color: #ffffff;
}
.Book_img1 {
  width: 180px;
  height: 200px;
  margin-left: 110px;
}
.Shopping-price {
  display: flex;
  flex-direction: row;
  width: 380px;
  color: white;
  font-size: 30px;
  padding: 10px;
  background-color: rgb(208, 67, 67);
}
.Shopping-span {
  display: flex;
  text-align: center;
  flex-direction: column;
  margin-left: 60px;
}
.shapping-text {
  width: 100px;
  margin-left: 20px;
  color: white;
  font-size: 20px;
}
.shapping-text1 {
  font-size: 20px;
  color: white;
  margin-left: -20px;
}
.Shopping-name {
  color: #674c87;
  font-size: 25px;
  margin-top: 20px;
  margin-left: 50px;
}
.Shopping-author {
  font-size: 25px;
  margin-top: -5px;
  margin-left: 50px;
  color: #706f72;
}
.Shopping-introduction {
  font-size: 20px;
  margin-top: -5px;
  margin-left: 10px;
  text-indent: 2em;
  color: #5e5d5d;
}
.buy {
  width: 400px;
  position: absolute;
  border-top: 1px solid #d8d7d7;
  margin: -50px 500px;

  display: flex;
}
.start {
  margin-left: 20px;
  margin-top: 5px;
}
.Shopping-into {
  border-radius: 20px 0 0 20px;
  width: 100px;
  border: none;
  background-color: #f19d65;
  margin-top: 5px;
  margin-left: 110px;
}
.Shopping-buy {
  border-radius: 0 20px 20px 0;
  width: 100px;
  border: none;
  background-color: #dec886;
  margin-top: 5px;
}
/* 购买 */
.purchase-modal {
  position: absolute; /* 使得模态框固定在视口上 */
  background-color: #f0b798;
  margin-left: 210px;
  margin-top: -650px;
  width: 400px;
  z-index: 9999; /* 设置一个高的 z-index 值 */
  /* 其他样式 */
}
.red {
  color: red;
}
.purchase_book {
  margin-top: 20px;
  margin-left: 20px;
  font-size: 30px;
  color: #657cf1;
  text-shadow: 2px 2px 2px rgb(126, 126, 126);
}
.purchase_name {
  font-size: 25px;
  text-align: center;
}
.purchase_price {
  font-size: 25px;
  margin-left: 85px;
}
.purchase_total {
  font-size: 25px;
  margin-left: 85px;
}
.purchase_num {
  display: flex;
  flex-direction: row;
  font-size: 25px;
  margin-left: 85px;
}
.car_purchase {
  font-size: 25px;
}

.purchase_span {
  padding: 10px;
}
.tt {
  margin-top: 20px;
  border-top: 1px solid #848484;
  padding: 10px;
}
.Sure_sure {
  margin-left: 90px;
}
.success-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
.success-content {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 400px;
  height: 620px;
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
  margin-left: 50px;
  width: 300px;
}
.start_name_ok {
  font-size: 30px;
  text-align: center;
  color: #e73c11;
}
.start_name_ok1 {
  font-size: 30px;
  text-align: center;
}
.el-rate {
  margin-top: 30px;
}
.close_btnn {
  position: relative;
  top: 100px;
  width: 370px;
  margin-left: 15px;
  height: 50px;
  background-color: rgb(130, 126, 126);
  font-size: 30px;
  color: #ffffff;
  border: 1px solid #767676;
  border-radius: 30px;
}
</style>
