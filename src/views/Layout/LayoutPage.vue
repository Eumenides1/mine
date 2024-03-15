<template>
  <div class="car">
    <div v-if="products.length > 0">
      <span class="go_car">购物车</span>
      <div class="Car_box"></div>
      <div
        v-for="(product, index) in products"
        :key="product.id"
        class="Car_li"
      >
        <img :src="product.image" alt="" class="car_imgimg" />
        <div class="car_right">
          <div class="car_name">
            《{{ product.name }}》
            <div class="CarDel1">
              <img
                src="../../assets/删除.png"
                alt=""
                class="car_del"
                @click="removeProduct(index)"
              />
            </div>
          </div>
          <div class="car_author">作者：{{ product.author }}</div>
          <div class="car_content">{{ product.content }}</div>
          <div class="car_botton">
            <div class="car_price">
              {{ product.price }}￥
              <sapn class="car_total">总计：{{ product.totalPrice }}￥</sapn>
              <span class="car_buy" @click="handleBuyClick(product)"
                >立即购买</span
              >
            </div>
            <div class="car_num1">
              <button class="car_num_jia1" @click="increaseQuantity(index)">
                +1
              </button>
              <span class="car_num_span1">{{ product.quantity }}</span>
              <button class="car_num_jian1" @click="decreaseQuantity(index)">
                -1
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="No">
      <img src="../../assets/没有东西-空白页.png" alt="" class="no-img" />
      <span class="no-txt">空空如也,请加入书籍</span>
    </div>
    <!-- 购买弹窗 -->
    <div v-if="showBuyModal" class="buy-modal">
      <div class="buyy-content">
        <span class="close" @click="toggleBuyModal">&times;</span>
        <h2 class="buy_book1">购买书籍</h2>
        <!-- 在这里添加购买页面的内容 -->
        <img :src="selectedProduct.image" alt="" class="buy_img1" />
        <p class="buy_name1">商品名称：《{{ selectedProduct.name }}》</p>
        <p class="buy_price1">商品单价：{{ selectedProduct.price }}￥</p>
        <p class="buy_num1">购买数量：{{ selectedProduct.quantity }}</p>
        <p class="buy_total1">
          商品总价：<sapn class="buy_t1"
            >{{ selectedProduct.totalPrice }}￥</sapn
          >
        </p>
        <el-button
          type="danger"
          size="large"
          round
          @click="confirmPurchase"
          class="buy_Sure11"
          >确认购买</el-button
        >
      </div>
    </div>
    <div v-if="showSuccessModal" class="success-modal">
      <div class="buyy-content">
        <h2 class="start_name">购买成功！</h2>
        <p class="start_name1">感谢你的购买！</p>
        <p class="start_name1">欢迎你下次购买</p>
        <div class="demo-rate-block">
          <span class="demonstration">请为商品评分</span>
          <el-rate v-model="value2" :colors="colors" class="start_start" />
        </div>
        <button @click="toggleSuccessModal" class="start_btn">关闭</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, toRefs } from 'vue'
const showBuyModal = ref(false) // 控制购买弹窗的显示与隐藏
const selectedProduct = ref(null) // 添加一个响应式的selectedProduct引用
const showSuccessModal = ref(false) // 控制购买成功弹窗的显示与隐藏
import { ElLoading } from 'element-plus'
// 评分
const value2 = ref(null)
const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900']) // same as { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }

// 购买 添加一个新的函数来处理确认购买后的逻辑
const confirmPurchase = () => {
  // 在这里可以添加处理购买逻辑的代码，比如发送购买请求到服务器
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0)'
  })
  setTimeout(() => {
    showSuccessModal.value = true
    showBuyModal.value = false

    // 重置购买弹窗的状态，以便下次使用
    selectedProduct.value = null
    loading.close()
  }, 500)
  // 假设购买成功，则显示购买成功弹窗并隐藏购买弹窗
}

// 购买 添加一个新的函数来控制购买成功弹窗的显示与隐藏
const toggleSuccessModal = () => {
  showSuccessModal.value = !showSuccessModal.value
}
const toggleBuyModal = () => {
  showBuyModal.value = !showBuyModal.value // 切换弹窗的显示状态
}
const state = reactive({
  products: [] // 用于存储从本地存储读取的产品数组
})

const increaseQuantity = (index) => {
  if (state.products[index] && state.products[index].quantity) {
    state.products[index].quantity += 1
    // 更新总价
    state.products[index].totalPrice =
      state.products[index].price * state.products[index].quantity
    saveProducts()
  }
}

const decreaseQuantity = (index) => {
  if (state.products[index] && state.products[index].quantity > 1) {
    state.products[index].quantity -= 1
    // 更新总价
    state.products[index].totalPrice =
      state.products[index].price * state.products[index].quantity
    saveProducts()
  }
}

