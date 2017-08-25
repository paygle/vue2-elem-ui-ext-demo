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