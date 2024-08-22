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

# Template code to append
template_code = '''
{pyspark_header_files}

input_json_data = {input_json}

# Create the DataFrame
input_df = spark.createDataFrame(input_json_data)

expected_json_data = {expected_json}

# Create the DataFrame
expected_df = spark.createDataFrame(expected_json_data)

# User code appended below
{user_code}

# More template code here

result_df = etl(input_df)
result_df.show()
user_output_collected_data = result_df.collect()
print("df output", user_output_collected_data)

# Convert Row objects to dictionaries
output_json_data = [row.asDict() for row in user_output_collected_data]

# Save the result message to a file
with open("/app/artifacts/{user_path}/result_message.txt", "w") as result_file:
        json.dump(output_json_data, result_file, indent=4)
        
#for row in user_output_collected_data:
#print("final output", row)
#result_file.write(f"    {{row}} \\n")

'''
