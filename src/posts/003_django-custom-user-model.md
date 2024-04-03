---
id: 003
title: Django Custom User Model
date: 2024-04-02
category: Authentication
modelCount: 1
tags:
  - Django
  - Model
  - User
  - Authentication
fileName: 003_django-custom-user-model.md
contributor:
  name: 황병헌
  social:
    github: https://github.com/Ruler-H
---

# Django Custom User Model

이 글에서는 Django에서 제공하는 기본 User 모델을 확장하여 사용자 정의 User 모델을 만드는 방법에 대해 알아보겠습니다.

Django는 기본적으로 `User` 모델을 제공합니다. 그러나 많은 경우에 개발자는 추가 필드나 기능이 필요할 수 있습니다. 이럴 때 Django의 기본 `User` 모델을 확장하여 사용자 정의 `User` 모델을 만들 수 있습니다.

`CustomUser` 모델은 `AbstractUser`를 상속받아 `Django`의 기본 User 모델을 확장합니다.

## 장고 모델 코드

```python
# accounts > models.py
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse


class CustomUser(AbstractUser):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    birthday = models.DateField(blank=True, null=True)
    profile_image = models.ImageField(upload_to="profile/", blank=True, null=True)

    USERNAME_FIELD = "email"

    def __str__(self):
        return self.username

    def get_absolute_url(self):
        return reverse("accounts:profile", kwargs={"pk": self.pk})

```

## ERD

```viz
digraph AppSchema {
  rankdir=LR; // 노드들을 가로로 배치
  node [shape=plaintext]; // 노드 스타일을 plaintext로 설정

  // 앱 'Accounts'를 위한 서브그래프
  subgraph cluster_Accounts {
    label="Accounts";
    color=red;
    style=dashed;

    // 'Accounts' 앱의 테이블 정의 (HTML-like 레코드 형식)
    CustomUser [label=<<table border="0" cellborder="1" cellspacing="0">
                <tr><td port="username" bgcolor="lightgrey"><b>CustomUser</b></td></tr>
                <tr><td port="id_fId">🔐 id</td></tr>
                <tr><td>username</td></tr>
                <tr><td>email</td></tr>
                <tr><td>is_active</td></tr>
                <tr><td>is_staff</td></tr>
                <tr><td>created_at</td></tr>
                <tr><td>updated_at</td></tr>
                <tr><td>phone_number</td></tr>
                <tr><td>birthday</td></tr>
                <tr><td>profile_image</td></tr>
               </table>>];
  }

}

```

이 다이어그램에서 볼 수 있듯이, 사용자 정의 User 모델은 Django의 기본 User 모델에서 제공하는 username과 email 필드 외에도 사용자와 관련된 여러 필드를 가지고 있습니다.

사용자 정의 User 모델을 만들고 설정하는 방법에 대해 알아보았습니다. 이렇게 하면 애플리케이션의 요구사항에 맞게 User 모델을 확장할 수 있습니다.

## 모델 생성 프롬프트
### 1. CustomUser 모델
#### (1) 필드
 - username: 사용명을 저장하는 필드로 서비스에 따라 실명 혹은 가명을 저장할 수 있습니다.
 - email: 사용자의 이메일을 저장합니다.
 - is_active: 계정의 활성 상태 여부를 Boolean 값으로 저장합니다.
 - is_staff: 사용자의 권한이 admin인지를 Boolean 값으로 저장합니다.
 - cerated_at: 사용자의 생성 시간을 자동으로 저장합니다.
 - updated-at: 사용자의 수정 시간을 자동으로 저장합니다.
 - phone_number: 사용자의 전화번호를 저장합니다.
 - birthday: 사용자의 생년월일을 저장합니다.
 - profile_image: 사용자의 프로필 이미지가 저장된 경로를 저장합니다.
 - USERNAME_FIELD: Django에서 사용자 모델을 사용할 때 사용자 데이터의 고유 식별자로 사용할 필드를 지정하는 필드입니다. 대표적으로 서비스 내에서 로그인 시 계정으로 사용됩니다.
#### (2) 메서드
 - get_absolute_url: 사용자 객체의 대표 URL을 반환해주는 메서드로 코드에서 반환하는 URL은 사용자의 PK 값으로 해당 사용자의 프로필 페이지 URL입니다.


## 기여자의 설명
### 1. 사용자 정의 User 모델 설정하기

사용자 정의 User 모델을 사용하기 위해서는 다음으로, `Django` 프로젝트의 `settings.py` 파일에서 `AUTH_USER_MODEL` 설정을 수정해야 합니다.

```python
# project_dir > settings.py
AUTH_USER_MODEL = 'accounts.CustomUser'
```

이렇게 하면 Django에서 사용자 정의 User 모델을 사용하게 됩니다.