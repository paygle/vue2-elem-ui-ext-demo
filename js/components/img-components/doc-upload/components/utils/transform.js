/** transform utils */
define(function(require, exports, module) {

function transform(scale, rotate,translateX,translate) {
    this.scale = scale || 1;
    this.rotate = rotate || 0;
    this.translateX = translateX || 0;
    this.translateY = translateY || 0;
}

transform.prototype.toStyle = function(){
    var style = [] ;
    style[0] = 'scale(' + this.scale + ',' + this.scale + ')';
    style[1] = 'rotate(' + this.rotate + 'deg)' ;
    style[2] = 'translate(' + this.translateX + 'px,' +this.translateY+ 'px)';
    return style.join("");
};
transform.prototype.setScale = function(flag){
    if(flag){
        this.scale = this.scale + 0.1 ;
    }else{
        this.scale = this.scale - 0.1 ;
        if(this.scale < 0.1) this.scale = 0.1 ;
    }
};
transform.prototype.setRotate = function(flag){
    if(flag){
        this.rotate = this.rotate + 90 ;
    }else{
        this.rotate = this.rotate - 90 ;
    }
};
transform.prototype.setTranslate = function(x,y){
    this.translateX = x ;
    this.translateY = y ;
};

return transform;

});