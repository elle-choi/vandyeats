import React from "react";
import Navbar from "./NavBar.js";
import background from "./linkedin-cover.jpg"
import "./HomePage.css";

const Home = () => {
    return (
      <div class="w-screen h-screen flex flex-col"> 
        <Navbar />

        <div class='bg-[rgb(254,249,240)] flex flex-grow w-full mt-16'>
          <div class='w-3/12 border-r border-gray-400 my-6'>
            
            <div class="flex w-full items-center">
              <a class='w-5 h-5 flex ml-2'> 
                  <svg class='w-3 h-3' fill="#000000" viewBox="0 0 330 330" xmlSpace="preserve">
                      <path id="XMLID_92_" d="M111.213,165.004L250.607,25.607c5.858-5.858,5.858-15.355,0-21.213c-5.858-5.858-15.355-5.858-21.213,0.001l-150,150.004C76.58,157.211,75,161.026,75,165.004c0,3.979,1.581,7.794,4.394,10.607l150,149.996C232.322,328.536,236.161,330,240,330s7.678-1.464,10.607-4.394c5.858-5.858,5.858-15.355,0-21.213L111.213,165.004z" stroke-width="5" />
                  </svg>
              </a>
              <h1 class='text-[#212121] font-bold ml-4'>Home</h1>
            </div>
            
            <div class='flex flex-col flex-grow mb-4 '>
              <div class='ml-10 flex items-center my-3'>
                <div class='w-16 h-16 flex justify-center items-center'>
                  <svg class='w-12 h-12' fill="#718096" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" enable-background="new 0 0 50 50 ">
                    <path d="M9.6 40.4l2.5-9.9L27 15.6l7.4 7.4-14.9 14.9-9.9 2.5zm4.3-8.9l-1.5 6.1 6.1-1.5L31.6 23 27 18.4 13.9 31.5z"/>
                    <path d="M17.8 37.3c-.6-2.5-2.6-4.5-5.1-5.1l.5-1.9c3.2.8 5.7 3.3 6.5 6.5l-1.9.5z"/>
                    <path d="M29.298 19.287l1.414 1.414-13.01 13.02-1.414-1.412z"/><path d="M11 39l2.9-.7c-.3-1.1-1.1-1.9-2.2-2.2L11 39z"/>
                    <path d="M35 22.4L27.6 15l3-3 .5.1c3.6.5 6.4 3.3 6.9 6.9l.1.5-3.1 2.9zM30.4 15l4.6 4.6.9-.9c-.5-2.3-2.3-4.1-4.6-4.6l-.9.9z"/>
                  </svg>
                </div>
                <p class='text-[#718096] font-bold'>Edit Profile</p>
              </div>
              <div class='ml-10 flex items-center my-3'>
                <div class='w-16 h-16 flex justify-center items-center'>
                  <svg class='w-8 h-8' fill="#718096" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792">
                      <path d="M1420 128q23 0 44 9 33 13 52.5 41t19.5 62v1289q0 34-19.5 62t-52.5 41q-19 8-44 8-48 0-83-32l-441-424-441 424q-36 33-83 33-23 0-44-9-33-13-52.5-41t-19.5-62V240q0-34 19.5-62t52.5-41q21-9 44-9h1048z"/>
                  </svg>
                </div>
                <p class='text-[#718096] font-bold'>Save Blogs</p>
              </div>
              <div class='ml-10 flex items-center my-3'>
                <div class='w-16 h-16 flex justify-center items-center'>               
                  <svg class='w-12 h-12' fill="#718096" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" enable-background="new 0 0 50 50">
                    <path d="M34 23h-2v-4c0-3.9-3.1-7-7-7s-7 3.1-7 7v4h-2v-4c0-5 4-9 9-9s9 4 9 9v4z"/><path d="M33 40H17c-1.7 0-3-1.3-3-3V25c0-1.7 1.3-3 3-3h16c1.7 0 3 1.3 3 3v12c0 1.7-1.3 3-3 3zM17 24c-.6 0-1 .4-1 1v12c0 .6.4 1 1 1h16c.6 0 1-.4 1-1V25c0-.6-.4-1-1-1H17z"/><circle cx="25" cy="28" r="2"/><path d="M25.5 28h-1l-1 6h3z"/>
                  </svg>
                </div>
                <p class='text-[#718096] font-bold'>Security</p>
              </div>
              <div class='ml-10 flex items-center my-3'>
                <div class='w-16 h-16 flex justify-center items-center'>
                <svg class='w-12 h-12' fill="#718096" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 70 70" viewBox="0 0 70 70" id="setting"><path d="M58.0959473,39.0869141c0.4135742-0.1328125,0.6938477-0.5175781,0.6938477-0.9521484v-6.2402344 c0-0.4345703-0.2807617-0.8193359-0.6943359-0.9521484l-5.8862305-1.8876953
                    c-0.2607422-0.7246094-0.527832-1.3701172-0.8081055-1.9541016l2.8291016-5.5195313
                    c0.1977539-0.3857422,0.1240234-0.8554688-0.1821289-1.1621094l-4.4101563-4.4199219
                    c-0.3066406-0.3085938-0.7758789-0.3808594-1.1621094-0.1845703l-5.5205078,2.8154297
                    c-0.6206055-0.3095703-1.2827148-0.5859375-1.9785156-0.8261719l-1.8842773-5.8935547
                    c-0.1328125-0.4140625-0.5175781-0.6953125-0.9526367-0.6953125h-6.2397461c-0.4335938,0-0.8178711,0.2792969-0.9516602,0.6923828
                    l-1.9047852,5.890625c-0.5966797,0.2070313-1.2832031,0.4716797-1.9794922,0.8193359l-5.4868164-2.8222656
                    c-0.3876953-0.1982422-0.8583984-0.1240234-1.1655273,0.1835938l-4.4199219,4.4306641
                    c-0.3056641,0.3066406-0.3793945,0.7744141-0.1826172,1.1601563l2.7973633,5.484375
                    c-0.3144531,0.6396484-0.5869141,1.3017578-0.8139648,1.9775391l-5.8696289,1.8916016
                    c-0.4121094,0.1328125-0.6918945,0.515625-0.6933594,0.9492188l-0.0195313,6.2402344
                    c-0.0014648,0.4345703,0.277832,0.8193359,0.690918,0.9541016l5.8930664,1.9140625
                    c0.2246094,0.6328125,0.4916992,1.2705078,0.8178711,1.9541016l-2.8125,5.5048828
                    c-0.1967773,0.3857422-0.1235352,0.8535156,0.1821289,1.1601563l4.3999023,4.4199219
                    c0.3061523,0.3076172,0.7758789,0.3857422,1.1621094,0.1855469l5.5175781-2.8095703
                    c0.6499023,0.3183594,1.2954102,0.5888672,1.9541016,0.8183594l1.9140625,5.8808594
                    c0.1337891,0.4121094,0.5175781,0.6904297,0.9506836,0.6904297h6.2397461c0.4331055,0,0.8168945-0.2783203,0.9506836-0.6904297
                    l1.9160156-5.8847656c0.6914063-0.2451172,1.3354492-0.5107422,1.9482422-0.8046875l5.5107422,2.8105469
                    c0.3876953,0.1962891,0.8540039,0.1220703,1.1611328-0.1826172l4.409668-4.4003906
                    c0.3061523-0.3056641,0.3813477-0.7744141,0.1850586-1.1601563l-2.8071289-5.5322266
                    c0.2939453-0.5927734,0.5625-1.2402344,0.8129883-1.9589844L58.0959473,39.0869141z M49.3781738,43.3867188l2.7114258,5.3427734
                    l-3.3818359,3.375l-5.3129883-2.7099609c-0.2880859-0.1484375-0.6274414-0.1464844-0.9135742,0.0019531
                    c-0.7924805,0.4101563-1.6445313,0.7626953-2.6040039,1.078125c-0.3022461,0.0996094-0.5395508,0.3378906-0.6376953,0.640625
                    l-1.8457031,5.6699219h-4.7875977l-1.8457031-5.6699219c-0.0996094-0.3066406-0.3417969-0.546875-0.6494141-0.6435547
                    c-0.8764648-0.2773438-1.7231445-0.6318359-2.5883789-1.0839844c-0.2861328-0.1484375-0.6279297-0.1513672-0.9165039-0.0039063
                    l-5.3212891,2.7089844l-3.3740234-3.3896484l2.7094727-5.3037109c0.1445313-0.2832031,0.1459961-0.6181641,0.0039063-0.9023438
                    c-0.4750977-0.9501953-0.8222656-1.7822266-1.0927734-2.6201172c-0.0986328-0.3046875-0.3374023-0.5439453-0.6425781-0.6435547
                    l-5.6762695-1.84375l0.0146484-4.7851563l5.6694336-1.8271484c0.3134766-0.1015625,0.5571289-0.3505859,0.6513672-0.6660156
                    c0.2675781-0.8945313,0.625-1.7636719,1.0639648-2.5859375c0.1538086-0.2880859,0.1572266-0.6337891,0.0083008-0.9248047
                    l-2.699707-5.2929688l3.3911133-3.3994141l5.3007813,2.7265625c0.2983398,0.1513672,0.6523438,0.1464844,0.9443359-0.015625
                    c0.7163086-0.3994141,1.4916992-0.7236328,2.59375-1.0839844c0.3041992-0.0986328,0.5424805-0.3378906,0.6411133-0.6425781
                    l1.8359375-5.6777344h4.7822266l1.8173828,5.6845703c0.0996094,0.3105469,0.34375,0.5527344,0.6542969,0.6494141
                    c0.9379883,0.2929688,1.809082,0.6582031,2.5888672,1.0839844c0.2900391,0.1572266,0.6396484,0.1630859,0.9335938,0.0126953
                    l5.3320313-2.71875l3.3823242,3.3896484l-2.7285156,5.3222656c-0.1479492,0.2890625-0.1464844,0.6318359,0.0039063,0.9189453
                    c0.3818359,0.7314453,0.7382813,1.5878906,1.0893555,2.6191406c0.1020508,0.2998047,0.3398438,0.5332031,0.6411133,0.6298828
                    l5.6655273,1.8173828V37.40625l-5.6757813,1.8261719c-0.3066406,0.0986328-0.5463867,0.3388672-0.6455078,0.6445313
                    c-0.3237305,1.0029297-0.6757813,1.8466797-1.0761719,2.5771484C49.2341309,42.7441406,49.2287598,43.0927734,49.3781738,43.3867188
                    z"></path><path d="M36.2541504,25.5644531c-5.2006836-0.6933594-9.9995117,2.9775391-10.6933594,8.1796875
                    c-0.3364258,2.5244141,0.3271484,5.0292969,1.8691406,7.0517578c1.5439453,2.0244141,3.7836914,3.3251953,6.3076172,3.6611328
                    c0.425293,0.0566406,0.8476563,0.0839844,1.265625,0.0839844c4.7050781,0,8.8120117-3.4921875,9.449707-8.2802734
                    C45.1462402,31.0585938,41.4685059,26.2597656,36.2541504,25.5644531z M42.470459,35.9970703
                    c-0.5483398,4.1201172-4.3393555,7.0273438-8.4692383,6.4775391c-1.9926758-0.265625-3.7617188-1.2919922-4.9804688-2.8916016
                    c-1.21875-1.5986328-1.7436523-3.578125-1.4775391-5.5751953c0.5029297-3.7744141,3.7402344-6.5273438,7.4492188-6.5273438
                    c0.3295898,0,0.6625977,0.0214844,0.9975586,0.0664063C40.111084,28.0966797,43.0178223,31.8867188,42.470459,35.9970703z"></path>
                    </svg>
                </div>
                <p class='text-[#718096] font-bold'>Settings</p>
              </div>
              <div class='ml-10 flex items-center my-3'>
                <div class='w-16 h-16 flex justify-center items-center'>
                  <svg class='w-12 h-12' fill="#718096" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
                    <defs><clipPath><path d="m22.2 686.12h1447.73v-667.19h-1447.73v667.19"/></clipPath><clipPath><path fill="#718096" d="m7 1023.36h1v1h-1z"/></clipPath><clipPath><path d="m0 706.47h1490.93v-706.47h-1490.93v706.47"/></clipPath><clipPath><path fill="#aade87" fill-opacity=".472" d="m-6 1028.36h32v32h-32z"/></clipPath><clipPath><path fill="#00f" fill-opacity=".514" d="m-7 1024.36h34v34h-34z"/></clipPath><clipPath><path fill="#718096" d="m7 1023.36h1v1h-1z"/></clipPath></defs><path d="M11 3A8 8 0 0 0 3 11 8 8 0 0 0 11 19 8 8 0 0 0 19 11 8 8 0 0 0 11 3M10.994 6.5C11.758 6.5 12.379 6.719 12.857 7.158 13.336 7.589 13.576 8.142 13.576 8.816 13.576 9.109 13.495 9.406 13.336 9.707 13.176 10.01 13.03 10.223 12.908 10.354 12.791 10.475 12.623 10.635 12.404 10.83L12.342 10.891C11.83 11.338 11.572 11.785 11.572 12.232V12.719H10.389V12.146C10.389 11.781 10.469 11.467 10.629 11.207 10.788 10.939 11.07 10.625 11.473 10.268 11.699 10.06 11.859 9.914 11.951 9.816 12.05 9.711 12.148 9.569 12.24 9.391 12.341 9.204 12.393 9.01 12.393 8.816 12.393 8.442 12.266 8.142 12.01 7.914 11.77 7.686 11.431 7.572 10.994 7.572 10.272 7.572 9.776 7.964 9.508 8.744L8.424 8.305C8.6 7.841 8.904 7.426 9.332 7.06 9.769 6.687 10.322 6.5 10.994 6.5M10.98 13.842C11.224 13.842 11.426 13.923 11.586 14.09 11.754 14.249 11.838 14.442 11.838 14.67 11.838 14.898 11.754 15.09 11.586 15.256 11.426 15.418 11.224 15.5 10.98 15.5 10.737 15.5 10.531 15.418 10.363 15.256 10.204 15.09 10.125 14.898 10.125 14.67 10.125 14.442 10.204 14.249 10.363 14.09 10.531 13.923 10.737 13.842 10.98 13.842" transform="translate(-.002.008)" fill="#4d4d4d" fill-rule="evenodd"/>
                  </svg>
                </div>
                <p class='text-[#718096] font-bold'>Help</p>
              </div>
            </div>
           
          </div>
            <div class='w-9/12 flex flex-col flex-grow'>
                
                <div class="h-56 w-9/12 absolute flex items-end">
                  <img
                    class="object-cover ml-10 mb-2 h-20 w-20 rounded-full"
                    src="https://i.pinimg.com/564x/4c/c9/a1/4cc9a1c066353c07bdc1b52c47cee1eb.jpg"
                    alt=""
                  />
                </div>
                
                <div class="w-full h-56">
                  <div class="h-3/4 w-full flex justify-between items-baseline px-6 pt-6">
                    <img src={background} class="w-full h-full" />
                  </div>
                  
                  <div class=" h-1/4 w-full flex justify-end ">
                    <div class="h-auto w-4/6 flex flex-col">
                      <div class="text-[#212121] font-bold text-xl pl-32">Naeun Son</div>
                      <div class="text-gray-500 text-xs pl-36">Class of 2024</div>
                    </div>
                    <div class="h-auto w-2/6 flex justify-center items-center">
                      <button class="bg-[#212121]  text-white font-bold text-xs mb-20 mr-3" type="button">SignOut</button>
                      <button class="text-[#212121] font-bold text-xs border-2 border-[#212121] mb-20 mr-6 hover:bg-[#212121]" type="button">Edit Profile</button>
                    </div>           
                  </div>     
                </div>
                <div class='w-full  flex flex-grow'>
                  <div class='w-2/6 h-full flex  justify-center items-center'>
                    <div class='h-5/6 flex flex-col w-5/6 border-2  justify-center border-gray-600 rounded-md shadow-xl translate-y-2'>
                      <h1 class="text-[#212121] pl-4 mt-4 mb-10 font-bold text-xl w-full">About</h1>
                      <div class="flex w-full my-2">    
                        <svg class='w-5 h-5 mx-4 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="person"><g data-name="Layer 2"><path d="M12 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm6 10a1 1 0 0 0 1-1 7 7 0 0 0-14 0 1 1 0 0 0 1 1z" data-name="person"></path></g></svg>
                        <h5 class='text-[#212121] text-sm '>Felmale</h5>
                      </div>    
                      <div class="flex w-full my-2">    
                        <svg class='w-5 h-5 mx-4' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="cake"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M12.68 5.88c.7-.24 1.22-.9 1.3-1.64.05-.47-.05-.91-.28-1.27L12.42.75c-.19-.33-.67-.33-.87 0l-1.28 2.22c-.17.3-.27.65-.27 1.03 0 1.32 1.3 2.35 2.68 1.88zm3.85 10.04l-1-1-1.08 1.07c-1.3 1.3-3.58 1.31-4.89 0l-1.07-1.07-1.09 1.07C6.75 16.64 5.88 17 4.96 17c-.73 0-1.4-.23-1.96-.61V20c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-3.61c-.75.51-1.71.75-2.74.52-.66-.14-1.25-.51-1.73-.99zM18 9h-5V8c0-.55-.45-1-1-1s-1 .45-1 1v1H6c-1.66 0-3 1.34-3 3v1.46c0 .85.5 1.67 1.31 1.94.73.24 1.52.06 2.03-.46l2.14-2.13 2.13 2.13c.76.76 2.01.76 2.77 0l2.14-2.13 2.13 2.13c.43.43 1.03.63 1.65.55.99-.13 1.69-1.06 1.69-2.06v-1.42C21 10.34 19.66 9 18 9z"></path></svg>
                        <h5 class='text-[#212121] text-sm '>Born Jun 18, 2002</h5>
                      </div>   
                      <div class="flex w-full my-2">    
                        <svg class='w-5 h-5 mx-4' xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 60 60" viewBox="0 0 60 60" id="location-pin"><path d="M30,6c-10.2624016,0-18.6144142,8.3520117-18.6144142,18.6144142c0,10.0127945,17.1840229,28.3103905,17.9136333,29.0783806
                            C29.4816208,53.8848038,29.7407818,54,30,54s0.5183792-0.1151962,0.7007809-0.3072052
                            c0.7296104-0.7679901,17.9136333-19.0655861,17.9136333-29.0783806C48.6144142,14.3520117,40.2624016,6,30,6z M30,32.5359383
                            c-4.3729687,0-7.9307804-3.5535946-7.9307804-7.9214077c0-4.3729687,3.5578117-7.9307804,7.9307804-7.9307804
                            c4.373436,0,7.9312515,3.5578117,7.9312515,7.9307804C37.9312515,28.9823437,34.373436,32.5359383,30,32.5359383z"></path></svg>
                        <h5 class='text-[#212121] text-sm '>Venderbilt</h5>
                      </div>  
                      <div class="flex w-full my-2">    
                        <svg class='w-5 h-5 mx-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="mail"><path fill="#231f20" d="M16,14.81,28.78,6.6A3,3,0,0,0,27,6H5a3,3,0,0,0-1.78.6Z"></path><path fill="#231f20" d="M16.54,16.84h0l-.17.08-.08,0A1,1,0,0,1,16,17h0a1,1,0,0,1-.25,0l-.08,0-.17-.08h0L2.1,8.26A3,3,0,0,0,2,9V23a3,3,0,0,0,3,3H27a3,3,0,0,0,3-3V9a3,3,0,0,0-.1-.74Z"></path></svg>
                        <h6 class='text-[#212121] text-[10px]'>catherine.choi@venderbilt.edu</h6>
                      </div>  
                      <div class="flex w-full my-2">    
                        <svg class='w-5 h-5 mx-4' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="phone"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M19.23 15.26l-2.54-.29c-.61-.07-1.21.14-1.64.57l-1.84 1.84c-2.83-1.44-5.15-3.75-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52c-.12-1.01-.97-1.77-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z"></path></svg>
                        <h6 class='text-[#212121] text-sm'>1234567890</h6>
                      </div> 
                    </div>
                  </div>
                  
                  <div class='w-4/6 h-full flex-col flex flex-grow'>
                    <div class='w-11/12 h-full flex'>
                      <p class="text-[#212121]  h-8 w-full mt-4 mb-10 font-bold text-xl px-10 border-slate-300 border-b-2">My Blogs</p>
                    </div>
                  </div>
              
                </div>
                
              </div>
          </div>
          
        </div>
    );
  };
  
  export default Home;