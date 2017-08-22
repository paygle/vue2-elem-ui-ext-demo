<template>
  <div class="templ">
    动态组件
    {{ data1 +"->"+ data2 }}
  </div>
</template>
<script>
  export default {
    name: 'Templ',

    props: {
      tmplData: [Object, Array]    // 查询返回数据
    },
    data(){
      return {
      
      }
    },
    computed:{
      data1(){
        if(this.tmplData){
          return this.tmplData.cop
        }
        return ""
      },
      data2(){
        if(this.tmplData){
          return this.tmplData.dat
        }
        return ""
      }
    },
    mounted(){
      console.log("Templ Data", this.tmplData)
    },
    methods: {
 
    }
  };
</script>
