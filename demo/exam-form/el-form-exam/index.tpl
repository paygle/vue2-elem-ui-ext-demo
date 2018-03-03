<div class="el-form-exam" v-cloak>
  <h3 class="col-header">
    <span class="bottom"></span>
    <span class="line"></span>
    <span class="label-angle"></span>
    <span class="label">El-Table 表单</span>
  </h3>
  <el-popover
    ref="popovertip"
    placement="top-start"
    title="标题"
    width="200"
    trigger="hover"
    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
  </el-popover>

  <div class="season-box">
    <div class="row">
      <rich-radio-group v-model="reasonChose">
        <rich-radio :label="1">自然季</rich-radio>
        <rich-radio :label="2">非自然季-跨年</rich-radio>
        <rich-radio :label="3">非自然季-不跨年</rich-radio>
      </rich-radio-group>
      <el-button class="confirm-btn" type="primary" @click="submitSeason">确认</el-button>
      <el-button class="confirm-btn" type="primary" @click="resetSeason">清除</el-button>
    </div>
    <season-select
      ref="seasonRef"
      :fields="fieldset"
      v-model="seasonResult"
      :validate="validateSeason"
      kind-code="kind_12345"
      @type-change="typeChange"
      :period-type="reasonChose">
    </season-select>
  </div>

  <el-steps center :space="500" :active="active" :current-step="currentStep" finish-status="success">
    <el-step title="步骤 1" description="这是一段很长很长很长的描述性文字"></el-step>
    <el-step title="步骤 2" description="这是一段很长很长很长的描述性文字"></el-step>
    <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>
  </el-steps>
  <el-steps center :space="500" :active="active" :current-step="currentStep">
    <el-step title="步骤 1" icon="edit" description="这是一段很长很长很长的描述性文字"></el-step>
    <el-step title="步骤 2" icon="upload" description="这是一段很长很长很长的描述性文字"></el-step>
    <el-step title="步骤 3" icon="picture" description="这是一段很长很长很长的描述性文字"></el-step>
  </el-steps>

  <div class="valid-items-form">
    <div class="row">
      <valid-item class="col-md-3" label="测试1" :model="vaItems.name" @validate="validateTest" prop="name" :rules="inputRule" label-width="60px">
      <el-input v-model="vaItems.name" precision="2" placeholder="单个输入验证" @any-change="anyChange"></el-input>
      </valid-item>
      <valid-item class="col-md-3" label="测试2" :model="vaItems.number1" @validate="validateTest" prop="number1" :rules="inputRule" label-width="60px">
      <el-input v-model="vaItems.number1" histype='number' precision="0" placeholder="数字验证"></el-input>
      </valid-item>
      <valid-item class="col-md-3" label="测试3" label-width="60px">
      <el-input v-model="vaItems.number2" placeholder="单个输入验证"></el-input>
      </valid-item>
      <valid-item class="col-md-3" label="测试3" label-width="60px">
      <el-input v-model="vaItems.number2" placeholder="单个输入验证"></el-input>
      </valid-item>
    </div>

    <div class="row">
      <valid-item class="col-md-3" label="测试1" :model="vaItems.name" @validate="validateTest" prop="name" :rules="inputRule" label-width="60px">
      <el-input v-model="vaItems.name" precision="2" placeholder="单个输入验证" @any-change="anyChange"></el-input>
      </valid-item>
      <valid-item class="col-md-3" label="测试2" :model="vaItems.number1" @validate="validateTest" prop="number1" :rules="inputRule" label-width="60px">
      <el-input v-model="vaItems.number1" histype='number' precision="2" placeholder="数字验证"></el-input>
      </valid-item>
      <valid-item class="col-md-3" label="测试3" label-width="60px">
      <el-input v-model="vaItems.number2" placeholder="单个输入验证"></el-input>
      </valid-item>
      <valid-item class="col-md-3" label="测试3" label-width="60px">
      <el-input v-model="vaItems.number2" placeholder="单个输入验证"></el-input>
      </valid-item>
    </div>

  </div>

  <div class="valid-items" style="width: 94%; margin: 0 auto">
      <valid-item display label="测试1" :model="vaItems.name" @validate="validateTest" prop="name" :rules="inputRule" item-width="200px" label-width="60px">
      <el-input v-model="vaItems.name" precision="2" placeholder="单个输入验证" @any-change="anyChange"></el-input>
      </valid-item>
      <valid-item display label="测试2" :model="vaItems.number1" @validate="validateTest" prop="number1" :rules="inputRule" item-width="200px"  label-width="60px">
      <el-input v-model="vaItems.number1" histype='number' precision="2" placeholder="数字验证"></el-input>
      </valid-item>
      <valid-item display label="测试3"  item-width="300px" label-align="left" label-width="60px">
      <el-input v-model="vaItems.number2" placeholder="单个输入验证" prepend-width="120px">
        <el-select v-model="vaItems.name" slot="prepend" placeholder="请选择">
          <el-option label="餐厅名" value="1"></el-option>
          <el-option label="订单号" value="2"></el-option>
          <el-option label="用户电话" value="3"></el-option>
        </el-select>
        <el-button slot="append" icon="search"></el-button>
      </el-input>
      </valid-item>
      <valid-item display label="选择类型" :model.sync="casade" @validate="validateTest" prop="cas" :rules="inputRule" item-width="200px"  label-width="60px">
        <el-cascader :options="cascaderOptions" v-model="casade"></el-cascader>
     </valid-item>
      <el-button @click="submitValidItems">验证</el-button>
      <el-button @click="resetValidItems">重置</el-button>
  </div>

  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
    <div style="text-align: center">百分比过滤器：{{active | percent}}%</div>
    <div class="row">
      <div class="col-md-3 write-line">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </div>
      <div class="col-md-3 write-line">
        <el-form-item label="活动区域" prop="region">
          <el-select v-model="ruleForm.region"
            :options-data="optionsData"
            :filter-method="filterMethod"
            filterable
            clearable
            placeholder="请选择活动区域">
            <el-option 
              v-for="(item, index) in optionsData"
              :key="index" 
              :label="item.label" 
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="col-md-3 valid-readonly">
        <el-form-item label="Readonly名称" prop="name">
          <el-input v-model="ruleForm.name" readonly></el-input>
        </el-form-item>
      </div>
      <div class="col-md-3 write-line">
        <el-form-item label="数字" prop="xnumber">
          <el-input histype="number" precision="2" v-model="ruleForm.xnumber"></el-input>
        </el-form-item>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 inline both-align">
        <el-form-item label="活动时间" required>
          <div class="width-p45 write-line">
            <el-form-item prop="date">
              <el-date-picker type="date" data-type="string" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </div>
          <div class="width-p10 center">-</div>
          <div class="width-p45 write-line">
            <el-form-item prop="date1">
              <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date1" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </div>
        </el-form-item>
      </div>
      <div class="col-md-6">
        <el-form-item label="活动时间">
          <div class="width-p45">
            <el-form-item prop="date1">
              <el-date-picker type="datetimerange" placeholder="选择日期" v-model="ruleForm.dateRange" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </div>
        </el-form-item>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <el-form-item label="活动性质" prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="美食/餐厅线上活动"></el-checkbox>
            <el-checkbox label="地推活动"></el-checkbox>
            <el-checkbox label="线下主题活动"></el-checkbox>
            <el-checkbox label="单纯品牌曝光"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
      <div class="col-md-6">
        <el-form-item label="特殊资源" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
    </div>

    <div class="row">
      <div class="col-md-3">
        <el-form-item label="即时配送" prop="delivery">
          <el-switch disabled v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
      </div>
      <div class="col-md-3">
        <el-form-item label="即时配送" prop="delivery">
          <el-switch on-text="" off-text="" v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
      </div>
      <div class="col-md-3">
        <el-form-item label="即时配送" prop="delivery">
          <el-switch on-text="" off-text="" v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
      </div>
      <div class="col-md-3">
        <el-form-item label="即时配送" prop="delivery">
          <el-switch on-text="" off-text="" v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <el-form-item label="活动形式" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
      </div>
      <div class="col-md-6">
        <el-form-item label="比率验证" prop="pernum">
          <rate-number v-model="ruleForm.pernum" rate="percent"></rate-number>
        </el-form-item>
      </div>
    </div>

  </el-form>

  <div class="btn-block">
    <el-button type="success" v-popover:popovertip>成功按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
    <el-button type="success" plain>成功按钮</el-button>
    <el-button type="warning" plain>警告按钮</el-button>
    <el-button type="danger" plain>危险按钮</el-button>
    <el-button type="info" plain>信息按钮</el-button>
  </div>
  <div class="btn-block left">
    <el-button type="info" @click="addNewRow" plain>新建</el-button>
  </div>
  <div class="tbl-content">
    <el-table
      :data="tableData"
      expand-icon-hidden
      border
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form :model="props.row" label-width="80px">
            <el-row>
              <el-col :span="6">
                <el-form-item label="名称" prop="name">
                  <el-input v-model="props.row.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="名称" prop="date1">
                  <el-date-picker 
                    v-model="props.row.date1"
                    type="date" 
                    data-type="string"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="选项" prop="choose">
                  <el-select 
                    v-model="props.row.choose"
                    :options-data="optionsData"
                    placeholder="请选择">
                    <el-option 
                      v-for="(item, index) in optionsData" 
                      :key="index" 
                      :label="item.label" 
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="区域" prop="region">
                  <el-input v-model="props.row.region"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="date1"
        label="日期1"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="choose"
        label="选项">
      </el-table-column>
      <el-table-column
        prop="date2"
        label="日期2"
        width="120">
      </el-table-column>
      <el-table-column
        prop="region"
        label="区域">
      </el-table-column>
      <el-table-column label="下拉菜单" width="150">
        <template slot-scope="scope">
          <el-dropdown trigger="click" @command="dropCommand">
            <span class="el-dropdown-link">
              下拉菜单<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="scope.$index">黄金糕</el-dropdown-item>
              <el-dropdown-item :command="scope.$index">狮子头</el-dropdown-item>
              <el-dropdown-item :command="scope.$index">螺蛳粉</el-dropdown-item>
              <el-dropdown-item :command="scope.$index">双皮奶</el-dropdown-item>
              <el-dropdown-item :command="scope.$index">蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" @click="EditRow(scope)">{{ scope.expand ? "确认":"编辑"}}</el-button>
          <el-button type="text" @click="DeleteRow(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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

  <el-dialog title="新增" v-model="dialogVisible" size="large">
    <div class="container">
      <el-form :model="currentRowData" ref="addNewRowForm" label-width="120px">
        <div class="row">
          <div class="col-md-4">
            <el-form-item label="活动名称" prop="name">
              <el-input v-model="currentRowData.name"></el-input>
            </el-form-item>
          </div>
          <div class="col-md-4">
            <el-form-item label="活动区域" prop="region">
              <el-select v-model="currentRowData.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="col-md-4 valid-readonly">
            <el-form-item label="Readonly名称" prop="name">
              <el-input v-model="currentRowData.name" readonly></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8 inline both-align">
            <el-form-item label="起始活动时间" required>
              <div class="width-p45">
                <el-form-item prop="date1">
                  <el-date-picker
                    type="date"
                    data-type="string"
                    placeholder="选择日期"
                    v-model="currentRowData.date1">
                  </el-date-picker>
                </el-form-item>
              </div>
              <div class="width-p10 center">-</div>
              <div class="width-p45">
                <el-form-item prop="date2">
                  <el-date-picker
                    type="date"
                    data-type="string"
                    placeholder="选择日期"
                    v-model="currentRowData.date2">
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addNewFormData">确 定</el-button>
    </span>
  </el-dialog>
</div>