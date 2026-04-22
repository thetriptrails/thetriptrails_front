import React from 'react';

const TermsAndConditions = () => {
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
    list: {
      paddingLeft: '20px',
      marginBottom: '20px'
    },
    item: {
      marginBottom: '10px'
    }
  };

  const terms = [
    { title: "Availability Confirmation", desc: "All bookings are subject to availability. Check-in and checkout times are as per the hotel’s policy." },
    { title: "Room Reservation", desc: "Rooms are subject to availability at the time of booking. This quotation serves as an offer and not a confirmed booking. Meal timings must be adhered to as instructed by the hotels. We are not liable for any unutilized meals." },
    { title: "Identity Proof", desc: "Please carry a valid identity proof with a photograph, as it is required at airports and during hotel check-ins." },
    { title: "Early Check-in and Late Checkout", desc: "Payments for early check-in and late checkout are to be settled directly with the hotel." },
    { title: "Alternative Arrangements", desc: "If the original hotels are unavailable, we will provide equivalent or alternative accommodations." },
    { title: "Additional Charges", desc: "uttrakhandyatra.com does not have hidden charges, except for lunch and personal expenses. If anyone demands extra payment during the journey without our consent, please inform us." },
    { title: "Refund Policy", desc: "No refunds will be provided for unused accommodation, missed meals, transportation, sightseeing tours, or other services due to bad weather, illness, strikes, roadblocks, or natural calamities beyond our control." },
    { title: "Booking Verification", desc: "Before confirming your booking, please personally check the hotel websites, reviews, and services on the internet. We have provided the hotel names by destination. If the provided hotels are unsuitable, please request upgraded options." },
    { title: "Customer Support", desc: "If you encounter any issues with your hotels or transportation during your travel, please contact your tour executive immediately for resolution. We cannot address complaints after you return home, and no compensation will be provided for accommodation, meals, or transport costs." },
    { title: "Meals Policy", desc: "All buffet meals and room service are provided as per hotel policies. Unused items are non-refundable and non-exchangeable. No discounts will be applied after package confirmation." },
    { title: "Dispute Resolution", desc: "Any disputes related to these terms and conditions will be subject to the exclusive jurisdiction of courts in New Delhi, India." },
    { title: "Acceptance of Terms", desc: "Please carefully read all the above terms and conditions and remarks before making your booking. By making a booking, you agree to accept these terms and conditions." }
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Terms & Conditions</h1>
      
      <ul style={styles.list}>
        {terms.map((term, index) => (
          <li key={index} style={styles.item}>
            <span style={styles.sectionTitle}>{term.title}</span>
            {term.desc}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TermsAndConditions;