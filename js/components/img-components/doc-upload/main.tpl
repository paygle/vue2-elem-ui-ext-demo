<div class='doc-upload'>
  <div class='row'>
      <div class='col-md-12 text-left pt-3 ml-3'>
          <el-button :plain="true" type="info"  icon='upload' @click='upload' :disabled="!enableUpload">上传</el-button>
          <el-dropdown @command='showOrder' class="mx-3">
              <el-button :plain="true" type="info"  icon='circh-up-down'>排序</el-button>
              <el-dropdown-menu slot='dropdown'>
                  <el-dropdown-item command="0">上传时间降序</el-dropdown-item>
                  <el-dropdown-item command="1">上传时间升序</el-dropdown-item>
                  <el-dropdown-item command="2">文件名降序</el-dropdown-item>
                  <el-dropdown-item command="3">文件名升序</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
          <el-button :plain="true" type="info"  icon='rect-indown' :disabled='checkLen<1' @click='download'>下载</el-button>
          <el-button :plain="true" type="info"  icon='delete' :disabled='checkLen<1' @click='deleteImg'>删除</el-button>
          <el-button :plain="true" type="info"  icon='msg-tips' :disabled='checkLen!=1' v-if="false">留言</el-button>
          <el-button :plain="true" type="info"  icon='share' v-if="false">分享</el-button><!-- FIXME 目前留言与分享未实现，隐藏-->
          <el-button :plain="true" type="info"  icon='steamship' :disabled='checkLen<1' @click="compare">比较</el-button>
      </div>
  </div>
  <div class='row '>
      <div class='col-md-4' v-loading='treeLoading'>
          <div class="row button">
              <div class="col-md-12 mt-3 doc-tree-btn pr-0">
                  <label class="pl-3 pr-1">
                      <span class="el-icon-filter"></span>
                      <span class="filter-name">筛选</span>
                  </label>
                  <rich-checkbox-group v-model='collect' class='d-inline collect-group'>
                      <rich-checkbox label='0' class='collect ml-1 mr-2' :disabled='mustDisabled'>需收</rich-checkbox>
                      <rich-checkbox label='1' class='collect ml-1 mr-2' :disabled='waitDisabled'>待收</rich-checkbox>
                  </rich-checkbox-group> <!-- disabled='collectLoading' -->
                  <template v-if="displayCollectBtn">
                      <el-button :plain="true" type="info"  class="ml-1" size="small" :loading="collectLoading" @click='forceCollect' >强制收齐</el-button>
                      <el-button :plain="true" type="info"  class="ml-2" size="small" :loading="collectLoading" @click='allCollect' >实际收齐</el-button>
                  </template>
              </div>
          </div>
          <div class="row">
              <div class="col-md-12 pr-0">
                  <div v-show="isEmpty"><p class="text-center doc-tree-btn my-0">没有查询到符合查询条件的数据</p></div>
                  <div class="doc-tree">
                      <ul :id="ztreeId" class="ztree"></ul>
                  </div>
              </div>
          </div>
      </div>
      <div class='col-md-8'>
          <doc-preview ref='docPreview' :server='viewServer' :upload-server="server" :notece='notece' @checkLen='handlerCheckLen'></doc-preview>
      </div>
  </div>
  <div class='hidden-dialog'>
      <doc-upload-dialog
        ref='uploadDialog'
        :server="server" :notece='notece'
        :file-size-max="paramAttchRule.n_one_file_size"
        :file-type="paramAttchRule.c_up_file_type"
        @images='handlerUploadImages'
        :modal="modal">
      </doc-upload-dialog>
      <form class="df" :action="server" method="post">
        <input type="hidden" name="operate" value="download"/>
        <input type="hidden" name="files" v-model="fileInfo" />
      </form>
  </div>
</div>