<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.saveDbToJsonToLocalStorage()
  },
  methods: {
    async saveDbToJsonToLocalStorage() {
      try {
        // 假设 db.json 文件与你的前端代码位于同一服务器上
        const response = await fetch('./index.json')
        if (!response.ok) {
          throw new Error('Failed to fetch index.json')
        }
        const dbData = await response.json()

        // 将数据保存到 localStorage
        localStorage.setItem('myAppDbData', JSON.stringify(dbData))
        console.log('Data saved to localStorage')
      } catch (error) {
        console.error('Error fetching or saving data:', error)
      }
    }
  }
}
</script>

<style></style>
