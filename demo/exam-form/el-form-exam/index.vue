<template>
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
       <valid-item display label="测试3"  item-width="200px" label-align="left" label-width="60px">
        <el-input v-model="vaItems.number2" placeholder="单个输入验证"></el-input>
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
      <el-button type="success">成功按钮</el-button>
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
          <template scope="props">
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
          <template scope="scope">
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
          <template scope="scope">
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
</template>
<script>
import ElSteps from 'components/steps'
import ElStep from 'components/step'
import ElForm from 'components/form'
import ElFormItem from 'components/form-item'
import ElInput from 'components/input'
import ElButton from 'components/button'
import ElSelect from 'components/select'
import ElOption from 'components/option'
import ElDatePicker from 'components/date-picker'
import ElTimePicker from 'components/time-picker'
import ElSwitch from 'components/switch'
import ElCheckboxGroup from 'components/checkbox-group'
import ElCheckbox from 'components/checkbox'
import ElRadioGroup from 'components/radio-group'
import ElRadio from 'components/radio'
import ElTable from 'components/table'
import ElTableColumn from 'components/table-column'
import ElDialog from 'components/dialog'
import ElPagination from 'components/pagination'
import ValidItem from 'components/valid-item'
import {randomChar, TypeOf, ToPlainObject, ObjectPlainIsEqual } from 'src/utils/funcs';  //引入类型判断
import emitter from 'src/mixins/emitter';
import filters from 'src/mixins/filters'
import ElPopover from 'components/popover'
import RichRadio from 'components/rich-radio'                // 自定义 checkbox
import RichRadioGroup from 'components/rich-radio-group'
import SeasonSelect from 'components/season-select'
import RateNumber from 'components/rate-number'
import Message from 'components/message'
import ElDropdown from 'components/dropdown'
import ElDropdownMenu from 'components/dropdown-menu'
import ElDropdownItem from 'components/dropdown-item'
import ElRow from 'components/row'
import ElCol from 'components/col'

