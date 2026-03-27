from rest_framework import serializers
from .models import Company


class CompanySerializer(serializers.ModelSerializer):
    owner_name = serializers.CharField(source='owner.full_name', read_only=True)
    owner_email = serializers.CharField(source='owner.email', read_only=True)

    class Meta:
        model = Company
        fields = [
            'id', 'name', 'logo', 'website',
            'description', 'location', 'is_verified',
            'owner', 'owner_name', 'owner_email',
            'created_at'
        ]
        read_only_fields = ['id', 'owner', 'is_verified', 'created_at']