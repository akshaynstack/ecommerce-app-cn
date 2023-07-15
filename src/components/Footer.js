import React from 'react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white shadow dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Lorem Ipsum™</a>. All Rights Reserved.</span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="https://github.com/akshaynstack" className="-mx-3 mr-2 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white">Github</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/akshaynceo" className="-mx-3 mr-2 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white">Linkedin</a>
          </li>
          <li>
            <a href="mailto:akshaynceo@gmail.com" className="-mx-3 mr-2 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white">Contact</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
