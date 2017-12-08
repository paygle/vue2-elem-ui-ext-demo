<div class="doc-classify row">
  <div class="col-md-4" v-loading="docTreeLoading">
      <combobox v-model="c_kind_no" dict-id="prodKindOneSys" :dict-params="kindNoParams" auto-select-first filterable> </combobox>
      <div class="doc-tree">
          <ul :id="ztreeId" class="ztree"></ul>
      </div>
  </div>
  <div class="col-md-8 px-0" v-show="showDocs">
      <div class='row'>
          <div class='col-md-12'>
              <div class="table-footer">  
                  <div class="foot-left">
                      <el-button :plain="true" type="info"  :loading="relativeLoading" icon="related" @click="relate">关联</el-button>
                  </div>
                  <div class="foot-right">
                      <el-form :inline="true" >
                          <el-form-item class="doc-search">
                              <el-input v-model="c_doc_name" placeholder="输入单证名称关键字查询"></el-input>
                          </el-form-item><el-form-item>
                              <rich-button :plain="true" type="info" class="el-icon-search" shape="capsule" @click="query(true)">查询</rich-button>
                          </el-form-item>
                      </el-form>
                  </div>
              </div>
          </div>
      </div>
      <div class='row'>
          <div class='col-md-12'>
              <form-table ref="docClasFormTb" :data="rows" :new-row="{}" highlight-current-row 
              @selection-change="handleTbSelectionChange">
                  <form-table-column  type="selection" width="35" label="选择"></form-table-column>
                  <form-table-column  prop="c_is_must" width="80" label="是否必须" type="switch" :switch-option="switchOption" ></form-table-column>
                  <el-table-column  prop="c_code" width="150" label="单证代码"  ></el-table-column>
                  <el-table-column  prop="c_cname"  label="单证名称" ></el-table-column>
                  <el-table-column  prop="c_remark" width="100"  label="备注" ></el-table-column>
              </form-table>
              <el-pagination class="float-right mt-2" :current-page="pageNo" :page-size="pageSize"
                  v-on:current-change="query" @size-change="changeSize" :page-sizes="[10, 20, 30, 50]"
                  layout="total, sizes, prev, pager, next, jumper" :total="total">
              </el-pagination>
          </div>
      </div>
  </div>
</div>