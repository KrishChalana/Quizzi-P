import "./dashboard.css";
import Navbar from "../Home/navbar";
import axios from "axios";
import { redirect, useNavigate } from "react-router";
import { useEffect } from "react";

function Dashboard() {
  
  let navigate = useNavigate();

  async function onSelectImageHandler(e) {
    e.preventDefault();
    console.log("hello");
    const file = e.target.file.files[0];
    const testName = e.target.test.value
console.log(testName);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("test", testName);

    let redirectUri = `/mcq/${testName}`;
    const result =  await axios.post(
      "http://localhost:8000/api/images",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    )
    
    if (result.status == 200){
      navigate(redirectUri)
    }



    


    // console.log(result.title);
  }

  return (
    <>
      <Navbar />

      <div className="h-[80vh] flex justify-center items-center flex-col gap-10">
      <h1 className="text-8xl text-center">Create Your Test Here!</h1>

      <form action="submit" onSubmit={onSelectImageHandler}>
        <div class="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl w-[100vw]">
          <div class="md:flex">
            <div class="w-full p-3">
              <div class="relative h-48 rounded-lg border-2 border-blue-500 bg-gray-50 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <div class="absolute flex flex-col items-center">
                  <img
                    alt="File Icon"
                    class="mb-3"
                    src="https://img.icons8.com/dusk/64/000000/file.png"
                  />
                  <span class="block text-gray-500 font-semibold">
                    Drag &amp; drop your files here
                  </span>
                  <span class="block text-gray-400 font-normal mt-1">
                    or click to upload
                  </span>
                </div>
            

                <input
                
                  name="file"
                  class="h-full w-full opacity-0 cursor-pointer"
                  type="file"
                />
              </div>
            </div>
          </div>
        </div>


        <input type="text" name="test" placeholder="Test Name" className="h-[5vh] w-full outline-4 font-light outline-black my-10  bg-gray-200 text-center rounded-2xl"/>



        <button type="submit" class="cssbuttons-io-button">
            Start?
          <div class="icon">
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </button>
      </form>
      </div>
    </>
  );
}

export default Dashboard;
