<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { artGetChannelsService, artDelChannelService } from '../../api/article'
import ChannelEdit from '../Article/components/ChannelEdit.vue'
// import { ElMessageBox } from 'element-plus'
// import { ElMessage } from 'element-plus'
const channelList = ref([])
const loading = ref(false)
const dialog = ref()
const dialogVisible = ref(false)

const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  loading.value = false
}
getChannelList()

const onDelChannel = async (row) => {
  await alert('你确认要删除该分类么')
  await artDelChannelService(row.id)
  getChannelList()
}
const onEditChannel = (row) => {
  dialog.value.open(row)
}
const onAddChannel = () => {
  dialog.value.open({})
  dialogVisible.value = true
}
const onSuccess = () => {
  getChannelList()
}
</script>

<template>
  <page-container title="书籍笔记">
    <template #extra>
      <el-button @click="onAddChannel">添加</el-button>
    </template>
    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="书籍名称"></el-table-column>
      <el-table-column prop="cate_alias" label="英文名"></el-table-column>
      <el-table-column label="操作" width="150">
        <!-- row 就是 channelList 的一项， $index 下标 -->
        <template #default="{ row, $index }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row, $index)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChannel(row, $index)"
          ></el-button>
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>

    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
  </page-container>
</template>

<style scoped></style>
