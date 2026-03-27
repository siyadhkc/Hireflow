from django.urls import path
from .views import (
    JobCategoryListView,
    JobPostListView,
    JobPostDetailView,
    EmployerJobListCreateView,
    EmployerJobDetailView,
    simple_job_list
)

urlpatterns = [
    path('categories/', JobCategoryListView.as_view(), name='job-categories'),
    path('', JobPostListView.as_view(), name='job-list'),  # Restore original view
    path('<uuid:pk>/', JobPostDetailView.as_view(), name='job-detail'),
    path('my-jobs/', EmployerJobListCreateView.as_view(), name='employer-jobs'),
    path('my-jobs/<uuid:pk>/', EmployerJobDetailView.as_view(), name='employer-job-detail'),
]