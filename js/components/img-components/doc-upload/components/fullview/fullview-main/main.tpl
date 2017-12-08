<transition name="el-loading-fade" >
  <div class="full-view">
    <div :class='["LookPicture_Background", { "Look_Open" : visible }]' :style='{"opacity": 0.8}'></div>
    <div :class='["LookPicture", "animated", "fadeIn", { "Look_Open" : visible }]' :id="id">
      <span class="Look_Close" @click="handleClose"></span>
      <template v-for="(el, index) in rows"  >
        <img :class='[{ "Look_Open" : currentEl.c_image_id === el.c_image_id},"Look_img","animated","fadeIn"]'
            :style='{
                "transform": transformMap[el.c_image_id] && transformMap[el.c_image_id].toStyle() ,
                "-ms-transform": transformMap[el.c_image_id] && transformMap[el.c_image_id].toStyle() ,/* IE 9 */
                "-moz-transform": transformMap[el.c_image_id] && transformMap[el.c_image_id].toStyle() 	,/* Firefox */
                "-webkit-transform": transformMap[el.c_image_id] && transformMap[el.c_image_id].toStyle() ,/* Safari 和 Chrome */
                "-o-transform": transformMap[el.c_image_id] && transformMap[el.c_image_id].toStyle() 	,/* Opera */
            }'
            @mousewheel="zoom(el.c_image_id, $event)" @DOMMouseScroll="zoom(el.c_image_id, $event)"
            :src="original+el.src"/>
      </template>
      <span class="Look_before" @click="next(false)"></span>
      <span class="Look_next" @click="next(true)"></span>
      <div class="Look_tools text-center">
        <span title="查看原图" class="orignal el-icon-picture" @click="switchImage"></span>
        <span title="编辑" class="edit el-icon-edit" @click="toEdit"></span>
        <span title="删除" class="delete el-icon-delete" @click="toDelete"></span>
        <span title="缩小" class="zoomOut el-icon-zoom-minus" @click="zoomSpan(false)"></span>
        <span title="放大" class="zoomIn el-icon-zoom-plus" @click="zoomSpan(true)"></span>
        <span title="向右旋转" class="rotateRight el-icon-circle-arrow" @click="rotate(true)"></span>
        <span title="向左旋转" class="rotateLeft el-icon-circle-arrow" @click="rotate(false)"></span>
      </div>
    </div>
  </div>
</transition>