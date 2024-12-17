import React from 'react';

export const Footer = () => {
  return (
  
   <footer>
        <div className="footer">
            <h4 className="footer-text">
                © 2024 Legal company. All rights reserved
            </h4>
            <div className="links">
                <ul className="contacts">
                    <li>
                        <a className="icon" href=""><i className="fa-solid fa-phone"></i></a>
                    </li>
                    <li>
                        <a className="icon" href=""><i className="fa-solid fa-envelope"></i></a>
                    </li>
                    <li>
                        <a className="icon" href=""><i className="fa-brands fa-telegram"></i></a>
                    </li>
                    <li>
                        <a className="icon" href=""><i className="fa-brands fa-whatsapp"></i></a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>

  );
}


