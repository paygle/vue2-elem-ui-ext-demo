<div class="file-upload">
  <div class="uploader-wrapper">
      <div class="uploader-container">
          <!--头部，相册选择和格式选择-->
          <div class="uploader">
              <div class="queueList">
                  <div class="dndArea placeholder" :class='{ "element-invisible" : fileCount >= 1 }'>
                      <div :id="filePicker"></div>
                      <p>或将照片拖到这里，单次最多可选300张</p>
                  </div>
                  <ul class="filelist">
                      <li v-for='(file, $index) in files' :id="file.id" @mouseenter='panelMouseenter(file)' @mouseleave='panelMouseleave(file)'>
                          <p class="imgWrap"
                              :style="{
                                  '-webkit-transform': 'rotate('+ file.rotation + 'deg)',
                                  '-mos-transform' : 'rotate('+ file.rotation + 'deg)',
                                  '-o-transform': 'rotate('+ file.rotation + 'deg)',
                                  'transform': 'rotate('+ file.rotation + 'deg)',
                                  'filter' : 'progid:DXImageTransform.Microsoft.BasicImage(rotation=' + (~~((file.rotation / 90) % 4 + 4) % 4) + ')'}">
                              <template v-if='file.isPreview === PREVIEW_TYPE.PREVIEWING'>预览中</template>
                              <template v-if='file.isPreview === PREVIEW_TYPE.PREVIEWFAIL'>不能预览</template>
                              <template v-if='file.isPreview === PREVIEW_TYPE.PREVIEWED'>
                                  <img :src="file.src">
                              </template>
                          </p>
                          <p class="title"> {{file.name}}</p>
                          <el-progress v-show='file.isProgress' :text-inside="true" :stroke-width="18" :percentage="file.progress"></el-progress>
                          <transition name="fade">
                              <div class="file-panel" v-show='file.isPanel && !file.isSuccess'>
                                  <span class="cancel el-icon-delete" @click='panelRemove(file)'></span>
                                  <span class="rotateRight el-icon-circle-arrow" @click='panelRight(file)'></span>
                                  <span class="rotateLeft el-icon-circle-arrow" @click='panelLeft(file)'></span>
                              </div>
                          </transition>
                          <p class="error" v-if='file.isInfos'>{{file.infos}}</p>
                          <span class="success el-icon-circle-hook" v-if='file.isSuccess'></span>
                      </li>
                  </ul>
              </div>
              <div class="statusBar" v-show='fileCount >= 1'>
                  <div class='progress-container' v-show='isProgress'>
                      <el-progress :text-inside="true" :stroke-width="18" :percentage="progressNum"></el-progress>
                  </div>
                  <div class="info" >
                      <span v-html='information'></span>
                      <template v-if="state==='confirm' && uploadFailNum > 0" >
                          <a class="retry" href="#" @click="handleRetry">重新上传</a>失败图片
                      </template>
                  </div>
                  <div class="btns">
                      <div :id="filePicker2" class='filePicker2'></div>
                      <div class="uploadBtn" v-on:click='startUpload'>开始上传</div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</div>