from django.db import models

# Create your models here.


class BlackListProducts(models.Model):

    asin = models.CharField(max_length=32, db_index=True)
    ean = models.CharField(max_length=32, db_index=True)
    marketplace = models.CharField(max_length=32)
    isDelete = models.SmallIntegerField(default=0, db_index=True)

    class Meta:
        db_table = "blacklist_products"
        unique_together = ['asin', 'ean', 'marketplace']


# class CatalogList(models.Model):

#     asin = models.CharField(max_length=)