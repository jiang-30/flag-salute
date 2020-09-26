<template>
  <div class="message-box">
    <div class="message-header">留言</div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="formData.content"
        :rules="[{ required: true, message: '请填写留言内容' }]"
        name="content"
        label="留言内容"
        placeholder="留言内容"
        type="textarea"
        label-width="90px"
        colon
        required
        clearable
      />
      <van-field
        :value="formData.address"
        name="address"
        label="盟（市）"
        placeholder="盟（市）"
        is-link
        readonly
        label-width="90px"
        colon
        required
        @click="show=true"
      />

      <van-field
        v-model="formData.school"
        :rules="[{ required: true, message: '请填写单位（学校）' }]"
        name="school"
        label="单位（学校）"
        placeholder="单位（学校）"
        label-width="90px"
        colon
        required
        clearable
      />
      <van-field
        v-model="formData.username"
        :rules="[{ required: true, message: '请填写姓名' }]"
        name="username"
        label="姓名"
        placeholder="姓名"
        label-width="90px"
        colon
        required
        clearable
      />
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <van-popup v-model="show" position="bottom" round>
      <van-picker
        title="盟（市）"
        show-toolbar
        default-index="0"
        :columns="columns"
        @confirm="onConfirm"
        @cancel="show=false"
      />
    </van-popup>

  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      columns: ['呼和浩特市', '包头市', '呼伦贝尔市', '兴安盟', '通辽市', '赤峰市', '锡林郭勒盟', '乌兰察布市', '鄂尔多斯市', '巴彦淖尔市', '乌海市', '阿拉善盟', '满洲里市', '二连浩特市'],
      formData: {
        content: '',
        address: '呼和浩特市',
        school: '',
        username: '',
      }
    };
  },
  methods: {
    handlerInitFormData(){
      this.formData = {
        content: '',
        address: '呼和浩特市',
        school: '',
        username: '',
      }
    },
    onSubmit(values) {
      this.axios.post('/flagSalute/message', values).then(() => {
        this.$notify({
          type: 'success',
          message: '留言成功'
        });
        this.handlerInitFormData()
        this.$emit('success')
      }).catch(err => {
        console.warn(err)
        this.$notify({
          type: 'warning',
          message: '留言失败'
        });
      })
    },
    onConfirm(value) {
      this.formData.address = value
      this.show = false
    },
  },
}
</script>

<style lang="scss" scoped>
.message-box {
  .message-header {
    height: 54px;
    line-height: 54px;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    background-color: var(--primary-color);
  }
}
</style>