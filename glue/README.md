# glue

provisions a glue database and table

## Deploy and Run

1. build and deploy
    ```sh
    npm run build
    cdk deploy
    ```
1. visit glue in console to find out the bucket location for the `my_table` table
1. create a new folder in the location named "year=2019"
1. copy files in table-data to `year=2019` folder
1. visit athena in console and run the following to add and load 2019 partition
    ```sql
    ALTER TABLE my_table ADD PARTITION (year = 2019)
    MSCK REPAIR TABLE my_table
    ```
1. run the following query in athena
    ```sql
    SELECT * FROM "my_database"."my_table" limit 10
    ```

**screenshots**

![](https://www.evernote.com/l/AAFiGSGvuB1ALaHGqRYHAI8O7YgztK8klZwB/image.png)

![](https://www.evernote.com/l/AAF_ohcSKYNPdalH9pY7YfT_gh4y0KpFSy0B/image.png)