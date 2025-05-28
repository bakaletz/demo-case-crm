import React, { useState, useEffect } from "react";
import ClientModel from "../../../Models/ClientModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { ReturnClient } from "./ReturnClient";

export const Clients = () => {
  const [clients, setClients] = useState<ClientModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [newClient, setNewClient] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    contactInfo: "",
    additionalInfo: "",
    status: "",
  });

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
          phone: responseData[key].phone,
          contactInfo: responseData[key].contactInfo,
          additionalInfo: responseData[key].additionalInfo,
          status: responseData[key].status,
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewClient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addClientHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const url: string = "http://localhost:8080/api/v1/clients";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newClient),
    });

    if (!response.ok) {
      setHttpError("Failed to add a new client.");
      return;
    }

    const createdClient: ClientModel = await response.json();
    setClients((prevClients) => [...prevClients, createdClient]);
    setNewClient({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      contactInfo: "",
      additionalInfo: "",
      status: "",
    });
  };

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return <div className="error">{httpError}</div>;
  }

  return (
    <div>
      <div className="content">
        <h1 className="team-title">Our Clients</h1>
       
        <div className="team-container">
          {clients.map((client) => (
            <ReturnClient client={client} key={client.id} />
          ))}
        </div>
        <form onSubmit={addClientHandler} className="add-form">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={newClient.firstName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={newClient.lastName}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newClient.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={newClient.phone}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="contactInfo"
            placeholder="Contact Info"
            value={newClient.contactInfo}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="additionalInfo"
            placeholder="Additional Info"
            value={newClient.additionalInfo}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="status"
            placeholder="Status"
            value={newClient.status}
            onChange={handleInputChange}
          />
          <button type="submit">Add Client</button>
        </form>
      </div>
    </div>
  );
};
