import AboutMe from "./components/AboutMe";
import ContactMe from "./components/ContactMe";
import Navbar from "./components_/navbar";
import Projects from "./components_/projects";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section
        id="name"
        className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
      >
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white">
            Hi, I&apos;m Mayank
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Android Native, Flutter Applications & Web Developer
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-800">
        <AboutMe />
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
        {/* <ProjectsWrapper /> */}
        <Projects />
      </section>

      {/* Resume Section */}
      {/* <section id="resume" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
            Resume
          </h2>
          
          <div className="text-center mb-10">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Click on &quot;Resume&quot; in the navigation bar to view my full resume in a convenient modal view.
            </p>
            
            <div className="flex justify-center gap-4">
              <a
                href="https://docs.google.com/document/d/1oIW7Ltbj2bfX01n6lQS0j0Z9hWFdKIvsRTKxaxD3yAU/view"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-300"
              >
                View Full Resume
              </a>
              <a
                href="https://docs.google.com/document/d/1oIW7Ltbj2bfX01n6lQS0j0Z9hWFdKIvsRTKxaxD3yAU/export?format=pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-300"
              >
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </section> */}

      {/* Skills Section */}
      {/* <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
            Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 text-center">
              <span className="font-medium">JavaScript</span>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 text-center">
              <span className="font-medium">React</span>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 text-center">
              <span className="font-medium">Next.js</span>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 text-center">
              <span className="font-medium">TypeScript</span>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 text-center">
              <span className="font-medium">Tailwind CSS</span>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 text-center">
              <span className="font-medium">Node.js</span>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 text-center">
              <span className="font-medium">MongoDB</span>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 text-center">
              <span className="font-medium">Git</span>
            </div>
          </div>
        </div>
      </section> */}

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white dark:bg-gray-800">
        <p
          className="
        max-w-6xl 
        mx-auto 
        px-4 
        sm:px-6 
        lg:px-8 
        mt-4 
        text-xl 
        text-gray-600 
        dark:text-gray-300 
        flex 
        text-justify
        mb-10
        "
        >
          I&apos;m currently looking for full-time Mobile Applications or Web
          Development opportunities!, preferably with Work From Home or Hybrid
          options. If you know of any positions available, if you have any
          questions, or if you just want to say hi, just use the form below. Or
          you can also contact me on my social media platforms.
        </p>
        {<ContactMe />}
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-white text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Mayank Joshi. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
