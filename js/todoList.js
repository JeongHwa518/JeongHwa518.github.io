//초기 데이터 
let mockData = [ 
      {id:0, isDone:false, content:"React study", date: new Date().getTime()}, 
      {id:1, isDone:true, content:"친구만나기", date: new Date().getTime()}, 
      {id:2, isDone:false, content:"낮잠자기", date: new Date().getTime()}, 
      ]; 
 
// 요일 출력을 위한 배열 
let days =["일","월","화","수","목","금","토"];

onload = ()=> {
    initData(mockData);

    //현재 날짜 출력
    let today = new Date();
    document.querySelector(".header > h1").innerHTML = 
    `${today.getFullYear()}년 ${(today.getMonth()+1)}월 ${today.getDate()}일 ${days[today.getDay()]}요일`;

}; //onload 끝

const initData = (printData)=> {
    const todoWrapper = document.querySelector(".todos-wrapper");
    todoWrapper.innerHTML = "";

    printData.forEach((data)=> {
        todoWrapper.innerHTML += `<div class="todo-item"> 
                              <input type="checkbox" onchange="onUpdate(${data.id})" ${data.isDone ? "checked" : ""}/> 
                              <div class="content">${data.content}</div>
                              <div class="date">${new Date(data.date).toLocaleString()}</div>
                              <button onclick="todoDel(this)">삭제</button></div>`;
        
        //삭제 버튼에 name속성 추가
        document.querySelector(".todo-item > button").setAttribute("name", `${data.id}`);
    
    });  
};

//추가 기능
let idIndex = 3; //id의 값을 증가 시킬 변수(초기데이터가 2까지 있으므로 3부터 시작)
document.querySelector(".editor > button").onclick =(e) =>{ 
    e.preventDefault(); //전송기능 막음 

    let content = document.querySelector(".editor > input").value;

    if (content === "") {
        alert("내용을 입력해주세요.");
        return;
    }

    let newData = {id: idIndex++, isDone:false, content: content, date: new Date().getTime()};

    mockData.push(newData);
    content = "";
    initData(mockData); //호출한다.(다시 화면 랜더링) 
}  

//수정 기능
const onUpdate = (targetId)=>{ //TodoItem에서 호출할 때 전달한 id 
    /* mockData의 state의 값들 중에 targetId와 일치하는 todoitem의 isDone 변경 
        map함수를 이용한다. map함수의 결과를 mockData에 저장한다. 
    */ 
    mockData = mockData.map((todo) => {
        if(todo.id === targetId) return { ...todo, isDone: !todo.isDone};
        return todo;
    });  
    initData(mockData); //호출한다.(다시 화면 랜더링) 
}


//삭제 기능
const todoDel = (th)=>{ 
    if(confirm("정말 삭제하시겠습니까?")){
    let btnId = Number(th.getAttribute("name"));
    //filter()함수를 이용해서 삭제하려는 대상이외의 todo만 추출해서 mockData에 담든다.
    mockData = mockData.filter(todo => todo.id !== btnId);

    initData(mockData); //호출한다.(다시 화면 랜더링)
    };
}

//검색 기능
document.querySelector("#keyword").onkeyup = (e)=>{ 

    let searchedTodos = getFilterData(e.target.value); 

    initData(searchedTodos); 

} 


const getFilterData = (search) =>{ 
//검색어가 없으면 mockData를 리턴한다. 
    if(search===""){ 
        return  mockData; 
    } 

//filter함수를 이용해서 search(검색어)를 포함하고 있는 todo들를 받는다 
    let searchTodo = mockData.filter((todo)=> {
        return todo.content.toLowerCase().includes(search.toLowerCase());
    });
    //filter의 결과를 리턴 한다. 
    return searchTodo;
}