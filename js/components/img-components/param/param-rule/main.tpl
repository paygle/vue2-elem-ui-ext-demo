<div class="param-rule">
  <div class='row'>
      <div class='col-md-6 offset-3'>
          <el-form label-width='120px' :model='docRule' >
              <el-form-item label='险类' prop='n_one_file_size'>
                  <combobox v-model="docRule.c_kind_no" dict-id="prodKindOneSys" :dict-params="kindNoParams" auto-select-first filterable> </combobox>
              </el-form-item>
              <el-form-item label='上传文件类型' prop='n_one_file_size'>
                  <el-input v-model='docRule.c_up_file_type' placeholder='上传文件类型，用逗号分隔'> </el-input>
              </el-form-item>
              <el-form-item label='单文件大小上限' prop='n_one_file_size'>
                  <el-input v-model='docRule.n_one_file_size' placeholder='单文件大小上限'>
                      <template slot="append">M</template>
                  </el-input>
              </el-form-item>
              <el-form-item label='案件总大小上限' prop='n_all_file_size'>
                  <el-input v-model='docRule.n_all_file_size' placeholder='案件总大小上限'>
                      <template slot="append">M</template>
                  </el-input>
              </el-form-item>
              <el-form-item label='案件单证数量上限' prop='n_max_files'>
                  <el-input v-model='docRule.n_max_files' placeholder='案件单证数量上限'>
                      <template slot="append">个</template>
                  </el-input>
              </el-form-item>
          </el-form>
      </div>
  </div>
  <div class="row">
      <div class="col-md-12 text-center mt-2">
          <el-button :plain="true" type="info" icon="circle-hook" @click="docRuleSubmit" :loading="submitLoading">提交</el-button>
      </div>
  </div>
</div>