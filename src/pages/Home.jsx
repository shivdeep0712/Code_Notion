import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/Homepage/HighlightText";
import CTAButton from "../components/core/Homepage/CTAButton";
import CodeBlocks from "../components/core/Homepage/CodeBlocks";
import TimelineSection from "../components/core/Homepage/TimelineSection"
import LearningLanguageSection from "../components/core/Homepage/LearningLanguageSection"
import InstructorSection from "../components/core/Homepage/InstructorSection";
import Banner from "../assets/Images/banner.mp4";


const Home = () => {
  return (
    <div>
      {/*Section 1 */}
      <div
        className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center
         text-white justify-between"
      >
        <Link to={"/signup"}>
          <div
            className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                transition-all duration-200 hover:scale-95 w-fit"
          >
            <div
              className="flex flex-row items-center gap-2 rounded-full px-10
                     py-[5px] group-hover:bg-richblack-900"
            >
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-7 ">
          Empower your future with
          <HighlightText text={"Coding Skills"} />
        </div>

        <div className="mt-4 w-[80%] text-center text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex flex-row gap-7 mt-8">
          <CTAButton linkto={"/signup"} active={true}>
            Learn More
          </CTAButton>
          <CTAButton linkto={"/login"} active={false}>
            Book a Demo
          </CTAButton>
        </div>

        <div className="mx-3 my-12 shadow-blue-200">
          <video muted loop autoPlay>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* Code Section 1 */}

        <div>
          <CodeBlocks 
            position={"lg:flex-row"}
            heading={
              <div className='text-4xl font-semibold'>
                  Unlock your 
                <HighlightText text={"coding potential"}/>
                  with our online courses.
              </div>
            } 
            subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
            ctabtn1={
              {
                btnText:"Try it Yourself",
                linkto:"/signup",
                active:true
              }
            }
            ctabtn2={
              {
                btnText:"Learn More",
                linkto:"/signin",
                active:false
              }
            }
            codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</title>\n<linkrel="stylesheet"href="styles.css">
            </head>\n<body>\n<h1><a href="/">Header</a>\n</h1>\n<nav>\n<a href="one/">One</a><ahref="two/">Two</a>
            </nav>`}
            codeColor={"text-yellow-25"}
          />
        </div>

        <div>
          {/* Code section 2 */}
          <CodeBlocks 
            position={"lg:flex-row-reverse"}
            heading={
              <div className='text-4xl font-semibold'>
                  Unlock your
                <HighlightText text={"coding potential"}/>
                 with our online courses.
              </div>
            } 
            subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
            ctabtn1={
              {
                btnText:"Try it Yourself",
                linkto:"/signup",
                active:true
              }
            }
            ctabtn2={
              {
                btnText:"Learn More",
                linkto:"/signin",
                active:false
              }
            }
            codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</title>\n<linkrel="stylesheet"href="styles.css">
            </head>\n<body>\n<h1><a href="/">Header</a>\n</h1>\n<nav>\n<a href="one/">One</a><ahref="two/">Two</a>
            </nav>`}
            codeColor={"text-yellow-25"}
          />
        </div>
      </div>
      

      {/*Section 2 */}
        <div className='bg-pure-greys-5 text-richblack-700'>
          <div className='homepage_bg h-[333px]'>
             
             <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                <div className='h-[150px]'></div>
                <div className='flex flex-row gap-7 text-white'>
                  <CTAButton active={true} linkto={"/signup"}>
                      <div className='flex items-center gap-3'>
                          Explore Full Catalog
                          <FaArrowRight/>
                      </div>
                  </CTAButton>
                  <CTAButton active={false} linkto={"/signup"}>
                      <div>
                        Learn More
                      </div>
                  </CTAButton>
                </div>
             </div>
          </div>
          
          <div className='mx-auto w-11/12 max-w-maxContent flex flex-col item-center justify-between 
            gap-7'>
              <div className='flex flex-row gap-5 mb-10 mt-[95px]'>
                <div className='text-4xl font-semibold w-[45%]'>
                    Get the skills you need for a 
                    <HighlightText text={"job that is in demand"}/>
                </div>
                <div className='flex flex-col gap-10 w-[40%] items-start'>
                  <div className='text-[16px]'>
                  The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.                    
                  </div>
                  <CTAButton active={true} linkto={"/signup"}>
                      <div>
                        Learn More
                      </div>
                  </CTAButton>

                </div>
              </div>
               
              <TimelineSection/>
              <LearningLanguageSection/>
          </div>    
        </div>
      {/*Section 3 */}
            <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center
            justify-between gap-8 first-letter bg-richblack-900 text-white'>
               <InstructorSection/>

                <h2 className='text-center text-4xl font-semibold mt-10 '>Review from other learners</h2>                
                 {/* review slider here */}
                 
            </div>
      {/*Footer */}
    </div>
  );
};

export default Home;
