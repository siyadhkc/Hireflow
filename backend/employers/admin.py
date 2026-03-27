from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Company


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ['name', 'owner', 'is_verified', 'location', 'created_at']
    list_filter = ['is_verified']
    search_fields = ['name', 'owner__email']