import { Link } from "react-router-dom";
import { Mountain } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-forest to-forest-light">
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <Link to="/" className="flex items-center space-x-2 text-white">
            <Mountain className="h-8 w-8" />
            <span className="text-2xl font-bold">TrailKit</span>
          </Link>
          <div className="space-x-4">
            <Link to="/login" className="text-white hover:text-sky-light">
              Login
            </Link>
          </div>
        </nav>

        <div className="max-w-3xl mx-auto text-white">
          <h1 className="text-4xl font-bold mb-8">About TrailKit</h1>
          
          <div className="space-y-6">
            <p className="text-lg">
              TrailKit was born from a simple idea: making it easier for hikers to manage their gear
              and prepare for adventures. We understand the importance of having the right equipment
              and not forgetting essential items when heading out on the trail.
            </p>

            <p className="text-lg">
              Our platform helps outdoor enthusiasts:
            </p>

            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Keep track of all their hiking gear in one place</li>
              <li>Create and manage packing lists for different types of hikes</li>
              <li>Share knowledge and lists with the hiking community</li>
              <li>Never forget essential equipment again</li>
            </ul>

            <p className="text-lg">
              Whether you're a weekend warrior or a seasoned thru-hiker, TrailKit is designed to
              make your preparation easier and your adventures better.
            </p>
          </div>

          <div className="mt-12 p-6 bg-white/10 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Join the TrailKit Community</h2>
            <p className="mb-4">
              Be part of a growing community of outdoor enthusiasts who are passionate about
              hiking and proper gear management.
            </p>
            <Link
              to="/"
              className="inline-block bg-sky hover:bg-sky-light text-white px-6 py-3 rounded-lg transition-colors"
            >
              Get Early Access
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;