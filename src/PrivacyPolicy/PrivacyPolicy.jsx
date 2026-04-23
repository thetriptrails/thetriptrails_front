import React from 'react';

const PrivacyPolicy = () => {
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
    subHeader: {
      color: '#d4af37',
      marginTop: '25px'
    },
    section: {
      marginBottom: '20px'
    },
    highlightBox: {
      backgroundColor: '#f9f9f9',
      borderLeft: '4px solid #d4af37',
      padding: '15px',
      margin: '20px 0'
    },
    contactLink: {
      color: '#d4af37',
      fontWeight: 'bold',
      textDecoration: 'none'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Privacy Policy</h1>
      
      <p>
        At <strong>Trip Trails</strong>, we are committed to protecting the privacy and personal information of all travelers. This Privacy Policy explains how we collect, use, and protect your data. 
      </p>

      <div style={styles.highlightBox}>
        When you register with Trip Trails, our executive will contact you to confirm your details (Name, Email Address, Contact Number) and gather information about your travel dates, group size, and hotel preferences based on your budget. This allows us to customize your package according to your requirements.
      </div>

      <h2 style={styles.subHeader}>1. Information Collection</h2>
      <p>We collect personal data such as your full name, contact details, identity documents, and travel preferences during registration or booking.</p>

      <h2 style={styles.subHeader}>2. Usage of Information</h2>
      <p>Your data is used solely for the following purposes:</p>
      <ul>
        <li>Facilitating travel arrangements</li>
        <li>Providing important updates and alerts</li>
        <li>Ensuring security and emergency support</li>
        <li>Fulfilling legal or regulatory requirements</li>
      </ul>

      <h2 style={styles.subHeader}>3. Data Protection</h2>
      <p>We use industry-standard security practices to protect your personal data from unauthorized access or misuse.</p>

      <h2 style={styles.subHeader}>4. Data Sharing</h2>
      <p>We do not sell or rent your data. Information may be shared only with:</p>
      <ul>
        <li>Authorized government departments (where applicable)</li>
        <li>Verified travel partners and emergency services</li>
        <li>When required by law</li>
      </ul>

      <h2 style={styles.subHeader}>5. Consent & Communication</h2>
      <p>By using our services, you consent to the collection and use of your data as described in this policy.</p>
      <ul>
        <li><strong>Offer Communication:</strong> We will send you our offers via email or WhatsApp, and you can choose from the options provided.</li>
        <li><strong>Package Discussion:</strong> Our team will call you to discuss and describe the details of the chosen package.</li>
        <li><strong>Booking Confirmation:</strong> Once you book with us, we will send you all service vouchers including hotel vouchers, transport details, tour program, and contact information of our executive and guide who will assist you during your travel.</li>
        <li><strong>Privacy Assurance:</strong> We do not sell your contact details such as mobile number or email address to any third party.</li>
        <li><strong>Unsubscribe Option:</strong> If you receive any promotional texts or emails from us, you will find an unsubscribe link which you can use to opt out from further communications.</li>
      </ul>

      <h2 style={styles.subHeader}>Rates & Flexibility</h2>
      <div style={styles.highlightBox}>
        <ul>
          <li><strong>Rate Flexibility:</strong> All rates offered by Trip Trails are subject to change without prior notice and are subject to availability.</li>
          <li><strong>Transportation:</strong> Train, flight, and bus ticket availability is subject to change at the time of booking.</li>
          <li><strong>Flight Tickets:</strong> Quoted rates for flight tickets are flexible and may vary at the time of booking.</li>
        </ul>
      </div>

      <p>
        For inquiries, contact us at <a href="mailto:info@thetriptrails.com" style={styles.contactLink}>info@thetriptrails.com</a>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;