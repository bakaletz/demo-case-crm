import React from 'react';
import {NavLink, Link} from 'react-router-dom';

export const Navbar = () => {
  return (
  
   <div className="header">
   <div className="logo-container">
       <a href="./main.html">
           <img className="logo-img" src="https://i.obozrevatel.com/gallery/2020/2/17/1024px-alexkkievanrus-svg.png" alt="logo"/>
       </a>
   </div>
   <nav>
       <div className="bars">
           <i className="fa-solid fa-bars"></i>
       </div>
       <ul className="nav-list">
           <li>
               <NavLink className="nav-btn" to='/cases'>Cases</NavLink>
           </li>
           <li>
               <NavLink className="nav-btn" to="/users">Employees</NavLink>
           </li>
           <li>
               <NavLink className="nav-btn" to="/clients">Clients</NavLink>
           </li>
           <li>
               <NavLink className="nav-btn" to="/contacts">Contacts</NavLink>
           </li>
           <li>
               <NavLink className="nav-btn" to="/faq">FAQ</NavLink>
           </li>
           <li>
               <a className="nav-btn" href="primary.html">Exit</a>
           </li>
       </ul>
   </nav>
</div>

  );
}


