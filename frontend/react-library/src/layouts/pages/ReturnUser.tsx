import React from "react";
import { Link } from "react-router-dom";
import UserModel from "../../Models/UserModel";

export const ReturnUser: React.FC<{ user: UserModel }> = (props) => {
  return (
        <div className="team-card">
          <h2>{props.user.firstName + ' ' + props.user.lastName}</h2>
          <p>{props.user.email}</p>
          <p>{props.user.phone}</p>
        </div>
  );
};
