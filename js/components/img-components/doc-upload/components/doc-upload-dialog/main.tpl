<!-- 影像上传弹出框 -->
<!--引入webuploader CSS-->
<el-dialog
  title='影像上传'
  v-model='imagesDialog'
  :close-on-click-modal='false'
  :close-on-press-escape='false'
  :modal="modal"
  size='large'>
  <div class="row">
    <div class="col-md-12">
      <uploader :options='uploaderOption' v-if='imagesDialog' 
          @uploadFinished='uploadFinished' 
          :md5File="handleMd5" 
          :offsetChange="handleOffsetChange">
      </uploader>
    </div>
  </div>
</el-dialog>