export default {
  name: 'ElFormExam',
  mixins: [emitter, filters],
  components:{
    ElRow,
    ElCol,
    RateNumber,
    ElSteps,
    ElStep,
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
    ElSelect,
    ElOption,
    ElDatePicker,
    ElTimePicker,
    ElSwitch,
    RichRadio,
    RichRadioGroup,
    ElCheckbox,
    ElCheckboxGroup,
    ElRadioGroup,
    ElRadio,
    ElTable,
    ElTableColumn,
    ElDialog,
    ElPagination,
    ValidItem,
    ElPopover,
    SeasonSelect,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem
  },
  props:{

  },
  data () {
    const validDate = ()=>{
 
    }

    return { 
      fieldset:{               // 返回字段名称设置
        kindCode: 'kindCode',
        periodType: 'periodType',
        season: 'season',
        startMonth: 'startMonth',
        endMonth: 'endMonth'
      },
      seasonResult: [          // 初始化数据格式
        {
          kindCode: 'kind_12345',
          periodType: '2',
          season: '1',
          startMonth: '10',
          endMonth: '12'
        },{
          kindCode: 'kind_12345',
          periodType: '2',
          season: '2',
          startMonth: '13',
          endMonth: '15'
        },{
          kindCode: 'kind_12345',
          periodType: '2',
          season: '3',
          startMonth: '16',
          endMonth: '18'
        },{
          kindCode: 'kind_12345',
          periodType: '2',
          season: '4',
          startMonth: '19',
          endMonth: '21'
        }
      ],
      reasonChose: 1,              // 季节切换绑定值
      vaItems:{
        name: '这是一段很长很长很长的描述性文字',
        number1: '',
        number2: '',
      },
      active: 0.134,                  // 已激活步骤
      dialogVisible: false,
      currentRowData: {
        name: '',
        region: '124',
        date1: '',
        date2: '',
        strnumber: '',
        addressDetail: '',
        schecked: '',
        choose: ''
      },
      ruleForm: {
        name: '',
        region: '54657',
        date: '2017-05-01',
        date1: '',
        type: [],
        dateRange: [],
        delivery: false,
        resource: '',
        desc: '',
        xnumber: 1,
        pernum: 0.02
      },
      optionsData: [
        {label: '选错1', value: '124'},
        {label: '选错2', value: '54'},
        {label: '选错3', value: '453'},
      ],
      inputRule:{
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        number1: [
          { required: true, type: 'number', max: 100, message: '请输入数字', trigger: 'blur' }
        ],
        number2: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        date: [
            { required: true, type:'date', message: '请选择初登日期', trigger: 'change'}
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],
        xnumber: [
          { required: true, type: 'number', message: '必须是数字', trigger: 'blur' }
        ],
        pernum: [
          { required: true, type: 'number', min: 0, max: 1, message: '必须是数字0-100', trigger: 'blur' }
        ]
      },
      tableData: [
        {
          date1: '2017-05-03',
          name: '霄爱',
          date2: '2017-1-1',
          region: '加湿器肖霄爱不释手汪珠后年的',
          strnumber: '0001234566.23546',
          addressDetail: '上海市普陀区金沙江路 1518 弄',
          schecked: '空空的',
          choose: '1624'
        },
        {
          date1: '2018-05-03',
          name: '霄爱',
          date2: '2017-1-3',
          region: '不为来后 挑逗粗枝大叶为',
          strnumber: '94566.23546',
          addressDetail: '普陀区金沙江路 ',
          schecked: '空空的',
          choose: '54657'
        },
        {
          date1: '2017-05-03',
          name: '霄爱',
          date2: '2017-1-4',
          region: '目的地 皇粮',
          strnumber: '4566.23546',
          addressDetail: '上海市1518',
          schecked: '空空的',
          choose: '54657'
        }
      ]
    }
  },
  watch:{
    seasonResult(n){
      console.log('Season Watch:', n)
    }
  },
  methods: {
    dropCommand(v){
      console.log('dropCommand', v)
    },
    // 季节类型同步
    typeChange(val){
      this.reasonChose = parseInt(val)
      console.log('reasonChose Result:', this.reasonChose)
    },
    // 验证回调
    validateSeason(isValid){
      console.log('validateSeason:', isValid)
    },
    // 发送验证
    submitSeason(){
      this.$refs.seasonRef.validateSelected()
      console.log('Season submit Valid:', this.seasonResult)
    },
    // 重置选择结果
    resetSeason(){
      this.$refs.seasonRef.resetSelected()
    },
    
    filterMethod(v){
      // 改变自己的数据内容
      this.optionsData = [
        {label: '选1', value: '1624'},
        {label: '选2', value: '54657'},
        {label: '选3', value: '45673'},
      ]
    },
    anyChange(val){
      console.log('anyChange:', val)
    },
    validateTest(valid){
      console.log('validateTest', valid.state, valid.msg, valid.prop)
    },
    submitValidItems(e){
      this.broadcast('ValidItem', 'valid.item.change')
    },
    resetValidItems(e){
      this.ruleForm.date = '2018-5-1'
      this.broadcast('ValidItem', 'valid.item.reset')
      Message({ message: '当前步骤回调, 改变自己的数据内容,<br>加湿器肖霄爱不释手汪珠后年的', type:'warning'});
    },
    currentStep(step){              // 当前步骤回调
      console.log('Step:', step)
    },
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    addNewRow(){
      this.dialogVisible = true
    },
    addNewFormData(){
      this.tableData.push(ToPlainObject(this.currentRowData))  // 新增一行
      this.$refs.addNewRowForm.resetFields()                   // 重置表单
      this.dialogVisible = false                               // 关闭弹出窗口
    },
    EditRow(scope){
      let { $index, row, store, expand } = scope;
      this.currentRowData = row;
      store.commit('toggleRowExpanded', row);
      
    },
    DeleteRow(index, row){
      this.tableData.splice(index, 1);
    }
  },
  /**
   * 在路由中使用 keep-alive 组件激活时调用 
   * 本函数主要是重新做整个组件数据的初始化
   */
  activated(){
    let that=this, tableData = [
        {
          date1: '2016-05-03',
          name: '王虎',
          date2: '2017-1-1',
          region: '加湿器肖霄爱不释手汪珠后年的',
          strnumber: '0001234566.23546',
          addressDetail: '上海市普陀区金沙江路 1518 弄',
          schecked: '空空的',
          choose: '1624'
        },
        {
          date1: '2017-05-03',
          name: '王虎',
          date2: '2017-1-3',
          region: '不为来后 挑逗粗枝大叶为',
          strnumber: '94566.23546',
          addressDetail: '普陀区金沙江路 ',
          schecked: '空空的',
          choose: '54657'
        },
        {
          date1: '2017-05-03',
          name: '王虎',
          date2: '2017-1-4',
          region: '目的地 皇粮',
          strnumber: '4566.23546',
          addressDetail: '上海市1518',
          schecked: '空空的',
          choose: '54657'
        }
      ];

    setTimeout(function(){
      that.tableData = tableData
      console.log('table activated')
    }, 1000)
  },
  /**
   * 在路由中使用 keep-alive 组件停用时调用
   */ 
  deactivated() {
     this.tableData = []
     console.log('table deactivated')
  },
 
  mounted() {
    // let ta = this
    // setInterval(function(){
    //   ta.validInput1= Math.random()
    // }, 1000)
 
    console.log("重新加载中...");

  }
}
</script>
