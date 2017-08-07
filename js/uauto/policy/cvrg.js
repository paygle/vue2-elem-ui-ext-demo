define(function(require,exports,module){
	var data = require("data");
	var $ = require("jquery");
	var modelData = $.extend(data.getPolicyModelData("cvrg"),data.getCodelist());
	var vue = {
        "el": "#cvrg_div",
        "mounted" : function() {
        },
        "data" : {
        	"model" : modelData.model,
        	"tempModel" : modelData.tempModel,
        	"codelist" : modelData.codelist,
        	"displayCtrl" : {
        		"showPanel" : false
        	}
        },
        "methods" : {
        }
    };
	module.exports = vue;
});
