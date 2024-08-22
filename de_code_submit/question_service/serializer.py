from rest_framework import serializers
from .models import Question, TestCase, FrameworkLanguage, Language, Framework, Tag
from django.core.exceptions import ObjectDoesNotExist
import logging

logger = logging.getLogger(__name__)


class TestCaseSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False, read_only=True)  # Add this line

    class Meta:
        model = TestCase
        fields = ['id', 'created_at', 'input', 'solution']
        extra_kwargs = {'question': {'required': False}}


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = '__all__'


class FrameworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Framework
        fields = '__all__'


class FrameworkLanguageSerializer(serializers.ModelSerializer):
    framework = FrameworkSerializer()
    language = LanguageSerializer()

    class Meta:
        model = FrameworkLanguage
        fields = ['id', 'framework', 'language', 'skeleton_code']

    def validate(self, data):
        print("Data in validate method:", data)
        # Perform additional validations if necessary
        return data

    def create(self, validated_data):
        try:
            print("framework_language serializer", validated_data)

            # Since 'framework' and 'language' are nested, they will be popped out
            # of validated_data, so we don't need to remove them manually here
            framework_data = validated_data.pop('framework')
            language_data = validated_data.pop('language')
            skeleton_code = validated_data.pop('skeleton_code')

            # Get or create the Framework and Language instances
            framework, _ = Framework.objects.get_or_create(**framework_data)
            language, _ = Language.objects.get_or_create(**language_data)

            # Create or get the FrameworkLanguage instance
            fl, created = FrameworkLanguage.objects.get_or_create(
                id=validated_data.get('id'),  # Use the 'id' if provided
                framework=framework,
                language=language,
                skeleton_code=skeleton_code,
            )
            return fl
        except ObjectDoesNotExist as e:
            raise serializers.ValidationError(str(e))
        except KeyError as e:
            raise serializers.ValidationError(f"Key error: {e}")


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

    def create(self, validated_data):
        logger.debug(f"Creating a new tag with data: {validated_data}")
        return super().create(validated_data)

    def update(self, instance, validated_data):
        logger.debug(f"Updating tag: {instance} with data: {validated_data}")
        return super().update(instance, validated_data)

    def validate_name(self, value):
        logger.debug(f"Validating tag name: {value}")
        # Add any custom validation logic for the name here
        return value


