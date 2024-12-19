import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ClientModel from "../../../Models/ClientModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";


export const ClientDetails = () => {
  const { clientId } = useParams<{ clientId: string }>(); // Retrieve clientId from URL
  const [client, setClient] = useState<ClientModel>();
  const [isEditing, setIsEditing] = useState(false);
  const [editedClient, setEditedClient] = useState<ClientModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const clientUrl = `http://localhost:8080/api/v1/clients/${clientId}`;
        const response = await fetch(clientUrl);

        if (!response.ok) {
          throw new Error("Something went wrong while fetching client details.");
        }

        const clientData = await response.json();

        const mappedClient: ClientModel = {
          id: clientData.id,
          firstName: clientData.firstName,
          lastName: clientData.lastName,
          email: clientData.email,
          phone: clientData.phone,
          contactInfo: clientData.contactInfo,
          additionalInfo: clientData.additionalInfo,
          status: clientData.status
        };

        setClient(mappedClient);
        setEditedClient(mappedClient);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        setHttpError(error.message);
      }
    };

    fetchClientDetails();
  }, [clientId]);

  const handleInputChange = (field: keyof ClientModel, value: string) => {
    setEditedClient((prev) => (prev ? { ...prev, [field]: value } : undefined));
  };

  const handleSaveChanges = async () => {
    if (!editedClient) return;

    try {
      const updateUrl = `http://localhost:8080/api/v1/clients`;
      const response = await fetch(updateUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedClient),
      });

      if (!response.ok) {
        throw new Error("Failed to update client details.");
      }

      const updatedClient = await response.json();
      setClient(updatedClient);
      setIsEditing(false);
      alert("Client details updated successfully.");
    } catch (error: any) {
      setHttpError(error.message);
    }
  };

  const handleDeleteClient = async () => {
    try {
      const deleteUrl = `http://localhost:8080/api/v1/clients/${clientId}`;
      const response = await fetch(deleteUrl, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete client.");
      }

      alert("Client deleted successfully.");
      window.location.href = "/clients"; // Redirect after deletion
    } catch (error: any) {
      setHttpError(error.message);
    }
  };

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return <div className="error">{httpError}</div>;
  }

  return (
    <div className="content">
      <section className="client-details">
        {isEditing ? (
          <div>
            <h2>Edit Client</h2>
            <label>
              First Name:
              <input
                type="text"
                value={editedClient?.firstName || ""}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                value={editedClient?.lastName || ""}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={editedClient?.email || ""}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </label>
            <label>
              Phone:
              <input
                type="tel"
                value={editedClient?.phone || ""}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </label>
            <label>
              Contact Info:
              <input
                type="text"
                value={editedClient?.contactInfo || ""}
                onChange={(e) => handleInputChange("contactInfo", e.target.value)}
              />
            </label>
            <label>
              Additional Info:
              <input
                type="text"
                value={editedClient?.additionalInfo || ""}
                onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
              />
            </label>
            <button onClick={handleSaveChanges}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <div>
            <h2>{client?.firstName + " " + client?.lastName}</h2>
            <p>Email: {client?.email}</p>
            <p>Phone: {client?.phone}</p>
            <p>Contact Info: {client?.contactInfo}</p>
            <p>Additional Info: {client?.additionalInfo}</p>
            <p>Status: {client?.status}</p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDeleteClient}>Delete</button>
          </div>
        )}
      </section>
    </div>
  );
};
