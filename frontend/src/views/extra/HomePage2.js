import React from 'react'

const Homepage = () => {
  return (
    <div className="homepage">
      <header>
        <nav>
          <img src={require("../static/logo/logo.png")} alt="DeCode Logo" />
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/questions">Interview Questions</a></li>
            <li><a href="/resources">Resources</a></li>
            <li><a href="/community">Community</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>Data Engineering Interview Preparation</h1>
          <p>Prepare with confidence and ace your Data Engineering interviews</p>
          <a href="/questions" className="btn btn-primary">Get Started</a>
        </div>
      </section>

      <section className="why-decode">
        <h2>Why Choose DeCode?</h2>
        <p>DeCode is a comprehensive platform designed to help you succeed in Data Engineering interviews. Our mission is to provide you with the resources, guidance, and practice you need to excel.</p>
      </section>

      <section className="benefits">
        <h2>How DeCode Will Benefit You</h2>
        <ul>
          <li>Access a vast collection of interview questions covering various Data Engineering topics.</li>
          <li>Get detailed explanations, sample answers, and insights to help you understand key concepts.</li>
          <li>Practice coding exercises specifically tailored to Data Engineering interview scenarios.</li>
          <li>Engage with a supportive community of Data Engineering enthusiasts and learn from their experiences.</li>
          <li>Boost your confidence through mock interviews conducted by industry professionals.</li>
        </ul>
      </section>

      <section className="get-started">
        <h2>Get Started Today</h2>
        <p>Begin your Data Engineering interview preparation journey with DeCode. Take advantage of our comprehensive resources, interactive exercises, and community collaboration to enhance your skills and increase your chances of success.</p>
        <a href="/questions" className="btn btn-primary">Start Preparing</a>
      </section>

      <footer>
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} DeCode. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Homepage;
