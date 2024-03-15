<template>
  <div class="border">
    <div class="Book">
      <span class="book_feng">《气风了》预售书籍</span>
      <span class="book_feng1">敬请期待</span>
    </div>
    <div class="box">
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
    <div class="content">
      <span class="content_price">价格：敬请期待</span>
      <span class="content_text">正品保障，敬请期待</span>
    </div>
    <div class="autor">
      <span class="content_autor">作者：日本作家堀辰雄</span>
      <span class="content_content"
        >简介：他出生于1904年，是芥川龙之介唯一的弟子，以新心理主义代表作家的身份活跃于文坛。堀辰雄的作品氛围哀婉缠绵，擅长以细腻笔触描绘人物纤细敏感的内心感受。</span
      >
      <span class="content_content1"
        >《起风了》这部小说主要描写了在宁静秀美的八岳山麓，男主人公陪伴身患绝症的未婚妻节子度过了人生的最后几个月。他们远离尘世的喧嚣，生命中只余下彼此。小说通过记录两人共同面对死亡、寻觅生的幸福的过程，展现了他们对幸福的向往、对现实的无奈、对自我的反思以及对爱情的忠贞。
        这部作品不仅是堀辰雄的代表作，更是他文学思想定型的一个里程碑。它以其深刻的思想主题和唯美的艺术境界博得了许多读者的肯定与感动。2013年，宫崎骏更是将其改编为动画电影的收山之作，进一步提升了这部作品的知名度和影响力。</span
      >
    </div>
    <div class="book">
      <span class="book_book">第一章概述：</span>
      <span class="book_book1"
        >《起风了》的第一章中，故事往往从主人公与未婚妻节子的相识和相恋开始展开。他们可能是在一个宁静而美丽的环境中相遇，比如八岳山麓的乡间小镇。这一章会描绘两人之间的初次接触，以及他们逐渐建立起的深厚情感。
        通过细腻的笔触，作者可能会展现节子的温柔、善良和乐观性格，以及主人公对她的深深吸引。他们可能会一起漫步在田野间，欣赏四季变换的美景，分享彼此的梦想和理想。这些美好的时刻将为他们之后的生活奠定坚实的情感基础。
        同时，在这一章中，作者也可能逐渐引入节子身患绝症的情节。虽然疾病的存在会给两人的关系带来阴影，但他们的爱情却因此变得更加珍贵和坚定。他们可能会一起面对这个挑战，努力寻找生的希望和幸福的可能。</span
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageList: [
        'https://img2.baidu.com/it/u=1583825888,4155105480&fm=253&fmt=auto&app=138&f=JPEG?w=1235&h=694',
        'https://img0.baidu.com/it/u=560993611,3341556297&fm=253&fmt=auto&app=138&f=JPEG?w=960&h=499',
        'https://img0.baidu.com/it/u=3740817332,3542526355&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281',
        'https://img1.baidu.com/it/u=3716663503,1440566683&fm=253&fmt=auto&app=138&f=JPEG?w=668&h=362'
      ]
    }
  }
}
</script>

<style scoped>
.border {
  width: 900px;
  margin: 0 auto;
  border: 1px solid #909090;
}
.box {
  width: 900px;
  margin: 0 auto;
}
.TopCarousel-img {
  width: 900px;
  height: 300px;
}
.Book {
  padding: 20px;
}
.book_feng {
  font-size: 30px;
  color: red;
  font-weight: 700;
  text-shadow: 2px 2px 2px rgb(78, 78, 77);
}
.book_feng1 {
  float: right;
  color: rgb(245, 106, 6);
  font-size: 25px;
}
.content {
  height: 50px;
  background-color: rgb(156, 231, 188);
}
.content_price {
  color: rgb(255, 98, 0);
  font-weight: 700;
  font-size: 28px;
  line-height: 50px;
  text-shadow: 2px 2px 2px rgb(78, 78, 77);
}
.content_text {
  float: right;
  font-size: 22px;
  color: #544e4e;
  line-height: 50px;
  text-shadow: 1px 1px 1px rgb(78, 78, 77);
}
.autor {
  display: flex;
  flex-direction: column;
  border: 1px solid #909090;
  border-radius: 30px;
  margin-top: 20px;
  background-color: rgb(191, 245, 156);
  box-shadow: 1px 1px 1px rgb(78, 78, 77);
  padding: 10px;
}
.content_autor {
  text-indent: 1.5em;
  font-size: 24px;
}
.content_content {
  margin-top: 10px;
  text-indent: 2em;
  font-size: 20px;
}
.content_content1 {
  margin-top: 10px;
  text-indent: 1.5em;
  font-size: 20px;
  color: #646161;
}
.book {
  display: flex;
  flex-direction: column;
  border: 1px solid #909090;
  border-radius: 30px;
  margin-top: 20px;
  background-color: rgb(232, 154, 132);
  box-shadow: 1px 1px 1px rgb(78, 78, 77);
  padding: 10px;
  margin-bottom: 30px;
}
.book_book {
  font-size: 25px;
  text-indent: 1.5em;
}
.book_book1 {
  font-size: 20px;
  text-indent: 1.5em;
  color: #646161;
  margin-top: 10px;
}
</style>
