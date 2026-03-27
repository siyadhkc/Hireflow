from rest_framework import serializers
from .models import SubscriptionPlan, EmployerSubscription


class SubscriptionPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionPlan
        fields = ['id', 'name', 'price', 'job_post_limit', 'duration_days', 'features']


class EmployerSubscriptionSerializer(serializers.ModelSerializer):
    plan_name = serializers.CharField(source='plan.name', read_only=True)
    plan_price = serializers.DecimalField(source='plan.price', max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = EmployerSubscription
        fields = [
            'id', 'plan', 'plan_name', 'plan_price',
            'is_active', 'start_date', 'end_date', 'created_at'
        ]
        read_only_fields = ['id', 'is_active', 'start_date', 'end_date', 'created_at']