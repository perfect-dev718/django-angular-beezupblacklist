#Db creation Note

    - SET idDelete default is 0
    - manage.py migrate 

#API List

- Get blacklist by page: 
    Methog : GET
    api/blacklist-prodcucts/{page}
    page : int

    Response: 
        {
    "success": 1,
    "totalrecords": 3,
    "currentPage": 1,
    "data": [
        {
        "id": 1,
        "asin": "B12345sdfs6",
        "ean": "h",
        "marketplace": "CDISCOUNT"
        },
        {
        "id": 2,
        "asin": "B12f34sds56",
        "ean": "1234567s891234",
        "marketplace": "CDISCOdUNT"
        },
        {
        "id": 3,
        "asin": "B1f2dsfd3456",
        "ean": "12345678s91234",
        "marketplace": "CDISCOUNT"
        }
    ]
    }

- Add New blacklist
    Method : POST
    api/blacklist-prodcucts
    post data 
    {
    "data" : [ 
        { "asin": "B12345s6", "ean": "", "marketplace": "CDISCOUNT"},
        { "asin": "B12f34s56", "ean": "1234567s891234", "marketplace": "CDISCOdUNT"},
        { "asin": "B1f23456", "ean": "12345678s91234", "marketplace": "CDISCOUNT"} 
    ]
    }
- GET One blacklist Item
    Method : GET
    api/blacklist-prodcucts/{id}

- Delete blacklist prodcuct
    Method : Delete
    api/blacklist-prodcucts/{id}

- Delete All
    Method : Delete
    api/blacklist-prodcucts
