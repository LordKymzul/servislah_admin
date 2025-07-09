"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">ServisLah</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#services" className="text-gray-600 hover:text-blue-600">Services</Link>
              <Link href="#how-it-works" className="text-gray-600 hover:text-blue-600">How It Works</Link>
              <Link href="#contact" className="text-gray-600 hover:text-blue-600">Contact</Link>
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-full border border-gray-300 hover:border-blue-600 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
                >
                  Register
                </Link>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
                  Book Now
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} pt-4 pb-3 border-t border-gray-200`}>
            <div className="flex flex-col space-y-4">
              <Link
                href="#services"
                className="text-gray-600 hover:text-blue-600 px-4 py-2 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="#how-it-works"
                className="text-gray-600 hover:text-blue-600 px-4 py-2 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="#contact"
                className="text-gray-600 hover:text-blue-600 px-4 py-2 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex flex-col space-y-2 px-4">
                <Link
                  href="/auth/signin"
                  className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-full border border-gray-300 hover:border-blue-600 transition text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Car Service Made <span className="text-blue-600">Simple</span> and <span className="text-blue-600">Convenient</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Book your car service appointment with top-rated workshops in Singapore. Quick, easy, and reliable.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition text-lg font-medium">
                  Book Service Now
                </button>
                <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full hover:bg-gray-50 transition text-lg font-medium">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/images/Primary Logo (Full Color).png"
                alt="Car Service"
                fill
                className="object-cover rounded-2xl shadow-xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose ServisLah?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Trusted Workshops",
                description: "Partner with certified and experienced car service centers",
                icon: "🔧"
              },
              {
                title: "Easy Booking",
                description: "Book your appointment in minutes with our simple booking system",
                icon: "📱"
              },
              {
                title: "Transparent Pricing",
                description: "Get upfront pricing with no hidden charges",
                icon: "💰"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Book Your Car Service?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust ServisLah for their car maintenance needs.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-gray-100 transition text-lg font-medium">
            Book Your Appointment
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <span className="text-xl font-bold text-blue-600">ServisLah</span>
              <p className="mt-4 text-gray-600">Making car maintenance hassle-free for everyone in Singapore.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase">Services</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-blue-600">Regular Service</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-blue-600">Major Service</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-blue-600">Diagnostics</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-blue-600">About Us</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-blue-600">Contact</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-blue-600">Partners</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-blue-600">Privacy Policy</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-blue-600">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
            <p>© 2024 ServisLah. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
