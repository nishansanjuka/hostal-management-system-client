import { FC } from "react";

export const AboutSection: FC = () => {
  return (
    <section className="  mt-20 w-full h-full text-center min-h-fit my-40 3xl:min-h-fit flex flex-col justify-center ">
      <header className=" w-full h-fit flex flex-col mb-10 space-y-1 justify-center items-center">
        <h1 className=" text-green-600 text-4xl xl:text-6xl font-bold">
          Best hostels guides..
        </h1>
        <p className=" text-muted-foreground text-xs font-semibold">
          Here's our tips and Tricks 
        </p>
      </header>

      <article className=" mt-10 w-full h-fit space-y-4 text-sm ">
        <p className="w-[95vw] mx-auto max-w-2560">
          Manage your university accommodation effortlessly with the help of Hostal Mate. Our platform offers a range of convenient features designed to simplify your housing experience. With our room swapping functionality, you can easily exchange rooms with other students, ensuring that you find the living arrangement that suits you best. Say goodbye to the hassle of long waiting lists or complicated administrative processes. Additionally, our vacancy management feature allows you to view available rooms in real-time and make informed decisions about your housing options. Whether you're looking for a quiet single or prefer a shared space with friends, our system provides the flexibility to meet your needs."
        </p>
        <p className="w-[65vw] mx-auto max-w-2560">
          By using our platform, you'll not only streamline your accommodation management but also become part of a vibrant community of students sharing valuable insights and experiences. Stay connected with hostel administrators and fellow students through our built-in messaging support, ensuring that you're always in the loop regarding any updates or announcements. Enjoy the peace of mind that comes with knowing you have control over your living arrangements and can adapt them to suit your evolving needs. Our system empowers you to make informed decisions about your housing, creating a more comfortable and enjoyable university experience.

        </p>

        <p className="w-[75vw] mx-auto max-w-2560">
          Join us today and enjoy the benefits of hassle-free room management, seamless communication, and the peace of mind that comes with staying organized throughout your university journey. Whether you're a new student navigating the housing process for the first time or a returning student looking for a better living situation, our platform has something to offer you. Experience the convenience of accessing all your housing information in one place, from room assignments to swap requests, with just a few clicks. Don't let accommodation worries distract you from your studies – let the University Hostel Management System handle the details so you can focus on what matters most."
        </p>
      </article>
    </section>
  );
};
