# from .code_templates.code_config import template_code,\
#     input_df, expected_df, pyspark_header_files
from .code_templates.code_template_1 import template_code, pyspark_header_files
import subprocess
import os
import json
from .code_test_utility.test_utility import test_output_results

# BASE_PATH = "/Users/pramitigoel/practice_projects/de_learn_code/de_code_submit/output"
BASE_PATH = "/app/artifacts"


def create_user_code(user_code, sample_input_json, sample_solution_json, user_path):
    # Combine user code with template code
    print("sample solution json", sample_solution_json)
    combined_code = template_code.format(user_code=user_code,
                                         pyspark_header_files=pyspark_header_files,
                                         input_json=sample_input_json,
                                         expected_json=sample_solution_json,
                                         user_path=user_path)

    return combined_code


def create_directory_and_write_user_code(code, temp_filename, user_dir_path):
    # Unique directory for user code
    script_file_path = f"{user_dir_path}/{temp_filename}"
    print(f"Creating directory {user_dir_path}")
    print(f"Writing user script file to {script_file_path}")
    try:
        os.makedirs(user_dir_path, exist_ok=True)
        with open(script_file_path, "w") as f:
            f.write(code)
    except Exception as e:
        return print(str(e))


def get_user_dir_path(user_dir):
    return f"{BASE_PATH}/{user_dir}"


def execute_code(framework_language, code, temp_filename, user_dir):
    # Save the code to a file
    user_dir_path = get_user_dir_path(user_dir)
    create_directory_and_write_user_code(code, temp_filename, user_dir_path)

    # Spin up a Docker container and run Spark job
    try:
        if framework_language == "spark-batch-python":
            # Run PySpark code
            try:
                # command = [
                #     "docker", "run",
                #     "-v", f"{BASE_PATH}/{user_dir}:/app/",
                #     "apache/spark-py",
                #     "/opt/spark/bin/spark-submit", f"/app/{temp_filename}"
                # ]


                # Client Mode submission
                command = [
                    "spark-submit",
                    "--master", "k8s://https://kubernetes.docker.internal:6443",
                    "--deploy-mode", "client",
                    "--name", "spark-job",
                    "--conf", "spark.kubernetes.container.image=apache/spark-py:v3.4.0",
                    "--conf", "spark.kubernetes.authenticate.submission.oauthTokenFile=/var/run/secrets/kubernetes.io/serviceaccount/token",
                    "--conf", "spark.driver.host=sparkdriver.default.svc.cluster.local",
                    f"local://{user_dir_path}/{temp_filename}"
                ]

                # Local Mode submission
                # command = [
                #     "spark-submit",
                #     "--master", "local",
                #     f"local://{user_dir_path}/{temp_filename}"
                # ]

                print("command: ", command)
                result = subprocess.check_output(command).decode('utf-8')
                print(f"Spark job ran successfully")
                return result
            except subprocess.CalledProcessError as e:
                print(f"Command returned non-zero exit status {e.returncode}.")
                print("Error output:\n", e.output.decode('utf-8'))
                #os.remove(f"{user_dir_path}/{temp_filename}")
                return str(e)
                # return JsonResponse({'error': str(e)}, status=500)
        elif framework_language == "scala":
            # Run Scala-Spark code
            command = ["spark-shell", "-i", temp_filename]
            result = subprocess.run(command, capture_output=True, text=True)

        else:
            return "Invalid language specified."

        # Return the output
        return result

    except Exception as e:
        return str(e)

    # finally:
    # Clean up the script file
    # subprocess.run(["rm", script_file], capture_output=True)


def get_result_of_the_job(user_dir, expected_output_json):
    user_dir_path = get_user_dir_path(user_dir)
    output_file_path = f'{user_dir_path}/result_message.txt'
    # script_file_path = f"{user_dir_path}{temp_filename}"

    try:
        # Check if the file exists
        if os.path.exists(output_file_path):
            print(f"The file '{output_file_path}' is present. Reading for comparison")
            collected_data = []
            with open(f'{user_dir_path}/result_message.txt', 'r') as result_file:
                user_output = json.load(result_file)
                collected_data.extend(user_output)
            print("user_output ", collected_data)

            result_message, mismatched_data = test_output_results(collected_data, expected_output_json)
            response = {
                'result_message': result_message,
                'mismatched_data': mismatched_data
            }
            return response
    except Exception as e:
        print(e)
        return str(e)

    #mismatched_data_folder = f'{user_dir_path}/output1'  # Replace with the actual folder path
    # Find the CSV file within the mismatched_data folder
    # Read the CSV file content
    # mismatched_json_data = []
    # if result_message == "Result has not matched":
    #     op_mismatch_file_path = None
    #     for filename in os.listdir(mismatched_data_folder):
    #         if filename.endswith('.json'):
    #             op_mismatch_file_path = os.path.join(mismatched_data_folder, filename)
    #             break
    #
    #
    #     print("mismatched files", op_mismatch_file_path)
    #     if op_mismatch_file_path:
    #         with open(op_mismatch_file_path, 'r') as json_file:
    #             for line in json_file:
    #                 # Parse the JSON object from the line and append to the list
    #                 # data_list.append(json.loads(line.strip()))
    #                 # print(line.strip())
    #                 mismatched_json_data.append(json.loads(line.strip()))
    #     print(mismatched_json_data)
    response = {
        'result_message': "no output",
        'mismatched_data': "no output"
    }
    return response


if __name__ == '__main__':
    get_result_of_the_job("fddf5e59-3d53-427b-97ca-4517e21d8659")
    # try:
    #     output = subprocess.check_output(
    #         [
    #             "docker", "run",
    #             "-v", f"{temp_filename}:/app/user_code.py",
    #             "spark_image_name",
    #             "spark-submit", "/app/user_code.py"
    #         ]
    #     ).decode('utf-8')
    #     os.remove(temp_filename)
    #     return JsonResponse({'result': output})
    # except subprocess.CalledProcessError as e:
    #     os.remove(temp_filename)
    #     return JsonResponse({'error': str(e)}, status=500)

# command = ["/Users/pramitigoel/Documents/tools/spark-3.2.4-bin-hadoop3.2/bin/spark-submit", "--master",
#            "local[*]", script_file]
# f"docker run -it -v  /Users/pramitigoel/practice_projects/de_learn_code/de_code_submit:/home/ apache/spark-py " \
# "/opt/spark/bin/spark-submit {temp_filename}} "
# result = subprocess.run(command, shell=True, capture_output=True, text=True)


# def get_status_of_job_log(result):
#     try:
#         with open('/path/to/logfile.txt', 'r') as log_file:
#             status = log_file.read().strip()
#             return JsonResponse({"status": status})
#     except FileNotFoundError:
#         return JsonResponse({"status": "unknown"})
