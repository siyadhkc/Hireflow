from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import JobCategory, JobPost


@admin.register(JobCategory)
class JobCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'created_at']
    search_fields = ['name']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(JobPost)
class JobPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'company', 'job_type', 'status', 'is_remote', 'created_at']
    list_filter = ['status', 'job_type', 'is_remote']
    search_fields = ['title', 'company__name']