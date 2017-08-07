define(["vue","util","text!" + CONF.APP_PATH + "/js/component/template/pageheader.html"],function (Vue,util,temp){
	var pageheader = Vue.component("pageheader", {
		"mounted" : function(){
			this.MENULIST = util.getMenus();
		},
		"data": function(){
			return{
				"MENULIST" : []
			}
		},
		"methods" : {
			"nav" : function(menu){
				var url = menu.url;
				util.navigation(url,{});
			}
		},
		"template": temp
	});
	return pageheader;
});