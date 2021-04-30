from django.shortcuts import render
from django.core import serializers
from django.core.paginator import Paginator

# Create your views here.

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework import status 
from .models import *
from .serializers import *
from django.db import transaction, connection
import traceback

@api_view(['POST', 'DELETE'])
def BlackListView(request):
    if request.method == "POST":
        try:
            jsonData = request.data['data']
            if jsonData:
                dataList = []
                cursor = connection.cursor()
                for i in jsonData:
                    dataList.append((i['asin'], i['ean'], i['marketplace']))

                stmt = """ INSERT INTO blacklist_products (asin, ean, marketplace) 
                        VALUES (%s, %s, %s) ON DUPLICATE KEY UPDATE isDelete=0;
                    """
                cursor.executemany(stmt, dataList)
                connection.commit()
                cursor.close()
                return Response({ "success" : 1, "message" : "Successfuly saved!" }, status=status.HTTP_201_CREATED)
            else:
                return Response({ "success" : 1, "message" : "Empty data" }, status=status.HTTP_201_CREATED)

        except Exception as ex:
            print(repr(ex))
            return Response({ "success" : 0, "message" : "Internal Server Error" }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == "DELETE":

        try:
            blacklist = BlackListProducts.objects.filter(isDelete=0)
            if blacklist:
                blacklist.update(isDelete=1)

            return Response({"success" : 1, "message" : "Successfully Deleted" }, status=status.HTTP_200_OK)

        except Exception as ex:
            return Response({"success" : 0, "message" : "Internal Server Error" }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            print(traceback.format_exc())


@api_view(['GET', 'DELETE'])
def BlackListProductView(request, pk):

    if request.method == "GET":
        item = BlackListProducts.objects.values("id", "asin", "ean", "marketplace").filter(asin=pk)
        if item:
            print("item")
            return  Response({"success": 1, "data" : item}, status=status.HTTP_200_OK)
        else:
            item = BlackListProducts.objects.values("id", "asin", "ean", "marketplace").filter(ean=pk)
            if item:
                return  Response({"success": 1, "data" : item}, status=status.HTTP_200_OK)
            else:
                return  Response({"success": 0, "data" : {}}, status=status.HTTP_200_OK)

    elif request.method == "DELETE":
        try:
            item = BlackListProducts.objects.filter(id=pk)
            if item:
                item.update(isDelete=1)
                return  Response("Successully Deleted", status=status.HTTP_200_OK)
            else:
                return  Response("Can not find catalog", status=status.HTTP_200_OK)

        except:
            return  Response("Internal Server Errro", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            print(traceback.format_exc())


@api_view(['GET'])
def BlackListProductPageView(request, page):
    pageSize = 50
    totalCount = BlackListProducts.objects.filter(isDelete=0).count()
    blackList = BlackListProducts.objects.values("id", "asin", "ean", "marketplace").filter(isDelete=0).order_by("id")
    paginator = Paginator(blackList, pageSize)

    try:
        blacklistPage = paginator.page(page)
        return Response({ "success" : 1 , "totalrecords" : totalCount, "currentPage": page,  "data" : list(blacklistPage)}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({ "success" : 1 , "data" : []}, status=status.HTTP_200_OK)

