<transition name="el-loading-fade" >
  <div class="imgcompare-main">
    <div
      v-show="visible"
      class="el-loading-mask"
      :style="{ opacity: '0.8',  display: 'block', 'background-color': '#000'}"
      :class="[customClass, { 'is-fullscreen': fullscreen }]">
    </div>
    <div v-show="visible" :id="id + 'main'"
      class="el-loading-mask imgcompare"
      :style="{'z-index' : 20000 , 'background': 'transparent'}"
      :class="[customClass, { 'is-fullscreen': fullscreen }]">
      <i class="el-icon-close imgcompare-close" @click="handleClose"></i>
      <template v-for="(el, index) in rows">
        <div class="imgcompare-panl" :id="id + 'panl' + index"  :index="index"
          :style='positionMap[index]'>
          <p class="imgcompare-title text-center">{{el.c_name}}</p>
          <img class="imgcompare-img selectDisable" :src="original+(el.c_new_image_id || el.c_image_id)" 
              :id="id + 'img' + index"  :index="index"
              :style='{
                "transform": transformMap[index] && transformMap[index].toStyle() ,
                "-ms-transform": transformMap[index] && transformMap[index].toStyle()	,/* IE 9 */
                "-moz-transform": transformMap[index] && transformMap[index].toStyle() 	,/* Firefox */
                "-webkit-transform": transformMap[index] && transformMap[index].toStyle() ,/* Safari 和 Chrome */
                "-o-transform": transformMap[index] && transformMap[index].toStyle() 	,/* Opera */
              }'
              @mousewheel="zoom(index, $event)" @DOMMouseScroll="zoom(index, $event)"  @dblclick="zoomFull(index, true)"
            ></img>
        </div>
      </template>
    </div>
    <div v-if="visibleFull" :id="id + 'main'"
      class="el-loading-mask imgcompare"
      :style="{'z-index' : 21000 , 'background-color': 'black' }"
      :class="[ { 'is-fullscreen': fullscreen }, 'mx-2', 'imgcompare-full']">
      <img :src="original+(rows[currentIndex].c_new_image_id || rows[currentIndex].c_image_id)" 
        @dblclick="zoomFull(-1, false)"></img>  
    </div>
  </div>
  </transition>