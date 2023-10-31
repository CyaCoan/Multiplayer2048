<script lang="ts" setup>
  import { reactive } from 'vue'
  // do not use same name with ref
  const form = reactive({
    usename: '',
    password: '',
  })

  const onSubmit = () => {
    console.log('submit!')
  }
  </script>
<template>
    <el-form :model="form" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="form.usename" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" />
      </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">登录</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<style lang ="scss" scoped>
</style>