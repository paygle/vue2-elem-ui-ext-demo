<style lang="scss">
  .btns-area{
    padding: 10px;
    margin-bottom: 20px;

    a{
      border: 1px solid #ccc;
      margin: 10px;
      padding: 5px 10px;
    }
  } 
  .info{
    padding: 0 20px;
    color: red;
  }
  .edit-model{
    padding: 20px 10px;
    margin: 10px;
    border: 1px dashed #ccc;
  }
</style>
<template>  
  <div class="edit-form-exam">
    <h3 class="col-header">
      <span class="bottom"></span>
      <span class="line"></span>
      <span class="label-angle"></span>
      <span class="label">增删改查实例模板</span>
    </h3>
    <div class="btns-area">
      <router-link to="/query-form">查询面板</router-link>
      <router-link to="/add-row">新增面板</router-link>
      <router-link to="/edit-row">编辑面板</router-link>
    </div>
    <div class="info">请参考虚线以内的内容, 没有内容时请点击“查询面板”</div>
    <div class="edit-model">
      <transition>
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script>

export default{
  name: 'EditFormExam',
  components: {

  },
  data(){
    return{

    }
  },
  methods: {

  }
}
</script>