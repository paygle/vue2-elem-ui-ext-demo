/** cache-uitl lib utils*/
define(function(require, exports, module){

/**
 *  H5本地存储工具类 localStorage/sessionStorage
 *  主要用于缓存下拉框数据
 *  也可用于其他数据的存储
 *  Created by wangjingl@sunline.cn on 2016/12/23.
 */
var WebStorageCache = require('utils/web-storage-cache'),
    localCache = new WebStorageCache({ storage: 'localStorage' }),
    sessionCache  = new WebStorageCache({ storage: 'sessionStorage' });


var CACHE_PREFIX = 'DICT_', //字典缓存key前缀
    CACHE_FILTER_PREFIX = 'DICT_FILTER_', //字典过滤缓存key前缀
    DEFAULT_EXP = 43200;  //默认缓存过期时间 12 小时

//清除过期缓存数据
localCache.deleteAllExpires();
sessionCache.deleteAllExpires();

exports.sessionCache = sessionCache;
exports.localCache = localCache;

/**
 * 拼装数据字典缓存的key
 */
function getCacheKey(dictId, dictParams) {
  var cacheKey = CACHE_PREFIX + dictId;
  if (dictParams) {
    cacheKey += '_' + JSON.stringify(dictParams);
  }
  return cacheKey;
};

/**
 * 拼装数据字典过滤翻译缓存的key
 */
function getCacheFilterKey(dictId, code) {
  var cacheKey = CACHE_FILTER_PREFIX + dictId + '__' + code;
  return cacheKey;
};

/**
 * 从sessionStorage中获取下拉框缓存数据
 */
exports.getDict = function(dictId, dictParams) {
  var cacheKey = getCacheKey(dictId, dictParams);
  return sessionCache.get(cacheKey);
};

/**
 * 将数据字典缓存到sessionStorage
 */
exports.setDict = function(dictId, dictParams, dictData) {
  var cacheKey = getCacheKey(dictId, dictParams);
  sessionCache.set(cacheKey, dictData);
};

/**
 * 获取缓存下拉框映射的值
 * @param dictId 字典id
 * @param c_code 选项代码
 * @return 选项中文
 */
exports.getDictText = function(dictId, c_code) {
  var cacheKey = getCacheFilterKey(dictId, c_code);
  return localCache.get(cacheKey);
};

/**
 * 设置取缓存下拉框映射的值 （默认超时时间12小时）
 * @param dictId 字典id
 * @param c_code 选项代码
 * @param c_cname 选项中文
 * @param exp 缓存超时时间（秒），默认为12小时
 */
exports.setDictText = function(dictId, c_code, c_cname, exp) {
  var cacheKey = getCacheFilterKey(dictId, c_code);
  exp = exp || DEFAULT_EXP;
  localCache.set(cacheKey, c_cname, {
    exp: exp
  });
};

/**
 * 获取session-storage-cache，数据存储到sessionStorage中
 */
exports.getSessionCache = function() {
  return sessionCache;
};

/**
 * 获取local-storage-cache，数据存储到localStorage中
 */
exports.getLocalCache = function() {
  return localCache;
};

/**
 * 根据key获取缓存中未超时数据。返回相应类型String、Boolean、PlainObject、Array的值。
 * 
 * @param cacheStorage cache存储对象，可以使用sessionCache或者localCache,或者自己new WebStorageCache
 * @param key 如果发现该key对应的值已过期,会进行delete(key)操作，返回null。
 */
exports.get = function(cacheStorage, key) {
  return cacheStorage.get(key);
};

/**
 * 设置缓存的值
 * options选填，包含exp和force两个字段{exp:100,force:true},exp表示过期时间100秒，force true表示当超过最大容量导致无法继续插入数据操作时，先清空缓存中已超时的
 */
exports.set = function(cacheStorage, key, value, options) {
  cacheStorage.set(key, value, options);
  return cacheStorage;
};

/**
 * 删除指定的key值
 */
exports.deleteKey = function(cacheStorage, key) {
  cacheStorage.delete(key);
  return cacheStorage;
};

/**
 * 清空缓存
 */
exports.clear = function(cacheStorage) {
  cacheStorage.clear();
};

exports.getSessionOper = function() {
  return sessionCache.get('oper');
};

exports.setSessionOper = function(oper) {
  sessionCache.set('oper', oper);
  return sessionCache;
};

}); // End cache-util
