import logo from './logo.svg';
import './App.css';
import axios,{Axios} from 'axios';
import { useEffect, useState } from 'react';

function App() {

  const [allmovie,setallmovie]=useState ([]) 
  const [movieName, setMovieName] = useState('');
//    console.log(movieName)
    let handleinput=(e)=>{
        // console.log(e.target.value)
        setMovieName(e.target.value)
    }
    let api;
    function display(movieName){
        // console.log("gg",movieName)
        if(!movieName){
            api = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1`
        }
        else{
            api =`https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=${movieName} `
        }
       axios.get(api)
        .then((ress)=>{
            setallmovie(ress.data.results)
      })
      .catch((error)=>{
        console.log(error)
      })
    }
    useEffect(()=>{
        display()

    },[])
    useEffect(() => {
        if (movieName !== '') {
          display(movieName);
        }
      }, [movieName]);
  return (
   <>
   <div className='max-w-[1200px] mt-[30px] mx-auto'>
    <h1 className='text-[30px] font-bold p-2'>Movie API</h1>
    <input type='text' onChange={handleinput} className='w-[80%] p-2 mt-[20px] border'placeholder='Enter Movie Name '/>

   </div>
   <div className='max-w-[89%] mx-auto grid lg:grid-cols-4 sm:grid-cols-2 mt-[12px] gap-[4px] '>

{allmovie.length>0?
allmovie.map((v,i)=>{
    // console.log(v)
    return(
        <div class=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
            <img class="rounded-t-lg" src={`https://image.tmdb.org/t/p/w1280${v.poster_path}`}alt="" />
        </a>
        <div class="p-5">
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">  {v.title} </h5>
            </a>
           
            <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Released Date: {v.release_date} 
            </a>
        </div>
    </div>
    )
}):"Please Wait......."}
  








   </div>
   </>
  );
}

export default App;
