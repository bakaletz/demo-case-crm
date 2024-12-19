import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DocumentModel from "../../../Models/DocumentModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";

export const DocumentDetails = () => {
  const { documentId } = useParams<{ documentId: string }>(); // Retrieve documentId from URL
  const [document, setDocument] = useState<DocumentModel>();
  const [isEditing, setIsEditing] = useState(false);
  const [editedDocument, setEditedDocument] = useState<DocumentModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocumentDetails = async () => {
      try {
        const documentUrl = `http://localhost:8080/api/v1/documents/${documentId}`;
        const response = await fetch(documentUrl);

        if (!response.ok) {
          throw new Error(
            "Something went wrong while fetching document details."
          );
        }

        const documentData = await response.json();

        const mappedDocument: DocumentModel = {
          id: documentData.id,
          name: documentData.name,
          text: documentData.text,
          claim: documentData.claimDTO,
        };

        setDocument(mappedDocument);
        setEditedDocument(mappedDocument);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        setHttpError(error.message);
      }
    };

    fetchDocumentDetails();
  }, [documentId]);

  const handleInputChange = (field: keyof DocumentModel, value: string) => {
    setEditedDocument((prev) =>
      prev ? { ...prev, [field]: value } : undefined
    );
  };

  const handleSaveChanges = async () => {
    if (!editedDocument) return;

    try {
      const updateUrl = `http://localhost:8080/api/v1/documents`;
      const response = await fetch(updateUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedDocument),
      });

      if (!response.ok) {
        throw new Error("Failed to update document details.");
      }

      const updatedDocument = await response.json();
      setDocument(updatedDocument);
      console.log(updatedDocument);
      setIsEditing(false);
      alert("Document details updated successfully.");
    } catch (error: any) {
      setHttpError(error.message);
    }
  };

  const handleDeleteDocument = async () => {
    try {
      const deleteUrl = `http://localhost:8080/api/v1/documents/${documentId}`;
      const response = await fetch(deleteUrl, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete document.");
      }

      alert("Document deleted successfully.");
      window.location.href = `claims`; // Redirect after deletion
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
      <section className="document-details">
        {isEditing ? (
          <div>
            <h2>Edit Document</h2>
            <label>
              Title:
              <input
                type="text"
                value={editedDocument?.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </label>
            <label>
              Text:
              <textarea
                style={{
                  width: "100%",
                  height: "800px", // або бажану висоту
                  fontSize: "16px", // налаштуйте шрифт за бажанням
                }}
                value={editedDocument?.text || ""}
                onChange={(e) => handleInputChange("text", e.target.value)}
              />
            </label>
            <button onClick={handleSaveChanges}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <div>
            <h2>{document?.name}</h2>
            <textarea
              style={{
                width: "100%",
                height: "800px", // або бажану висоту
                fontSize: "16px", // налаштуйте шрифт за бажанням
              }} readOnly
            >
              {document?.text}
            </textarea>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDeleteDocument}>Delete</button>
          </div>
        )}
      </section>
    </div>
  );
};
