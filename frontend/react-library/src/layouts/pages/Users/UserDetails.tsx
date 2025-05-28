import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Link } from "react-router-dom";

export const UserDetails = () => {
  const { userId } = useParams<{ userId: string }>(); // Retrieve userId from URL
  const [user, setUser] = useState<UserModel>();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<UserModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userUrl = `http://localhost:8080/api/v1/users/${userId}`;
        const response = await fetch(userUrl);

        if (!response.ok) {
          throw new Error("Something went wrong while fetching user details.");
        }

        const userData = await response.json();

        const mappedUser: UserModel = {
          id: userData.id,
          firstName: userData.firstName, // Correct mapping
          lastName: userData.lastName, // Correct mapping
          email: userData.email,
          phone: userData.phone,
        };

        setUser(mappedUser);
        setEditedUser(mappedUser);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        setHttpError(error.message);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleInputChange = (field: keyof UserModel, value: string) => {
    setEditedUser((prev) => (prev ? { ...prev, [field]: value } : undefined));
  };

  const handleSaveChanges = async () => {
    if (!editedUser) return;

    try {
      const updateUrl = `http://localhost:8080/api/v1/users`;
      const response = await fetch(updateUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedUser),
      });

      if (!response.ok) {
        throw new Error("Failed to update user details.");
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false);
      alert("User details updated successfully.");
    } catch (error: any) {
      setHttpError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const deleteUrl = `http://localhost:8080/api/v1/users/${userId}`;
      const response = await fetch(deleteUrl, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user.");
      }

      alert("User deleted successfully.");
      window.location.href = "/users"; // Redirect after deletion
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
      <section className="details">
        {isEditing ? (
          <div>
            <h2>Edit User</h2>
            <label>
              First Name:
              <input
                type="text"
                value={editedUser?.firstName || ""}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                value={editedUser?.lastName || ""}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={editedUser?.email || ""}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </label>
            <label>
              Phone:
              <input
                type="text"
                value={editedUser?.phone || ""}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </label>
            <button onClick={handleSaveChanges}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <div>
            <h2>
              {user?.firstName} {user?.lastName}
            </h2>
            <p>Email: {user?.email}</p>
            <p>Phone: {user?.phone}</p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDeleteUser}>Delete</button>
          </div>
        )}
      </section>
    </div>
  );
};
