import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4 px-6 w-full z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Company Info */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-semibold">iphone Giveaway</h2>
          <p className="text-sm">© {new Date().getFullYear()} All rights reserved</p>
        </div>

        {/* Navigation Links */}
        <div className="mb-4 md:mb-0">
          <ul className="flex space-x-4 text-sm">
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg className="w-6 h-6 fill-current hover:text-blue-600" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.675 0h-21.35C.595 0 0 .594 0 1.325v21.351C0 23.406.595 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.892-4.788 4.656-4.788 1.324 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.764v2.314h3.587l-.467 3.622h-3.12V24h6.116C23.405 24 24 23.406 24 22.676V1.325C24 .594 23.405 0 22.675 0z" />
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <svg className="w-6 h-6 fill-current hover:text-blue-400" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.723-.951.564-2.005.974-3.127 1.195-.897-.956-2.178-1.554-3.594-1.554-2.717 0-4.92 2.203-4.92 4.917 0 .385.045.76.127 1.122C7.688 8.094 4.064 6.13 1.64 3.16c-.422.725-.664 1.562-.664 2.457 0 1.697.865 3.193 2.178 4.074-.803-.025-1.56-.246-2.223-.616v.062c0 2.37 1.688 4.348 3.925 4.798-.412.112-.847.171-1.296.171-.317 0-.625-.03-.928-.086.625 1.953 2.444 3.376 4.597 3.417-1.68 1.317-3.808 2.102-6.115 2.102-.398 0-.79-.023-1.177-.067 2.179 1.396 4.768 2.211 7.548 2.211 9.057 0 14.01-7.502 14.01-14.01 0-.213-.005-.426-.014-.637.962-.695 1.8-1.562 2.46-2.549z" />
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg className="w-6 h-6 fill-current hover:text-pink-600" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.055 1.97.24 2.419.512a4.92 4.92 0 0 1 1.789 1.788c.272.449.457 1.25.511 2.419.058 1.268.069 1.648.069 4.851s-.011 3.584-.069 4.85c-.054 1.17-.239 1.97-.511 2.419a4.922 4.922 0 0 1-1.788 1.789c-.449.272-1.25.457-2.419.511-1.268.058-1.648.07-4.851.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.239-2.419-.511a4.923 4.923 0 0 1-1.789-1.788c-.272-.449-.457-1.25-.511-2.419-.058-1.268-.07-1.648-.07-4.851s.012-3.584.07-4.85c.054-1.17.239-1.97.511-2.419a4.92 4.92 0 0 1 1.788-1.789c.449-.272 1.25-.457 2.419-.511C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.735 0 8.332.014 7.053.072 5.771.13 4.659.373 3.688.845a6.966 6.966 0 0 0-2.514 2.514C.676 4.33.433 5.441.375 6.723.316 8.002.302 8.405.302 12c0 3.595.014 3.998.073 5.278.058 1.282.3 2.393.76 3.364a6.967 6.967 0 0 0 2.514 2.514c.971.47 2.083.712 3.364.76C8.332 23.986 8.735 24 12 24c3.265 0 3.668-.014 4.947-.073 1.282-.058 2.393-.3 3.364-.76a6.965 6.965 0 0 0 2.514-2.514c.47-.971.712-2.083.76-3.364.059-1.28.073-1.683.073-5.278 0-3.595-.014-3.998-.073-5.278-.058-1.282-.3-2.393-.76-3.364a6.965 6.965 0 0 0-2.514-2.514C19.998.676 18.887.433 17.605.375 16.325.316 15.922.302 12 .302z" />
              <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0-2.88 1.44 1.44 0 0 0 0 2.88z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer