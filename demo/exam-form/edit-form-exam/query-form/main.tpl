<div class="query-form">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">

    <div class="row">
      <div class="col-md-3">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </div>
      <div class="col-md-3">
        <el-form-item label="活动区域" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="这是一段很长很长很长的描述性文字" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="col-md-3">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </div>
      <div class="col-md-3">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </div>
    </div>
  </el-form>

  <div class="btn-block center">
    <rich-button :plain="true" type="info" shape="capsule" icon="search" @click="submitForm('ruleForm')">查询</rich-button>
    <rich-button shape="capsule" icon="rect-arrow" @click="resetForm('ruleForm')">重置</rich-button>
  </div>
  <div class="btn-block left">
    <el-button :plain="true" type="info" shape="capsule" icon="plus" @click="addNewRow">新建</el-button>
  </div>
  <div class="tbl-content">

    <form-table
      :data="tableData"
      borderstyle="width: 100%">
      <form-table-column prop="date" label="日期"></form-table-column>
      <form-table-column prop="name" label="姓名" width="120"></form-table-column>
      <form-table-column type="select" :options-data="options" prop="choose" label="下拉选择" translated="select"></form-table-column>
      <form-table-column type="address" prop="address" label="省市区" translated="address"></form-table-column>
      <form-table-column prop="addressDetail" label="详细地址" show-overflow-tooltip></form-table-column>
      <form-table-column type="checkbox" prop="schecked" label="可选"></form-table-column>
      <form-table-column type="operate" width="110" 
        :add-visiable="hiddenBtn"
        :save-visiable="hiddenBtn"
        :edit-visiable="hiddenTopBtn" 
        :delete-visiable="hiddenTopBtn"
        :edit-row="editRow"
        :delete-row="deleteRow"></form-table-column>
    </form-table>

    <div class="btn-block right">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="itemCount">
      </el-pagination>
    </div>
  </div>
</div>