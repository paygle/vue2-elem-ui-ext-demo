define(function (){
	var constants = {
		"MENU" : [{
			"index" : "1",
			"name" : "快速出单",
			"url" : "/doc/home.html"
		},{
			"index" : "2",
			"name" : "综合查询",
			"url" : ""
		},{
			"index" : "3",
			"name" : "批改中心",
			"url" : ""
		},{
			"index" : "4",
			"name" : "缴费中心",
			"url" : ""
		}]
	};
	var util = {
		"getMenus" : function(){
			return constants.MENU;
		},
		
		"navigation" : function(url,paramData){
			window.sessionStorage.removeItem("NAV_PARAM");
			var paramString = JSON.stringify(paramData);
			window.sessionStorage.setItem("NAV_PARAM", paramString);
			window.location.href = CONF.APP_PATH + url;
		},
		
		"getNavParam" : function(){
			var navParamString = window.sessionStorage.getItem("NAV_PARAM");
			var navParam = JSON.parse(navParamString);
			window.sessionStorage.removeItem("NAV_PARAM");
			return navParam;
		}
	}
	return util;
});