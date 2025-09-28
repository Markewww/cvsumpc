// src/pages/employer/Payments.js
import React from "react";

export default function Payments({ paymentsList, membersList }) {
  const getMemberName = (memberId) => {
    const member = membersList.find((m) => m.id === memberId);
    return member ? member.fullName : memberId;
  };

  return (
    <div className="content">
      <h2>Payments</h2>
      {paymentsList.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <table className="payments-table">
          <thead>
            <tr>
              <th>Member Name</th>
              <th>Loan ID</th>
              <th>Amount Paid</th>
              <th>Paid At</th>
            </tr>
          </thead>
          <tbody>
            {paymentsList.map((payment) => (
              <tr key={payment.id}>
                <td>{getMemberName(payment.memberId)}</td>
                <td>{payment.loanId}</td>
                <td>₱{payment.amountPaid.toLocaleString()}</td>
                <td>
                  {payment.paidAt?.toDate
                    ? payment.paidAt.toDate().toLocaleString()
                    : new Date(payment.paidAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
