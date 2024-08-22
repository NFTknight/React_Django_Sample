from .models import Question
import json
from pandas import DataFrame


# serialise
def store_dataframe(df):
    # Assume 'df' is your dataframe
    df_json = df.to_json(orient='records')  # Convert dataframe to JSON
    return df_json


# deserialize
def create_solution(df_json):
    data_entry = Question.objects.create(solution=df_json)
    return data_entry


# deserialise
def retrieve_dataframe(df_json):
    df = DataFrame.from_records(json.loads(df_json))
    return df
