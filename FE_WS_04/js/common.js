let bannerList = ["국민의 은행이 되겠습니다.", "5060 웰컴패키지, 최대 7만원 혜택을 드립니다.", 
                  "타행이체, 자동이체 수수료 면제", "저녁 6시까지 영업합니다."];

let listIdx = 0;
setInterval(()=> {
    document.getElementById("banner").innerHTML = bannerList[listIdx];
    listIdx = (listIdx + 1) % bannerList.length;
    
    //document.getElementById("banner").innerHTML = bannerList[listIdx++];
    //if(listIdx==bannerList.length) listIdx =0;
} , 5000);