import React, { useState } from 'react';
import { GiTargetPrize, GiPhone, GiGiftTrap } from 'react-icons/gi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [clicked, setClicked] = useState(null);

  const handleClick = (index) => {
    setClicked(index);
    setTimeout(() => {
      setClicked(null);
    }, 300); // Reset the clicked state after the animation
  };

  // Define icons for each giveaway
  const icons = [
    <GiTargetPrize className='text-3xl text-yellow-400' />, // Giveaway 1: Prize icon
    <GiPhone className='text-3xl text-yellow-400' />,       // Giveaway 2: Phone icon
    <GiGiftTrap className='text-3xl text-yellow-400' />,    // Giveaway 3: Gift icon
    <GiTargetPrize className='text-3xl text-yellow-400' />, // Giveaway 4: Prize icon
    <GiPhone className='text-3xl text-yellow-400' />  ,      // Giveaway 5: Phone icon
    <GiTargetPrize className='text-3xl text-yellow-400' />, // Giveaway 1: Prize icon
    <GiPhone className='text-3xl text-yellow-400' />,       // Giveaway 2: Phone icon
    <GiGiftTrap className='text-3xl text-yellow-400' />,    // Giveaway 3: Gift icon
    <GiTargetPrize className='text-3xl text-yellow-400' />, // Giveaway 4: Prize icon
    <GiPhone className='text-3xl text-yellow-400' />        // Giveaway 5: Phone icon
  ];

  return (
    <div className='p-5 min-h-screen bg-dark-blue relative overflow-hidden'>
      {/* 3D Background Icons */}
      <div className='text-yellow-400 ml-5'>
        <li>Each giveaway has 100 slots</li>
        <li>only 1 winner will selected from each 100 slots</li>
        <li className='font-bold'>participate at your own risk</li>
        <li>winner will selected after all slots full</li>
      </div>
      <div className='absolute inset-0 flex justify-center items-center opacity-20'>
        <motion.div
          className='flex flex-col items-center gap-8'
          initial={{ rotateY: 0 }}
          animate={{ rotateY: [0, 15, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <GiTargetPrize className='text-6xl text-gray-500' />
          <GiPhone className='text-6xl text-gray-500' />
          <GiGiftTrap className='text-6xl text-gray-500' />
          <GiTargetPrize className='text-6xl text-gray-500' />
          <GiPhone className='text-6xl text-gray-500' />
          <GiGiftTrap className='text-6xl text-gray-500' />
        </motion.div>
      </div>

      {/* Main Content */}
      <ul className='relative flex flex-col items-center gap-16 mt-10'>
        {[...Array(10)].map((_, index) => (
          <motion.div
          key={index}
          className='relative text-white bg-blue-950 border border-gray-300 rounded-lg shadow-lg py-6 px-24 flex items-center justify-center overflow-hidden'
          initial={{ scale: 1, opacity: 1 }}
          animate={clicked === index ? { scale: 0.5, opacity: 0 } : {}}
          transition={{ duration: 0.3 }} // Faster animation duration
          onClick={() => handleClick(index)}
          >
            <div className='flex items-center gap-4'>
              {/* Render icon for the current item */}
              {icons[index]}
              <Link to={`/userboxes?id=${index + 1}&start=${index*100}`} onClick={(e) => e.stopPropagation()}>
                <li className='text-xl font-semibold'>{`Giveaway ${index + 1}`}</li>
              </Link>
              {/* <Link to={index === 5 ? '/userboxes66' : `/userboxes${index + 1}`} onClick={(e) => e.stopPropagation()}>
                <li className='text-xl font-semibold'>{`Giveaway ${index + 1}`}</li>
              </Link> */}
            </div>
          </motion.div>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
