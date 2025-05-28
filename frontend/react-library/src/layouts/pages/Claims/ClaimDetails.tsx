import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ClaimModel from "../../../Models/ClaimModel";
import DocumentModel from "../../../Models/DocumentModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { ReturnDocument } from "../Documents/ReturnDocument";
import { Link } from "react-router-dom";

export const ClaimDetails = () => {
  const { claimId } = useParams<{ claimId: string }>(); // Retrieve claimId from URL
  const [claim, setClaim] = useState<ClaimModel>();
  const [isEditing, setIsEditing] = useState(false);
  const [editedClaim, setEditedClaim] = useState<ClaimModel>();
  const [documents, setDocuments] = useState<DocumentModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [newDocument, setNewDocument] = useState({
    name: "",
    text: "",
  });

  useEffect(() => {
    const fetchClaimDetails = async () => {
      const claimUrl = `http://localhost:8080/api/v1/claims/${claimId}`;
      const response = await fetch(claimUrl);

      if (!response.ok) {
        throw new Error("Something went wrong while fetching claim details.");
      }

      const claimData = await response.json();
      setClaim({
        id: claimData.id,
        name: claimData.name,
        description: claimData.description,
        deadline: claimData.deadline,
        status: claimData.status,
        user: claimData.userDTO,
        client: claimData.clientDTO,
      });

      setEditedClaim({
        id: claimData.id,
        name: claimData.name,
        description: claimData.description,
        deadline: claimData.deadline,
        status: claimData.status,
        user: claimData.userDTO,
        client: claimData.clientDTO,
      });

      const documentsUrl = `http://localhost:8080/api/v1/claims/${claimId}/documents`;
      const documentsResponse = await fetch(documentsUrl);

      if (!documentsResponse.ok) {
        throw new Error("Something went wrong while fetching claim documents.");
      }

      const documentsData = await documentsResponse.json();
      const loadedDocuments: DocumentModel[] = [];

      for (const key in documentsData) {
        loadedDocuments.push({
          id: documentsData[key].id,
          name: documentsData[key].name,
          text: documentsData[key].text,
          claim: documentsData[key].claimDTO,
        });
      }

      setDocuments(loadedDocuments);
      setIsLoading(false);
    };

    fetchClaimDetails().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [claimId]);

  const handleInputChange = (field: string, value: string) => {
    setEditedClaim((prev) => (prev ? { ...prev, [field]: value } : undefined));
  };

  const handleSaveChanges = async () => {
    if (!editedClaim) return;

    try {
      const updateUrl = `http://localhost:8080/api/v1/claims`;
      const response = await fetch(updateUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedClaim),
      });

      if (!response.ok) {
        throw new Error("Failed to update claim details.");
      }

      const updatedClaim = await response.json();
      setClaim(updatedClaim);
      setIsEditing(false);
    } catch (error: any) {
      setHttpError(error.message);
    }
  };

  const handleDeleteClaim = async () => {
    try {
      const deleteUrl = `http://localhost:8080/api/v1/claims/${claimId}`;
      const response = await fetch(deleteUrl, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete claim.");
      }

      alert("Claim deleted successfully.");
      window.location.href = "/cases"; // Redirect after deletion
    } catch (error: any) {
      setHttpError(error.message);
    }
  };

  const addDocumentHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newDocument.name || !newDocument.text) {
      return alert("Please provide all fields: name and text.");
    }

    try {
      const response = await fetch(`http://localhost:8080/api/v1/claims/${claimId}/documents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDocument),
      });

      if (!response.ok) {
        throw new Error("Failed to add document.");
      }

      const documentData = await response.json();
      setDocuments((prevDocuments) => [
        ...prevDocuments,
        {
          id: documentData.id,
          name: documentData.name,
          text: documentData.text,
          claim: documentData.claimDTO,
        },
      ]);
      setNewDocument({ name: "", text: "" });
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
      {claim && (
        <section className="details">
          {isEditing ? (
            <div>
              <h2>Edit Claim</h2>
              <label>
                Name:
                <input
                  type="text"
                  value={editedClaim?.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </label>
              <label>
                Description:
                <textarea
                  value={editedClaim?.description || ""}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
              </label>
              <label>
                Deadline:
                <input
                  type="date"
                  value={editedClaim?.deadline || ""}
                  onChange={(e) => handleInputChange("deadline", e.target.value)}
                />
              </label>
              <label>
                Status:
                <select
                  value={editedClaim?.status || ""}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                >
                  <option value="OPEN">Open</option>
                  <option value="CLOSED">Closed</option>
                  <option value="IN_PROGRESS">In Progress</option>
                </select>
              </label>
              <button onClick={handleSaveChanges}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          ) : (
            <div>
              <h2>Case: {claim.name}</h2>
              <p>Description: {claim.description}</p>
              <p>Deadline: {claim.deadline}</p>
              <p>Status: {claim.status}</p>
              <p>
                Lawyer:{" "}
                {claim.user ? (
                  <Link to={`/users/${claim.user.id}`}>
                    {claim.user.firstName} {claim.user.lastName}
                  </Link>
                ) : (
                  "N/A"
                )}
              </p>
              <p>
                Client:{" "}
                {claim.client ? (
                  <Link to={`/clients/${claim.client.id}`}>
                    {claim.client.firstName} {claim.client.lastName}
                  </Link>
                ) : (
                  "N/A"
                )}
              </p>
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={handleDeleteClaim}>Delete</button>
            </div>
          )}
        </section>
      )}

      <section className="claim-documents">
        <h3>Documents</h3>
        {documents.length > 0 ? (
          <ul>
            {documents.map((document) => (
              <ReturnDocument document={document} key={document.id} />
            ))}
          </ul>
        ) : (
          <p>No documents available for this case.</p>
        )}

        <form onSubmit={addDocumentHandler} className="add-form">
          <input
            type="text"
            name="name"
            placeholder="Document Name"
            value={newDocument.name}
            onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
            required
          />
          <textarea
            name="text"
            placeholder="Document text"
            value={newDocument.text}
            onChange={(e) => setNewDocument({ ...newDocument, text: e.target.value })}
            required
          />
          <button type="submit">Add Document</button>
        </form>
      </section>
    </div>
  );
};
