// 변수선언
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-form input");
const todoList = document.querySelector(".todo-list");
const removeAll = document.querySelector(".remove-all button");

// localStorage에 저장할 키값
const TODOS_KEY = "toDos";
// 할일을 저장할 배열
let toDos = [];
let id = 0;

// localStorage에 데이터 저장하는 함수
function saveToDos(e) {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(e) {
  const delLi = e.target.parentElement.parentElement;
  console.log(delLi);
  delLi.remove();
  toDos = toDos.filter((todo) => todo.id !== parseInt(delLi.id));
  saveToDos();
}

function lineCheck(e) {
  const li = e.target.closest("li");
  const id = parseInt(li.id);
  li.classList.toggle("lineThrough");

  // check값을 true/false 토글 후 저장하기
  toDos = toDos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, check: !todo.check };
    }
    return todo;
  });
  saveToDos();
}

function removeAllList(e) {
  localStorage.clear();
  todoList.innerHTML = "";
}

// 할일 목록 하면에 보여주기
function showToDo(newToDo) {
  // li목록 만들기
  const toDoLi = document.createElement("li");
  toDoLi.id = newToDo.id;

  const toDoSpan = document.createElement("span");
  toDoSpan.innerHTML = newToDo.text;

  const toDoIcon = document.createElement("div");
  const toDoCheck = document.createElement("button");
  const toDoRemove = document.createElement("button");
  toDoIcon.appendChild(toDoCheck);
  toDoIcon.appendChild(toDoRemove);

  toDoLi.appendChild(toDoSpan);
  toDoLi.appendChild(toDoIcon);

  todoList.appendChild(toDoLi);

  // 닫기 버튼을 클릭하면 목록에서 지워주기
  // localStorage 변경
  toDoRemove.addEventListener("click", deleteToDo);
  toDoCheck.addEventListener("click", lineCheck);
  removeAll.addEventListener("click", removeAllList);
}

// 폼의 input에 글자를 입력하고 전송하면
// localStorage안에 데이터 저장
// 입력한 글자, id, check 상태를 체크할 변수
todoForm.addEventListener("submit", (e) => {
  // 기본 이벤트 막아주기
  e.preventDefault();
  const newToDo = todoInput.value;

  console.log(newToDo);

  todoInput.value = "";
  const newToDoObj = {
    text: newToDo,
    id: ++id,
    check: false,
  };

  toDos.push(newToDoObj);
  saveToDos();
  showToDo(newToDoObj);
  console.log(toDos);
});

const savedToDos = localStorage.getItem(TODOS_KEY);
console.log(savedToDos);

if (savedToDos !== null) {
  console.log("dfd");
  const parsedTodos = JSON.parse(savedToDos);
  toDos = parsedTodos;
  parsedTodos.forEach(showToDo);
}

console.log(toDos);