const removeProduct = (index) => {
  // 从数组中移除产品
  state.products.splice(index, 1)
  saveProducts()
}

const saveProducts = () => {
  // 更新本地存储
  localStorage.setItem('cartData', JSON.stringify(state.products))
}

const loadProducts = () => {
  // 从本地存储读取数据
  const cartData = localStorage.getItem('cartData')
  try {
    const parsedProducts = JSON.parse(cartData) || []
    state.products = parsedProducts.map((product) => {
      // 如果product没有totalPrice属性，则计算它
      if (!product.totalPrice) {
        product.totalPrice = product.price * (product.quantity || 1)
      }
      return product
    })
  } catch (error) {
    console.error('解析本地存储数据时出错:', error)
  }
}

// 在组件创建时加载产品
loadProducts()
// 当用户点击购买按钮时，设置selectedProduct
const handleBuyClick = (product) => {
  selectedProduct.value = product
  toggleBuyModal()
}
// 将响应式对象解构为单独的 ref，以便在模板中使用
const { products } = toRefs(state)
</script>
<style scoped>
.car {
  width: 1400px;
  margin: 0 auto;
  border: 1px solid #b1afaf;
  padding: 30px;
}
.go_car {
  font-size: 50px;
  color: rgb(243, 142, 79);
  text-shadow: 2px 2px 2px rgb(119, 119, 119);
  margin-left: 100px;
}
/* .Car_box {
  border: solid;
} */
.Car_li {
  display: flex;
  list-style-type: none;
  border: 1px solid #b1afaf;
  margin-top: 20px;
  padding: 20px;
}
.car_imgimg {
  width: 180px;
}
.car_right {
  margin-left: 20px;
}
.car_name {
  font-size: 28px;
}
.car_price {
  margin-left: 20px;
  font-size: 30px;
  color: rgb(216, 54, 54);
  margin-top: 10px;
  text-shadow: 1px 1px 1px rgb(119, 119, 119);
}
.car_author {
  margin-top: 10px;
  margin-left: 20px;
  font-size: 25px;
  color: #8b8686;
}
.car_content {
  margin-top: 10px;
  font-size: 25px;
  color: #767676;
}
.car_del {
  width: 60px;
  margin-left: 1100px;
  margin-top: -150px;
}
.car_botton {
  display: flex;
  justify-content: space-between;
  align-items: center; /* 可选，确保子元素垂直居中 */
  width: 103%;
}
.car_total {
  margin-left: 100px;
  color: #d2715e;
  font-size: 25px;
}
.car_buy {
  font-size: 25px;
  text-shadow: 1px 1px 1px rgb(119, 119, 119);
  margin-left: 50px;
}
.car_num1 {
  margin-right: 64px;
  font-size: 25px;
  border: 1px solid #767676;
}
.car_num_jia1 {
  padding: 0 6px;
  font-size: 20px;
  border: none;
  height: 40px;
  border-right: 1px solid #767676;
}
.car_num_jian1 {
  font-size: 20px;
  border: none;
  height: 40px;
  border-left: 1px solid #767676;
  padding: 0 8px;
}
.car_num_span1 {
  color: red;
  height: 100%;
  font-size: 24px;
  /* border: 1px solid #767676; */
  padding: 0 13px;
}
.No {
  display: flex;
  text-align: center;
  flex-direction: column;
  margin: 100px auto;
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
}
/* 购买页面 */
.buy-modal {
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

.buyy-content {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 500px;
  height: 720px;
  padding: 20px;
  border-radius: 5px;
  overflow: auto;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
}

.close {
  cursor: pointer;
  color: #aaa;
  float: right;
  font-size: 40px;
  font-weight: bold;
}
.buy_book1 {
  margin-top: -10px;
  font-size: 35px;
  text-align: center;
  color: #7e6ed0;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
}
.buy_img1 {
  width: 180px;
  margin-left: 140px;
}
.buy_name1,
.buy_price1,
.buy_num1,
.buy_total1 {
  font-size: 25px;
  margin-left: 130px;
}
.buy_t1 {
  color: red;
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
  margin-left: 90px;
  width: 300px;
}
.start_name {
  font-size: 30px;
  text-align: center;
  color: #e73c11;
}
.start_name1 {
  font-size: 30px;
  text-align: center;
}
.el-rate {
  margin-top: 30px;
}
.start_btn {
  position: relative;
  top: 200px;
  width: 500px;
  height: 50px;
  background-color: rgb(130, 126, 126);
  font-size: 30px;
  color: #ffffff;
  border: 1px solid #767676;
  border-radius: 30px;
}
</style>
