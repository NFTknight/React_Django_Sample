import json
from pyspark.sql import Row
from deepdiff import DeepDiff
# import output  # Importing the output.py file


# Convert collected_data to a JSON-compatible format

def test_code(output_json, expected_json):
    #compare the output_json and expected_json
    #return #result_message as passed or not

    if output_json == expected_json:
        result_message = "Result is matched"
    else:
        # Write the DataFrame to a CSV file
        result_message = "Result has not matched"

    return result_message


def test_output_results(user_output, expected_output):

    print("inside test utility")
    print("inside test utility user_output: ", user_output)
    print("inside test utility expected_output: ", expected_output)

    # Load expected JSON output
    #with open('expected_output.json', 'r') as f:
    expected_json = json.loads(expected_output)
    print("inside test utility after user_output: ", user_output)
    print("inside test utility after expected_output: ", expected_output)
    # Compare the collected JSON and expected JSON
    diff = DeepDiff(user_output, expected_json, ignore_order=True)

    if not diff:
        print("The outputs match.")
        result_message = "Result is matched"
    else:
        print("The outputs do not match. Differences:")
        result_message = "Result has not matched"
        print(diff)

    return result_message, diff
