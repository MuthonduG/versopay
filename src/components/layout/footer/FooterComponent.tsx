import { 
  FaTwitter, 
  FaLinkedin, 
  FaGithub, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaHeart 
} from 'react-icons/fa';
import { BsShieldCheck, BsLightningCharge } from 'react-icons/bs';
import { MdOutlineSecurity } from 'react-icons/md';

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

  const contactInfo = [
    { icon: <FaEnvelope />, text: "hello@versopaid.com", href: "mailto:hello@versopaid.com" },
    { icon: <FaPhone />, text: "+254 (0) 700 000 000", href: "tel:+254700000000" },
    { icon: <FaMapMarkerAlt />, text: "Nairobi, Kenya", href: "#" }
  ];

  return (
    <footer className="w-full bg-linear-to-b from-blue-50 to-white border-t border-blue-100">
      
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top section with logo and description */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-2">
              <BsLightningCharge className="text-blue-600 text-3xl" />
              <span className="text-2xl font-bold text-gray-900">
                Verso<span className="text-blue-600">Paid</span>
              </span>
            </div>
            
            <p className="text-sm leading-relaxed text-gray-600">
              Automating payment reconciliation and subscription management for 
              small recurring-collection groups in Kenya.
            </p>
            
            {/* Security badge */}
            <div className="flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 w-fit">
              <MdOutlineSecurity className="text-blue-600" />
              <span className="text-xs text-gray-700 font-medium">Bank-Grade Security</span>
            </div>
            
            {/* Social links */}
            <div className="flex items-center gap-4 pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-500 hover:text-blue-600 transition-colors duration-300 text-xl"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Product */}
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact information row */}
        <div className="border-t border-blue-200 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap justify-center gap-6">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300"
                >
                  <span className="text-blue-600">{item.icon}</span>
                  {item.text}
                </a>
              ))}
            </div>
            
            {/* Trust badges */}
            <div className="flex items-center gap-4">
              <BsShieldCheck className="text-green-600 text-xl" />
              <span className="text-xs text-gray-500">ISO 27001 Certified</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-blue-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <div className="text-sm text-gray-500">
              © {currentYear} VersoPaid. All rights reserved.
            </div>
            
            {/* Made with love */}
            <div className="flex items-center gap-1 text-sm text-gray-500">
              Made with <FaHeart className="text-red-500 mx-1" /> in Kenya for Kenya
            </div>
            
            {/* Additional links */}
            <div className="flex gap-6 text-xs text-gray-500">
              <a href="#" className="hover:text-blue-600 transition-colors">Sitemap</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Accessibility</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Cookies</a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            VersoPaid is a financial technology company, not a bank. We integrate with licensed 
            payment gateways and banks to provide reconciliation services. All transactions are 
            processed securely by our partner institutions.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;