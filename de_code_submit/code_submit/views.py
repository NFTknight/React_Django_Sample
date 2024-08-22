from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import *
from django.http import JsonResponse
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from .utils import *
from question_service.models import Question, FrameworkLanguage, TestCase
from django.shortcuts import get_object_or_404
import uuid



@api_view(('POST',))
@renderer_classes((JSONRenderer,))
def submit_code(request):
    serializer_class = CodeSubmissionSerializer
    # print(request.POST)

    if request.method == 'POST':
        language_obj = request.data.get('language')
        framework_obj = request.data.get('framework')
        code_text = request.data.get('code')
        question_id = request.data.get('question_id')
        user_id = request.user.id

        print("language id, questionId, framework_id, user_id", language_obj, question_id, framework_obj['id'], user_id)
        # for given q, give framework_language, run the code
        # Fetch the question based on the question_id
        question = get_object_or_404(Question, pk=question_id)

        # Check if the question is related to the provided framework and language
        framework_language_obj = get_object_or_404(FrameworkLanguage, framework_id=framework_obj['id'],
                                                   language_id=language_obj['id'])

        if framework_language_obj not in question.framework_languages.all():
            return JsonResponse({'error': 'Invalid framework and language combination for this question'}, status=400)

        # Create a unique temporary file for the user's code
        # Fetch the test cases related to the question
        test_cases = TestCase.objects.filter(question=question)
        user_dir = f"{uuid.uuid4()}"
        for testcase in test_cases:
            print(testcase.input, testcase.solution)
            temp_filename = f"code_{user_dir}_{question.id}_{testcase.id}.py"

            code_to_be_executed = create_user_code(code_text, testcase.input,
                                                   testcase.solution, user_dir)
            print(code_to_be_executed, framework_language_obj.framework_language)
            code_result = execute_code(framework_language_obj.framework_language,
                                       code_to_be_executed,
                                       temp_filename,
                                       user_dir)
            json_response = get_result_of_the_job(user_dir, testcase.solution)
            print(code_result)
            # Pass the code result to the template
            # context = {
            #     'code_result': code_result,
            # }
            # return render(request, 'submitter/code_results.html', context)
            # handle_uploaded_file(form.cleaned_data["language"])
            # return HttpResponseRedirect(reverse("submitter:code_results"))

            # Save the code in the database or perform any desired actions
            return JsonResponse({'success': True, 'result': json_response})
        else:
            return JsonResponse(
                {'success': False, 'error': 'Invalid request method', 'result': 'Invalid request method'})


