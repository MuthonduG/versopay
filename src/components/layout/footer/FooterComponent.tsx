import { 
  FaTwitter, 
  FaLinkedin, 
  FaGithub, 
} from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';
import { HiOutlineSparkles } from 'react-icons/hi';

const FooterComponent = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Solutions", href: "#solutions" },
      { name: "Integrations", href: "#integrations" },
      { name: "Pricing", href: "#pricing" },
      { name: "FAQ", href: "#faq" }
    ],
    company: [
      { name: "About Us", href: "#about" },
      { name: "Blog", href: "#blog" },
      { name: "Careers", href: "#careers" },
      { name: "Press", href: "#press" },
      { name: "Contact", href: "#contact" }
    ],
    resources: [
      { name: "Documentation", href: "#docs" },
      { name: "API Reference", href: "#api" },
      { name: "Case Studies", href: "#case-studies" },
      { name: "Webinars", href: "#webinars" },
      { name: "Community", href: "#community" }
    ],
    legal: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Security", href: "#security" },
      { name: "Compliance", href: "#compliance" },
      { name: "GDPR", href: "#gdpr" }
    ]
  };

  const socialLinks = [
    { icon: <FaTwitter />, href: "#", name: "Twitter" },
    { icon: <FaLinkedin />, href: "#", name: "LinkedIn" },
    { icon: <FaGithub />, href: "#", name: "GitHub" },
  ];

  return (
    <footer className="w-full bg-linear-to-b from-amber-50 to-white border-t border-amber-100 relative overflow-hidden">
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-30"></div>
        
        <div className="absolute top-40 left-20 animate-float-slow opacity-10">
          <BsStars className="text-yellow-500 text-4xl" />
        </div>
        <div className="absolute bottom-40 right-20 animate-float-slow opacity-10">
          <HiOutlineSparkles className="text-amber-500 text-4xl" />
        </div>
      </div>
      
      {/* Main footer content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top section with logo and description */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-500 to-amber-500">
                  Verso
                </span>
                <span className="text-gray-900">Paid</span>
              </span>
            </div>
            
            <p className="text-sm leading-relaxed text-gray-600">
              Automating payment reconciliation and subscription management for 
              small recurring-collection groups in Kenya.
            </p>
            
            <div className="flex items-center gap-4 pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-500 hover:text-yellow-600 transition-colors duration-300 text-xl"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Trust badge */}
            <div className="flex items-center gap-2 bg-yellow-50 px-3 py-2 rounded-full">
              <span className="text-yellow-600 text-xs font-medium">⭐ Trusted by 500+ organizations</span>
            </div>
          </div>

          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-yellow-600 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-yellow-600 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-yellow-600 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-yellow-600 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-amber-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <div className="text-sm text-gray-500">
              © {currentYear} VersoPaid. All rights reserved.
            </div>
            
            {/* Payment methods indicator */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Accepted Payments:</span>
              <div className="flex gap-1">
                <span className="text-xs bg-white px-2 py-1 rounded border border-gray-200">M-Pesa</span>
                <span className="text-xs bg-white px-2 py-1 rounded border border-gray-200">Airtel</span>
                <span className="text-xs bg-white px-2 py-1 rounded border border-gray-200">Cards</span>
              </div>
            </div>
            
            {/* Additional links */}
            <div className="flex gap-6 text-xs text-gray-500">
              <a href="#" className="hover:text-yellow-600 transition-colors">Sitemap</a>
              <a href="#" className="hover:text-yellow-600 transition-colors">Accessibility</a>
              <a href="#" className="hover:text-yellow-600 transition-colors">Cookies</a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;