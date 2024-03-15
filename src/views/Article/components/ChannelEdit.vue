<script setup>
import { ref } from 'vue'
import { artEditChannelService, artAddChannelService } from '@/api/article.js'
const dialogVisible = ref(false)
const formRef = ref()
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是 1-10 位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入英文名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z]{1,20}$/,
      message: '分类名必须是 1-20 位的字母',
      trigger: 'blur'
    }
  ]
}

const emit = defineEmits(['success'])
const onSubmit = async () => {
  await formRef.value.validate()
  if (formModel.value.cate_name) {
    // 检查 cate_name 是否已经包含书名号《》
    if (
      !formModel.value.cate_name.includes('《') &&
      !formModel.value.cate_name.includes('》')
    ) {
      // 如果不包含书名号，则在书籍名称两侧添加书名号
      formModel.value.cate_name = `《${formModel.value.cate_name}》`
    }
  }
  const isEdit = formModel.value.id
  if (isEdit) {
    await artEditChannelService(formModel.value)
    alert('请确认编辑')
  } else {
    await artAddChannelService(formModel.value)
    alert('请确认添加')
  }
  dialogVisible.value = false
  emit('success')
}

// 组件对外暴露一个方法 open，基于open传来的参数，区分添加还是编辑
// open({})  => 表单无需渲染，说明是添加
// open({ id, cate_name, ... })  => 表单需要渲染，说明是编辑
// open调用后，可以打开弹窗
const open = (row) => {
  dialogVisible.value = true
  formModel.value = { ...row } // 添加 → 重置了表单内容，编辑 → 存储了需要回显的数据
}

// 向外暴露方法
defineExpose({
  open
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑分类' : '添加笔记'"
    width="30%"
  >
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="书籍名称" prop="cate_name">
        <el-input
          v-model="formModel.cate_name"
          placeholder="请输入书籍名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="英文名" prop="cate_alias">
        <el-input
          v-model="formModel.cate_alias"
          placeholder="请输入英文名"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
