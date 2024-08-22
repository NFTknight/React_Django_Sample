import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../views/authContext'; // adjust the path accordingly
import './UserDropdown.css'
import { Link } from 'react-router-dom'

  export function UserGreeting() {
    const { currentUser } = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);  // State to control dropdown
  
    // Toggle Dropdown function
    const toggleDropdown = () => {
        console.log("toggleDropdown before change", isOpen)
        setIsOpen(prev => !prev);
    };

    const {logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };
  
    return (
      <div className="user-section">
        {currentUser ? (
          <div className="user-dropdown" onClick={toggleDropdown} style={{ cursor: 'pointer' } }>
            <span className="user-display">Hello, {currentUser.email}!</span>
            {isOpen ? (
                    <div className={`dropdown-menu1 ${isOpen ? 'show' : ''}`}>
                    <Link to="/userprofile" className="home-navlink03 button">
                       Profile Stats
                    </Link>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ): ("")}
          </div>
        ) : (
          <Link to="/login" className="home-navlink03 button">
            SIGN IN
          </Link>
        )}
      </div>
    );
  }
  
  function UserDropdown() {


  }

  // function UserDropdown() {
//     const [isOpen, setIsOpen] = useState(false);
//     const { currentUser, logout } = useContext(AuthContext);
//     const navigate = useNavigate();


//     const handleLogout = () => {
//         logout(); // Call the logout function from AuthContext
//         navigate('/'); // Navigate to home page
//     };

//     return (
//         <div className="user-dropdown">
//             <button onClick={() => setIsOpen(!isOpen)}>
//                 {currentUser.username} ⮟
//             </button>
            
//             {isOpen && (
//                 <div className="dropdown-menu">
//                   <Link to="/userprofile" className="home-navlink03 button">
//                      Profile Stats
//                   </Link>              
//                     <button onClick={handleLogout}>Logout</button>
//                 </div>
//             )}
//         </div>
//     );
// }

// export function UserGreeting() {
//     const {currentUser} = useContext(AuthContext);
//      return (
//         <>
//       <div >
//           {currentUser ? (
//               // If the user is logged in
//               <span className="user-display">Hello, {currentUser.email}!</span>
//           ) : (
//               // If the user is not logged in
//               <Link to="/login" className="home-navlink03 button">
//                SIGN IN
//               </Link>
//               // <button onClick={() => {/* Your sign-in logic here */}}>SIGNIN</button>
//           )}
//        </div>
//        {currentUser && <UserDropdown />}
//        </>
//        );
//   }
  