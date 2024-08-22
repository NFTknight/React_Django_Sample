import axios from 'axios';
import React, { useState, useEffect } from 'react'
import './questionForm.css';
import ReactSelect from 'react-select';
// import Select from 'react-select';
import { useParams, useNavigate } from 'react-router-dom';




const QuestionForm = ({ questionData }) => {
  const [question, setQuestion] = useState(questionData || { test_cases: [{}] });
  // State for storing framework languages
  const [frameworkLanguages, setFrameworkLanguages] = useState([]);
  // State for storing selected languages
  const [selectedFrameworkLanguages, setSelectedFrameworkLanguages] = useState([]);

  const [selectedSkeletonCode, setSelectedSkeletonCode] = useState([]);

  // Map the framework languages to a format suitable for React Select
  const frameworkLanguageOptions = frameworkLanguages.map(fl => ({
    value: fl.id,
    label: `${fl.framework.name} - ${fl.language.name}`,
    skeletonCode: fl.skeleton_code 
  }));
  const [tags, setTags] = useState(questionData ? questionData.tags : []);
  const [newTag, setNewTag] = useState('');
  const { id } = useParams(); // Used for update to get the question ID from the URL
  const isUpdate = id != null; // Determine if it's an update form based on the URL
  const [message, setMessage] = useState(null); // State for success message
  const [error, setError] = useState(null);     // State for error message
  
  const navigate = useNavigate();


  const API_URL = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    withCredentials: true,
  });
  
  const createQuestion = data => API_URL.post(`/api/questions/`, data);
  const updateQuestion = (id, questionData) => API_URL.put(`/api/questions/${id}/`, questionData);


  // In your Axios service file
  const getFrameworkLanguages = () => {
    return API_URL.get('/api/frameworklanguages/');
  };

  const parseFrameworkLanguage = (label) => {
    const [frameworkName, languageName] = label.split(' - ');
    return { frameworkName, languageName };
  };

  const transformedFrameworkLanguages = selectedFrameworkLanguages.map(fl => {
    const { frameworkName, languageName } = parseFrameworkLanguage(fl.label);
    return fl.value
   });

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
   };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestion({ ...question, [name]: value });
  };

  const handleTestCaseChange = (index, e) => {
    const updatedTestCases = [...question.test_cases];
    updatedTestCases[index] = { ...updatedTestCases[index], [e.target.name]: e.target.value };
    setQuestion({ ...question, test_cases: updatedTestCases });
  };

  const handleAddTestCase = () => {
    const newTestCase = {
      input: '',
      solution: '',
      // Include any other fields required by your test case model
    };
    setQuestion(prevState => ({
      ...prevState,
      test_cases: [...prevState.test_cases, newTestCase]
    }));
  };



  
  
  

  useEffect(() => {
    // If it's an update form, fetch the question data and populate the form
    if (isUpdate) {
      API_URL.get(`/api/questions/${id}/`)
        .then(response => {
          console.log("question data in question form is", response.data)
          const fetchedQuestion = response.data;
          setQuestion(fetchedQuestion);
          setTags(fetchedQuestion.tags.map(tag => tag.name));

          console.log("selectedSkeletonCode", selectedSkeletonCode)

          // Set selected framework languages
          const selectedFL = fetchedQuestion.framework_languages_detail.map(fl => ({
            value: fl.id,
            label: `${fl.framework.name} - ${fl.language.name}`,
          }));
          console.log("selectedFL", selectedFL)

          setSelectedFrameworkLanguages(selectedFL);
          //setSelectedSkeletonCode(skeletonCodes);
        })
        .catch(error => {
          console.error('Error fetching question data:', error);
        });
    }
  }, [id, isUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestion(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare your form data
    //console.log("tags", tags)
    const formData = {
        question_name: question.question_name,
        description: question.description,
        difficulty: question.difficulty,
        tags: tags.map(tag => ({ name: tag })), // Assuming tags are { value, label } pairs
        is_premium: question.is_premium,
        framework_languages: transformedFrameworkLanguages,
        skeleton_code: question.skeleton_code,
        solution: question.solution,
        test_cases: question.test_cases
    };
    console.log("formData ", formData )

    try {
        let response;
        if (question.id) {
            // Update existing question
            response = await updateQuestion(question.id, formData);
            //axios.put(`${apiURL}${question.id}/`, formData);
        } else {
            // Create new question
            response = await createQuestion(formData)
            //axios.post(apiURL, formData);
        }
        console.log('Question saved', response.data);
        setMessage('Question saved successfully!');
        setError(null); // Clear any previous errors
        navigate('/problem-set');
        // Handle success (e.g., show a success message, redirect, etc.)

    } catch (error) {
        console.error('Error saving question', error);
        setMessage(null); // Clear any previous messages
        setError('Error saving question: ' + error.response);
        // Handle error (e.g., show error message)
    }

  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFrameworkLanguages();
        setFrameworkLanguages(response.data); // Assuming response data is an array of framework languages
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching framework languages:', error);
      }
    };
  
    fetchData();
  }, []);

  const handleFrameworkLanguageChange = (selectedOptions) => {
    setSelectedFrameworkLanguages(selectedOptions);
    // Map selected options to their skeleton codes
    //const skeletonCodes = selectedOptions.map(option => option.skeletonCode || 'No skeleton code available');
    //setSelectedSkeletonCode(skeletonCodes);
    // const skeletonCodeKey = `${selectedOptions.label.toLowerCase().replace(/ /g, '-')}`;
    // setSelectedSkeletonCode(skeletonCodeOptions[skeletonCodeKey] || 'No skeleton code available');
    // console.log("selectedSkeletonCode", selectedSkeletonCode)

    // setSelectedSkeletonCode(selectedSkeletonCode || 'No skeleton code available');
  };

  const handleSkeletonCodeChange = (frameworkLanguageId, newSkeletonCode) => {
    const updatedFrameworkLanguages = selectedFrameworkLanguages.map((fl) => {
      if (fl.value === frameworkLanguageId) {
        return { ...fl, skeletonCode: newSkeletonCode };
      }
      return fl;
    });
    setSelectedFrameworkLanguages(updatedFrameworkLanguages);
  };
  

  const addFrameworkLanguage = () => {
    setSelectedFrameworkLanguages([...selectedFrameworkLanguages, { id: null, skeleton_code: '' }]);
  };

  // const addFrameworkLanguage = () => {
  //   setSelectedFrameworkLanguages([...selectedFrameworkLanguages, { id: null, skeleton_code: '' }]);
  // };

  // const handleFrameworkLanguageChange = (index, selectedId) => {
  //   const newSelection = [...selectedFrameworkLanguages];
  //   const selectedFL = frameworkLanguageOptions.find(fl => fl.id === parseInt(selectedId));
  //   newSelection[index] = selectedFL || { id: null, skeleton_code: '' };
  //   setSelectedFrameworkLanguages(newSelection);
  // };
  

  return (
    <>
    {message && <div className="success-message">{message}</div>}
    {error && <div className="error-message">{error}</div>}
    <form onSubmit={handleSubmit}>
      <div>
        <label>Question Name:</label>
        <input 
          type="text" 
          name="question_name" 
          value={question.question_name || ''} 
          onChange={handleInputChange} 
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea 
          name="description" 
          value={question.description || ''} 
          onChange={handleInputChange} 
        />
      </div>

      <div>
        <label>Difficulty:</label>
        <select 
          name="difficulty" 
          value={question.difficulty || 'Easy'} 
          onChange={handleInputChange}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div>
        <label htmlFor="newTag">Tags:</label>
        <input 
          type="text"
          id="newTag"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Enter a tag"
        />
        <button type="button" onClick={handleAddTag}>Add Tag</button>
      </div>

      <div>
        {tags.map((tag, index) => (
          <div key={index} className="tag-chip">
            {tag}
            <span className="tag-chip-remove" onClick={() => handleRemoveTag(tag)}> x </span>
          </div>
        ))}
      </div>

      <div>
        <label>Is Premium:</label>
        <input 
          type="checkbox" 
          name="is_premium" 
          checked={question.is_premium || false} 
          onChange={(e) => setQuestion({ ...question, is_premium: e.target.checked })} 
        />
      </div>
      {/* <div>
        <label>Framework Languages:</label>
        <ReactSelect
          isMulti
          value={selectedFrameworkLanguages}
          onChange={handleFrameworkLanguageChange}
          options={frameworkLanguageOptions}
        />
       </div> */}

      <div>
        <ReactSelect
          isMulti
          value={selectedFrameworkLanguages}
          onChange={handleFrameworkLanguageChange}
          options={frameworkLanguageOptions}
        />
        {selectedSkeletonCode.map((code, index) => (
          <div key={index}>
            <h4>Skeleton Code {index + 1}:</h4>
            <pre>{code}</pre>
          </div>
        ))}
    </div>

    <div>
          <label htmlFor="solution">skeleton_code:</label>
          <textarea 
            name="skeleton_code" 
            value={question.skeleton_code} 
            onChange={handleInputChange} 
            placeholder="Enter the solution"
          />
        </div>


       <div>
          <label htmlFor="solution">Solution:</label>
          <textarea 
            name="solution" 
            value={question.solution} 
            onChange={handleInputChange} 
            placeholder="Enter the solution"
          />
        </div>
      {question.test_cases.map((testCase, index) => (
        <div className="test-case"  key={testCase.id || index}>
          <h3>Test Case {index + 1}</h3>
          <div>
            <label>Input:</label>
            <textarea 
              name="input" 
              value={testCase.input || ''} 
              onChange={(e) => handleTestCaseChange(index, e)} 
            />
          </div>
          <div>
            <label>Solution:</label>
            <textarea 
              name="solution" 
              value={testCase.solution || ''} 
              onChange={(e) => handleTestCaseChange(index, e)} 
            />
          </div>
        </div>
      ))}
      <button type="button" onClick={handleAddTestCase}>Add Test Case</button>


      <button type="submit">Save</button>
    </form>
    </>
  );
};

export default QuestionForm;


