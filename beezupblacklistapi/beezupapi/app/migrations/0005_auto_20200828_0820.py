# Generated by Django 3.1 on 2020-08-28 01:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_auto_20200828_0723'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blacklistproducts',
            name='asin',
            field=models.CharField(db_index=True, max_length=32),
        ),
        migrations.AlterField(
            model_name='blacklistproducts',
            name='ean',
            field=models.CharField(db_index=True, max_length=32),
        ),
    ]