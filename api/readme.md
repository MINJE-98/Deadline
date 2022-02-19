# Deadline-api
[Tech Stack](#Tech-Stack)
[Service Flow](#Service-Flow)
[EndPoint](#EndPoint)
[DataBase Structure](#DataBase-Structure)
[ErrorCode](#ErrorCode)

# Tech Stack
- NodeJS/ExpressJS
- MySQL
- AWS/S3

# Service Flow
사용할 기술스택을 정하였으면 내가 생각하는 서비스를 하나하나 작성해보기로 하였다.

## 인증(AUTH)
❗방식을 기준으로 인증을 구현 해보았습니다.

### 처음 로그인
1. 로그인 버튼을 누릅니다.
2. 토큰을 받아옵니다.
3. 로컬 스토리지에 저장합니다.
4. 토큰으로 유저정보를 받아옵니다.
5. 사용자를 생성합니다.
6. 마지막 로그인 날짜 업데이트합니다.
7. 로그인합니다.

### 다시 접속
1. 토큰을 받습니다.
2. 해당 토큰이 우리 서비스 토큰인지 확인 합니다.
3. 사용자가 등록되어있는지 확인합니다.
4. 마지막 로그인 날짜를 업데이트합니다.
5. 로그인합니다.

### 토큰이 필요한 요청
1. 토큰을 받습니다.
2. 해당 토큰이 우리 서비스 토큰인지 확인 합니다.
3. 요청을 처리합니다.

### 예외처리
1. 처음로그인
    1. 다른 서비스의 토큰을 가지고 가입 할경우
2. 다시 접속
    1. 토큰이 만료 되어 사용자 정보를 불러올 수 없는 경우
    2. 데이터 베이스에 사용자가 없는 경우
3. 토큰이 필요한 요청
    1. 토큰이 만료 되어 사용자 정보를 불러올 수 없는 경우

❗ 아래의 로직들은 토큰을 검증 후 동작합니다.

## 팀(Teams)
### 팀 생성
1. 팀을 생성합니다.
2. 팀 UID를 생성해 팀을 생성합니다.
3. 생성된 팀에 생성한 사람을 관리자로 가입 시킵니다.
4. 팀 생성 완료합니다.

### 자신이 가입한 팀 반환
1. 자신이 가입한 팀을 반환합니다.

### 팀 삭제
1. 팀의 관리자는 팀을 삭제할 수 있습니다.

### 팀 수정
1. 팀의 관리자는 팀을 수정할 수 있습니다.

### 예외 처리
1. 이미 같은 UID가 있을 경우
2. 유저가 팀에 소속되어있는지 검증합니다.

## 팀멤버(teamembers)
❗팀멤버(teamembers)는 팀(teams)의 자식 이며, 팀이 없으면 없는팀의 멤버가 될 수 없다.

### 팀 가입
1. 팀UID를 입력합니다.
2. 팀UID가 있는지 확인합니다.
3. state 코드에 따라 사용자를 멤버에 등록합니다.
4. 팀 등록 완료하였습니다.

### 팀에 가입된 멤버 반환
1. 팀에 가입된 멤버를 전체 반환합니다.

### 팀에 가입된 특정 멤버 반환
1. 팀에 가입된 특정 멤버를 반환합니다.

### 팀 가입 승인
1. 팀멤버들의 state를 확인합니다.
2. state값이 2일 경우 state 0번인 관리자가 팀에 유통기한을 등록할 수 있게 팀에 등록합니다.
3. 팀 가입 승인 완료합니다.

### 멤버 권한 변경
1. 팀멤버의 권한을 변경합니다.

### 팀 탈퇴
1. 팀멤버들은 팀에서 탈퇴합니다.

### 예외 처리
1. 팀 UID가 없을 경우
2. 이미 가입 신청을 했을 경우

❗아래의 로직은 유저가 팀에 소속되어있는지 검증합니다.

## 아이템(items)
팀이 상품을 스캔 했을때, 해당 바코드의 다른 팀에서 등록한 상품 정보를 보여준다.

팀은 다른 팀의 상품을 선택하여 똑같은 내용을 복사하여 상품정보를 등록할 수 있다.

### 아이템 생성
1. 상품을 스캔한다.
2. 팀에서 해당 바코드의 상품을 가지고 있는지 확인한다.
3. 다른 팀의 바코드의 상품을 보여준다.
4. 유저가 상품을 새로 추가한다.
5. 상품 정보가 입력 되었다.
6. 유통기한을 등록하면서 같이 아이템 정보가 저장된다.

### 이미지 업로드
1. 상품이미지를 업로드합니다.

### 팀에서 상품정보 가져오기
1. 팀이 가지고있는 상품 정보를 가져온다.

### 다른팀에서 상품정보 포크
1. 전체팀의 상품 정보를 가져온다.
2. 원하는 팀의 상품정보를 복사 후 클라이언트에 저장한다.

## 유통기한(DeadLine)
### 유통기한 등록
1. 입력된 아이템 정보를 확인한다.
    1. 아이템 정보가 없을 시 새로 등록한다.
2. 유통기한을 입력한다.
3. 테그를 선택한다.
4. 등록 정보 ={ A팀의 상품id값, 유통기한, 테그id }

### 유통기한 수정
1. 등록된 유통기한 정보를 수정합니다.

### 유통기한 삭제
1. 등록된 유통기한 정보를 삭제합니다.

### 유통기한 리스트 정보
1. 등록된 유통기한 전체 리스트를 반환합니다.

### 특정 유통기한 정보
1. 등록된 특정 유통기한 정보를 반환합니다.

# DataBase Structure
서비스 흐름을 작성 하고 보니 데이터베이스가 어떻게 이루어져있어야할지 약간 감이 왔고, 어느 블로그에서 하고 있는 방식으로 데이터베이스 구조를 잡아보기로 하여 따라 해보았다.

## 객개념적 설계로 ER 다이어그램 만들기
### 객체와 속성을 추출하기
ER 다이어그램을 그리기 위해 나의 테이블과 각 테이블의 원소가 어떻게 이루어져있는지 알아야 ER다이어그램을 그릴 수 있다.

우선 서비스 흐름에 따라 간단한 요구사항을 작성해보았다.
```
우리 어플은은 회원가입하려면 유저아이디, 이름, 이메일, 프로필사진(SNS로그인)가 있어야 한다.
데이터 저장시, facebook의 accesstoken이 저장되고, 가입일, 마지막로그인일이 기록된다.

팀을 생성할 때 팀맴버가 생성되며, 팀 멤버는  id, 팀아이디, 유저아이디, 유저상태코드으로

유저는 여러개의 팀을 가질 수 있는데, 팀은 팀아이디, 이름 필수로 입력해야 하며, 팀을 생성할 시 팀 생성일자가 기록된다.

또한 팀에 가입할 수 있는데, 팁 가입신청시 팀맴버가 생성되고  id, 팀아이디, 유저아이디, 유저상태코드는 join 설정되어 admin인 유저가 승인을 해야 팀에 접근 할 수 있다.

팀맴버는 팀이 없으면 존재할 수 없다.

팀에 아이템들을 추가할 수 있다. 아이템은 아이템아이디, 팀아이디, 바코드, 이름, 사용횟수, 이미지URL의정보를 저장하고 있다.

또한 아이템에 태그를 붙일 수 있는다. 태그에 대한 데이터는 태그아이디, 팀아이디, 태그이름이고 태그가 없을 시 팀의 유저 누구든지 생성이 가능하다.
```
위의 요구사항을 따라 개체와 속성을 구별 해보았다.

| 개체 | 속성 |
| --- | --- |
| 유저 | 유저아이디, 이름, 이메일, 프로필사진, accesstoken, 가입일, 마지막로그인 |
| 팀 | 팀아이디, 이름, 팀프로필사진 |
| 팀맴버 | id, 팀아이디, 유저아이디, 유저상태코드 |
| 아이템 | 아이템아이디, 팀아이디, 바코드, 이름, 사용횟수, 이미지URL |
| 태그 | 태그아이디, 팀아이디, 태그이름 |

## 개체 간의 관계 추출
| 관계 | 관계에 참여하는 개체 | 관계 유형 | 관계 속성 |
| --- | --- | --- | --- |
| 생성 | 유저(필수) : 유저는 여러 팀을 생성/참여할 수있다. 팀(선택) : 팀은 여러 유저를 가질 수 있다. | N:M |  |
| 생성 | 유저(필수) : 유저는 여러 팀에 생성, 참여할 수 있다. 팀멤버(선택) : 팀멤버는 한 유저만 가질 수 있다. | 1:N |  |
| 참조 | 팀(필수) : 한팀은 여러 유저를 갈 수 있다. 팀멤버(선택) : 팀멤버 |  |  |
| 추가/변경 | 팀(필수) : 팀은 여러개의 아이템을 추가할 수 있다. 아이템(선택) : 아이템은 한번 추가하면 추가할수없다. | 1:N |  |
| 추가/변경 | 팀(필수) : 팀은 여러개의 태그를 추가 할 수 있다. 태그(선택) : 태그는 하나의 팀에만 존재해야함. | 1:N | 태그는 팀없이 존재할 수 없다. |
| 추가/변경 | 아이템이미지(필수) : 아이템이미지는 여러개의 유통기한을 가질 수 있다.태그(필수) : 태그는 여러개의 유통기한을 가질 수 있다. 유통기한(선택) : 유통기한은 아이템이미지, 태그를 하나씩 가져야한다. | 1:N | 유통기한은 아이템이미지, 태그 없이 존재할 수 없다. |

## ER 다이어그램
위의 **객체속성추출**과 **관계추츨**을 통해 ER다이어그램을 그려보았다.

![ER다이어그램](https://www.notion.so/signed/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fcf79355e-2a0d-49c8-a0fd-557d642a4795%2FUntitled_Diagram_(1).jpg?table=block&id=b44eeecf-e09d-410f-8c5a-3ad239256957&spaceId=a04f626d-9036-4e52-9f18-df6d86bf1c87&name=Untitled_Diagram_(1).jpg&userId=7e8373b0-fe91-4344-83b7-6f2def8c26b3&cache=v2)

## SQL
ER다이어그램에 해당하는 쿼리문은 아래와 같다.

```sql
-- 테이블 순서는 관계를 고려하여 한 번에 실행해도 에러가 발생하지 않게 정렬되었습니다.

-- teams Table Create SQL
CREATE TABLE teams
(
    `tuid`        VARCHAR(6)       NOT NULL  UNIQUE  COMMENT '팀UID', 
    `name`        VARCHAR(20)      NOT NULL    COMMENT '팀이름', 
    -- `profileURL`  VARCHAR(1000)    NULL        COMMENT '팀 프로필 사진', 
    `makedate`    DATETIME         NOT NULL    COMMENT '팀 생성일자', 
    PRIMARY KEY (tuid)
);

ALTER TABLE teams COMMENT '팀';

-- 팀UID는 오직 하나의 값만 존재할 수 있다.

-- users Table Create SQL
CREATE TABLE users
(
    `uuid`        VARCHAR(100)     NOT NULL    COMMENT '유저UID', 
    `email`        VARCHAR(100)     NOT NULL    COMMENT '유저이메일',
    `name`        VARCHAR(100)     NOT NULL    COMMENT '유저이름',  
    `profileURL`  VARCHAR(1000)    NULL        COMMENT '유저 프로필 사진',
    `lastlogindate` DATETIME    NOT NULL    COMMENT '마지막 로그인날짜';
    `registerdate` DATETIME    NOT NULL    COMMENT '가입 날짜';
    PRIMARY KEY (uuid)
);

ALTER TABLE users COMMENT '유저';

-- itmes Table Create SQL
-- CREATE TABLE itmes
-- (
--     `barcode`  VARCHAR(30)         NOT NULL  UNIQUE  COMMENT '바코드(FK)', 
--     `name`     VARCHAR(100)    NOT NULL    COMMENT '상품명', 
--     PRIMARY KEY (barcode)
-- );

-- ALTER TABLE itmes COMMENT '아이템';

-- -- 아이템의 바코드는 상품당 1개만 존재할 수 있다.

-- itemimages Table Create SQL
CREATE TABLE goods
(
    `goodsid`   INT              NOT NULL   AUTO_INCREMENT COMMENT '아이템 아이디', 
    `tuid`      VARCHAR(6)       DEFAULT NULL           COMMENT '팀UID(FK)', 
    `barcode`   VARCHAR(30)      NOT NULL   COMMENT '바코드', 
    `name`   VARCHAR(100)      NOT NULL   COMMENT '상품 명', 
    `imageURL`  VARCHAR(1000)    NOT NULL    COMMENT '이미지URL', 
    `usecount`  INT              NOT NULL  DEFAULT 0  COMMENT '사용횟수', 
    PRIMARY KEY (goodsid)
);

ALTER TABLE goods COMMENT '아이템이미지';

/* 
* 바코드 없이 존재 할 수 없다.
* 팀없이 존재 할 수 있다.
*/

ALTER TABLE goods
    ADD CONSTRAINT FK_goods_tuid_teams_tuid FOREIGN KEY (tuid)
        REFERENCES teams (tuid) ON DELETE SET DEFAULT ON UPDATE CASCADE
-- 참조 테이블 [teams]
-- [teams]이 삭제되었을 경우 => 기본값으로 귀속됩니다.(NULL)
-- [teams]이 업데이트될 경우 => 부모와 같이 업데이트 됩니다.

-- tags Table Create SQL
CREATE TABLE tags
(
    `tagid`  INT             NOT NULL   AUTO_INCREMENT COMMENT '태그아이디', 
    `tuid`   VARCHAR(6)      NOT NULL    COMMENT '팀UID(FK)', 
    `name`   VARCHAR(100)    NOT NULL    COMMENT '태그이름', 
    PRIMARY KEY (tagid)
);

ALTER TABLE tags COMMENT '태그';
/* 
* 태그는 팀이 존재하지 않으면 존재 할 수 없다.
*/
ALTER TABLE tags
    ADD CONSTRAINT FK_tags_tuid_teams_tuid FOREIGN KEY (tuid)
        REFERENCES teams (tuid) ON DELETE CASCADE ON UPDATE CASCADE;
-- 참조 테이블 [teams]
-- [teams]이 삭제 되었을 경우 => 부모와 같이 업데이트 됩니다.
-- [teams]이 업데이트 되었을 경우 => 부모와 같이 업데이트 됩니다.

-- deadline Table Create SQL
CREATE TABLE deadline
(
    `id`        INT           NOT NULL   AUTO_INCREMENT COMMENT '유통기한아이디', 
    `tuid`      VARCHAR(6)    NOT NULL    COMMENT '팀UID(FK)', 
    `goodsid`   INT           DEFAULT NULL COMMENT '아이템 아이디(FK)', 
    `tagid`     INT           DEFAULT NULL COMMENT '태그 아이디(FK)', 
    `expdate`  DATETIME      NOT NULL    COMMENT '유통기한', 
    `uploaddate`    DATETIME      NOT NULL    COMMENT '업로드 일자', 
    PRIMARY KEY (id)
);

ALTER TABLE deadline COMMENT '유통기한';

/* 
* 유통기한은 태그와, 이미지를 등록을 해도되고 안해도되지만.
* 팀이없다면 존재할 수 없다.
*/

ALTER TABLE deadline
    ADD CONSTRAINT FK_deadline_tuid_teams_tuid FOREIGN KEY (tuid)
        REFERENCES teams (tuid) ON DELETE CASCADE ON UPDATE CASCADE;
-- 참조 테이블 [teams]
-- [teams]가 삭제 되었을 경우 => 부모와 같이 업데이트 됩니다.
-- [teams]가 업데이트 되었을 경우 => 부모와 같이 업데이트 됩니다.

ALTER TABLE deadline
    ADD CONSTRAINT FK_deadline_goodsid_goods_goodsid FOREIGN KEY (goodsid)
        REFERENCES goods (goodsid) ON DELETE SET null ON UPDATE CASCADE;
-- 참조 테이블 [itemimages]
-- [itemimages]가 삭제 되었을 경우 => 기본값으로 귀속됩니다. (NULL)
-- [itemimages]가 업데이트 되었을 경우 => 부모와 같이 업데이트 됩니다.

ALTER TABLE deadline
    ADD CONSTRAINT FK_deadline_tagid_tags_tagid FOREIGN KEY (tagid)
        REFERENCES tags (tagid) ON DELETE SET DEFAULT ON UPDATE CASCADE;
-- 참조 테이블 [tags]
-- [tags]가 삭제 되었을 경우 => 기본값으로 귀속됩니다. (NULL)
-- [tags]가 업데이트 되었을 경우 => 부모와 같이 업데이트 됩니다.

-- teamembers Table Create SQL
CREATE TABLE teamembers
(
    `id`     INT             NOT NULL   AUTO_INCREMENT COMMENT '아이디', 
    `uuid`   VARCHAR(100)    NOT NULL    COMMENT '유저UID(FK)', 
    `tuid`   VARCHAR(6)      NOT NULL    COMMENT '팀UID(FK)', 
    `state`  INT             NOT NULL    COMMENT '유저상태', 
    PRIMARY KEY (id)
);

ALTER TABLE teamembers COMMENT '팀맴버';

ALTER TABLE teamembers
    ADD CONSTRAINT FK_teamembers_uuid_users_uuid FOREIGN KEY (uuid)
        REFERENCES users (uuid) ON DELETE CASCADE ON UPDATE CASCADE;
-- 참조 테이블 [users]
-- [users]가 삭제 되었을 경우 => 부모와 같이 업데이트 됩니다.
-- [users]가 업데이트 되었을 경우 => 부모와 같이 업데이트 됩니다.
ALTER TABLE teamembers
    ADD CONSTRAINT FK_teamembers_tuid_teams_tuid FOREIGN KEY (tuid)
        REFERENCES teams (tuid) ON DELETE CASCADE ON UPDATE CASCADE;
-- 참조 테이블 [teams]
-- [teams]가 삭제 되었을 경우 => 부모와 같이 업데이트 됩니다.
-- [teams]가 업데이트 되었을 경우 => 부모와 같이 업데이트 됩니다.
```
# EndPoint
EndPoint를 문서화 하여보았다.

## 인증(auth)

### 로그인

POST /api/auth

### 유저 정보

GET /api/auth

### 삭제

DELETE /api/auth

### 수정

PUT /api/auth

## 팀(teams)

### 생성

POST /api/teams

### 읽기

GET /api/teams

### 팀에 귀속된 아이템

GET / api/teams/items

### 삭제

DELETE /api/teams

### 수정

PUT /api/teams

## 팀에 소속된 유저(members)

### 가입

POST /api/teams/members

### 팀에 가입된 유저 읽기

GET /api/teams/members

### 한명의 유저가 가입한 팀들 읽기

GET /api/teams/members/teamlist

### 팀 탈퇴

DLELTE /api/teams/members

## 팀 태그

### 생성

POST /api/tags

### 읽기

GET /api/tagid

### 수정

PUT /api/tagid

### 삭제

DELETE /api/tagid

# 유통기한(Deadline)

### 생성

POST /api/deadline

BODY

- goodsid
- prodname
- imageURL
- barcode
- expdate
- teamuid

### 읽기

GET /api/deadline

### 수정

PUT /api/deadline

### 삭제

DELETE /api/deadline

# 상품(items)

### 생성

POST /api/items

BODY

- barcode
- prodname
- teamuid
- imageURL

### 바코드가 팀에 있는지 확인

GET /api/items

- barcode

### 바코드를 가지고있는 팀 확인

GET /api/items/list

- barcode

## Headers : token, teamuid

### 수정

PUT /api/item

### 삭제

Headers : token

DELETE /api/item

### 토큰 생성

POST /api/auth

### 토큰 확인

GET /api/auth

### 토큰 제거

DELETE /api/auth

# 팀(teams)

Headers : token

### 팀 생성

POST /api/teams

### 자신이 가입한 팀 불러오기

GET /api/teams

### 팀에 귀속된 아이템

GET / api/teams/items

### 팀 삭제

DELETE /api/teams

### 팀 수정

PUT /api/teams

## 팀에 소속된 유저(members)

Headers : token, teamuid

### 팀에 가입

POST /api/teams/members

BODY

- state

### 팀에 가입된 유저 확인

GET /api/teams/members

### 특정 유저가 가입한 팀들 확인

GET /api/teams/members/teamlist

### 팀 탈퇴

DLELTE /api/teams/members

# 팀 테그

Headers : token, teamuid

### 테그 생성

POST /api/tags

### 테그 불러오기

GET /api/tagid

### 테그 수정

PUT /api/tagid

### 테그 삭제

DELETE /api/tagid

# 유통기한(Deadline)

Headers : token, teamuid

### 유통기한 생성

POST /api/deadline

BODY

- teamuid
- goodsid
- expdate
- barcode
- prodname
- imageURL

### 유통기한 불러오기

GET /api/deadline

### 유통기한 수정

PUT /api/deadline

### 유통기한 삭제

DELETE /api/deadline

# 상품(items)

Headers : token, teamuid

### 상품 생성

POST /api/items/barcode

BODY

- prodname
- teamuid
- imageURL

### 바코드가 팀에 있는지 확인

GET /api/barcode

### 바코드를 가지고있는 팀 확인

GET /api/items/barcode

### 수정

PUT /api/item

### 삭제

DELETE /api/item

