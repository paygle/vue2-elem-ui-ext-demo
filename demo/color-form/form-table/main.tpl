<div class="form-table-exam" v-cloak>
  <h3 class="col-header">
    <span class="bottom"></span>
    <span class="line"></span>
    <span class="label-angle"></span>
    <span class="label">FormTable着色</span>
  </h3>
  
  <div class="tbl-content">
    <input v-for="(v, k) in tableData" v-model="v.disabled" :key="k">
    <form-table
      ref="relTable"
      :rules="rules"
      :data="tableData"
      :new-row="newRow"
      disable-field="disabled"
      :compare-styl="compareStyl"
      :modified-styl="modifiedStyl"
      :valid-trigger="validTrigger"
      @switch-change="switchChange"
      @address-change="tableAddressChange"
      @table-change="tableFormChange"
      borderstyle="width: 100%">
      <form-table-column type="selection" width="50" label="选择"></form-table-column>
      <form-table-column type="input" prop="name" label="活动名称"></form-table-column>
      <form-table-column
        :editable="editableFun"
        type="select"
        :options-data="options"
        :select-option="{filterable:true}"
        :set-col-option="setColOption"
        prop="region"
        label="活动区域">
      </form-table-column>
      <form-table-column type="input" prop="num" label="数字" :input-option="inputOption"></form-table-column>
      <form-table-column type="date" prop="date1" label="活动时间"></form-table-column>
      <form-table-column
        type="switch"
        prop="delivery"
        :switch-option="{onValue:'1', offValue:'0'}"
        label="即时配送">
      </form-table-column>
      <form-table-column type="address" prop="address" label="地址选择"></form-table-column>
      <form-table-column type="rate" prop="pernum" label="比率验证" width="120"></form-table-column>
      <form-table-column type="fnumber" prop="fnumber" label="格式化数字" width="120"></form-table-column>
      <form-table-column type="address" prop="address" label="省市区" translated="address"></form-table-column>
      <form-table-column label="合并">
        <form-table-column type="input" prop="tips" label="主题"></form-table-column>
        <form-table-column prop="actbind" label="详细地址" show-overflow-tooltip></form-table-column>
      </form-table-column>
      <form-table-column type="operate" width="110"
        :delete-visiable="deletBtn"
        :edit-row="editRow"
        :delete-row="deleteRow"
        :add-row-pre="addRowPre"
        :add-new-row="addNewRow"></form-table-column>
    </form-table>

    <div class="btn-block right">
      <el-pagination
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="itemCount">
      </el-pagination>
    </div>
  </div>
</div>