# DeadLine(그룹별 유통기한 관리)
> 배포되지 않은 프로젝트입니다.

편의점, 음식점등 식품에 관련해서 유통기한을 관리하는 어플을 목표로 했던 토이 프로젝트입니다.
# Contents
1. [BackEnd Repo](#BackEnd-Repo)
2. [FrontEnd Repo](#FrontEnd-Repo)
3. [Service Flow](#Service-Flow)

# [BackEnd Repo](https://github.com/MINJE-98/Deadline/tree/master/api)
> 자세한 내용은 README를 참고해주세요.

BackEnd에 대한 레포입니다.

# [FrontEnd Repo](https://github.com/MINJE-98/Deadline/tree/master/client)
> 자세한 내용은 README를 참고해주세요.

FrontEnd에 대한 레포입니다.

# Service Flow
정말 수도없이 생각하고 프로젝트를 다시 처음부터 시작하거나 그날그날 기분에 따라 기능이 바뀌는 이상한 상황이 자주 발생했다.

위와 같은 상황을 줄이고자  서비스 플로우를 작성하게 되었다.

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
