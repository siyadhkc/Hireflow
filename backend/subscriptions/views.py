from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import SubscriptionPlan, EmployerSubscription
from .serializers import SubscriptionPlanSerializer, EmployerSubscriptionSerializer
from employers.models import Company
from datetime import datetime, timedelta


class SubscriptionPlanListView(generics.ListAPIView):
    queryset = SubscriptionPlan.objects.filter(is_active=True)
    serializer_class = SubscriptionPlanSerializer
    permission_classes = [AllowAny]


class MySubscriptionView(generics.RetrieveAPIView):
    serializer_class = EmployerSubscriptionSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return EmployerSubscription.objects.filter(
            company__owner=self.request.user,
            is_active=True
        ).latest('created_at')


class SubscribeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        plan_id = request.data.get('plan_id')

        try:
            company = Company.objects.get(owner=request.user)
            plan = SubscriptionPlan.objects.get(id=plan_id, is_active=True)
        except Company.DoesNotExist:
            return Response(
                {'error': 'Create a company profile first'},
                status=status.HTTP_400_BAD_REQUEST
            )
        except SubscriptionPlan.DoesNotExist:
            return Response(
                {'error': 'Invalid plan'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Deactivate existing subscriptions
        EmployerSubscription.objects.filter(
            company=company,
            is_active=True
        ).update(is_active=False)

        # Create new subscription
        subscription = EmployerSubscription.objects.create(
            company=company,
            plan=plan,
            is_active=True,
            start_date=datetime.now(),
            end_date=datetime.now() + timedelta(days=plan.duration_days)
        )

        return Response(
            EmployerSubscriptionSerializer(subscription).data,
            status=status.HTTP_201_CREATED
        )