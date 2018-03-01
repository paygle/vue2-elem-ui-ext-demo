/** transform utils */
define(function(require, exports, module) {

function transform(scale, rotate,translateX,translateY) {
    this.scale = scale || 1;
    this.rotate = rotate || 0;
    this.translateX = translateX || 0;
    this.translateY = translateY || 0;
    this.bottom = '40px' ;
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
    //将图片拖动位置重置，避免旋转异常
    this.translateX = 0 ;
    this.translateY = 0 ;
};
transform.prototype.setTranslate = function(x,y){
    this.translateX = x ;
    this.translateY = y ;
    this.rotate = 0 ; //将图片旋转重置，避免拖动异常
};

transform.prototype.setBottom = function(bottom){
    this.bottom = bottom + 'px';
};
transform.prototype.getBottom = function(){
    return this.bottom || '' ;
};

return transform;

});