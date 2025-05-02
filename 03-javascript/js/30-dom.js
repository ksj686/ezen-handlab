// html의 script 태그에 들어간 defer가 DOMContentLoaded의 역할을 한다.

// 태그 생성
let hTitle = document.createElement("h1");

// 태그 속에 내용물 넣기 .innerHtml
hTitle.innerHTML= "제목생성";

// 생성된 태그 body 붙이기. append나 appendChild 동일하게 자식으로 붙임
document.body.append(hTitle);