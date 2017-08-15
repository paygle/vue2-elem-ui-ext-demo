define(["jquery"],function($){
	var data = {
		"getPolicyModelData" : function(modelName){
			var modelData = null;
			$.ajax({
				method : "GET",
				url : CONF.APP_PATH + "/data/policy/" + modelName + ".json",
				data : {},
				async : false,
				success : function(data){
					modelData = data;
				},
				error:function(data){}
			});
			return modelData;
		},
		"getCodelist" : function(codelistName){
			var codelist = {"codelist" : {}};
			$.ajax({
				method : "GET",
				url : CONF.APP_PATH + "/data/codelist.json",
				data : {},
				async : false,
				success : function(data){
					codelist["codelist"] = !!codelistName ? data[codelistName] : data;
				},
				error:function(data){}
			});
			return codelist;
		}
	}
	return data;
});