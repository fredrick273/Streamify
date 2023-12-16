import React,{ useState,useEffect } from "react";

function PlaylistMix(){

    const [data, setData] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://127.0.0.1:8000/api/playlist/");
          if (response.ok) {
            const result = await response.json();
            setData(result);
          } else {
            console.error("Failed to fetch data");
          }
        } catch (error) {
          console.error("Error during data fetching", error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div className="relative z-0 mt-5 grid auto-cols-[12rem] grid-flow-col gap-6 overflow-x-auto px-5 pt-2 scrollbar-hide">
      
      {data && data.length > 0 ? (
    <div className="group col-span-1 cursor-pointer rounded-md bg-neutral-600 bg-opacity-10 p-3 transition-all duration-300 ease-in-out hover:bg-opacity-20">
  
      {data.slice(0, 5).map(item => (
        <div key={item.id} className="flex w-full flex-col gap-2">
          <div className="group relative aspect-square w-full overflow-hidden rounded-xl shadow-lg shadow-neutral-900 transition-all duration-300 ease-in-out">
            <img
              alt="Playlist"
              loading="lazy"
              width="300"
              height="300"
              decoding="async"
              data-nimg="1"
              className="rounded-md"
              src={item.pic}
            />
            <div className="absolute bottom-3 right-3 hidden flex-row items-center gap-2 group-hover:flex"></div>
          </div>
          <h1 className="mt-5 truncate text-lg font-bold text-white">{item.name}</h1>
          <p className="mt-2 line-clamp-3 text-sm font-semibold text-gray-400">{item.description}</p>
        </div>
      ))}
    </div>
  ) : (
    <p>No data available</p>
  )}    
      </div>
    );
  }
  
  function SongMix( {selectsong}){
    
    const [data, setData] = useState(null);
  
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
        }
      };
  
      fetchData();
    }, []);
    return (
      <>
      {data && data.length > 0 ? (
      <div className="relative z-0 mt-5 grid auto-cols-[12rem] grid-flow-col gap-6 overflow-x-auto px-5 pt-2 scrollbar-hide no-scrollbar">
      {data.slice(0, 5).map(item => (
        <div id={item.id  } key={item.id} onClick={() => selectsong(item.id)} className="flex w-full flex-col gap-2">
          <div className="group col-span-1 cursor-pointer rounded-md bg-neutral-600 bg-opacity-10 p-3 transition-all duration-300 ease-in-out hover:bg-opacity-20">
  
          <div className="group relative aspect-square w-full overflow-hidden rounded-xl shadow-lg shadow-neutral-900 transition-all duration-300 ease-in-out">
            <img
              alt="Playlist"
              loading="lazy"
              width="300"
              height="300"
              decoding="async"
              data-nimg="1"
              className="rounded-md"
              src={item.image}
            />
            <div className="absolute bottom-3 right-3 hidden flex-row items-center gap-2 group-hover:flex"></div>
          </div>
          <h1 className="mt-5 truncate text-lg font-bold text-white">{item.name}</h1>
          <p className="mt-2 line-clamp-3 text-sm font-semibold text-gray-400">{item.artist_name}</p>
        </div>
        </div>
      ))}
    </div>
  ) : (
    <p>No data available</p>
  )}
    </>
    );
  }

function Home({selectsong}){
    return (
        <>
        <div className="flex flex-grow flex-col overflow-y-auto rounded-md bg-white bg-opacity-10 scrollbar-hide sm:ml-3">
              <div className="sticky top-0 z-50 flex flex-row items-center justify-between p-3 bg-opacity-100 backdrop-blur-sm backdrop-filter undefined">
              <div className="hidden flex-row items-center space-x-4 px-5 sm:flex"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-8 w-8 cursor-pointer rounded-full bg-black bg-opacity-50 p-1 text-gray-200 transition duration-300 hover:bg-opacity-75 hover:text-white opacity-50"><path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clip-rule="evenodd"></path></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-8 w-8 cursor-pointer rounded-full bg-black bg-opacity-50 p-1 text-gray-200 transition duration-300 hover:bg-opacity-75 hover:text-white "><path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clip-rule="evenodd"></path></svg></div>
              <div className="flex flex-row items-center space-x-4 px-5 sm:hidden"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-8 w-8 cursor-pointer rounded-full bg-black bg-opacity-50 p-2 text-gray-200 transition duration-300 hover:bg-opacity-75 hover:text-white"><path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path><path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-8 w-8 cursor-pointer rounded-full bg-black bg-opacity-50 p-2 text-gray-200 transition duration-300 hover:bg-opacity-75 hover:text-white"><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-8 w-8 cursor-pointer rounded-full bg-black bg-opacity-50 p-2 text-gray-200 transition duration-300 hover:bg-opacity-75 hover:text-white"><path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clip-rule="evenodd"></path></svg></div>
              <div className="flex flex-row items-center space-x-2 px-5"><div className="flex cursor-pointer flex-row items-center space-x-3 rounded-full bg-neutral-600 bg-opacity-50 p-1 transition duration-300 hover:bg-opacity-70" type="button" id="radix-:r0:" aria-haspopup="menu" aria-expanded="false" data-state="closed">
              <img
                alt="User"
                loading="lazy"
                width="30"
                height="30"
                decoding="async"
                data-nimg="1"
                className="rounded-full object-contain"
                src="https://i.scdn.co/image/ab67757000003b82444dc2f35de77b6e909f9e80"
                style={{ color: 'transparent' }}
              />
              <p className="text-sm text-gray-200">Fredrick</p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4 text-gray-200"><path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clip-rule="evenodd"></path></svg></div></div>
              </div>
              <div className="flex flex-grow flex-col space-y-10 p-5">
              <h1 className="px-5 text-3xl font-bold text-neutral-100">Your Top Mixes</h1>
             
              <PlaylistMix />

              </div>
              <div className="flex flex-grow flex-col space-y-10 p-5">
              <h1 className="px-5 text-3xl font-bold text-neutral-100">Your Top Mixes</h1>
              <SongMix selectsong={selectsong}/>
              </div>
            </div>
        </>
    );
}

export default Home;