class QuestionSerializer(serializers.ModelSerializer):
    framework_languages = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=FrameworkLanguage.objects.all(),
        write_only=True
    )
    framework_languages_detail = serializers.SerializerMethodField(read_only=True)
    test_cases = TestCaseSerializer(many=True)
    tags = TagSerializer(many=True)
    user_submission_status = serializers.CharField(required=False, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'question_name', 'description', 'created_at', 'difficulty', 'is_premium', 'framework_languages',
                  'framework_languages_detail', 'tags', 'test_cases', 'user_submission_status', 'solution', 'skeleton_code']

    def create(self, validated_data):
        print("validated_data", validated_data)
        test_cases_data = validated_data.pop('test_cases', [])
        framework_language_data = validated_data.pop('framework_languages', [])
        tags_data = validated_data.pop('tags', [])
        # is_premium = validated_data.get('is_premium', True)
        # difficulty = validated_data.get('difficulty', "easy")

        print("framework_language_data", framework_language_data)

        question = Question.objects.create(**validated_data)

        self._create_test_cases(test_cases_data, question)
        question.framework_languages.set(framework_language_data)
        self._create_tags(question, tags_data)

        return question

    def update(self, instance, validated_data):
        print("Request data in update view:", validated_data)
        test_cases_data = validated_data.pop('test_cases', None)
        framework_language_ids = validated_data.pop('framework_languages', None)
        instance.is_premium = validated_data.get('is_premium', instance.is_premium)
        instance.difficulty = validated_data.get('difficulty', instance.difficulty)
        instance.question_name = validated_data.get('question_name', instance.question_name)
        instance.description = validated_data.get('description', instance.description)
        instance.solution = validated_data.get('solution', instance.solution)
        instance.skeleton_code = validated_data.get('skeleton_code', instance.skeleton_code)


        # tags_data = validated_data.pop('tags', None)

        if test_cases_data is not None:
            self._update_test_cases(test_cases_data, instance)

        if framework_language_ids is not None:
            instance.framework_languages.set(framework_language_ids)

        # if tags_data is not None:
        #    self._update_tags(tags_data, instance)
        instance.save()
        return instance

    def _create_test_cases(self, test_cases_data, question):
        for test_case_data in test_cases_data:
            TestCase.objects.create(question=question, **test_case_data)

    # def _update_test_cases(self, test_cases_data, question):
    #     for test_case_data in test_cases_data:
    #         test_case_id = test_case_data.get('id', None)
    #         # Remove 'question' key if it exists in test_case_data else fail with error create() got multiple values
    #         test_case_data.pop('question', None)
    #         if test_case_id:
    #             test_case = TestCase.objects.filter(id=test_case_id, question=question).first()
    #             if test_case:
    #                 for field, value in test_case_data.items():
    #                     setattr(test_case, field, value)
    #                 test_case.save()
    #         else:
    #             print(question)
    #             TestCase.objects.create(question=question, **test_case_data)

    def _update_test_cases(self, test_cases_data, question):
        existing_ids = set(TestCase.objects.filter(question=question).values_list('id', flat=True))
        submitted_ids = set()

        for test_case_data in test_cases_data:
            test_case_id = test_case_data.get('id')
            print("test_case_id :", test_case_id)

            if test_case_id:
                test_case = TestCase.objects.get(id=test_case_id, question=question)
                for field, value in test_case_data.items():
                    setattr(test_case, field, value)
                test_case.save()
                submitted_ids.add(test_case_id)
            else:
                TestCase.objects.create(question=question, **test_case_data)

        # Optional: Delete test cases that were removed
        for test_case_id in existing_ids - submitted_ids:
            TestCase.objects.get(id=test_case_id).delete()

    def _create_tags(self, question, tags_data):
        new_tags = set()
        if not tags_data:
            tags_data = []
        #print(f"tags_data: {tags_data} (type: {type(tags_data)})")

        for tag_data in tags_data:
            tag_name = tag_data.get('name')
            # Check if a tag with this name already exists
            tag, created = Tag.objects.get_or_create(name=tag_name)
            new_tags.add(tag)

        # Set the new tags to the question
        question.tags.set(new_tags)

    def get_framework_languages_detail(self, obj):
        framework_languages = obj.framework_languages.all()
        return FrameworkLanguageSerializer(framework_languages, many=True).data

