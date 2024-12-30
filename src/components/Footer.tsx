import { Github, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="mt-auto bg-forest/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-forest">TrailKit</h3>
            <p className="text-sm text-gray-600">
              Your ultimate hiking gear management platform. Track, organize, and plan your adventures.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/pricing" className="text-sm text-gray-600 hover:text-forest">Pricing</Link></li>
              <li><Link to="/about" className="text-sm text-gray-600 hover:text-forest">About</Link></li>
              <li><Link to="/login" className="text-sm text-gray-600 hover:text-forest">Login</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/dashboard/gear" className="text-sm text-gray-600 hover:text-forest">Gear Management</Link></li>
              <li><Link to="/dashboard/lists" className="text-sm text-gray-600 hover:text-forest">Packing Lists</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="https://github.com" className="text-gray-600 hover:text-forest" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-gray-600 hover:text-forest" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" className="text-gray-600 hover:text-forest" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} TrailKit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}