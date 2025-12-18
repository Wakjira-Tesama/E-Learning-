import React from "react";
import { Button } from "@/components/ui/button"; // ShadCN UI Button
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-12 pb-5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">About Us</h2>
            <p className="text-sm leading-relaxed">
              We offer a range of courses to help you master new skills and
              advance your career. Join our community of learners and start
              achieving your goals today.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <a href="/courses" className="hover:text-white transition">
                  Courses
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-white transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p className="text-sm">
              123 Learning Street, Knowledge City, EduState, 45678
            </p>
            <p className="text-sm mt-2">Email: support@lmswebsite.com</p>
            <p className="text-sm">Phone: +1 (234) 567-890</p>
          </div>

          {/* Newsletter Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Subscribe to Newsletter</h2>
            <p className="text-sm mb-4">
              Stay updated with the latest courses and news.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 bg-gray-800 text-gray-200 rounded-l-md outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button variant="default" className="rounded-r-md">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-10 flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-white">
            <Facebook size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <Twitter size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <Linkedin size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <Instagram size={20} />
          </a>
        </div>
 
      </div>
    </footer>
  );
};

export default Footer;
