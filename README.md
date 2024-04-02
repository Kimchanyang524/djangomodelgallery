# djangomodelgallery
장고 모델 겔러리 오픈소스 프로젝트 입니다.
* 주의사항
    * 협업에서 PR을 되돌리거나, 버전을 되돌리는 것은 '절대'하지 않습니다. 꼬이면 되돌리지 마시고 PR날린 채로 다른 분에게 넘겨버리세요.
    * claude3 도움을 꼭 받으세요. 주니어만큼 코드 짭니다.
* 역할분담(역할분담 기여자 목록은 끝까지 기록됩니다.)
    * 리드미 파일 작성: 다같이, 예외없이, 열정적으로.....
        - 최종 배포시 리드미 깔끔하게 다듬기
        - 간단한 컨벤션
        - PR 규칙 => 기여하기에도 들어가야 합니다.
            - 우리 내부 인원은 PR은 코드 허락을 받지 않고, 리뷰도 받지 않습니다. 스스로 머지까지 해주시면 됩니다.
            - 외부인은 코드 허락을 받아야 합니다. 코드 허락은 코드 리뷰어가 허락해야 합니다.
            - 충돌이 발생되면 충돌을 스스로 해결하셔서 PR을 다시 올려주시고 머지하시면 됩니다.
    * 프로젝트 소개 페이지 작성: 박주형, 진성현, 김나영
    * 모델 겔러리 페이지 작성(난이도 어렵습니다): 이혜림, 한승협, 신선하, 엄영철
        - header와 footer 디자인이 나오면 about, contibute, license에도 일괄 적용하겠습니다.
    * 기여하기: 한승협
        - 나중에 오픈되었을 때 이 오픈소스에 기여하고 싶을 때 어떻게 해야하는지에 대한 가이드
        - 일단은 노션으로만 작성해서 링크만 첨부하셔도 좋습니다.
        - 다른 곳에 컨트리뷰터 가이드 참고하시면 좋습니다. 
            - 리엑트 컨트리뷰터 가이드 등
    * 라이센스: 이혜림, 김정원
    * 기획: 없음
        - 기획 3월 17일 마무리 되었습니다. 개발 하면서 추가 의견 있으면 추가 기획 하겠습니다.
    * 디자인: 없음
        - 디자인 없이 갑니다. => 디자이너 나중에 섭외를 하던가 하겠습니다.
    * mock 데이터 세팅: 황병헌
        - 001_django-blog-post-model.md에 대한 실제 글을 만들어주세요.
            - 필수 포함되어야 하는 것: 머메이드 코드, 장고 모델 코드, 모델 생성 프롬프트, 기여자의 설명
            - 제목, 기여자, 작성일, 모델 수, 소셜 미디어는 어차피 postsList.json에 있기 때문에 001_django-blog-post-model.md에 담길 필요는 없습니다.
        - postsList.json에도 실제 데이터가 포함이 되어야 합니다.
    * 자동화: 이수빈, 황병헌, 이규성, 김찬양
        - Markdown 파일을 올리고 PR하면 자동으로 postsList.json에도 데이터가 추가되게 해주는 작업.
        - 깃헙 액션 + python 잘하시는 분이 담당해주세요.

    ---

    * 24일 일요일 20시에 미팅