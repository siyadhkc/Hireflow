

# Create your views here.
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import PermissionDenied
from .models import Company
from .serializers import CompanySerializer


class CompanyListView(generics.ListAPIView):
    queryset = Company.objects.select_related('owner')
    serializer_class = CompanySerializer
    permission_classes = [AllowAny]


class CompanyCreateView(generics.CreateAPIView):
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        if not self.request.user.is_employer:
            raise PermissionDenied('Only employers can create a company')
        serializer.save(owner=self.request.user)


class CompanyDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return Company.objects.get(owner=self.request.user)