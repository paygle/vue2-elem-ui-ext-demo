define(function(require,exports,module){
	var data = require("data");
	var $ = require("jquery");
	var modelData = $.extend(data.getPolicyModelData("veh"),data.getCodelist());
	var vue = {
        "el": "#veh_div",
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
        	"getVhlSubTypParentCode" : function(){
                //关联车辆种类细分
                var c_usage_code = this.model.c_usage_code;
                var c_vhl_typ = this.model.c_auto_type;
                if (c_usage_code == "364113018" || c_usage_code == "364113017") {
                    if (c_vhl_typ == "365010" || c_vhl_typ == "365019") {
                        //特一
                        return "sp1";
                    } else if (c_vhl_typ == "365012" || c_vhl_typ == "365021") {
                        //特二
                        return "sp3";
                    } else if (c_vhl_typ == "365013" || c_vhl_typ == "365022") {
                        //特四
                        return "sp4";
                    } else if (c_usage_code == "364113018" && (c_vhl_typ == "365011" || c_vhl_typ == "365020")) {
                        //非营业特二
                        return "sp2-biz";
                    } else if (c_usage_code == "364113017" && (c_vhl_typ == "365011" || c_vhl_typ == "365020")) {
                        //营业特二
                        return "sp2-biz";
                    }
                } else if (c_vhl_typ == "365030") {
                    return "365030";
                } else {
                    return "other";
                }
            },
            
            "showMore" : function(){
        		this.displayCtrl.showMore = !this.displayCtrl.showMore;
        		this.displayCtrl.arrow = this.displayCtrl.arrow == "down" ? "up" : "down";
        	}
        }
    };
	module.exports = vue;
});

