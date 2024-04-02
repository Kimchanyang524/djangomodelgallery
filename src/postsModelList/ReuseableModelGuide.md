# Django Reuseable 모델 생성 함수 사용 가이드

이 가이드에서는 Django 모델 생성을 도와주는 커스텀 함수를 작성하고 사용하는 방법에 대해 설명합니다.

## 모델 카테고리 관리

1. `postsModelList` 디렉토리 내에 모델 카테고리별로 js 파일을 생성합니다. 예를 들어, 사용자 모델은 `user.js`, 게시물 모델은 `post.js`와 같이 관리합니다.
2. 각 카테고리의 js 파일 내에 해당 카테고리에 필요한 모델 생성 함수를 작성합니다.
3. 새로운 모델 카테고리가 필요한 경우, `postsModelList` 디렉토리 내에 해당 카테고리의 js 파일을 새로 생성합니다.
4. 디폴트로 user.js를 만들어두었습니다.

## 리유저블 모델 생성 함수 작성

각 카테고리의 js 파일 내에서 모델 생성 함수를 작성합니다. 예시로 `user.js` 파일 내에 `getCustomUser` 함수를 작성하는 방법을 살펴보겠습니다:

```javascript
export function getCustomUser(options = {}) {
  const {
    username = "models.CharField(max_length=100, unique=True)",
    email = "models.EmailField(unique=True)",
    isActive = "models.BooleanField(default=True)",
    isStaff = "models.BooleanField(default=False)",
    createdAt = "models.DateTimeField(auto_now_add=True)",
    updatedAt = "models.DateTimeField(auto_now=True)",
  } = options;

  return `from django.contrib.auth.models import AbstractUser
  from django.db import models


  class CustomUser(AbstractUser):
      username = ${username}
      email = ${email}
      is_active = ${isActive}
      is_staff = ${isStaff}
      created_at = ${createdAt}
      updated_at = ${updatedAt}

      def __str__(self):
          return self.username`;
}
```

위 예시에서는 `getCustomUser` 함수를 정의하고 있습니다. 이 함수는 `options` 객체를 받아 사용자 정의 `CustomUser` 모델을 생성합니다.

보시다시피 템플릿 리터럴을 사용하여 작성하고 있기 때문에 AI를 이용해서 생성하시는 것을 추천드립니다.
그래야 줄이 잘 맞습니다.

## 리유저블 모델 생성 함수 내보내기

각 카테고리의 js 파일에서 작성한 모델 생성 함수를 `postsModelList/index.js` 파일로 내보냅니다. 예시:

```javascript
// postsModelList/index.js
export * from "./user.js";
export * from "./post.js";
// 다른 카테고리의 js 파일도 추가로 내보냅니다.
```

이렇게 하면 `util/markdownParser.js`에서 이 `index.js`를 읽습니다.
각 카테고리의 js 파일에서 정의한 함수를 다른 곳에서 사용하려면 반드시 이 작업이 되어있어야 합니다.

## 커스텀 리유저블 모델 사용

마크다운 파일 내에서 다음과 같이 커스텀 리유저블 모델을 호출할 수 있습니다:

```python

# accounts > models.py

$getCustomUser()
​
```

위 코드는 디폴트 옵션으로 `CustomUser` 모델을 생성합니다.

옵션을 지정하여 커스텀 리유저블 모델을 호출하는 예시는 다음과 같습니다:

​

```python

# accounts > models.py

$getCustomUser({
username: "models.CharField(max_length=150, unique=True)",
email: "models.EmailField(unique=True, max_length=255)",
isActive: "models.BooleanField(default=False)",
})
​

```

위 코드는 `username`, `email`, `isActive` 옵션을 지정하여 `CustomUser` 모델을 생성합니다.

이제 `postsModelList` 디렉토리 내에 원하는 카테고리의 js 파일을 생성하고, 해당 파일 내에 모델 생성 함수를 작성하세요. 필요한 경우 새로운 카테고리의 js 파일을 추가할 수 있습니다. 마크다운 파일에서 해당 함수를 호출하여 Django 모델을 생성할 수 있습니다.

### 주의할 점

문법이 틀리거나 괄호를 빼먹으면 적용되지 않으니 반드시 테스트 후 풀리퀘를 올려주세요.
어디까지를 공통으로 두고, 어디까지를 커스텀으로 할 것인가를 생각해주세요.
