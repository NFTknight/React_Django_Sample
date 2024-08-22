import React, { useState, useEffect } from 'react';
import './CodeSubmissionForm.css';
import axios from "axios";
import { useParams } from 'react-router-dom';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/python/python'; // Import the Python syntax highlighting mode
import 'codemirror/mode/clike/clike'; // Scala is part of the 'clike' module
import 'codemirror/addon/hint/show-hint'; // Import the code completion addon
import SolutionTab from './SolutionTab';
//import Header from '../components/header'
//import FooterGray from '../components/footer-gray'
//import { Link } from 'react-router-dom'
//import { Helmet } from 'react-helmet'
import HeaderFull from '../components/header-full'


const CodeSubmissionForm = () => {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    withCredentials: true,
  });
  const [questionDetail, setQuestionDetail] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [selectedFramework, setSelectedFramework] = useState('');
  const [uniqueFrameworks, setUniqueFrameworks] = useState([]);
  const [questionSolution, setQuestionSolution] = useState('');
  const [skeletonCode, setSkeletonCode] = useState('');
  const [skeletonCodeOptions, setSkeletonCodeOptions] = useState({});


  const [code, setCode] = useState('');
  const [result, setResult] = useState('');
  const [csvDataArr, setCsvDataArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('question');

  const {questionId} = useParams();
  const codemirrorLanguage = {
  "python": "python",
  "scala": "text/x-scala",
 };

  const options = {
    mode: selectedLanguage? codemirrorLanguage[selectedLanguage.name]: "python",
    theme: 'material',
    lineNumbers: true,
    extraKeys: { 'Ctrl-Space': 'autocomplete' },
  };


  const fetchQuestion = async () => {
    try {

      console.log('Submission questionId:', questionId );
      const response = await api.get(`/api/questions/${questionId}` + "/");
      console.log('Submission questionId:', response.data );
      setQuestionDetail(response.data);
      setQuestionSolution(response.data.solution);
      //setSkeletonCode(response.data.skeleton_code);
      console.log('Submission questionId testcase:', response.data.test_cases );

      const frameworkLanguages = response.data?.framework_languages_detail || [];
      const uniqueFrameworks = Array.from(
        new Set(frameworkLanguages.map((fl) => fl.framework.id))
      ).map((id) => frameworkLanguages.find((fl) => fl.framework.id === id).framework);
      setUniqueFrameworks(uniqueFrameworks)
      console.log('uniqueFrameworks:', uniqueFrameworks );

      // Extract and set the skeleton code options
      console.log("selectedSkeletonCode", response.data.skeleton_code)
      const skeletonCodes = JSON.parse(response.data.skeleton_code);
      setSkeletonCodeOptions(skeletonCodes);
      console.log("setSkeletonCodeOptions", skeletonCodes)

      // const uniqueFrameworks = questionDetail.question.framework_languages.map(fw => fw.name);
    } catch (error) {
      console.error('Failed to fetch question:', error);
    }
  };

  useEffect(() => {
  console.log('DEbug: Question Detail State:', questionDetail);
  // console.log('DEbug: Question Detail State:', questionDetail);

  }, [questionDetail]);


  // Fetch question and languages from the backend
  useEffect(() => {
    fetchQuestion();
  }, []);

  useEffect(() => {
    if (selectedFramework && questionDetail) {
        const languages = questionDetail.framework_languages_detail
            .filter(fl => fl.framework.id === selectedFramework.id)
            .map(fl => fl.language);
        setAvailableLanguages(languages);
    }
}, [selectedFramework, questionDetail]);


const handleFrameworkChange = (e) => {
  const selectedId = e.target.value;
  const framework = questionDetail.framework_languages_detail.find(fl => fl.framework.id === Number(selectedId)).framework;
  setSelectedFramework(framework);
  setSelectedLanguage(null); // Reset selected language when framework changes

};

const handleLanguageChange = (e) => {
  const selectedId = e.target.value;
  const language = availableLanguages.find(lang => lang.id === Number(selectedId));
  setSelectedLanguage(language);
  console.log("Current labguage: ", selectedLanguage);

};

useEffect(() => {
  if (selectedFramework && selectedLanguage && skeletonCodeOptions) {
    const frameworkLanguageKey = `${selectedFramework.name}-${selectedLanguage.name}`;
    console.log("Framework-Language key:", frameworkLanguageKey);
    setSkeletonCode(skeletonCodeOptions[frameworkLanguageKey] || 'No skeleton code available');
    console.log("selectedSkeletonCode", skeletonCodeOptions[frameworkLanguageKey]);
  }
}, [selectedFramework, selectedLanguage, skeletonCodeOptions]);

  // Set default values when the component mounts and when frameworkLanguages changes
  // Extract frameworkLanguages from questionDetails
  // const frameworkLanguages = questionDetail?.question?.framework_languages || [];

  // useEffect(() => {
  //   if (frameworkLanguages.length > 0) {
  //     const defaultFrameworkId = frameworkLanguages[0].framework.id;
  //     setSelectedFramework(defaultFrameworkId);

  //     const languages = frameworkLanguages
  //       .filter((fl) => fl.framework.id === defaultFrameworkId)
  //       .map((fl) => fl.language);
  //     setAvailableLanguages(languages);

  //     if (languages.length > 0) setSelectedLanguage(languages[0].id);
  //   }
  // }, [frameworkLanguages]);

  // When a new question is selected, set the code editor's value to the skeleton code
  useEffect(() => {
    if (skeletonCode) {
      setCode(skeletonCode);
    }
  }, [skeletonCode]);

  const handleCodeChange = (editor, data, value) => {
    setCode(value);
  };



  function RenderTable({ dataString }) {
//  function renderTable = (data) => (
    // <table className="table_question">
    //   <thead>
    //     <tr>
    //       {Object.keys(data[0]).map((key) => (
    //         <th key={key}>{key}</th>
    //       ))}
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {data.map((row, index) => (
    //       <tr key={index}>
    //         {Object.values(row).map((value, i) => (
    //           <td key={i}>{value}</td>
    //         ))}
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
      // If data is empty or undefined, don't render the table
      //console.log("inside tbl", dataString)
      if (!dataString) return null;

      // Attempt to parse the string into a JSON object
      let data;
      try {
        data = JSON.parse(dataString);
        //console.log("inside tbl", data)

      } catch (error) {
        console.error("Error parsing JSON string:", error);
        return <p>Error displaying data.</p>;
      }

      if (!data || data.length === 0) return [];

      // Get the headers from the keys of the first object in the data array
      const headers = Object.keys(data[0]);
      //console.log("inside tbl headers", data[0])

      return (
        <table className="table_question">
          {/* Table Header */}
          <thead>
            <tr>
              {headers.map(header => (
                <th key={header}>{header.charAt(0).toUpperCase() + header.slice(1)}</th>  // Capitalize the header
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {headers.map(header => (
                  <td key={header}>{item[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }



  const handleSubmit = async () => {
    // Show the progress bar
    // setProgress(0);
    setIsLoading(true);
    setResult('');

    console.log('Submission lang/code:', selectedLanguage, code, questionDetail);

    try {
        //   const csrfToken = getCookie('csrftoken');
         //   const headers = { 'X-CSRFToken': csrfToken };
      console.log('Submission lang/code:', selectedLanguage, code, questionDetail );

      const response = await api.post('/api/submitcode', {
        language: selectedLanguage,
        code: code,
        question_id: questionDetail.id,
        framework: selectedFramework
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setResult(response.data.result.result_message);
      // setCodeResult(response.data.result.mismatched_data);
      const csvDataBack = response.data.result.mismatched_data
      setCsvDataArr(csvDataBack);
      console.log('csvDataBackend after mismatch:', csvDataBack );
      console.log('csvDataBackend after mismatch:', csvDataArr );

      console.log('Submission response:', response.data);

    } catch (error) {

      console.error('Failed to submit code:', error);
      // Hide the progress bar
    //   setProgress(0);

    } finally {
        setIsLoading(false);
      }
  };

  if (!questionDetail) return <div>Loading...</div>; // display loading while data is being fetched

  return (
    <div>
    <HeaderFull />
    <div className="top-section">

    <div className="tabs-and-filters">
      <div className="tab-buttons">
        <button className={`tab-button ${activeTab === 'question' ? 'active' : ''}`} onClick={() => setActiveTab('question')}>Question</button>
        <button className={`tab-button ${activeTab === 'solution' ? 'active' : ''}`} onClick={() => setActiveTab('solution')}>Solution</button>
      </div>
        <div className="filters-container">
          <div className="filters">
                    <select  onChange={handleFrameworkChange} value={selectedFramework ? selectedFramework.id : ''}>
                        <option value="" disabled>Select a Framework</option>
                        {Array.isArray(uniqueFrameworks) && uniqueFrameworks.map(framework => (
                            <option key={framework.id} value={framework.id}>
                                {framework.name}
                            </option>
                        ))}
                    </select>

                    <select onChange={handleLanguageChange} value={selectedLanguage ? selectedLanguage.id : ''}>
                        <option value="" disabled>Select a Language</option>
                        {availableLanguages.map(language => (
                            <option key={language.id} value={language.id}>
                                {language.name}
                            </option>
                        ))}
                    </select>
          </div>
          </div>
        </div>
    </div>
    <div className="code-submission-container">
      {activeTab === 'question' && (
        // Render the question details
      <div className="question">
        <h2>Question</h2>
        <h1>{questionDetail && questionDetail.question_name}</h1>
        <p>{questionDetail && questionDetail.description}</p>
        {/* <p>{questionDetail &&  questionDetail.test_cases}</p> */}
         {questionDetail &&  questionDetail.test_cases && questionDetail.test_cases.map((testcase, index) => (
            <div key={index} className="question-card">
              <div>
                <h3>Input</h3>
                {testcase.input}
                {/*testcase.input && <RenderTable dataString={testcase.input} />*/} 
              </div>
              <div className="section">
                <h3>Solution</h3>
                {testcase.solution}
                {/*testcase.solution && <RenderTable dataString={testcase.solution}/>*/}
              </div>
           </div>
      ))}
      </div>
      )}
     {activeTab === 'solution' && <SolutionTab solution={questionSolution} />}
      <div className="code-submit-section">
        <h2>Code Submission</h2>
        <CodeMirror
        value={code}
        onBeforeChange={handleCodeChange}
        options={options}
        />
        {/* <textarea value={code} onChange={(e) => setCode(e.target.value)} /> */}
        <button onClick={handleSubmit}  disabled={isLoading} >Submit</button>
        {isLoading && (
        <div className="loading-spinner">
            Running Tests
          <div className="spinner"> </div>
        </div>
        )}
        {result && (
        <div className="output">
          <h3>Output:</h3>

          <pre>{result}</pre>
          { csvDataArr && csvDataArr.length > 0 ? RenderTable(csvDataArr): ""}
        </div>
      )}
      </div>
    </div>
    {/* <FooterGray></FooterGray> */}
    </div>

  );
}


export default CodeSubmissionForm;