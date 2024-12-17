import React, { useState, useEffect } from "react";
import ClientModel from "../../Models/ClientModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { ReturnClient } from "./ReturnClient";

export const Clients = () => {
  const [clients, setClients] = useState<ClientModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      const url: string = "http://localhost:8080/api/v1/clients";
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong while fetching clients");
      }

      const responseData = await response.json();

      const loadedClients: ClientModel[] = [];
      for (const key in responseData) {
        loadedClients.push({
          id: responseData[key].id,
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          email: responseData[key].email,
          phone:responseData[key].phone,
          contactInfo: responseData[key].contactInfo,
          additionalInfo: responseData[key].additionalInfo,
          status: responseData[key].status
        });
      }

      setClients(loadedClients);
      setIsLoading(false);
    };

    fetchClients().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return <div className="error">{httpError}</div>;
  }

  return (
    <div>
      <div className="content">
        <h1 className="team-title">Наші клієнти</h1>
        <div className="team-container">
          {clients.map((client) => (
            <ReturnClient client={client} key={client.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
