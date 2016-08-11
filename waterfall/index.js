var parentContainer = "container";
var imgBox = "box";


window.onload=function(){
    waterfall(parentContainer,imgBox);
}
window.onresize=function(){
    waterfall(parentContainer,imgBox);
}
window.onscroll = function(){
    if(checkscrollside(parentContainer,imgBox)){
       loadNewData(parentContainer,imgBox);
    }
}
function waterfall(parent,box){
    var oParent=document.getElementById(parent);
    var aBox = oParent.getElementsByClassName(box);
    var boxH = aBox[0].offsetWidth;
    var num=Math.floor(document.documentElement.clientWidth/boxH);
    //console.info(num);
    var boxHeigArr = [];
    for(var i=0;i<aBox.length;i++){
        var everyHeight = aBox[i].offsetHeight;
        if(i<num){
            boxHeigArr.push(everyHeight);
            aBox[i].style.position = "";
            aBox[i].style.top = "";
            aBox[i].style.left = "";
        }else{
            var minH = Math.min.apply(null,boxHeigArr);
            aBox[i].style.position = "absolute";
            aBox[i].style.top = minH+"px";
            var minHindex = findPosition(boxHeigArr,minH);
            aBox[i].style.left = aBox[minHindex].offsetLeft+"px";
            boxHeigArr[minHindex] += aBox[i].offsetHeight;
        }
    }
}

function checkscrollside(parent,box){
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var oParent=document.getElementById(parent);
    var aBox = oParent.getElementsByClassName(box);
    var lastBoxH = aBox[aBox.length-1].offsetTop+Math.floor(aBox[aBox.length-1].offsetHeight/3)
    var documentH=document.documentElement.clientHeight;
    //console.info(documentH+"  "+scrollTop+"  "+lastBoxH);
    return (documentH+scrollTop)>lastBoxH;
}

function loadNewData(parent,box){
    var oParent=document.getElementById(parent);
    var aBox = oParent.getElementsByClassName(box);
    var boxH = aBox[0].offsetWidth;
    var num=Math.floor(document.documentElement.clientWidth/boxH);

    for(var i=0; i<num;i++){
        var newObj = aBox[fRandomBy(aBox.length)].cloneNode(true);
        oParent.appendChild(newObj);
    }
    waterfall(parent,box);
}

function findPosition(arr,minH){
    for(var i in arr){
        if(arr[i]==minH){
            return i;
        }
    }
}
function fRandomBy(under, over){ 
   switch(arguments.length){ 
     case 1: return parseInt(Math.random()*under+1); 
     case 2: return parseInt(Math.random()*(over-under+1) + under); 
     default: return 0; 
   } 
} 

