import React from "react";
import { Link } from "react-router-dom";
import UserModel from "../../../Models/UserModel";

export const ReturnUser: React.FC<{ user: UserModel }> = ({user}) => {
  return (
        <div className="team-card">
          <h2>{user.firstName + ' ' + user.lastName}</h2>
          <p>{user.email}</p>
          <p>{user.phone}</p>
           <Link to={`/users/${user.id}`} className="btn">
                    More Info
                  </Link>
        </div>
  );
};
