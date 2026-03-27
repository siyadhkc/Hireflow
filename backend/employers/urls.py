from django.urls import path
from .views import CompanyListView, CompanyCreateView, CompanyDetailView

urlpatterns = [
    path('', CompanyListView.as_view(), name='company-list'),
    path('create/', CompanyCreateView.as_view(), name='company-create'),
    path('my-company/', CompanyDetailView.as_view(), name='my-company'),
]