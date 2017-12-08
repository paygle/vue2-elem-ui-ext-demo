/** login component */
define([
  'jquery', 
  'vue',
  'text!components/login/main.tpl',
  'utils/cache-util',
  'libs/md5'
], function($, Vue, tpl, cacheUtil, md5){

var captchaServletUrl = APP_CONFIG.API_URL + 'core/captcha', //验证码地址
    loginServletUrl = APP_CONFIG.API_URL + 'core/login'; //登录地址

return Vue.component('login', {
  template: tpl,
  data: function() {
    return {
      formData: {
        operCode: '',
        operPasswd: '',
        captcha: ''
      },
      message: '',
      loading: false,
      captchaImgUrl: captchaServletUrl,
      formRules: {
        operCode: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 30,
            message: '长度在 3 到 30 个字符',
            trigger: 'blur'
          }
        ],
        operPasswd: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 30,
            message: '长度在 3 到 30 个字符',
            trigger: 'blur'
          }
        ],
        captcha: [{
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  methods: {
    submitForm: function() {
      this.$refs.formData.validate(function(valid) {
        var _this = this;
        if (valid) {
          _this.loading = true;
          _this.message='';
          $.ajax({
            url: loginServletUrl,
            type: 'POST',
            xhrFields: {//跨域发送Ajax时，Request header中便会带上 Cookie 信息
                withCredentials: true
            },
            data: {
              operCode: _this.formData.operCode,
              operPasswd: md5(_this.formData.operPasswd),
              captcha: _this.formData.captcha
            },
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
              _this.loading = false;
              if(data.statusCode > 0){
                  _this.message=data.message;
              }else if(data.statusCode === 0){
                  var oper=data.oper;
                  cacheUtil.setSessionOper(oper); //放到sessionCache中
                  window.location.href='./';
              }
            },
            error: function(xhr, textStatus) {
              _this.loading = false;
            }
          });
        } else {
          // console.log('表单校验不通过');
          return false;
        }
      });
    },
    resetForm: function() {
      this.$refs.formData.resetFields();
    },
    refreashCaptcha: function() {
      this.captchaImgUrl = captchaServletUrl + "?v=" + new Date().getTime();
    }
  }
});

}); //End login
