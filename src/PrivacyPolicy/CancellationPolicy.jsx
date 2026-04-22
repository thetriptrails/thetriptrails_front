import React from 'react';

const CancellationPolicy = () => {
  const styles = {
    container: {
      maxWidth: '900px',
      margin: '0 auto',
      padding: '40px 20px',
      backgroundColor: '#ffffff',
      color: '#333',
      lineHeight: '1.6',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    header: {
      color: '#d4af37', // Gold
      borderBottom: '2px solid #d4af37',
      paddingBottom: '10px',
      marginBottom: '20px'
    },
    sectionTitle: {
      color: '#d4af37',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      marginTop: '20px',
      display: 'block'
    },
    highlightBox: {
      backgroundColor: '#fffdf5', // Light golden tint
      border: '1px solid #d4af37',
      padding: '15px',
      borderRadius: '5px',
      marginTop: '20px'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Cancellation Policy</h1>
      
      <p>We strive to process refunds promptly and fairly. Please read our refund policy below:</p>

      <span style={styles.sectionTitle}>Cancellation Fees</span>
      <ul>
        <li><strong>Plan Change:</strong> A 10% charge of the total package booking will apply for any changes to the travel plan.</li>
        <li><strong>After Confirmation:</strong> A 30% cancellation fee of the total package cost will apply after confirmation and issuance of the hotel voucher.</li>
        <li><strong>Within 10 Days of Travel:</strong> A 50% cancellation fee of the total package cost will apply.</li>
        <li><strong>Within 7 Days of Travel:</strong> A 100% cancellation fee of the total package cost will apply.</li>
      </ul>

      <span style={styles.sectionTitle}>Important Notes</span>
      <ul style={{ paddingLeft: '20px' }}>
        <li><strong>Travel Flexibility:</strong> There is no flexibility at the time of travel regarding the plan.</li>
        <li><strong>Train and Flight Tickets:</strong> Cancellation follows Indian Railway and Airline rules. Refunds are processed only after receiving the refund from the respective companies.</li>
        <li><strong>Exceptions:</strong> No refund will be provided in cases of bad weather, landslides, natural disasters, terrorism, or other events beyond our control. We will assist to the best of our ability in such situations.</li>
        <li><strong>Pandemic/Outbreak:</strong> There will be no refunds due to any pandemic or virus outbreak. In such situations, we can amend your travel date for a future booking.</li>
        <li><strong>Loss of Belongings:</strong> uttrakhandyatra.com is not responsible for any lost items such as bags, wallets, jewelry, or other valuables during your trip.</li>
      </ul>

      <div style={styles.highlightBox}>
        <span style={styles.sectionTitle}>Cancellation & Amendment Procedure</span>
        <p>All cancellations and amendments to the original booking must be <strong>communicated in writing via email</strong>.</p>
        <small>*All policies are subject to the rules of the respective hotels and service providers.</small>
      </div>
    </div>
  );
};

export default CancellationPolicy;