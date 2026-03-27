from rest_framework import serializers
from .models import Application


class ApplicationSerializer(serializers.ModelSerializer):
    job_title = serializers.CharField(source='job.title', read_only=True)
    company_name = serializers.CharField(source='job.company.name', read_only=True)
    applicant_name = serializers.CharField(source='applicant.full_name', read_only=True)
    applicant_email = serializers.CharField(source='applicant.email', read_only=True)

    class Meta:
        model = Application
        fields = [
            'id', 'job', 'job_title', 'company_name',
            'applicant', 'applicant_name', 'applicant_email',
            'cover_letter', 'status', 'applied_at'
        ]
        read_only_fields = ['id', 'applicant', 'status', 'applied_at']


class ApplicationStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['id', 'status']