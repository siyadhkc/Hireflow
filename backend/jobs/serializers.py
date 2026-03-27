from rest_framework import serializers
from .models import JobCategory, JobPost


class JobCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = JobCategory
        fields = ['id', 'name', 'slug']


class JobPostSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.name', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = JobPost
        fields = [
            'id', 'title', 'description', 'skills_required',
            'job_type', 'location', 'is_remote',
            'salary_min', 'salary_max', 'status',
            'company', 'company_name',
            'category', 'category_name',
            'expires_at', 'created_at'
        ]
        read_only_fields = ['id', 'company', 'created_at']


class JobPostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobPost
        fields = [
            'title', 'description', 'skills_required',
            'job_type', 'location', 'is_remote',
            'salary_min', 'salary_max',
            'category', 'expires_at'
        ]