<template>
  <div class="footer">
    <div class="footer_top">
      <span class="footer_text">好</span>
      <div class="footer_title">
        <span class="footer_title1">优质好书</span>
        <span class="footer_title2">种类多样 无忧保障</span>
      </div>
    </div>
    <div class="footer_top">
      <span class="footer_text">妙</span>
      <div class="footer_title">
        <span class="footer_title1">奇思妙想</span>
        <span class="footer_title2">内容精彩，创意无限</span>
      </div>
    </div>
    <div class="footer_top">
      <span class="footer_text">特</span>
      <div class="footer_title">
        <span class="footer_title1">特色服务</span>
        <span class="footer_title2">服务至上，顾客为尊</span>
      </div>
    </div>
    <div class="footer_top">
      <span class="footer_text">优</span>
      <div class="footer_title">
        <span class="footer_title1">优质卓越</span>
        <span class="footer_title2">品牌优选，正品保障</span>
      </div>
    </div>
    <div class="footer_top">
      <span class="footer_text">服</span>
      <div class="footer_title">
        <span class="footer_title1">服务至上</span>
        <span class="footer_title2">服务周到，宾至如归</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.footer {
  padding: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.footer_text {
  font-size: 30px;
  color: red;
  margin-left: 70px;
  text-align: center;
}
.footer_top {
  padding: 5px;
}
.footer_title {
  font-size: 20px;
  color: #a0a1a1;
  display: flex;
  flex-direction: column;
  text-align: center;
}
</style>
