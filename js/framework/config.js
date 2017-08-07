var CONF = (function(config) {
	config = !config ? new Object() : config;
	config.APP_PATH = "/new-uauto-web/";
	return config;
})(CONF);

require.config({
	paths : {
		"pageheader" : CONF.APP_PATH + "/js/component/js/pageheader",
		"util" : CONF.APP_PATH + "/js/framework/util",
		"text" : CONF.APP_PATH + "/js/lib/require-text",
		"jquery" : CONF.APP_PATH + "/js/lib/jquery.min",
		"vue" : CONF.APP_PATH + "/js/lib/vue.min",
		"ELEMENT" : CONF.APP_PATH + "/js/element-ui/lib/elem-ui-ext",
		"data" : CONF.APP_PATH + "/js/framework/data",
		
		"policy.sales" : CONF.APP_PATH + "/js/uauto/policy/sales",
		"policy.insured" : CONF.APP_PATH + "/js/uauto/policy/insured",
		"policy.main" : CONF.APP_PATH + "/js/uauto/policy/main",
		"policy.veh" : CONF.APP_PATH + "/js/uauto/policy/veh",
		"policy.vhlowner" : CONF.APP_PATH + "/js/uauto/policy/vhlowner",
		"policy.cvrg" : CONF.APP_PATH + "/js/uauto/policy/cvrg"
	}
});