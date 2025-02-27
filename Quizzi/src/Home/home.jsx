import { useState } from 'react'
import './home.css'
function Home() {

  return (
    <>
   
<div id='home-page-container' className=' w-full h-[100vh]'>
  <div className='flex justify-around  h-[75vh] items-center flex-col '>
    <h1 className='pt-3 text-9xl text-center text-gray-800'>Quizzi</h1>
    <div>

    <h3 className='text-4xl text-justify sour-font'>Want Your Child To Give Test Digitally?</h3>
    <h3 className='text-2xl text-center sour-font'>Your Tests , Our System</h3>


    </div>

    
  </div>
  
<footer class="mouse relative left-[50%] top-[10%]">
  <div class="scroll"></div>

</footer>
</div>



<div className='h-[100vh] mt-10 flex justify-center items-center relative left-[1.5%]'>

<aside class="bg-black text-white p-6 rounded-lg w-full max-w-lg font-mono">
  <div class="flex justify-between items-center">
    <div class="flex space-x-2 text-red-500">
      <div class="w-3 h-3 rounded-full bg-red-500"></div>
      <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
      <div class="w-3 h-3 rounded-full bg-green-500"></div>
    </div>
    <p class="text-sm">bash</p>
  </div>
  <div class="mt-4">
    <p class="text-green-400">$ install Quiz App? That Could Help Me With Giving Computer Based Test</p>
    <p class="text-white">+ Yes, You can just Click Photos of mocks or pyq you have physically and upload it to us we would create the CBT for You!</p>
    <p class="text-white">Succesfully Created in Few Seconds</p>
    <p class="text-green-400">$</p>
  </div>
</aside>


</div>

<div className='flex justify-center '>
<button className=' button font-semibold sour-gummy-font'>Sign Up</button>

</div>



    </>
  )
}

export default Home
