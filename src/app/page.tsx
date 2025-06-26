export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col-reverse lg:flex-row-reverse items-center justify-between px-0 md:px-24 lg:px-28">
        <div className="flex flex-col items-center md:items-start justify-start gap-6 lg:gap-2">
          <h1 className=" lg:-mb-7">Hi! I’m</h1>
          <h1 className="text-4xl lg:text-6xl lg:leading-28 font-bold">
            Nelvy O. Holares
          </h1>
          <span className="italic lg:-mt-3.5">
            Ambitious. Adaptive. Ready to Work.
          </span>
          <p className="text-left text-[19px]">
            I’m a passionate and dedicated professional actively seeking
            opportunities to grow and contribute in a dynamic workplace. With a
            strong work ethic, a keen eye for detail, and a genuine eagerness to
            learn, I’m ready to bring value to any team I join. Whether it’s in
            the office, behind a screen, or collaborating with others — I show
            up with focus, integrity, and the drive to make things happen.
          </p>
          <span>
            Currently open to full-time roles in administrative, clerical, or
            support positions.
          </span>
          <span>
            Feel free to browse through my resume to learn more about my
            background, skills, and experience.
          </span>
        </div>
        {/* <div className="w-full flex flex-col items-center justify-center mb-5">
          IMAGE HERE
        </div> */}
        {/* <Image
        src="#"
        alt="Image"
        className="rounded-md object-cover"
        width={400}
        height={400}
      /> */}
      </div>
    </section>
  );
}

{
  /* <div className="bg-red-500 w-[50%]">
          <h1>Hi! I’m</h1>
          <h1>Nelvy O. Holares</h1>
          <span>Ambitious. Adaptive. Ready to Work.</span>
          <p>
            I’m a passionate and dedicated professional actively seeking
            opportunities to grow and contribute in a dynamic workplace. With a
            strong work ethic, a keen eye for detail, and a genuine eagerness to
            learn, I’m ready to bring value to any team I join. Whether it’s in
            the office, behind a screen, or collaborating with others — I show
            up with focus, integrity, and the drive to make things happen.
          </p>
          🔍 Currently open to full-time roles in administrative, clerical, or
          support positions.
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          IMAGE HERE
        </div> */
}
