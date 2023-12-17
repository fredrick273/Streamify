import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


function Playlist( { selectsong} ) {
    const { id } = useParams();

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/playlist/${id}/`);
          if (response.ok) {
            const result = await response.json();
            setData(result);
            console.log(data)
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
        <div className="flex flex-grow flex-col overflow-y-auto rounded-md bg-white bg-opacity-10 scrollbar-hide sm:ml-3 no-scrollbar">
          <div className="flex flex-grow flex-col space-y-5 p-5">
            {isLoading ? (
              <p>Loading...</p>
            ) : data ? (
                <>
                <div className="flex flex-row space-x-5">
                <img
                        alt="Playlist"
                        loading="lazy"
                        width="200"
                        height="200"
                        decoding="async"
                        data-nimg="1"
                        className="rounded-md"
                        src={data.pic}
                      />
                <div className="flex flex-col space-y-5">
                <h1 className=" mt-7 font-bold text-white text-4xl">{data.name}</h1>
                <p className="font-semibold text-2xl text-gray-100">{data.description}</p>
                <p className="font-semibold text-xl text-gray-100">{data.songs.length} songs,  {parseInt(data.duration / 3600000)} hrs {parseInt((data.duration % 3600000)/60000)} mins</p>
                </div>
                </div>
               
              {data.songs.map((item) => (
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
                
              ))}
              </>
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
      </>
    );
  }
  
  export default Playlist;