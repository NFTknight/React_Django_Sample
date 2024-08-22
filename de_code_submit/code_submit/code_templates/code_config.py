
pyspark_header_files = """
from pyspark.sql import SparkSession
from pyspark.sql import functions as F
from pyspark.sql import Window as W
import pyspark
import datetime
import json
from pyspark.sql import SparkSession
from pyspark.sql.types import IntegerType, StringType, StructField, StructType

spark = SparkSession.builder.appName('run-pyspark-code').getOrCreate()

# Create a SparkSession
spark = SparkSession.builder.getOrCreate()
    """

input_df = """
# Define the schema for the DataFrame
schema = StructType([
    StructField("video_id", IntegerType(), True),
    StructField("title", StringType(), True),
    StructField("genre", StringType(), True),
    StructField("release_year", IntegerType(), True),
    StructField("duration", IntegerType(), True),
    StructField("view_count", IntegerType(), True)
])

# Define the data for the DataFrame
data = [
    (1, "Amazing Adventure", "Action", 2020, 120, 2500000),
    (2, "Sci-fi World", "Sci-fi", 2018, 140, 800000),
    (3, "Mysterious Island", "Drama", 2022, 115, 1500000),
    (4, "Uncharted Realms", "Action", 2019, 134, 3200000),
    (5, "Journey to the Stars", "Sci-fi", 2021, 128, 1100000)
]

# Create the DataFrame
input_df = spark.createDataFrame(data, schema)
"""

expected_df = """
# Define the data for the DataFrame
final_data = [
    (1, "Amazing Adventure", "Action", 2020, 120, 2500000),
    (2, "Sci-fi World", "Sci-fi", 2018, 140, 800000),
    (3, "Mysterious Island", "Drama", 2022, 115, 1500000),
    (4, "Uncharted Realms", "Action", 2019, 134, 3200000),
    (5, "Journey to the Stars", "Sci-fi", 2021, 128, 1100000)
]


# Create the DataFrame
expected_df = spark.createDataFrame(data, schema)
"""

# Template code to append
template_code = '''
{pyspark_header_files}

{input_df}

{expected_df}

# User code appended below
{user_code}

# More template code here

result = etl(input_df)
result.show()

'''
