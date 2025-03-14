import AboutMe from "./components/AboutMe";
import ContactMe from "./components/ContactMe";
import Navbar from "./components_/navbar";
// import Link from "next/link";
import Projects from "./components_/projects";

// Create a client wrapper for the Projects server component
// const ProjectsWrapper = () => {
//   return (
//     <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//       <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
//         Projects
//       </h2>
//       <div className="text-center">
//         <Link 
//           href="/projects" 
//           className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-300"
//         >
//           View My Projects
//         </Link>
//       </div>
//     </div>
//   );
// };

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white">
            Hi, I&apos;m Mayank
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Mobile Applications & Web Developer
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
      <section id="resume" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
            Resume
          </h2>
          <div className="prose dark:prose-invert max-w-3xl mx-auto">
            <p>Professional experience and education details would go here.</p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
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
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white dark:bg-gray-800">
        <ContactMe/>
        {/* <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
            Hire Me
          </h2>
          <div className="max-w-lg mx-auto">
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div> */}
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
