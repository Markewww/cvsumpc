// src/pages/employer/Members.js
import React from "react";

export default function Members({ membersList }) {
  return (
    <div className="content">
      <h2>Members & Loan History</h2>
      {membersList.length === 0 ? (
        <p>No members found.</p>
      ) : (
        <table className="members-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Joined At</th>
            </tr>
          </thead>
          <tbody>
            {membersList.map((member) => (
              <tr key={member.id}>
                <td>{member.fullName}</td>
                <td>{member.email}</td>
                <td>{member.contactNumber}</td>
                <td>{member.address}</td>
                <td>
                  {member.joinedAt?.toDate
                    ? member.joinedAt.toDate().toLocaleString()
                    : new Date(member.joinedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
