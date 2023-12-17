import React, { useState, useEffect } from "react";

function Songs( {selectsong} ) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/songs/");
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error during data fetching", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-grow flex-col overflow-y-auto rounded-md bg-white bg-opacity-10 scrollbar-hide sm:ml-3">
        
        <div className="sticky top-0 z-50 flex flex-row items-center justify-between p-3 bg-opacity-100 backdrop-blur-sm backdrop-filter undefined">
          {/* User Info Section */}
          <div className="flex flex-row items-center space-x-2 px-5">
            <div className="flex cursor-pointer flex-row items-center space-x-3 rounded-full bg-neutral-600 bg-opacity-50 p-1 transition duration-300 hover:bg-opacity-70" type="button" id="radix-:r0:" aria-haspopup="menu" aria-expanded="false" data-state="closed">
              <img
                alt="User"
                loading="lazy"
                width="30"
                height="30"
                decoding="async"
                data-nimg="1"
                className="rounded-full object-contain"
                src="https://i.scdn.co/image/ab67757000003b82444dc2f35de77b6e909f9e80"
              />
              <p className="text-sm text-gray-200">Fredrick</p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4 text-gray-200">
                <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="flex flex-grow flex-col space-y-5 p-5">
          {isLoading ? (
            <p>Loading...</p>
          ) : data && data.length > 0 ? (
            data.map((item) => (
              <div className="w-full" onClick={() => selectsong(item.id)} key={item.id}>
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
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Songs;
