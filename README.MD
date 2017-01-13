Node.js Self-Study

main
-jade의 extends나 include를 이용하여 상단의 nodejs_self_study로 이동 버튼과 연동한다.
1.Welcome page
-상단의 nodejs_self_study를 클릭하면 main 'welcomepage'로 이동.
-로그아웃 상태 : 'welcome'이라는 문구와 로그인창
-로그인 상태   : 'welcome'이라는 문구와 사용자의 이름
2.List
Login
-로그인 성공시 WELCOME PAGE로 이동
-실패시 다시 로그인 화면
-로그인 정보는 세션으로 저장된다.
Register
-회원가입, 기존에 같은 ID가 있다면 다시 로그인창. 가입후에는 자동 로그인후 WELCOME PAGE로 이동
Replace
-회원정보수정,로그인시에만 가능하고 이름과 PWD만 수정가능
Delete
-회원탈퇴,로그인시에만 가능
FaceBook
-FACEBOOK을 통해 로그인. 기존에 등록이 되어있다면 로그인되고 없다면 가입이 되 DB에 등록된다.
FileUpload
-파일을 업로드하여 원하는 폴더에 저장한다.
Text Filing
-new 버튼을 누르면 '제목,내용'을 입력하고 data폴더에 제목의 이름으로 내용이 입력된 txt파일 생성.
-메뉴바에는 제목을 읽어와서 제목을 누르면 내용을 출력한다. 여기서 내용은 파일에서 읽어온다.
-글을 작성하면 DB에 등록되고 ID에 따라서 URL이 구분된다.
-글을 수정 및 삭제할수 있다. 글을 누르면 DELETE와 REPLACE가 있음. DB에도 영향
Cookie
-cart에 물건을 담으면 수량이 늘어난다. add를 누르면 카트에 상품을 추가하고 delete를 누르면 카트를 삭제. minus를 누르면 수량이 줄어든다.
