import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../views/authContext'

import { Helmet } from 'react-helmet'

import PrimaryPinkButton from '../components/primary-pink-button'
import AppComponent from '../components/component'
import OutlineGrayButton from '../components/outline-gray-button'
import OutlineBlackButton from '../components/outline-black-button'
import ListItem from '../components/list-item'
import Footer from '../components/footer'
import './home.css'

function UserGreeting() {
  const {currentUser} = useContext(AuthContext);
   return (
    <div >
        {currentUser ? (
            // If the user is logged in
            <span className="user-display">Hello, {currentUser.email}!</span>
        ) : (
            // If the user is not logged in
            <Link to="/login" className="home-navlink03 button">
             SIGN IN
            </Link>
            // <button onClick={() => {/* Your sign-in logic here */}}>SIGNIN</button>
        )}
</div>
     );
}

const Home = (props) => {
  return (
    <div className="home-container">
      <Helmet>
        <title>Soft UI Pro</title>
        <meta property="og:title" content="Soft UI Pro" />
      </Helmet>
      <div data-role="Header" className="home-header">
        <nav className="home-nav">
          <div className="home-container01">
            <Link to="/" className="home-navlink">
              <img
                alt="image"
                src="/logo-min-200h.png"
                className="home-image"
              />
            </Link>
            <div className="home-menu">
              <Link to="/" className="home-navlink01">
                Home
              </Link>
              <a href="#Journey" className="home-link">
                <span>DE</span>
                <span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
                <span>Roadmap</span>
              </a>
              <Link to="/problem-set" className="home-navlink02">
                Problems
              </Link>
            </div>
            <div className="home-container02">
              <div className="home-container03">
                <div className="home-container04">
                  <div className="home-container05">
                    <UserGreeting/>
                  </div>
                </div>
              </div>
              <div data-role="BurgerMenu" className="home-burger-menu">
                <svg viewBox="0 0 1024 1024" className="home-icon">
                  <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
                </svg>
              </div>
            </div>
          </div>
        </nav>
        <div data-role="MobileMenu" className="home-mobile-menu">
          <div className="home-top">
          <Link to="/" className="home-navlink">
              <img
                alt="image"
                src="/logo-min-200h.png"
                className="home-image"
              />
            </Link>
            <div data-role="CloseMobileMenu" className="home-close-menu">
              <svg viewBox="0 0 1024 1024" className="home-icon02">
                <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
              </svg>
            </div>
          </div>
          <div className="home-mid">
            <div className="home-menu1">
              <Link to="/" className="home-navlink05 Large">
                Home
              </Link>
              <Link to="/user-profile" className="home-navlink06 Large">
                Profile
              </Link>
              <Link to="/premium" className="home-navlink07 Large">
                Coming Soon
              </Link>
            </div>
          </div>
          <div className="home-bot">
            <PrimaryPinkButton button="buy now"></PrimaryPinkButton>
          </div>
        </div>
      </div>
      <div className="home-hero">
        <div className="home-container06">
          <div className="home-card">
            <h1 className="home-text03 HeadingOne">
              Become a Data Engineering Expert!
            </h1>
            <h1 className="home-text04">Practice real-world problems</h1>
            <div className="home-container07">
              <div className="home-container08">
                <div className="home-container09">
                  <Link to="/problem-set" className="home-navlink08">
                    <AppComponent className="home-component1"></AppComponent>
                  </Link>
                </div>
              </div>
              <Link to="/signup" className="home-navlink09">
                <OutlineGrayButton
                  button="read more"
                  className="home-component2"
                ></OutlineGrayButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <img alt="image" src="/curved6-1500h.jpg" className="home-image01" />
      <div className="home-container10">
        <div className="home-container11">
          <div className="home-container12">
            <div className="home-container13">
              <div className="home-container14">
                <div className="home-container15">
                  <h1 className="home-text05">Frameworks Supported</h1>
                </div>
                <section id="Journey" className="home-features">
                  <div className="home-container16">
                    <div className="home-container17">
                      <a
                        href="https://spark.apache.org/"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="home-link1"
                      >
                        <img
                          alt="image"
                          src="/spark-sql-logo-200h.png"
                          className="home-image02"
                        />
                      </a>
                      <div className="home-container18">
                        <span className="home-text06">
                          Choose the best design system for your next product.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="home-container19">
                    <div className="home-container20">
                      <a
                        href="https://airflow.apache.org/"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="home-link2"
                      >
                        <img
                          alt="image"
                          src="/airflowlogo-200h.png"
                          className="home-image03"
                        />
                      </a>
                      <span className="home-text07">
                        Get the latest design ideas and turn it into reality.
                      </span>
                    </div>
                  </div>
                  <div className="home-container21">
                    <div className="home-container22">
                      <img
                        alt="image"
                        src="/spark_streaming_logo-200h.webp"
                        className="home-image04"
                      />
                      <span className="home-text08">
                        Make your code easier to maintain using variables.
                      </span>
                    </div>
                  </div>
                  <div className="home-container23">
                    <a
                      href="https://www.confluent.io/what-is-apache-kafka/"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="home-link3"
                    >
                      <img
                        alt="image"
                        src="/apache_kafka_wordtype.svg-200h.png"
                        className="home-image05"
                      />
                    </a>
                    <span className="home-text09">
                      This design system is fully supported on any device.
                    </span>
                  </div>
                  <div className="home-container24">
                    <div className="home-container25">
                      <a
                        href="https://hive.apache.org/"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="home-link4"
                      >
                        <img
                          alt="image"
                          src="/hive.svg"
                          className="home-image06"
                        />
                      </a>
                      <div className="home-container26">
                        <span className="home-text10">
                          Choose the best design system for your next product.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="home-container27">
                    <div className="home-container28">
                      <img
                        alt="image"
                        src="/mysql-200h.png"
                        className="home-image07"
                      />
                      <div className="home-container29">
                        <span className="home-text11">
                          Choose the best design system for your next product.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="home-container30">
                    <div className="home-container31">
                      <img
                        alt="image"
                        src="/spark_logo-200h.png"
                        className="home-image08"
                      />
                      <div className="home-container32">
                        <span className="home-text12">
                          Choose the best design system for your next product.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="home-container33">
                    <div className="home-container34">
                      <img
                        alt="image"
                        src="/spark_logo-200h.png"
                        className="home-image09"
                      />
                      <div className="home-container35">
                        <span className="home-text13">
                          Choose the best design system for your next product.
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="home-container36">
        <div className="home-container37">
          <h1 className="home-text14 HeadingOne">
            <span className="HeadingOne">From DE Freshmen</span>
            <span className="HeadingOne"> to DE Hero</span>
          </h1>
          <span className="home-text17">
            The highest status people in human history are those that asked for
            nothing and gave everything
          </span>
        </div>
        <div className="home-container38">
          <div className="home-container39">
            <img
              alt="image"
              src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/laptop.jpg"
              className="home-image10"
            />
            <span className="home-text18 Small">
              <span className="home-text19">
                &quot;Over the span of the satellite record, Arctic sea ice has
                been declining significantly, while sea ice in the Antarctichas
                increased very slightly&quot;
              </span>
              <br></br>
              <span className="home-text21">-NOAA</span>
            </span>
            <div className="home-container40">
              <img
                alt="image"
                src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/coding.jpg"
                className="home-image11"
              />
            </div>
          </div>
          <div className="home-container41">
            <img
              alt="image"
              src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/tasks.jpg"
              className="home-image12"
            />
            <div className="home-container42">
              <h3 className="HeadingTwo">
                <span className="home-text23">
                  So what does the new record for the lowest level of winter ice
                  actually mean
                </span>
              </h3>
              <p>
                <br></br>
                <span className="home-text25">
                  The Arctic Ocean freezes every winter and much of the sea-ice
                  then thaws every summer, and that process will continue
                  whatever happens with climate change. Even if the Arctic
                  continues to be one of the fastest-warming regions of the
                  world, it will always be plunged into bitterly cold polar dark
                  every winter. And year-by-year, for all kinds of natural
                  reasons, there’s huge variety of the state of the ice.
                </span>
                <br></br>
                <span></span>
                <br></br>
                <span className="home-text28">
                  For a start, it does not automatically follow that a record
                  amount of ice will melt this summer. More important for
                  determining the size of the annual thaw is the state of the
                  weather as the midnight sun approaches and temperatures rise.
                  But over the more than 30 years of satellite records,
                  scientists have observed a clear pattern of decline,
                  decade-by-decade.
                </span>
                <br></br>
                <span></span>
                <br></br>
                <span className="home-text31">
                  The Arctic Ocean freezes every winter and much of the sea-ice
                  then thaws every summer, and that process will continue
                  whatever happens with climate change. Even if the Arctic
                  continues to be one of the fastest-warming regions of the
                  world, it will always be plunged into bitterly cold polar dark
                  every winter. And year-by-year, for all kinds of natural
                  reasons, there’s huge variety of the state of the ice.
                </span>
                <br></br>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="home-testimonials">
        <div className="home-container43">
          <div className="home-container44">
            <div className="home-container45">
              <h2 className="home-text32 HeadingOne">Why DECode?</h2>
              <p className="home-text33 Lead">
                Our missions is to empower data engineering aspirants because of
                following reasons:
              </p>
              <p className="home-text34">
                <span className="home-text35">
                  Practical Hands-on Experience:
                </span>
                <span>
                  {' '}
                  Data engineering involves working with real-world data sets,
                  tools, and technologies. The website likely provides
                  opportunities for users to work on hands-on projects and
                  exercises, allowing them to gain practical experience and
                  develop a portfolio of work.
                </span>
                <br></br>
                <br></br>
                <span className="home-text39">
                  Community and Collaboration:
                </span>
                <span>
                  {' '}
                  A good data engineering website would foster a supportive
                  learning community where users can interact with instructors
                  and peers. Collaborative learning environments help users stay
                  motivated, share ideas, and get help when needed.
                </span>
                <br></br>
                <br></br>
                <span className="home-text43">
                  Continuous Learning and Updates:
                </span>
                <span>
                  {' '}
                  Data engineering technologies are constantly evolving. The
                  website is likely designed to stay up-to-date with the latest
                  trends, tools, and best practices, providing users with
                  relevant and cutting-edge knowledge.
                </span>
                <br></br>
              </p>
            </div>
          </div>
          <div className="home-logos">
            <div className="home-container46">
              <div className="home-container47">
                <div className="home-container48">
                  <img
                    alt="image"
                    src="/logo-asana.svg"
                    className="home-image13"
                  />
                </div>
                <div className="home-container49">
                  <img
                    alt="image"
                    src="/logo-slack.svg"
                    className="home-image14"
                  />
                </div>
                <div className="home-container50">
                  <img
                    alt="image"
                    src="/logo-google-drive.svg"
                    className="home-image15"
                  />
                </div>
              </div>
              <div className="home-container51">
                <div className="home-container52">
                  <img
                    alt="image"
                    src="/logo-shopify.svg"
                    className="home-image16"
                  />
                </div>
                <div className="home-container53">
                  <img
                    alt="image"
                    src="https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/logos/small-logos/logo-apple.svg"
                    className="home-image17"
                  />
                </div>
                <div className="home-container54">
                  <img
                    alt="image"
                    src="/logo-invision.svg"
                    className="home-image18"
                  />
                </div>
              </div>
              <div className="home-container55">
                <div className="home-container56">
                  <img
                    alt="image"
                    src="/logo-attlasian.svg"
                    className="home-image19"
                  />
                </div>
                <div className="home-container57">
                  <img
                    alt="image"
                    src="/logo-weave.svg"
                    className="home-image20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <img alt="image" src="/bottom.svg" className="home-bottom-wave-image" />
        <img alt="image" src="/waves-white.svg" className="home-image21" />
        <img alt="image" src="/top.svg" className="home-top-wave-image" />
      </section>
      <section className="home-contaier">
        <div className="home-container58">
          <div className="home-container59">
            <svg viewBox="0 0 1024 1024" className="home-icon04">
              <path d="M363.722 722.052l41.298-57.816-45.254-45.256-57.818 41.296c-10.722-5.994-22.204-10.774-34.266-14.192l-11.682-70.084h-64l-11.68 70.086c-12.062 3.418-23.544 8.198-34.266 14.192l-57.818-41.298-45.256 45.256 41.298 57.816c-5.994 10.72-10.774 22.206-14.192 34.266l-70.086 11.682v64l70.086 11.682c3.418 12.060 8.198 23.544 14.192 34.266l-41.298 57.816 45.254 45.256 57.818-41.296c10.722 5.994 22.204 10.774 34.266 14.192l11.682 70.084h64l11.68-70.086c12.062-3.418 23.544-8.198 34.266-14.192l57.818 41.296 45.254-45.256-41.298-57.816c5.994-10.72 10.774-22.206 14.192-34.266l70.088-11.68v-64l-70.086-11.682c-3.418-12.060-8.198-23.544-14.192-34.266zM224 864c-35.348 0-64-28.654-64-64s28.652-64 64-64 64 28.654 64 64-28.652 64-64 64zM1024 384v-64l-67.382-12.25c-1.242-8.046-2.832-15.978-4.724-23.79l57.558-37.1-24.492-59.128-66.944 14.468c-4.214-6.91-8.726-13.62-13.492-20.13l39.006-56.342-45.256-45.254-56.342 39.006c-6.512-4.766-13.22-9.276-20.13-13.494l14.468-66.944-59.128-24.494-37.1 57.558c-7.812-1.892-15.744-3.482-23.79-4.724l-12.252-67.382h-64l-12.252 67.382c-8.046 1.242-15.976 2.832-23.79 4.724l-37.098-57.558-59.128 24.492 14.468 66.944c-6.91 4.216-13.62 8.728-20.13 13.494l-56.342-39.006-45.254 45.254 39.006 56.342c-4.766 6.51-9.278 13.22-13.494 20.13l-66.944-14.468-24.492 59.128 57.558 37.1c-1.892 7.812-3.482 15.742-4.724 23.79l-67.384 12.252v64l67.382 12.25c1.242 8.046 2.832 15.978 4.724 23.79l-57.558 37.1 24.492 59.128 66.944-14.468c4.216 6.91 8.728 13.618 13.494 20.13l-39.006 56.342 45.254 45.256 56.342-39.006c6.51 4.766 13.22 9.276 20.13 13.492l-14.468 66.944 59.128 24.492 37.102-57.558c7.81 1.892 15.742 3.482 23.788 4.724l12.252 67.384h64l12.252-67.382c8.044-1.242 15.976-2.832 23.79-4.724l37.1 57.558 59.128-24.492-14.468-66.944c6.91-4.216 13.62-8.726 20.13-13.492l56.342 39.006 45.256-45.256-39.006-56.342c4.766-6.512 9.276-13.22 13.492-20.13l66.944 14.468 24.492-59.13-57.558-37.1c1.892-7.812 3.482-15.742 4.724-23.79l67.382-12.25zM672 491.2c-76.878 0-139.2-62.322-139.2-139.2s62.32-139.2 139.2-139.2 139.2 62.322 139.2 139.2c0 76.878-62.32 139.2-139.2 139.2z"></path>
            </svg>
          </div>
          <h2 className="home-text46 HeadingTwo">Why DECode ?</h2>
          <h3 className="home-text47 HeadingTwo">
            <span className="home-text48">Home for DE aspirants!</span>
            <br></br>
          </h3>
          <span className="home-text50">
            Our missions is to empower data engineering aspirants because of
            following reasons:
          </span>
        </div>
        <div className="home-container60">
          <div className="home-container61">
            <div className="home-container62"></div>
            <div className="home-container63">
              <svg viewBox="0 0 987.4285714285713 1024" className="home-icon06">
                <path d="M438.857 508.571l312 312c-79.429 80.571-190.286 130.286-312 130.286-242.286 0-438.857-196.571-438.857-438.857s196.571-438.857 438.857-438.857v435.429zM545.714 512h441.714c0 121.714-49.714 232.571-130.286 312zM950.857 438.857h-438.857v-438.857c242.286 0 438.857 196.571 438.857 438.857z"></path>
              </svg>
              <h1 className="home-text51 HeadingOne">Search and Discover!</h1>
              <span className="home-text52">
                <span>Website visitors</span>
                <span></span>
              </span>
              <OutlineBlackButton button="get started"></OutlineBlackButton>
            </div>
          </div>
          <div className="home-container64">
            <div className="home-container65">
              <h5 className="home-text55 HeadingThree">
                1. Practical Hands-on Experience
              </h5>
              <span>
                Data engineering involves working with real-world data sets,
                tools, and technologies. The website likely provides
                opportunities for users to work on hands-on projects and
                exercises, allowing them to gain practical experience and
                develop a portfolio of work.
              </span>
            </div>
            <div className="home-container66">
              <h5 className="home-text57 HeadingThree">
                2. Community and Collaboration
              </h5>
              <span>
                A good data engineering website would foster a supportive
                learning community where users can interact with instructors and
                peers. Collaborative learning environments help users stay
                motivated, share ideas, and get help when needed.
              </span>
            </div>
            <div className="home-container67">
              <h5 className="home-text59 HeadingThree">
                <span className="home-text60">
                  3.
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
                <span>Continuous Learning and Updates</span>
              </h5>
              <span>
                Data engineering technologies are constantly evolving. The
                website is likely designed to stay up-to-date with the latest
                trends, tools, and best practices, providing users with relevant
                and cutting-edge knowledge.
              </span>
            </div>
          </div>
        </div>
        <div className="home-divider"></div>
        <div className="home-container68">
          <div className="home-container69">
            <ListItem
              title="1. Always in Sync"
              description="No matter where you are, Trello stays in sync across all of your devices."
            ></ListItem>
            <ListItem
              title="2. Work With Any Team"
              description="Unify data from Facebook, Instagram, Twitter, LinkedIn, and Youtube to gain rich insights from easy-to-use reports."
            ></ListItem>
            <ListItem
              title="3. A Productivity Platform"
              description="Integrate the apps your team already uses directly into your workflow."
            ></ListItem>
          </div>
          <div className="home-container70">
            <div className="home-container71"></div>
            <div className="home-container72">
              <svg viewBox="0 0 1152 1024" className="home-icon08">
                <path d="M1088 901.166c0 45.5 26.028 84.908 64 104.184v15.938c-10.626 1.454-21.472 2.224-32.5 2.224-68.008 0-129.348-28.528-172.722-74.264-26.222 6.982-54.002 10.752-82.778 10.752-159.058 0-288-114.616-288-256s128.942-256 288-256c159.058 0 288 114.616 288 256 0 55.348-19.764 106.592-53.356 148.466-6.824 14.824-10.644 31.312-10.644 48.7zM512 0c278.458 0 504.992 180.614 511.836 405.52-49.182-21.92-103.586-33.52-159.836-33.52-95.56 0-185.816 33.446-254.138 94.178-70.846 62.972-109.862 147.434-109.862 237.822 0 44.672 9.544 87.888 27.736 127.788-5.228 0.126-10.468 0.212-15.736 0.212-27.156 0-53.81-1.734-79.824-5.044-109.978 109.978-241.25 129.7-368.176 132.596v-26.916c68.536-33.578 128-94.74 128-164.636 0-9.754-0.758-19.33-2.164-28.696-115.796-76.264-189.836-192.754-189.836-323.304 0-229.75 229.23-416 512-416z"></path>
              </svg>
              <h1 className="home-text63 HeadingOne">Talk and Meet!</h1>
              <span className="home-text64">
                <span>Website visitors</span>
                <span></span>
              </span>
              <OutlineBlackButton button="get started"></OutlineBlackButton>
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </div>
  )
}

export default Home
