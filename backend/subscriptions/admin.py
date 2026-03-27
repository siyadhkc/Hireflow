from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import SubscriptionPlan, EmployerSubscription


@admin.register(SubscriptionPlan)
class SubscriptionPlanAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'job_post_limit', 'duration_days', 'is_active']
    list_filter = ['is_active']


@admin.register(EmployerSubscription)
class EmployerSubscriptionAdmin(admin.ModelAdmin):
    list_display = ['company', 'plan', 'is_active', 'start_date', 'end_date']
    list_filter = ['is_active']