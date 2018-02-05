/** SysMsg component */
define([
  "vue",
  "text!components/sys-msg/main.tpl",
  "utilExt",
  "websocket"
], function(Vue, tpl, utilExt, websocket){

var Message = ELEMENT.Message;
var timehdl = null;

return Vue.component('SysMsg', {
  template: tpl,
  name : 'SysMsg',
  cName : '系统消息',
  componentName: 'SysMsg',
  data: function(){
    return{
      msgCount: 0,
      msgExist: 0,
      msgData:[
      ]
    }
  },
  methods:{
    linkClick: function(item){
      var _self = this;
      utilExt.request({
        serviceId: "40000007",
        tranCode: "MSGPLAT007",
        model: {"modifyList" : [{"c_pk_id":item.c_pk_id}]},
        onSuccess: function(jqXHR, textStatus, data) {
          _self.getSysMsg();
        },
        onError: function(jqXHR, textStatus, data) {
          Message.error(data.message);
          _self.msgData = [];
        },
      });
    },
    moreClick: function(item){
      // console.log('moreClick', item);
    },
    delMsg: function(item){
      var _self = this;
      this.msgData.splice(this.msgData.indexOf(item), 1);
      this.msgCount--;
      utilExt.request({
        serviceId: "40000007",
        tranCode: "MSGPLAT007",
        model: {"deleteList" : [{"c_pk_id":item.c_pk_id}]},
        onSuccess: function(jqXHR, textStatus, data) {
          _self.getSysMsg();
        },
        onError: function(jqXHR, textStatus, data) {
          Message.error(data.message);
          _self.msgData = [];
        },
      });
    },
    /**
     * 获取当前用户系统消息
     */
    getSysMsg: function(){
      var _self = this;
      this.msgExist = 0;
      this.msgCount = 0;
      utilExt.request({
        serviceId: "40000006",
        tranCode: "MSGPLAT006",
        model: {},
        pageNo: 1,
        pageSize: 10,
        onSuccess: function(jqXHR, textStatus, data) {
          _self.msgExist = data.total;
          _self.msgData = data.model.list.map(function(obj) {
            if('0' === obj.c_status){
              _self.msgCount ++;
            }
            return {
              c_pk_id : obj.c_pk_id,
              c_msg_text : obj.c_msg,
              c_doc_no : obj.c_rel_num,
              d_msg_date : obj.d_send_time,
              c_status : obj.c_status
            };
          });
        },
        onError: function(jqXHR, textStatus, data) {
          Message.error(data.message);
          _self.msgData = [];
        },
      });
    },
    startWebsocket: function(){

      var websocket = null, _self = this;

      //判断当前浏览器是否支持WebSocket
      if('WebSocket' in window){
        // if(process.env.NODE_ENV  === "development"){
        //   url = `${API_URL}`
        // }else if(process.env.NODE_ENV === "production"){
        //   url = `${window.location.origin}${API_URL}`
        // }

        url = window.location.origin + API_URL;
        url = url.substring(url.indexOf('//')+2, url.length);
        websocket = new ReconnectingWebSocket('ws://' + url + 'websocket');
      } else {
        alert('Not support websocket');
      }

      //连接发生错误的回调方法
      websocket.onerror = function(event) { };

      //连接成功建立的回调方法
      websocket.onopen = function(event) { _self.getSysMsg(); };

      //接收到消息的回调方法
      // 延迟2秒防止大量websocket请求涌入
      websocket.onmessage = function(e) {
        clearTimeout(timehdl);
        timehdl = setTimeout(function() { _self.getSysMsg(); }, 2000)
      }

      //连接关闭的回调方法
      websocket.onclose = function(e){ };

      //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = function(e) { websocket.close(); };

    }
  },
  created: function() {
    // 启动一个ws协议连接
    this.startWebsocket();
  }
});

}); // End Welcome Define
