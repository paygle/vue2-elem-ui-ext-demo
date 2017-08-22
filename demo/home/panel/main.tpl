<div class="bt-panel">
  <div class="valid-items">
    <valid-item label="测试1" :model="validInput1" @validate="validateTest" prop="name" :rules="inputRule" item-width="200px" label-width="60px">
      <el-input v-model="validInput1" placeholder="单个输入验证"></el-input>
    </valid-item>
    <valid-item label="测试2" :model="validInput2" @validate="validateTest" prop="name" :rules="inputRule" item-width="200px"  label-width="60px">
      <el-input v-model="validInput2" placeholder="单个输入验证"></el-input>
    </valid-item>
    <valid-item label="测试3"  item-width="200px" label-align="left" label-width="60px">
      <el-input v-model="validInput3" placeholder="单个输入验证"></el-input>
    </valid-item>
    <rich-button shape="capsule" icon="rotate-swap" @click="submitValidItems">验证</rich-button>
    <rich-button shape="capsule" icon="rotate-swap" @click="resetValidItems">重置</rich-button>
  </div>
  <form-table :data="localTableData" borderstyle="width: 100%" @selection-change="handleSelectionChange">
    <form-table-column type="selection" width="50" label="选择"></form-table-column>
    <form-table-column type="date" prop="date" label="日期"></form-table-column>
    <form-table-column type="input" prop="name" label="姓名" width="120"></form-table-column>
    <form-table-column type="select" :options-data="options" prop="choose" label="下拉选择"></form-table-column>
    <form-table-column type="address" prop="address" label="省市区"></form-table-column>
    <form-table-column prop="addressDetail" label="详细地址" show-overflow-tooltip></form-table-column>
    <form-table-column type="checkbox" prop="schecked" label="可选"></form-table-column>
  </form-table> 
</div>