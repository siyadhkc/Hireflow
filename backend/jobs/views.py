from django.shortcuts import render

# Create your views here.
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from .models import JobCategory, JobPost
from .serializers import JobCategorySerializer, JobPostSerializer, JobPostCreateSerializer
from employers.models import Company

@api_view(['GET'])
@permission_classes([AllowAny])
def simple_job_list(request):
    return JsonResponse({'message': 'API is working!', 'jobs': []})

class JobCategoryListView(generics.ListAPIView):
    queryset = JobCategory.objects.all()
    serializer_class = JobCategorySerializer
    permission_classes = [AllowAny]


class JobPostListView(generics.ListAPIView):
    serializer_class = JobPostSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = JobPost.objects.filter(status='ACTIVE').select_related('company', 'category')
        search = self.request.query_params.get('search')
        location = self.request.query_params.get('location')
        job_type = self.request.query_params.get('job_type')
        is_remote = self.request.query_params.get('is_remote')
        category = self.request.query_params.get('category')

        if search:
            queryset = queryset.filter(title__icontains=search)
        if location:
            queryset = queryset.filter(location__icontains=location)
        if job_type:
            queryset = queryset.filter(job_type=job_type)
        if is_remote:
            queryset = queryset.filter(is_remote=is_remote.lower() == 'true')
        if category:
            queryset = queryset.filter(category__slug=category)

        return queryset


class JobPostDetailView(generics.RetrieveAPIView):
    queryset = JobPost.objects.select_related('company', 'category')
    serializer_class = JobPostSerializer
    permission_classes = [AllowAny]


class EmployerJobListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return JobPostCreateSerializer
        return JobPostSerializer

    def get_queryset(self):
        return JobPost.objects.filter(
            company__owner=self.request.user
        ).select_related('company', 'category')

    def perform_create(self, serializer):
        company = Company.objects.get(owner=self.request.user)
        serializer.save(company=company)


class EmployerJobDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        return JobPostCreateSerializer

    def get_queryset(self):
        return JobPost.objects.filter(company__owner=self.request.user)