# class QuestionSerializer(serializers.ModelSerializer):
#     test_cases = TestCaseSerializer(many=True)
#     # framework_languages = serializers.PrimaryKeyRelatedField(many=True, queryset=FrameworkLanguage.objects.all())
#     framework_languages = FrameworkLanguageSerializer(many=True)
#     user_submission_status = serializers.CharField(required=False, default='todo', read_only=True)
#     tags = TagSerializer(many=True)
#
#     class Meta:
#         model = Question
#         fields = '__all__'  # Consider specifying fields explicitly
#
#     def create(self, validated_data):
#
#         print("validated_data", validated_data)
#         test_cases_data = validated_data.pop('test_cases', [])
#         framework_language_data = validated_data.pop('framework_languages', [])
#         tags_data = validated_data.pop('tags', [])
#         print("framework_language_data", framework_language_data)
#
#         question = Question.objects.create(**validated_data)
#         # question.framework_languages.set(FrameworkLanguage.objects.filter(id__in=framework_language_ids))
#
#         self._create_test_cases(test_cases_data, question)
#         self._set_framework_languages(framework_language_data, question)
#         # self._update_tags(question, tags_data)
#
#         return question
#
#     def update(self, instance, validated_data):
#         test_cases_data = validated_data.pop('test_cases', None)
#         framework_language_ids = validated_data.pop('framework_languages', None)
#
#         for attr, value in validated_data.items():
#             setattr(instance, attr, value)
#         instance.save()
#
#         if test_cases_data is not None:
#             self._update_test_cases(test_cases_data, instance)
#
#         if framework_language_ids is not None:
#             # instance.framework_languages.set(FrameworkLanguage.objects.filter(id__in=framework_language_ids))
#             self._set_framework_languages(framework_language_ids, instance)
#
#         if 'tags' in validated_data:
#             tags_data = validated_data.pop('tags')
#             self._update_tags(instance, tags_data)
#
#         return instance
#
#     def _create_test_cases(self, test_cases_data, question):
#         for test_case_data in test_cases_data:
#             TestCase.objects.create(question=question, **test_case_data)
#
#     def _update_test_cases(self, test_cases_data, question):
#         for test_case_data in test_cases_data:
#             test_case_id = test_case_data.get('id', None)
#             if test_case_id:
#                 test_case = TestCase.objects.filter(id=test_case_id, question=question).first()
#                 if test_case:
#                     for field, value in test_case_data.items():
#                         setattr(test_case, field, value)
#                     test_case.save()
#             else:
#                 TestCase.objects.create(question=question, **test_case_data)
#
#     # def _set_framework_languages(self, framework_language_ids, question):
#     #    framework_languages = FrameworkLanguage.objects.filter(id__in=framework_language_ids)
#     #    question.framework_languages.set(framework_languages)
#
#     def _set_framework_languages(self, framework_languages_data, question):
#         # Ensure IDs are integers
#         # Link existing FrameworkLanguage instances
#         for fl_data in framework_languages_data:
#             fl_serializer = FrameworkLanguageSerializer(data=fl_data)
#             if fl_serializer.is_valid(raise_exception=True):
#                 fl_instance = fl_serializer.save()
#                 question.framework_languages.add(fl_instance)
#
#     def _update_tags(self, question, tags_data):
#         for tag_data in tags_data:
#             tag_name = tag_data.get('name')
#             print("tag_name", tag_name)
#             tag, created = Tag.objects.get_or_create(name=tag_name)
#             question.tags.add(tag)
#
#     def validate_framework_languages(self, value):
#         # value is the data passed to the framework_languages field
#         # Add your custom validation logic here
#
#         # Debugging: Print or log the value to see what it contains
#         print("Framework languages received for validation:", value)
#
#         # Example validation logic (you can modify it as per your requirements)
#         for framework_language_data in value:
#             # Check if the necessary keys exist
#             if 'framework' not in framework_language_data or 'language' not in framework_language_data:
#                 raise serializers.ValidationError(
#                     "Each framework_language item must contain 'framework', and 'language'.")
#
#             # Further validation logic can be added here as needed
#
#         # Return the validated data
#         return value

# class QuestionSerializer(serializers.ModelSerializer):
#     test_cases = TestCaseSerializer(many=True)
#     framework_languages = FrameworkLanguageSerializer(many=True)
#     user_submission_status = serializers.CharField(required=False, default='todo')
#     tags = TagSerializer(many=True, read_only=True)
#
#     class Meta:
#         model = Question
#         fields = '__all__'
#         # fields = ['id', 'description', 'question_name', 'difficulty', 'tags', 'test_cases', 'framework_languages']
#
#     def create(self, validated_data):
#         test_cases_data = validated_data.pop('test_cases', [])
#         framework_languages_data = validated_data.pop('framework_languages', [])
#
#         question = Question.objects.create(**validated_data)
#
#         for test_case_data in test_cases_data:
#             TestCase.objects.create(question=question, **test_case_data)
#
#         for framework_language_id in framework_languages_data:
#             framework_language = FrameworkLanguage.objects.get(id=framework_language_id)
#             question.framework_languages.add(framework_language)
#
#     def update(self, instance, validated_data):
#         instance.question_name = validated_data.get('question_name', instance.question_name)
#         # Update other fields similarly...
#
#         if 'test_cases' in validated_data:
#             test_cases_data = validated_data.pop('test_cases')
#             for test_case_data in test_cases_data:
#                 test_case_id = test_case_data.get('id', None)
#                 if test_case_id:
#                     test_case = TestCase.objects.get(id=test_case_id, question=instance)
#                     for field, value in test_case_data.items():
#                         setattr(test_case, field, value)
#                     test_case.save()
#                 else:
#                     TestCase.objects.create(question=instance, **test_case_data)
#
#         if 'framework_languages' in validated_data:
#             framework_languages = validated_data.pop('framework_languages')
#             instance.framework_languages.set(framework_languages)
#
#         instance.save()
#         return instance
