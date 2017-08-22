<template>
  <div class="waterfall-view fwidth">
    <h3 class="col-header">
      <span class="bottom"></span>
      <span class="line"></span>
      <span class="label-angle"></span>
      <span class="label">WaterFall 瀑布流</span>
    </h3>
    <water-fall
      :fields="fieldsName"
      :data="listdata"
      :urltmpl="urltmplFun"
      @cell-click="CellClick">
    </water-fall>
  </div>
</template>
<script>
import WaterFall from 'components/water-fall'
import { listdata } from './data.js'

export default {

  name: "WaterfallView",

  components:{
    WaterFall
  },

  data(){

    return {
      fieldsName: {

      },
      listdata: listdata
    }
  },

  methods: {
    CellClick(val){
      console.log('cell-click:', val)
    },
    urltmplFun(code, pcode){
      return "javascript:void(0);"
    }
  }
}

</script>