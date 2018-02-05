<span class="sys-msg">
  <sys-notify
    :msg-data="msgData"
    :msg-count="msgCount"
    :msg-exist="msgExist"
    @link-click="linkClick"
    @more-click="moreClick"
    @del-msg="delMsg"
    separate
    scroller>
  </sys-notify>
</span>