<template>
  <div v-if="books.length > 0" class="box">
    <div class="container" @click="showDetails(book)">
      <div
        v-for="book in books"
        :key="book.name"
        :class="{ sold: book.isSold }"
        class="book"
      >
        <div class="BookContent">
          <div v-if="book.isSold" class="sold-overlay">
            <img src="../../../assets/已出售 (1).png" alt="Sold Overlay" />
          </div>
          <img :src="book.image" :alt="book.name" class="Book_img" />
          <div class="Book_name">书名：《{{ book.name }}》</div>
          <div class="Book_price">作者:{{ book.author }}</div>
          <div class="Book_author">价格: {{ book.price }}￥</div>
          <div class="Book_content">简介: {{ book.content }}</div>
          <div class="bom">
            <div class="an">
              <el-button
                type="primary"
                :icon="Edit"
                size="large"
                circle
                class="edit"
                @click="showDetails(book)"
              />
              <el-button
                type="danger"
                :icon="Delete"
                size="large"
                circle
                class="del"
                @click="deleteBookByName(book.name)"
              />
            </div>
            <div class="chu_book">
              <button @click="sellBook(book)" class="chu">
                {{ book.isSold ? '已出售' : '出售' }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showDetailModal" class="detail-modal">
        <div class="Shopping-car-content">
          <button @click="hideDetails" class="Shopping_x">x</button>
          <h3 class="Shopping-name">修改书籍内容</h3>
          <div class="xiugai">
            <label for="" class="left_name">书籍名称：</label>
            <input
              class="right_input"
              type="text"
              v-model="detailBook.name"
              id="bookName"
            />
          </div>
          <div class="xiugai">
            <label for="" class="left_name">书籍作者：</label>
            <input
              class="right_input"
              type="text"
              v-model="detailBook.author"
              id="bookName"
            />
          </div>
          <div class="xiugai">
            <label for="" class="left_name">书籍价格：</label>
            <input
              type="number"
              required
              step="1"
              min="0"
              v-model="detailBook.price"
              class="right_input"
            /><br />
          </div>
          <div class="xiugai">
            <label for="" class="left_name">书籍简介：</label>
            <textarea
              class="add_textarea"
              type="text"
              v-model="detailBook.content"
              id="bookName"
            ></textarea>
          </div>
          <div class="xiugai">
            <label for="book-image" class="left_name">图片地址：</label>
            <input
              type="text"
              placeholder="图片网址或图片URL"
              v-model="detailBook.image"
              class="right_input"
            />
            <button @click="chooseLocalImage" class="btn_img">
              获取本地图片地址</button
            ><br />
          </div>
          <button @click="confirmDetails" class="btn">确认修改</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="no">
    <img src="../../../assets/没有东西-空白页.png" alt="" class="img" />
    <span class="text">空空如也，请添加属于自己的书籍</span>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'

const books = ref([]) // 初始化书籍数组
const showDetailModal = ref(false)
const detailBook = ref({
  image: '' // 初始化图片地址为空字符串
})
const sellBook = (book) => {
  book.isSold = true // 将书籍标记为已出售
}
function loadBooksFromLocalStorage() {
  const savedBooks = localStorage.getItem('books')
  if (savedBooks) {
    try {
      const parsedBooks = JSON.parse(savedBooks)
      if (
        Array.isArray(parsedBooks) &&
        parsedBooks.every((book) => typeof book === 'object' && book !== null)
      ) {
        books.value = parsedBooks
      } else {
        console.error(
          'Error parsing saved books: Data is not in the expected format.'
        )
      }
    } catch (error) {
      console.error('Error parsing saved books:', error)
    }
  }
}

// 显示书籍详情的方法
function showDetails(book) {
  if (book && typeof book === 'object' && book.name) {
    showDetailModal.value = true
    detailBook.value = book
  } else {
    console.error(book)
  }
}
// 隐藏书籍详情的方法
function hideDetails() {
  showDetailModal.value = false
}
// 删除指定名称的书籍的方法
function deleteBookByName(bookName) {
  const index = books.value.findIndex((book) => book.name === bookName)
  if (index !== -1) {
    // 从数组中删除书籍
    books.value.splice(index, 1)
    // 更新本地存储
    saveBooksToLocalStorage()
  } else {
    console.error('No book found with the name:', bookName)
  }
}

// 保存书籍数据到本地存储的方法
function saveBooksToLocalStorage() {
  const savedBooks = JSON.stringify(books.value)
  localStorage.setItem('books', savedBooks)
}
// 确认书籍详情的方法
function confirmDetails() {
  if (
    detailBook.value &&
    typeof detailBook.value === 'object' &&
    detailBook.value.name
  ) {
    const bookIndex = books.value.findIndex(
      (book) => book.name === detailBook.value.name
    )

    if (bookIndex !== -1) {
      // 如果找到了匹配的书籍，则更新它
      books.value[bookIndex] = {
        ...books.value[bookIndex],
        ...detailBook.value
      }

      // 保存更新后的书籍数组到本地存储
      saveBooksToLocalStorage()

      // 关闭详情模态框
      hideDetails()
    } else {
      // 如果没有找到匹配的书籍，则输出错误
      console.error('无法找到名为', detailBook.value.name, '的书籍来更新。')
      // 可以在这里处理错误，例如通知用户书籍未找到
    }
  } else {
    // detailBook.value 是未定义的或不是一个对象
    console.error(
      'detailBook 是未定义的或不是一个有效的书籍对象：',
      detailBook.value
    )
    // 在这里处理错误，例如清空 detailBook 或显示错误消息
  }
}
function chooseLocalImage() {
  const inputElement = document.createElement('input')
  inputElement.type = 'file'
  inputElement.accept = 'image/*' // 只接受图片文件

  inputElement.onchange = (event) => {
    const file = event.target.files[0]
    if (file) {
      // 创建FileReader对象来读取文件
      const reader = new FileReader()
      reader.onload = (e) => {
        // 当文件读取完成时，获取文件的DataURL
        detailBook.value.image = e.target.result
      }
      reader.readAsDataURL(file) // 读取文件为DataURL格式
    }
  }

  inputElement.click() // 触发文件选择对话框
}
// 在组件挂载时加载书籍数据
onMounted(loadBooksFromLocalStorage)
</script>

<style scoped>
.box {
  background-color: #d7c7f1;
  padding: 20px;
}
.container {
  display: flex;
  flex-wrap: wrap; /* 允许项目换行 */
  justify-content: flex-start;
}
.book {
  border: 1px solid #b5b5b5;
  padding: 10px;
  margin-top: 20px; /* 替换掉原本的右边距，用底部边距代替 */
  margin-left: 40px;
  width: calc(38.5% - 105px);
  height: 400px; /* 假设一行最多四个，减去的是margin-bottom的宽度 */
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
  box-shadow: 1px 1px 2px rgb(126, 126, 126);
}
.Book_name {
  font-size: 24px;
  text-indent: 2em;
  color: red;
  text-shadow: 2px 2px 2px #5e5d5d;
}
.Book_price {
  color: #5e5d5d;
  font-size: 23px;
  text-indent: 2.1em;
}
.Book_author {
  color: #5e5d5d;
  font-size: 23px;
  text-indent: 2.1em;
}
.Book_content {
  color: #5e5d5d;
  width: 280px;
  font-size: 18px;
  text-indent: 2.5em;
}
.BookContent {
  position: absolute; /* 为 .additional-text 绝对定位做准备 */
  display: flex;
  flex-direction: column;
}
.Book_img {
  width: 130px;
  height: 155px;
  border: 1px solid #848484;
  margin-left: 80px;
  box-shadow: 1px 1px 2px rgb(126, 126, 126);
}
.bom {
  display: flex;
  width: 305px;
  height: 52px;
  background-color: #e1a7e4;
  position: absolute;
  box-shadow: 2px 2px 2px #5e5d5d;
  left: -10px;
  top: 340px;
  margin: 0;
  padding: 0;
}
.an {
  width: 160px;
}
.edit {
  margin: 5px 30px;
}
/*  出售*/
.sold-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
}

