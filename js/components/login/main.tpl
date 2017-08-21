<div class="login-box">
  <div class="login-label">用户登录</div>
  <el-form :model="formData" :rules="formRules" ref="formData" class="demo-ruleForm">
    <el-form-item prop="operCode">
      <el-input class="input-icon user" v-model="formData.operCode" autofocus auto-complete="off" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item prop="operPasswd">
      <el-input class="input-icon passwd" type="password" v-model="formData.operPasswd" auto-complete="off" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item prop="captcha">
      <el-col :span="12">
        <el-input class="input-icon captcha" v-model="formData.captcha" @keyup.enter.native="submitForm" auto-complete="off" placeholder="请输入验证码"></el-input>
      </el-col>
      <el-col :span="12">
        <div class="img-captcha">
          <img :src="captchaImgUrl" alt="验证码" @click="refreashCaptcha" title="点击刷新验证码">
        </div>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button class="btn-submit" type="warning" size="large" @click="submitForm" :loading="loading">登录</el-button>
    </el-form-item>
    <el-form-item>
      <div class="el-form-item__error error-msg">{{message}}</div>
    </el-form-item>
  </el-form>
</div>