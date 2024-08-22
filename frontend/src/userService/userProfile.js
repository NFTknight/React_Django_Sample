import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../views/authContext';  // adjust the path accordingly
import './user-profile.css'
import Footer from '../components/footer'
import HeaderFull from '../components/header-full'




function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isLoggedIn } = useAuth();


  // Create an axios instance with the base URL
const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    withCredentials: true,
  });

 
  useEffect(() => {
    setIsLoading(true); // Start loading when the effect runs
    if (isLoggedIn) {

    // Fetch both userProfile and userStats concurrently
    Promise.all([
        api.get('/api/userprofile/'),
        api.get('/api/userstats/')
    ])
    .then(([userProfileResponse, userStatsResponse]) => {
        setUserProfile(userProfileResponse.data);
        setUserStats(userStatsResponse.data);
        console.log(userStatsResponse.data)
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    })
    .finally(() => {
        setIsLoading(false); // Set loading to false once both requests complete
    });
  }
    
}, [isLoggedIn]);



//   if (!isLoggedIn) return <div>Please log in to view your profile.</div>;
if (isLoading) {
  return <p>Loading...</p>;
}
//   if (!userProfile || !userStats) return <p>Loading...</p>;

  return (
    // <div>
    //     {userProfile && userProfile.user ? (
    // <>
    //     <h1>{userProfile.user.first_name} {userProfile.user.last_name}'s Profile</h1>
    //     <p>Email: {userProfile.user.email}</p>
    //     <p>Bio: {userProfile.bio}</p>
    //     <p>Location: {userProfile.location}</p>
    //     <h2>Stats</h2>
    //     <p>Questions solved: {userStats.questions_solved}</p>
    //     {/* Other stats fields can be displayed similarly */}
    // </>
    // ) : (
    // <p>Loading...</p>
    // )}
    // </div>
    <div className="user-profile-container">
  <HeaderFull />
  <div className="user-profile-profile">
    <img alt="image" src="/bruce-mars-200h.jpg" className="user-profile-image" />
    <div className="user-profile-container1">
          <div className="user-profile-container2">
            <h4 className="user-profile-text">
              {userProfile.user.first_name} {userProfile.user.last_name}
            </h4>
          </div>
          <span className="Medium">
            {" "}
            Bio: {userProfile.bio} Location: {userProfile.location}
          </span>
          <div className="user-profile-stats">
            <div className="stat-item">
              <span className="stat-number">{userStats.questions_solved}</span>
              <span className="stat-label">Questions Solved</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{userStats.questions_attempted}</span>
              <span className="stat-label">Questions Attempted</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{userStats.easy_questions}</span>
              <span className="stat-label">Easy Questions</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{userStats.medium_questions}</span>
              <span className="stat-label">Medium Questions</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{userStats.hard_questions}</span>
              <span className="stat-label">Hard Questions</span>
            </div>
            <div className="stat-item">
                <span className="stat-label">Technology Questions</span>
                {userStats.technology_questions && Object.entries(userStats.technology_questions).map(([technology, count]) => (
                    <div key={technology} className="technology-question">
                        <span className="tech-name">{technology}:</span>
                        <span className="tech-count">{count}</span>
                    </div>
                    ))}
            </div>
        </div>
    </div>
  </div>
  <Footer />
</div>
  );
}

export default UserProfile;


                /*{userStats.technology_questions && ((userStats.technology_questions) || []).map((tech, index) => (
                    <div key={index} className="technology-question">
                    <span className="tech-name">{tech.name}: </span>
                    <span className="tech-count">{tech.count}</span>
                    </div>
                ))} */

// function safeParse(json) {
//     try {
//       return JSON.parse(json);
//     } catch (e) {
//       console.error("Failed to parse JSON", e);
//       return null;
//     }
//   }

 // useEffect(() => {
  //   // Check if the user is logged in
  //   // const isLoggedIn = /* Check user login status using your authentication logic */;
  //   if (isLoggedIn) {
  //     // If the user is logged in, get the user profile and stats
  //     api.get('/api/userprofile/')
          
  //       .then( response => {
  //           console.log(response.data); // log to examine the structure of the returned data
  //           setUserProfile(response.data)
  //           setIsLoading(false); // set loading to false when data is fetched
  //       })
  //       .catch(error => {
  //         console.error('Error fetching user profile:', error)
  //         setIsLoading(false);
  //       })


  //     api.get('/api/userstats/')
  //       .then(response => setUserStats(response.data))
  //       .catch(error => console.error('Error fetching user stats:', error));
  //   }
  // }, [isLoggedIn]); // Run once when the component mounts
