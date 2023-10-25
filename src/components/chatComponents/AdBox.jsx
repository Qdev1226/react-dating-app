import React from "react";
import { Link } from "react-router-dom";

const AdBox = () => {
  return (
    <div className='w-2/5 border-l-2 px-5'>
      <div className='flex flex-col'>
        <div className='font-semibold text-xl py-4'>React Dating App</div>
        <img
          src={
            "https://img.freepik.com/free-photo/friends-looking-each-other-holding-chat-bubble_23-2148342087.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1697328000&semt=ais"
          }
          className='border object-cover rounded-xl h-52'
          alt=''
        />
        <Link href='/' className='font-semibold py-4'>
          Plus Points
        </Link>
        <ul className='list-disc list-inside mb-4'>
          <li>
            Your chat will be gone in 2 days so you don&apos;t need to care
            about your chat history.
          </li>
          <li>You won&apos;t get any email notification.</li>
        </ul>
      </div>
    </div>
  );
};

export default AdBox;
