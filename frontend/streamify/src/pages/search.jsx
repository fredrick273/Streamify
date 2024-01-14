import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


function Search(){

  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/songs/?search=${searchValue}`);
        if (response.ok) {
          const result = await response.json();
          setData(result);
          console.log(result);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error during data fetching", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchValue.trim() !== "") {
      fetchData();
    } else {
      setData(null);
    }
  }, [searchValue]);

  return (
    <div className="flex flex-grow flex-col overflow-y-auto rounded-md bg-white bg-opacity-10 scrollbar-hide sm:ml-3 no-scrollbar">
      <div className="flex flex-grow flex-col space-y-5 p-5">
        <input
          type="text"
          name=""
          id=""
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search songs..."
        />
           {isLoading ? (
              <p>Loading...</p>
            ) : data ? (
              <>
              {data.map((item) => (
                <div className="w-full"  key={item.id}>
                  <div className="cursor-pointer rounded-md bg-neutral-600 bg-opacity-10 p-3 transition-all duration-300 ease-in-out hover:bg-opacity-20">
                    <div className="flex flex-row space-x-4 items-center">
                      <img
                        alt="Playlist"
                        loading="lazy"
                        width="50"
                        height="50"
                        decoding="async"
                        data-nimg="1"
                        className="rounded-md"
                        src={item.image}
                      />
                      <div className="flex flex-col">
                        <h1 className="truncate text-lg font-semibold text-white">
                          {item.name}
                        </h1>
                        <p className="line-clamp-3 text-lg font-semibold text-gray-400">
                          {item.artist_name}
                        </p>
                        <p className="line-clamp-3 text-lg font-semibold text-gray-400">
                          {`${parseInt(item.duration / 60000)}:${parseInt(
                            (item.duration / 1000) % 60
                          )}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
              ))}
              </>
            ) :(
              <p>None</p>
            ) }
              
          </div>
          </div>
      
        
    );
}

export default Search;