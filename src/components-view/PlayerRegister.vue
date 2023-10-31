<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

interface RuleForm {
  usename: '',
  password: '',
  passwordagain: '',
  xingbie: '',
  date1: '',
  delivery: false,
  detail: '',
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  usename: '',
  password: '',
  passwordagain: '',
  xingbie: '',
  date1: '',
  delivery: false,
  detail: '',
})

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (ruleForm.password !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (value !== ruleForm.password) {
    callback(new Error("两次密码不一致!"))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<RuleForm>>({
  usename: [
    { required: true, message: '请输入正确用户名', trigger: 'blur' },
    { min: 3, max: 5, message: '用户名长度应为3到5字', trigger: 'blur' },
  ],
  password: [{ validator: validatePass, trigger: 'blur' }],
  passwordagain: [{ validator: validatePass2, trigger: 'blur' }],
  xingbie: [
    {
      required: true,
      message: '请选择性别',
      trigger: 'change',
    },
  ],
  date1: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  detail: [
    { required: true, message: '请输入备注，任意即可', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

// const options = Array.from({ length: 10000 }).map((_, idx) => ({
//   value: `${idx + 1}`,
//   label: `${idx + 1}`,
// }))
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item label="用户名" prop="usename">
      <el-input v-model="ruleForm.usename" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
    </el-form-item>

    <el-form-item label="确认密码" prop="passwordagain">
      <el-input
        v-model="ruleForm.passwordagain"
        type="passwordagain"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item label="性别" prop="xingbie">
      <el-select v-model="ruleForm.xingbie" placeholder="输入你的性别">
        <el-option label="男" value="male" />
        <el-option label="女" value="female" />
      </el-select>
    </el-form-item>
    <el-form-item label="生日" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker
            v-model="ruleForm.date1"
            type="date"
            label="Pick a date"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
      <el-col class="text-center" :span="2">
        <span class="text-gray-500">-</span>
      </el-col>
    </el-form-item>
    <el-form-item label="热爱游戏" prop="delivery">
      <el-switch v-model="ruleForm.delivery" />
    </el-form-item>
    <el-form-item label="备注" prop="detail">
      <el-input v-model="ruleForm.detail" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        注册
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang ="scss" scoped>
</style>