.sold-overlay img {
  width: 100%;
  height: auto;
  /* 其他样式 */
}
.chu_book {
  width: 140px;
}
.chu {
  border: solid;
  font-size: 25px;
  border: none;
  background-color: #f19d65;
  height: 40px;
  margin: 5px 12px;
  border-radius: 20px;
  padding: 0 20px;
}
.Book_name,
.Book_price {
  margin: 6px 0;
}

.detail-modal {
  position: absolute;
  margin-left: -290px;
  margin-top: -400px;
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
.Shopping-price {
  display: flex;
  flex-direction: row;
  width: 380px;
  color: white;
  font-size: 30px;
  padding: 10px;
  background-color: rgb(208, 67, 67);
}

.buy {
  width: 400px;
  position: absolute;
  border-top: 1px solid #d8d7d7;
  margin: 590px 1px;

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
.Shopping-name {
  color: #674c87;
  font-size: 30px;
  margin-top: 20px;
  margin-left: 120px;
}
.xiugai {
  margin-bottom: 30px;
}
.left_name {
  font-size: 25px;
  margin-left: 35px;
  color: #65389c;
}
.right_input {
  font-size: 20px;
  width: 200px;
  height: 40px;
  border: none;
  border-bottom: 1px solid;
  background-color: transparent; /* 移除了背景颜色 */
  margin-left: 10px;
}
.right_input:focus {
  outline: none;
}
.add_textarea {
  font-size: 20px;
  width: 200px; /* 或者你需要的宽度 */
  height: 100px; /* 或者你需要的高度 */
  border-bottom: 1px solid;
  margin-left: 10px;
  background-color: transparent; /* 移除了背景颜色 */
  resize: none; /* 禁止用户调整textarea的大小 */
  vertical-align: top;
}
.add_textarea:focus {
  outline: none;
}
.btn_img {
  width: 330px;
  height: 35px;
  margin-top: 20px;
  font-size: 20px;
  margin-left: 35px;
  background-color: #8866b1;
  color: #ffffff;
  border: none;
  border-radius: 20px;
}
.btn {
  width: 330px;
  height: 35px;
  margin-top: -10px;
  font-size: 20px;
  margin-left: 35px;
  background-color: #e61010;
  color: #ffffff;
  border: none;
  border-radius: 20px;
}
.no {
  width: 400px;
  margin-top: 100px;
}
.img {
  width: 400px;
}
.text {
  display: block;
  margin-left: 20px;
  text-align: center;
  font-size: 40px;
  text-shadow: 1px 1px 1px #2c2c2c;
  color: #5e5d5d;
}
</style>
