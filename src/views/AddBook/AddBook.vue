<template>
  <div class="add">
    <div class="add_content">
      <span class="top">添加书籍</span>
      <form @submit.prevent="addBook" class="add_from">
        <div class="book_box">
          <label for="book-name" class="add_name">书籍名称:</label>
          <input
            type="text"
            id="book-name"
            v-model="newBook.name"
            required
            class="add_input"
          /><br />
        </div>
        <div class="book_box">
          <div></div>
          <label for="book-author" class="add_name">书籍作者:</label>
          <input
            type="text"
            id="book-author"
            v-model="newBook.author"
            required
            class="add_input"
          /><br />
        </div>
        <div class="book_box">
          <label for="book-content" class="add_name1">书籍内容:</label>
          <textarea
            id="book-content"
            v-model="newBook.content"
            required
            class="add_textarea"
          ></textarea
          ><br />
        </div>
        <div class="book_box">
          <label for="book-price" class="add_name">书籍价钱:</label>
          <input
            type="number"
            id="book-price"
            v-model="newBook.price"
            required
            step="1"
            min="0"
            class="add_input"
            @input="handlePriceInput"
          /><br />
        </div>
        <div class="book_box">
          <label for="book-image" class="add_name">图片地址:</label>
          <input
            type="text"
            v-model="newBook.image"
            class="add_input"
            placeholder="图片网址或图片URL"
          /><br />
          <button @click="chooseLocalImage" class="btn_img">获取本地图片</button
          ><br />
        </div>
        <button type="submit" class="btn_ok">添加书籍</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newBook: {
        name: '',
        author: '',
        content: '',
        price: 0,
        image: '', // 初始化为空字符串
        imageSource: 'network' // 跟踪图片来源：'local' 或 'network'
      },
      books: [],
      defaultImage: '/src/assets/没有图片.png' // 替换为默认图片的路径
    }
  },
  watch: {
    'newBook.price'(newVal) {
      if (newVal < 0) {
        this.newBook.price = 0 // 如果价格变为负数，则重置为0
      }
    }
  },
  created() {
    // 尝试从本地存储加载已保存的书籍
    const savedBooks = localStorage.getItem('books')
    if (savedBooks) {
      try {
        this.books = JSON.parse(savedBooks)
      } catch (error) {
        console.error('Error parsing saved books:', error)
      }
    }
  },
  methods: {
    addBook() {
      // 如果图片来源是本地，确保已经选择了图片
      if (this.newBook.imageSource === 'local' && !this.newBook.image) {
        alert('请先选择本地图片！')
        return
      }

      // 将新书籍添加到本地存储
      const books = [...this.books, { ...this.newBook }]
      localStorage.setItem('books', JSON.stringify(books))
      // 检查书籍名称是否已存在于现有书籍列表中
      const duplicateBook = this.books.find(
        (book) => book.name === this.newBook.name
      )
      if (duplicateBook) {
        alert('书籍名称已存在，请输入不同的名称！')
        return // 如果名称已存在，则不执行后续操作
      }
      // 清空输入框以便添加新书籍
      this.newBook = {
        name: '',
        author: '',
        content: '',
        price: 0,
        image: '',
        imageSource: 'network' // 重置图片来源为网络
      }

      // 更新组件内的书籍列表
      this.books = books
      // 显示添加成功的提示
      alert('书籍添加成功！请在首页我的书籍查看')
    },
    chooseLocalImage() {
      this.newBook.imageSource = 'local'
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.onchange = (e) => {
        const file = e.target.files[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = (event) => {
            this.newBook.image = event.target.result
          }
          reader.readAsDataURL(file)
        }
      }
      input.click()
    },
    chooseNetworkImage() {
      this.newBook.imageSource = 'network'
    }
  }
}
</script>
<style scoped>
.add {
  margin: 0 auto;
  width: 1200px;
}
.add_content {
  width: 700px;
  height: 900px;
  border: 1px solid #909090;
  margin: 0 auto;
  padding: 30px;
  background-image: url(../../assets/background.png);
  background-size: 760px 900px;
}
.top {
  display: block;
  font-size: 35px;
  text-align: center;
  margin-top: 40px;
  color: red;
  text-shadow: 2px 2px 2px #909090;
}
.add_from {
  width: 500px;
  margin: 50px 150px;
}
.add_name {
  font-size: 28px;
}
.add_name1 {
  font-size: 28px;
}

.add_input {
  font-size: 26px;
  width: 250px;
  height: 40px;
  border: none;
  border-bottom: 1px solid;
  background-color: transparent; /* 移除了背景颜色 */
  margin-left: 10px;
}
.add_input:focus {
  outline: none;
}
.book_box {
  margin-bottom: 30px;
}
/* 新增的样式，用于textarea */
.add_textarea {
  font-size: 20px;
  width: 250px; /* 或者你需要的宽度 */
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
  width: 385px;
  height: 40px;
  margin-top: 30px;
  font-size: 20px;
  background-color: rgb(174, 174, 229);
  border: 1px solid #909090;
}
.btn_ok {
  width: 385px;
  height: 50px;
  margin-top: 10px;
  font-size: 20px;
  background-color: rgb(229, 64, 64);
  border: 1px solid #909090;
  border-radius: 20px;
}
</style>
