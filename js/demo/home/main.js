require(["jquery","vue","ELEMENT","pageheader","util"], function ($,Vue,ELEMENT,pageheader,util){
	Vue.use(ELEMENT);
	var cardApp = new Vue({
		"el" : "#homePanel",
		"components": {
			"pageheader" : pageheader
		},
		"mounted" : function(){
		},
		"data" : {
			"cardList" : [{
				"cardName" : "测试模板1"
			},{
				"cardName" : "测试模板2"
			},{
				"cardName" : "测试模板3"
			}]
		},
		"methods" : {
 			"newPolicy" : function(card){
 				util.navigation("/demo/exam.html", card);
 			}
		}
	});
});