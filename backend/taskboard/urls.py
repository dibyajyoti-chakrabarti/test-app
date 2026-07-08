from django.contrib import admin
from django.http import HttpResponse
from django.urls import include, path

urlpatterns = [
    path("health", lambda request: HttpResponse("ok")),
    path("admin/", admin.site.urls),
    path("api/", include("tasks.urls")),
]
