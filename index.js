var data = document.getElementsByClassName("box");
var contain = document.getElementsByClassName("contain");

window.onload=function(){
    refreshImage();
}
window.onresize=function(){
    refreshImage();
}
window.onscroll = function(){
    var t = document.documentElement.scrollTop || document.body.scrollTop;
    if(document.body.clientWidth<(t*2.2)){
         loadNewData();
    }
}
function refreshImage(){

    var winWidth;
    if (window.innerWidth)
        winWidth = window.innerWidth;
    else if ((document.body) && (document.body.clientWidth))
        winWidth = document.body.clientWidth;
    winWidth = winWidth*0.93;

    var picWidth;
    var pic = document.getElementsByClassName("box");
    picWidth = pic[0].getElementsByTagName("img")[0].width;

    var num = winWidth/picWidth;
    num = parseInt(num-1);

    console.info(num);
    var picHeigArray = new Array();

    for(var i=0;i<pic.length;i++){
        if(i<num){
            picHeigArray.push(pic[i].getElementsByTagName("img")[0].height+40);
            pic[i].style.position = "";
            pic[i].style.float="";
            pic[i].style.top = "";
            pic[i].style.left = "";
        }else{
            var minHeight = Math.min.apply(null,picHeigArray);
            pic[i].style.position = "absolute";
            pic[i].style.top = (minHeight)+"px";

            var positionLeft = findPosition(picHeigArray,minHeight)*(picWidth+25)+(winWidth)*0.05;

            pic[i].style.left = positionLeft+"px";
            changeHeigtArray(picHeigArray,minHeight,minHeight+40+pic[i].getElementsByTagName("img")[0].height);
        }
    }
}
function changeHeigtArray(array,currentValue,newValue){
    for(var i=0;i<array.length;i++){
         if(array[i] == currentValue){
             array.splice(i,1,newValue);
         }
     }
}
function findPosition(arry,value){
    for(var i=0;i<arry.length;i++){
        if(arry[i] == value){
           return i;
        }
    }
}
function loadNewData(){
    for(var i=0; i<10;i++){
        var newObj = data[i].cloneNode(true);
        document.getElementsByClassName("contain")[0].appendChild(newObj);
    }
    refreshImage();
}
