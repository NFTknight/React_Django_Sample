// import React from 'react'

// import { Helmet } from 'react-helmet'

// import HeaderFull from '../components/header-full'
// import OutlineBlueButton from '../components/outline-blue-button'
// import NextButton from '../components/next-button'
// import BlogCard from '../components/blog-card'
// import PrimaryBlueButton from '../components/primary-blue-button'
// import Footer from '../components/footer'
// import './profile.css'

// const Profile = (props) => {
//   return (
//     <div className="profile-container">
//       <Helmet>
//         <title>Profile - Soft UI Pro</title>
//         <meta property="og:title" content="Profile - Soft UI Pro" />
//       </Helmet>
//       <HeaderFull></HeaderFull>
//       <div className="profile-profile">
//         <img alt="image" src="/bruce-mars-200h.jpg" className="profile-image" />
//         <div className="profile-container01">
//           <div className="profile-container02">
//             <h4 className="profile-text">Michael Roven</h4>
//             <OutlineBlueButton button="follow"></OutlineBlueButton>
//           </div>
//           <div className="profile-container03">
//             <span className="profile-text01">
//               <span className="profile-text02">323</span>
//               <span> Posts</span>
//             </span>
//             <span className="profile-text04">
//               <span className="profile-text05">3.5k</span>
//               <span> Followers</span>
//             </span>
//             <span>
//               <span className="profile-text08">260</span>
//               <span> Following</span>
//             </span>
//           </div>
//           <span className="Medium">
//             Decisions: If you can’t decide, the answer is no. If two equally
//             difficult paths, choose the one more painful in the short term (pain
//             avoidance is creating an illusion of equality). Choose the path that
//             leaves you more equanimous.
//           </span>
//           <NextButton button="More about me"></NextButton>
//         </div>
//       </div>
//       <div className="profile-blog-posts">
//         <h1 className="profile-text11 HeadingTwo">
//           <span></span>
//           <span>Check my latest blogposts</span>
//           <br></br>
//         </h1>
//         <div className="profile-container04">
//           <BlogCard></BlogCard>
//           <BlogCard
//             image_src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/color-clock.jpg"
//             description="Venture investment in U.S. startups rose sequentially in the second quarter of 2017, boosted by large, ate-stage financings"
//           ></BlogCard>
//           <BlogCard
//             title="MateLabs machine learning"
//             image_src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/color-wall.jpg"
//             description="If you’ve ever wanted to train a machine learning model and integrate it with IFTTT, you now can with"
//           ></BlogCard>
//           <div className="profile-container05">
//             <div className="profile-card">
//               <div className="profile-container06">
//                 <h1 className="profile-text14">Flexible work hours</h1>
//                 <span className="profile-text15">
//                   <span className="profile-text16">
//                     Rather than worrying about switching offices every couple
//                     years, you stay in the same place.
//                   </span>
//                 </span>
//                 <div className="profile-container07">
//                   <button className="profile-button button">
//                     <span className="profile-text17">Read more</span>
//                     <svg viewBox="0 0 1024 1024" className="profile-icon">
//                       <path d="M512 170l342 342-342 342-60-60 238-240h-520v-84h520l-238-240z"></path>
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//               <div className="profile-container08"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="profile-contact">
//         <div className="profile-container09">
//           <div className="profile-form">
//             <h2 className="profile-text18 HeadingOne">
//               <span>Say Hi!</span>
//             </h2>
//             <span className="profile-text20 Lead">
//               We&apos;d like to talk with you.
//             </span>
//             <form className="profile-form1">
//               <label className="profile-text21 Label">My name is</label>
//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 className="profile-textinput Small input"
//               />
//               <label className="profile-text22 Label">
//                 I&apos;m looking for
//               </label>
//               <input
//                 type="text"
//                 placeholder="What you love"
//                 className="profile-textinput1 Small input"
//               />
//               <label className="profile-text23 Label">Your message</label>
//               <textarea
//                 rows="8"
//                 placeholder="I want to say that..."
//                 className="profile-textarea textarea Small"
//               ></textarea>
//             </form>
//             <div className="profile-container10">
//               <div className="profile-container11">
//                 <PrimaryBlueButton button="send message"></PrimaryBlueButton>
//               </div>
//             </div>
//           </div>
//           <div className="profile-info">
//             <div className="profile-container12">
//               <h3 className="HeadingTwo">
//                 <span>
//                   Contact
//                   <span
//                     dangerouslySetInnerHTML={{
//                       __html: ' ',
//                     }}
//                   />
//                 </span>
//                 <span>Information</span>
//               </h3>
//               <span className="profile-text27">
//                 Fill up the form and our Team will get back to you within 24
//                 hours.
//               </span>
//               <div className="profile-container13">
//                 <div className="profile-container14">
//                   <svg viewBox="0 0 1024 1024" className="profile-icon02">
//                     <path d="M742 460l-94-94q-18-18-10-44 24-72 24-152 0-18 12-30t30-12h150q18 0 30 12t12 30q0 300-213 513t-513 213q-18 0-30-12t-12-30v-150q0-18 12-30t30-12q80 0 152-24 24-10 44 10l94 94q186-96 282-282z"></path>
//                   </svg>
//                   <a href="tel:+40 772 100 200" className="profile-link Small">
//                     (+40) 772 100 200
//                   </a>
//                 </div>
//                 <div className="profile-container15">
//                   <svg viewBox="0 0 1024 1024" className="profile-icon04">
//                     <path d="M854 342v-86l-342 214-342-214v86l342 212zM854 170q34 0 59 26t25 60v512q0 34-25 60t-59 26h-684q-34 0-59-26t-25-60v-512q0-34 25-60t59-26h684z"></path>
//                   </svg>
//                   <a
//                     href="mailto:hello@creative-tim.com?subject="
//                     className="profile-link1 Small"
//                   >
//                     hello@creative-tim.com
//                   </a>
//                 </div>
//                 <div className="profile-container16">
//                   <svg viewBox="0 0 1024 1024" className="profile-icon06">
//                     <path d="M512 490q44 0 75-31t31-75-31-75-75-31-75 31-31 75 31 75 75 31zM512 86q124 0 211 87t87 211q0 62-31 142t-75 150-87 131-73 97l-32 34q-12-14-32-37t-72-92-91-134-71-147-32-144q0-124 87-211t211-87z"></path>
//                   </svg>
//                   <span className="profile-text28 Small">
//                     Dyonisie Wolf Bucharest, RO 010458
//                   </span>
//                 </div>
//               </div>
//               <div className="profile-container17">
//                 <svg
//                   viewBox="0 0 877.7142857142857 1024"
//                   className="profile-icon08"
//                 >
//                   <path d="M713.143 73.143c90.857 0 164.571 73.714 164.571 164.571v548.571c0 90.857-73.714 164.571-164.571 164.571h-107.429v-340h113.714l17.143-132.571h-130.857v-84.571c0-38.286 10.286-64 65.714-64l69.714-0.571v-118.286c-12-1.714-53.714-5.143-101.714-5.143-101.143 0-170.857 61.714-170.857 174.857v97.714h-114.286v132.571h114.286v340h-304c-90.857 0-164.571-73.714-164.571-164.571v-548.571c0-90.857 73.714-164.571 164.571-164.571h548.571z"></path>
//                 </svg>
//                 <svg
//                   viewBox="0 0 950.8571428571428 1024"
//                   className="profile-icon10"
//                 >
//                   <path d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
//                 </svg>
//                 <svg
//                   viewBox="0 0 877.7142857142857 1024"
//                   className="profile-icon12"
//                 >
//                   <path d="M585.143 857.143c-5.714-33.143-27.429-147.429-80-284.571-0.571 0-1.714 0.571-2.286 0.571 0 0-222.286 77.714-294.286 234.286-3.429-2.857-8.571-6.286-8.571-6.286 65.143 53.143 148 85.714 238.857 85.714 52 0 101.143-10.857 146.286-29.714zM479.429 510.286c-9.143-21.143-19.429-42.286-30.286-63.429-193.143 57.714-378.286 53.143-384.571 53.143-0.571 4-0.571 8-0.571 12 0 96 36.571 184 96 250.286v0c102.286-182.286 304.571-247.429 304.571-247.429 5.143-1.714 10.286-2.857 14.857-4.571zM418.286 389.143c-65.143-115.429-134.286-209.143-139.429-216-104.571 49.143-182.286 145.714-206.857 261.714 9.714 0 166.286 1.714 346.286-45.714zM809.143 571.429c-8-2.286-112.571-35.429-233.714-16.571 49.143 135.429 69.143 245.714 73.143 268 84-56.571 143.429-146.857 160.571-251.429zM349.143 148c-0.571 0-0.571 0-1.143 0.571 0 0 0.571-0.571 1.143-0.571zM686.286 230.857c-65.714-58.286-152.571-93.714-247.429-93.714-30.286 0-60 4-88.571 10.857 5.714 7.429 76.571 100.571 140.571 218.286 141.143-52.571 194.286-133.714 195.429-135.429zM813.714 508c-1.143-88.571-32.571-170.286-85.143-234.286-1.143 1.143-61.143 88-209.143 148.571 8.571 17.714 17.143 36 25.143 54.286 2.857 6.286 5.143 13.143 8 19.429 129.143-16.571 256.571 11.429 261.143 12zM877.714 512c0 242.286-196.571 438.857-438.857 438.857s-438.857-196.571-438.857-438.857 196.571-438.857 438.857-438.857 438.857 196.571 438.857 438.857z"></path>
//                 </svg>
//                 <svg
//                   viewBox="0 0 877.7142857142857 1024"
//                   className="profile-icon14"
//                 >
//                   <path d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
//                 </svg>
//               </div>
//             </div>
//             <img alt="image" src="/wave-1.svg" className="profile-image1" />
//             <div className="profile-container18"></div>
//           </div>
//         </div>
//       </div>
//       <Footer></Footer>
//     </div>
//   )
// }

// export default Profile
