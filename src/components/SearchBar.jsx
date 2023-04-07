import React from "react";

function SearchBar() {
  return (
    <div className="w-full mx-auto flex items-center justify-center mt-16 pt-8 pb-4 border-t-[1px] border-[#313131]">
      <div className="max-w-[1400px] w-full px-2 md:px-6 lg:px-8">
        <form class="flex items-center">
          <label for="simple-search" class="sr-only">
            Search
          </label>
          <div class="relative w-full">
            <input
              type="text"
              id="simple-search"
              class="bg-[#313131] text-secondary-content text-sm rounded-lg focus:ring-primary focus:ring-1 border-none block w-full pl-4 p-2.5 placeholder:text-gray-400 placeholder:font-medium"
              placeholder="Search"
              required
            />
          </div>
          <button
            type="submit"
            class="p-2.5 ml-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-focus focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <span class="sr-only">Search</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
