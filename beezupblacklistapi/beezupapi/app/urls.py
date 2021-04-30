from django.urls import  path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

urlpatterns = [
     path("blacklist-prodcucts", BlackListView ),
     path("blacklist-prodcucts/<str:pk>", BlackListProductView ),
     path("blacklist-prodcucts/page/<int:page>", BlackListProductPageView )
]

urlpatterns = format_suffix_patterns(urlpatterns)