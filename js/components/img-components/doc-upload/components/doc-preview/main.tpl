<div class="doc-preview row">
  <div class="col-md-12 clearfix preview-ctx" >
      <template v-for='(el, index) in rows'>
      <el-tooltip placement="bottom" effect="light" >
      <template slot="content"><div>
              &emsp;上传人：{{el.c_up_code }} <br/>
                  上传时间：{{el.d_up_time  }}<br/>
              &emsp;文件名：{{el.c_name  }}<br/>
          &emsp;&emsp;备注：{{el.c_remark }}<br/>
      </div></template>
      <div class="file-item open-view"  @click="checked(index,$event)">
              <div class="file-icon" title="">
                  <img  :alt="el.c_name" :src="thumb+(el.c_new_image_id || el.c_image_id)" v-if="el.c_is_image"
                      @dblclick="openFullview(el)"
                      class="img-rounded" style="width: 80px; height: 80px;">
                  <img  :alt="el.c_name" src="static/img/nothumb.png" v-if="!el.c_is_image"
                      class="img-rounded" style="width: 80px; height: 80px;">
              </div>
              <div class="file-name">
                  <a class="filename" href="javascript:void(0);" :i="original+(el.c_new_image_id || el.c_image_id)"  
                      v-show='!el.showName && !el.showRemark'
                      @click="rename(index,$event)" v-if="el.c_is_image">{{el.c_name}}</a>
                  <a class="filename" href="javascript:void(0);"  v-show='!el.showName && !el.showRemark'
                      @click="rename(index,$event)" v-if="!el.c_is_image">{{el.c_name}}</a>
                  <el-input type="text" class="preview-input" @blur="resetView(index,$event)" v-model="el.c_name" v-show='el.showName'
                      placeholder="文件名" title="文件名" :autofocus='true'
                      name="c_name" style="display:none;" ></el-input>
                  <el-input type="text" class="preview-input" @blur="resetView(index,$event)" v-model="el.c_remark"  v-show='el.showRemark'
                      placeholder="备注"  title="备注" :autofocus='true'
                      name="c_remark" style="display:none;" ></el-input>
              </div>
              <span class="icon el-icon-edit edit" title='编辑 ' @click="editImage(index,$event)"> </span>
              <span class="icon el-icon-msg-tips remark" title='备注' @click="remark(index,$event)"></span>
              <span class="icon el-icon-close deleteBtn" title='删除' @click="deleteFromBtn(index)"></span>
      </div>
      </el-tooltip>
      </template>
  </div>
</div>