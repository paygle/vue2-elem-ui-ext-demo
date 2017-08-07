define(function(require,exports,module){
	var data = require("data");
	var $ = require("jquery");
	var modelData = $.extend(data.getPolicyModelData("insured"),data.getCodelist());
	var vue = {
		"el": "#insured_div",
        "mounted" : function() {
        },
        "data" : {
        	"model" : modelData.model,
        	"tempModel" : modelData.tempModel,
        	"codelist" : modelData.codelist,
        	"displayCtrl" : {
        		"showPanel" : false,
        		"showMore" : false,
        		"arrow" : "down"
        	}
        },
        "methods" : {
        	"showMore" : function(){
        		this.displayCtrl.showMore = !this.displayCtrl.showMore;
        		this.displayCtrl.arrow = this.displayCtrl.arrow == "down" ? "up" : "down";
        	}
        }
	};
	module.exports = vue;
});
