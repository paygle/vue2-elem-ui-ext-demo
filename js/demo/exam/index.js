define(['jquery','vue', 'ELEMENT', 'pageheader', 'util', 'data', 'policy.sales', 'policy.main', 'policy.insured', 'policy.vhlowner', 'policy.veh', 'policy.cvrg'], function($,Vue, ELEMENT, pageheader, util, data, salesModule, mainModule, insuredModule, vhlownerModule, vehModule, cvrgModule) {
	Vue.use(ELEMENT);
    var salesApp = new Vue(salesModule);
    var vehApp = new Vue(vehModule);
    var cvrgApp = new Vue(cvrgModule);
    var insuredApp = new Vue(insuredModule);
    var mainApp = new Vue(mainModule);
    var vhlownerApp = new Vue(vhlownerModule);
    
    setTimeout(function(){
    	salesApp.displayCtrl.showPanel = true;
    	mainApp.displayCtrl.showPanel = true;
    },0);
    
    setTimeout(function(){
    	insuredApp.displayCtrl.showPanel = true;
    	vhlownerApp.displayCtrl.showPanel = true;
    },100);
    
    $(window).bind("scroll",function(){
    	vehApp.displayCtrl.showPanel = true;
    	cvrgApp.displayCtrl.showPanel = true;
    });
    
    var header = new Vue({
        'el': '#header_div',
        'components': {
            'pageheader': pageheader
        },
        'mounted': function() {},
        'data': {}
    });
});