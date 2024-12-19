import React from "react";
import ClientModel from "../../../Models/ClientModel";
import { Link } from "react-router-dom";


export const ReturnClient: React.FC<{ client: ClientModel }> = ({ client}) => {
  return (
    <div className="team-card">
      <h2>{client.firstName + ' ' + client.lastName }</h2>
      <p>Email: {client.email}</p>
      <p>Contact: {client.contactInfo}</p>
      <Link to={`/clients/${client.id}`} className="btn">
          More info
        </Link>
    </div>
  );
};
