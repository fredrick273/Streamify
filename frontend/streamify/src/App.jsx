// src/App.js
import React,{ useState,useEffect,useRef } from "react";
import { BrowserRouter as Router, Routes, Route,Link, } from "react-router-dom";
import "./App.css";

import Home from "./pages/home";
import Songs from "./pages/songs";
import Playlist from "./pages/playlist";
import Search from "./pages/search";

function SideBar() {
  
    return (
      <>
    <div className="hidden flex-col text-sm sm:flex">
      <div className="space-y-3 rounded-md bg-white bg-opacity-10 p-3">
        <button className="flex items-center space-x-3 hover:text-white text-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="h-6 w-6"
          >
            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
          </svg>
          <Link to="/">Home</Link>
        </button>
        <button className="flex items-center space-x-3 hover:text-white text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="h-6 w-6"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
          </svg>
          <Link to="/songs">Songs</Link>
        </button>
        <button className="flex items-center space-x-3 hover:text-white text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="h-6 w-6"
          >
            <path
              fill-rule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <Link to="/search">Search</Link>
        </button>
        </div>
        <div className="mt-5 rounded-t bg-white bg-opacity-10 p-4">
              <div className="flex flex-row items-center space-x-3 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
                  ></path>
                </svg>
                <p>Your Library</p>
                <div className="flex-grow"></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-6 w-6 cursor-pointer hover:text-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="flex-grow space-y-3 overflow-y-auto rounded-b bg-white bg-opacity-10 p-4 scrollbar-thin scrollbar-thumb-gray-600 sm:w-[30vw] lg:w-[25vw]">
            </div>
          </div>
      </>
    );
  }
  
  function Control( {id} ){
  
    const PAUSE_ICON =  <svg onClick={playpause} stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" className="h-8 w-8 cursor-pointer text-gray-300 transition duration-300 hover:text-white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"> <path d="M3 1a1 1 0 0 1 1 1v12a1 1 0 0 1-2 0V2a1 1 0 0 1 1-1zm9 0a1 1 0 0 1 1 1v12a1 1 0 0 1-2 0V2a1 1 0 0 1 1-1z"/>  </svg>
    const PLAY_ICON =   <svg onClick={playpause} stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" className="h-8 w-8 cursor-pointer text-gray-300 transition duration-300 hover:text-white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"></path></svg>
  
    const [sliderValue, setSliderValue] = useState(0);
    
    const handleSliderChange = (event) => {
      console.log(parseInt(event.target.value, 10));
      const newSliderValue = parseInt(event.target.value, 10);
      setSliderValue(newSliderValue);
      const newSongTime = (newSliderValue / 100) * (duration / 1000); // Convert duration to seconds
      setsongtime(newSongTime);
      audio.current.currentTime = newSongTime;
    };
    
    
    const [songtime,setsongtime] = useState(0);
    const [duration,setduration] = useState(0);
    const [playstate,changeplaystate] = useState(false);
    const audio = useRef(null);

    function handleTimeUpdate(){
      setSliderValue((audio.current.currentTime / duration) * 100000);
      setsongtime(audio.current.currentTime)
    }
    function playpause() {
      if (playstate) {
        audio.current.pause();
      } else {
        audio.current.play();
      }
      changeplaystate(!playstate);
    }
    const [data, setData] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/songs/${id}/`);
          if (response.ok) {
            const result = await response.json();
            setData(result)
            console.log(result)
            setduration(result.duration)
            if (audio.current) {
              audio.current.src = result.song_url;
              audio.current.load();
              audio.current.addEventListener("timeupdate", handleTimeUpdate);
            }
            console.log(result)
          } else {
            console.error("Failed to fetch data");
          }
        } catch (error) {
          console.error("Error during data fetching", error);
        }
  
     
      };
      fetchData();
      return () => {
        if (audio.current) {
          audio.current.removeEventListener("timeupdate", handleTimeUpdate);
        }
      };
    }, [id]);
    return (
      <>
      <audio ref={audio} src={data ? data.song_url : ""} />
      <div className="fixed bottom-0 z-10 flex h-20 w-full flex-row items-center justify-between bg-gradient-to-b from-black to-gray-900 px-2 sm:px-5">
          <div className="flex flex-row items-center space-x-3">
            <img className="h-12 w-12 rounded-md bg-gray-300" src={data?.image} alt="" />
            <div className="flex flex-col"><p className="w-[9rem] truncate text-sm font-semibold text-gray-300">{data ? data.name:"No Track"}</p><p className="w-[9rem] truncate text-xs text-gray-400">{data ? data.artist_name:"No Track"}</p></div>
          </div>
          <div className="hidden flex-col items-center sm:flex">
            <div className="flex flex-row items-center space-x-3">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="h-4 w-4 cursor-pointer text-gray-300 transition duration-300 hover:text-white
                          false" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M17 17h-1.559l-9.7-10.673A1 1 0 0 0 5.001 6H2v2h2.559l4.09 4.5-4.09 4.501H2v2h3.001a1 1 0 0 0 .74-.327L10 13.987l4.259 4.686a1 1 0 0 0 .74.327H17v3l5-4-5-4v3z"></path><path d="M15.441 8H17v3l5-3.938L17 3v3h-2.001a1 1 0 0 0-.74.327l-3.368 3.707 1.48 1.346L15.441 8z"></path></svg>
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" className="h-5 w-5 cursor-pointer text-gray-300 transition duration-300 hover:text-white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M347.6 528.95l383.2 301.02c14.25 11.2 35.2 1.1 35.2-16.95V210.97c0-18.05-20.95-28.14-35.2-16.94L347.6 495.05a21.53 21.53 0 0 0 0 33.9M330 864h-64a8 8 0 0 1-8-8V168a8 8 0 0 1 8-8h64a8 8 0 0 1 8 8v688a8 8 0 0 1-8 8"></path></svg>
              
              {playstate ? PAUSE_ICON : PLAY_ICON}
              
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" className="h-5 w-5 cursor-pointer text-gray-300 transition duration-300 hover:text-white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M676.4 528.95L293.2 829.97c-14.25 11.2-35.2 1.1-35.2-16.95V210.97c0-18.05 20.95-28.14 35.2-16.94l383.2 301.02a21.53 21.53 0 0 1 0 33.9M694 864h64a8 8 0 0 0 8-8V168a8 8 0 0 0-8-8h-64a8 8 0 0 0-8 8v688a8 8 0 0 0 8 8"></path></svg>
              <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 15 15" className="h-4 w-4 cursor-pointer text-gray-300 transition duration-300 hover:text-white
                          false" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.35355 1.85355C3.54882 1.65829 3.54882 1.34171 3.35355 1.14645C3.15829 0.951184 2.84171 0.951184 2.64645 1.14645L0.646447 3.14645C0.451184 3.34171 0.451184 3.65829 0.646447 3.85355L2.64645 5.85355C2.84171 6.04882 3.15829 6.04882 3.35355 5.85355C3.54882 5.65829 3.54882 5.34171 3.35355 5.14645L2.20711 4H9.5C11.433 4 13 5.567 13 7.5C13 7.77614 13.2239 8 13.5 8C13.7761 8 14 7.77614 14 7.5C14 5.01472 11.9853 3 9.5 3H2.20711L3.35355 1.85355ZM2 7.5C2 7.22386 1.77614 7 1.5 7C1.22386 7 1 7.22386 1 7.5C1 9.98528 3.01472 12 5.5 12H12.7929L11.6464 13.1464C11.4512 13.3417 11.4512 13.6583 11.6464 13.8536C11.8417 14.0488 12.1583 14.0488 12.3536 13.8536L14.3536 11.8536C14.5488 11.6583 14.5488 11.3417 14.3536 11.1464L12.3536 9.14645C12.1583 8.95118 11.8417 8.95118 11.6464 9.14645C11.4512 9.34171 11.4512 9.65829 11.6464 9.85355L12.7929 11H5.5C3.567 11 2 9.433 2 7.5Z" fill="currentColor"></path></svg>
            </div>
            <div className="mt-1 flex flex-row items-center space-x-3 sm:w-[18rem] md:w-[25rem] lg:w-[32rem]">
              <p className="text-xs text-gray-300">{parseInt(songtime/60,10)}:{parseInt((songtime%60),10)}</p>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={handleSliderChange}
                className="w-full h-3 appearance-white bg-neutral-600 rounded-full outline-none focus:outline-none"
              />
              <p className="text-xs text-gray-300">{parseInt(duration/60000)}:{parseInt((duration/1000)%60)}</p>
            </div>
  
          </div>
          <div className="hidden flex-row items-center space-x-3 sm:flex sm:w-[6rem] md:w-[8rem]"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" aria-hidden="true" className="cursor-pointer text-gray-300 transition duration-300 hover:text-white" height="34" width="34" xmlns="http://www.w3.org/2000/svg"><path d="M5.625 3.75a2.625 2.625 0 100 5.25h12.75a2.625 2.625 0 000-5.25H5.625zM3.75 11.25a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zM3 15.75a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zM3.75 18.75a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75z"></path></svg><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" aria-hidden="true" className="cursor-pointer text-gray-300 transition duration-300 hover:text-white" height="34" width="34" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 001.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L20.56 12l1.72-1.72a.75.75 0 00-1.06-1.06l-1.72 1.72-1.72-1.72z"></path></svg></div>
        </div>
      </>
    );
  }

function App() {
  const [currentsong,selectsong] = useState(1);
  return (
    <div className="h-screen overflow-hidden bg-black">
    <main className="flex h-[90vh] w-full flex-row p-2 sm:p-5">
      <Router>
          <SideBar />
          <Routes>
                        <Route
                            exact
                            path="/"
                            element={<Home selectsong={selectsong} />}
                        ></Route>
                        <Route
                            exact
                            path="/songs"
                            element={<Songs selectsong={selectsong} />}
                        ></Route>
                        <Route
                            exact
                            path="/playlist/:id"
                            element={<Playlist selectsong={selectsong} />}
                        >
                        </Route>
                        <Route
                            exact
                            path="/search"
                            element={<Search />}
                        ></Route>
          </Routes>

    </Router>
    </main>
    <Control id={currentsong} />
  </div>
);

}

export default App;
