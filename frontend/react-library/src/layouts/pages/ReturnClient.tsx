import React from "react";
import ClientModel from "../../Models/ClientModel";

export const ReturnClient: React.FC<{ client: ClientModel }> = ({ client}) => {
  return (
    <div className="team-card">
      <h2>{client.firstName + ' ' + client.lastName }</h2>
      <p>Email: {client.email}</p>
      <p>Contact: {client.contactInfo}</p>
    </div>
  );
};
