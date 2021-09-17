# Deadline-api V1

유통기한 관리어플 api입니다.



## Installation



```bash
$ npm install
```



## Running the app



```bash
 npm run start
```

## EndPoint

Headers : token

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

POST /api/teams/members?&state={state}

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

GET /api/tags?tagid={tagid}

### 테그 수정

PUT /api/v1/tag?tagid={tagid}

### 테그 삭제

DELETE /api/v1/tag?tagid={tagid}



# 유통기한(Deadline)

Headers : token, teamuid

### 유통기한 생성

POST /api/deadline?teamuid={teamuid}&goodsid={goodsid}&expdate={expdate}&barcode={barcode}&prodname={prodname}&imageURL={imageURL}

### 유통기한 불러오기

GET /api/deadline

### 유통기한 수정

PUT /api/deadline

### 유통기한 삭제

DELETE /api/deadline



# 상품(items)

Headers : token, teamuid

### 상품 생성

POST /api/items?barcode={barcode}&prodname={prodname}&teamuid={teamuid}&imageURL={imageURL}

### 바코드가 팀에 있는지 확인

GET /api/items?barcode={barcode}

### 바코드를 가지고있는 팀 확인

GET /api/items/list?barcode={barcode}

### 수정

PUT /api/item

### 삭제

DELETE /api/item