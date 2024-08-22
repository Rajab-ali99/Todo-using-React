import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between px-20   py-1 bg-blue-700' > 
      <div className="logo">
        <span className='text-white font-bold text-xl'>iTask</span>
      </div>
      <ul className='flex gap-8'>
        <li className='text-white hover:font-bold cursor-pointer'>Home</li>
        <li className='text-white hover:font-bold cursor-pointer'>Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
