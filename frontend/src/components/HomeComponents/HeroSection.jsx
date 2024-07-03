import video1 from "../../assets/video1.mp4";
import video2 from "../../assets/video2.mp4";

export function HeroSection() {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20 pb-10  border-b border-neutral-600">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        Welcome to
        <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text font-semibold">
          {" "}
          WorkWave
        </span>
      </h1>
      <p className="mt-10 text-lg text-center max-w-4xl">
        WorkWave is the ultimate HR Management System designed to streamline
        your human resource operations. Simplify recruitment, onboarding,
        payroll, and performance tracking with our intuitive tools. Empower your
        HR team to build a thriving, engaged, and productive workplace with
        WorkWave.
      </p>
      <div className="flex justify-center my-10">
        <a
          href="#"
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 px-4 mx-3 rounded-xl"
          aria-label="Start for free"
        >
          Start for free
        </a>
        <a
          href="#"
          className="py-3 px-4 mx-3 rounded-md border border-white"
          aria-label="Documentation"
        >
          Documentation
        </a>
      </div>
      {/* <div className="flex flex-wrap mt-10 justify-center lg:justify-between">
        <div className="w-full lg:w-1/2 p-2">
          <video
            autoPlay
            loop
            muted
            className="rounded-lg   border border-white mx-2 my-4"
          >
            <source src={video1} type="video/mp4" />
            Your Browser Does not Support Video Playback
          </video>
        </div>

        <div className="w-full lg:w-1/2 p-2">
        <video
          autoPlay
          loop
          muted
          className="rounded-lg  border border-white mx-2 my-4"
        >
          <source src={video2} type="video/mp4" />
          Your Browser Does not Support Video Playback
        </video>
        </div>
      </div> */}
    </div>
  );
}
