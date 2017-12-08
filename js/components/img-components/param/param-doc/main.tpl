<div class="param-doc">
  <div class='row'>
      <div class='col-md-12'>
          <el-form label-width='80px' :model='filter'>
              <div class="row">
                  <el-form-item label='险类' prop='n_one_file_size' class='col-md-3'>
                      <combobox v-model="c_kind_no" dict-id="prodKindOneSys" :dict-params="kindNoParams" auto-select-first filterable> </combobox>
                  </el-form-item>
                  <el-form-item label='单证代码' class='col-md-3'>
                      <el-input v-model='filter.c_doc_code' placeholder='单证代码'></el-input>
                  </el-form-item>
                  <el-form-item label='单证名称' class='col-md-3'>
                      <el-input v-model='filter.c_doc_name' placeholder='单证名称'></el-input>
                  </el-form-item>
                  <div class="col-md-3 pl-3">
                      <rich-button :plain="true" type="info" shape="capsule" icon='search' @click="query(true)">查询</rich-button>
                      <rich-button shape="capsule" icon='quit'   @click="reset">重置</rich-button>
                  </div>
              </div>
              <div class="row">
              </div>
          </el-form>
      </div>
  </div>
  <div class="row">
      <div class="col-md-12 clearfix mt-2">
          <div class="float-md-left">
              <el-button :plain="true" type="info" icon="circle-plus" @click="addDocClassify">新增</el-button>
              <el-button :plain="true" type="info" icon="circle-minus" @click='deleteParamDoc'>删除</el-button> 
              <el-button :plain="true" type="info" icon="circle-hook" :loading="submitLoading" @click="saveParamDoc">提交</el-button> 
          </div>
      </div>
  </div>
  <div class='row mt-2'>
      <div class="col-md-12">
          <form-table ref="formTb" :data="rows" :new-row="{}" :rules="rules"
              highlight-current-row
              @row-click="handleCurrentChange"
              @table-change="handleTbChange"
              @selection-change="handleTbSelectionChange">
              <form-table-column  type="selection" width="35" label="选择"></form-table-column>
              <form-table-column  prop="c_doc_code" label="单证代码" type="input" ></form-table-column>
              <form-table-column  prop="c_doc_name"  label="单证名称"   type="input" ></form-table-column>
              <form-table-column  prop="c_remark"  label="备注"   type="input" ></form-table-column>
              <form-table-column type="operate" width="55" :delete-row="deleteDoc"
                  :add-visiable="retFalse" :save-visiable="retFalse" :edit-visiable="retFalse" ></form-table-column>
          </form-table>
          <el-pagination class="float-right mt-2"
              @size-change="changeSize" 
              :current-page="pageNo"
              :page-size="pageSize"
              :page-sizes="[10, 20, 30, 50]"
              v-on:current-change="query" 
              layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
      </div>
  </div>
</div>