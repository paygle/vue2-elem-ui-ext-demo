define([
  'vue',
  'utilExt',
  'cacheUtil'
], function (Vue, utilExt, cacheUtil) {
  'use strict';
  /**
   * 数据字典vuex模块
   */
 
  var state = window._dict_local || { dict: {} };
  if (window._dict_cache && window._dict_cache.dict) {
    for (var key in _dict_cache.dict) {
      state.dict[key] = _dict_cache.dict[key]
    }
  }
  //将静态下拉框数据存入cache
  for(var key in state.dict){
    cacheUtil.setDict(key, {}, state.dict[key]);
  }

  var isFunction = function (value) {
    return Object.prototype.toString.call(value) === '[object Function]'
  }

  var actions = {
    /**
     * 从后台加载数据字典
     */
    loadDict: function(ctx, payload) {
      var commit=ctx.commit, state=ctx.state;
      var dictId = payload.dictId;
      var dictParams = payload.dictParams;
      var cacheable = payload.cacheable === undefined ? true : payload.cacheable;
      var dictData = cacheUtil.getDict(dictId, dictParams);
      if (dictData && dictData.length > 0 && cacheable) { //字典已存在cache中，且允许缓存
        payload['dictData'] = dictData;
        commit('updateDict', payload); //commit提交数据
        isFunction(payload.successCallback) && payload.successCallback(payload); //成功时回调
        return;
      }

      var codelistIds = [{
        id: dictId,
        param: dictParams
      }];
      //请求远程数据字典    
      utilExt.request({
        serviceId: "SYS00002",
        tranCode: "SYS0000002",
        pageNo: 1,
        pageSize: 100,
        model: {},
        async: true,
        showLoading: false,
        codelistIds: JSON.stringify(codelistIds),
        onSuccess: function (jqXHR, textStatus, data) {
          if (data.sysCodelist && data.sysCodelist[dictId]) { //去掉 data.sysCodelist[dictId].length>0判断，避免下拉框列表为空不重置原有数据
            payload['dictData'] = data.sysCodelist[dictId];
            if (!payload.dictFilter) { //普通翻译提交到vuex缓存
              cacheable && cacheUtil.setDict(dictId, dictParams, data.sysCodelist[dictId]);
              commit('updateDict', payload); //commit提交数据
            } else { //机构等大数据量翻译 提交到localstorage缓存
              var tmp = [];
              payload['dictData'].forEach(function (item) {
                cacheUtil.setDictText(dictId, item.c_code, item.c_cname);
                tmp.push(item.c_code);
              });
              if (dictParams.filter_codes) {
                dictParams.filter_codes.forEach(function(code) {
                  if (tmp.indexOf(code) == -1) { //没有取得翻译结果，原值返回
                    cacheUtil.setDictText(dictId, code, code, 10); //没查询到的只缓存10秒，防止表格翻译时进入死循环，防止长期缓存导致取不到正常结果
                    console.warn('无法翻译下拉框，dictId=' + dictId + '，code=' + code);
                  }
                })
              }
            }
            isFunction(payload.successCallback) && payload.successCallback(payload); //成功时回调
          } else {
            isFunction(payload.errorCallback) && payload.errorCallback(payload);
          }
        },
        onError: function () { //失败时回调
          isFunction(payload.errorCallback) && payload.errorCallback(payload);
        }
      });
    }
  }

  var mutations = {
    /**
     * 通知vuex更新数据字典
     */
    updateDict: function(state, payload) {
      Vue.set(state.dict, payload.dictId, payload.dictData) //动态追加属性
    }
  };

  var getters = {
    //数据字典
    getDict: function(state, getters) {
      return state.dict;
    }
  };

  return {
    state: state,
    actions: actions,
    mutations: mutations,
    getters: getters
  };
});
