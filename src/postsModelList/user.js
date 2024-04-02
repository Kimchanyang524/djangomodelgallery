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
