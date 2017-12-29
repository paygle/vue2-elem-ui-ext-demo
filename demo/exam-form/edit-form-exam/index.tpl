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
  <wrap-route :active-name="activeName" :params="getParams"></wrap-route>
</div>