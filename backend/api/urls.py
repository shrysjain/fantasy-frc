from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register("leagues", views.LeagueViewSet)
router.register("teams", views.TeamViewSet)
router.register("picks", views.PickViewSet)

urlpatterns = [
    path("auth/login/", views.LoginAPIView.as_view(), name="api-login"),
    path("auth/logout/", views.LogoutAPIView.as_view(), name="api-logout"),
    path("", include(router.urls)),
]
