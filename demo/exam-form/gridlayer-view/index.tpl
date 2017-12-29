<div class="gridlayer-view fwidth">
  <h3 class="col-header">
    <span class="bottom"></span>
    <span class="line"></span>
    <span class="label-angle"></span>
    <span class="label">GridLayer 格子布局</span>
  </h3>
  <grid-layer
    :fields="fieldsName"
    :data="listdata"
    :urltmpl="urltmplFun"
    @favor-click="favorClick"
    @cell-click="CellClick">
  </grid-layer>

  <doc-upload :args="fileInfo" :server="file_server" :view-server="file_view_server"></doc-upload>
</div>