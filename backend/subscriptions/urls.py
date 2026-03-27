from django.urls import path
from .views import SubscriptionPlanListView, MySubscriptionView, SubscribeView

urlpatterns = [
    path('plans/', SubscriptionPlanListView.as_view(), name='subscription-plans'),
    path('my-subscription/', MySubscriptionView.as_view(), name='my-subscription'),
    path('subscribe/', SubscribeView.as_view(), name='subscribe'),
]