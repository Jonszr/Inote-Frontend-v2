import React from 'react'

const SearchBar = ({setPostsData, posts}) => {

  const search = (e)=>{
    e.preventDefault();
    console.log(e.target[0].value);
    const tempdata = posts.filter((post) => 
      post.title.toLowerCase().includes(e.target[0].value.toLowerCase())
    );
    setPostsData(tempdata);
  }
  return (
    <div className=" w-full flex flex-wrap items-end justify-evenly   rounded-3xl border shadow-md shadow-zinc-400 p-5 mt-10 mb-10 bg-white">
            <div className="title">
              <p className="text-4xl font-bold text-gray-800 mb-4">
                Searching With Title
              </p>
              <p className="hidden lg:flex text-2xl font-light text-gray-400">
                Display all posts have relative title.
              </p>
            </div>
            <div className="text-end  ">
              <form onSubmit={search} className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
                <div className=" flex items-center  ">
                  <input
                    type="text"
                    id=""
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    placeholder="Enter a title"
                  />
                </div>
                <button className="bg-indigo-600 px-8 py-3" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
  )
}

export default SearchBar