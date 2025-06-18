-- 주석
/*
	본문 주석
    DB => SQL (Structured Query Language)
*/

use eduDB;
desc members;
select * from members;

-- 데이터 삽입 : insert 문
/* DML(Data Manipulation Language) : INSERT, DELETE, UPDATE
DQL(Data Query Language) : Select
insert into 테이블명(컬럼명1, 컬럼명2, ... )
values (값1, 값2, ...)
varchar, char, text, ... 홑따옴표로 감싸서 값을 넣는다 '값'
*/

insert into members (name, email, passwd)
values ('홍길동','111','hong@a.b.c');

-- TCL (Transaction Control L) MySQL은 auto commit 설정이 되어있음
commit; -- 메모리에 보관하던 데이터를 DB에 영구히 저장 (기본적으로 auto commit)
rollback; -- 이전에 하던 작업을 취소

-- 데이터 조회 : select 문
/*
select 컬럼1, 컬럼2, ... from 테이블명
[where 조건]
*/
select id, name, email, indate, passwd, refreshtoken from members;
select * from members;

-- 3명 정도 가입시키기

insert into members (name, email, passwd, role)
values ('김철수','kim@naver.com','222','USER'),
('김관리','admin@navre.com','111','ADMIN'),
('이영희','lee@gmail.com','333','USER');

select * from members where role = "ADMIN";

-- 회원번호가 2번인 회원의 ID, NAME, INDATE를 보여주세요
select * from members where id = 2;
-- 이름이 홍길동인 회원 정보를 보여주세요
select * from members where name = '홍길동';
-- 이름에 김씨 성을 가진 회원정보 보여주세요
select * from members where name like '김%';

-- email에 com자를 가진 회원정보
select * from members where email like '%com%';

-- 이름에 김자가 들어가고 role이 ADMIN인 회원정보
-- => and 연산자

-- 이름에 김자가 들어가거나 role이 ADMIN인 회원정보
-- => or 연산자
