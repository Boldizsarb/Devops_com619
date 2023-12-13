function Terms({ title }) {
  return (
    <div className="container-fluid">
      <h1 className="h3 mb-0 text-gray-800">
        {title}: Last Updated: 10/12/2023
      </h1>
      <div className="align-items-center justify-content-between">
        <p id="read-terms">
          Welcome to our DevOps website project. Please read these Terms of Use
          carefully before using our website and services.
        </p>
        <h3 id="accept-terms" style={{ fontWeight: "bold" }}>
          1. Acceptance of Terms
        </h3>
        <p id="agree-terms">
          By accessing or using this website, including any features, content,
          or applications offered, you agree to be bound by these Terms. If you
          do not agree to these Terms, please do not use our website.
        </p>
        <h3 id="u-accounts-login" style={{ fontWeight: "bold" }}>
          2. User Accounts and Login
        </h3>
        <p id="account-creation">
          a.<b>Account Creation:</b>To access certain features of our website,
          you may need to create a user account. You agree to provide accurate,
          current, and complete information during the registration process.
        </p>
        <p id="account-security">
          b.<b>Security:</b>You are responsible for maintaining the
          confidentiality of your account credentials, and you agree not to
          disclose them to any third party. You are solely responsible for all
          activities that occur under your account.
        </p>
        <p id="account-termination">
          c.<b>Termination:</b>We reserve the right to terminate or suspend your
          account at our sole discretion, without notice, for any conduct that
          we, in our sole discretion, believe violates these Terms or is harmful
          to other users or us.
        </p>
        <h3 id="loc-based-services" style={{ fontWeight: "bold" }}>
          3. Location-Based Services
        </h3>
        <p id="geoloc">
          a.<b>Geolocation:</b>Some features of our website may use
          location-based services. You agree to allow us to collect, use, and
          share your location data for the purpose of providing these services.
        </p>
        <p id="accuracy">
          b.<b>Accuracy:</b>While we strive to provide accurate location
          information, we do not guarantee the accuracy, completeness, or
          reliability of location data.
        </p>
        <h3 id="u-conduct" style={{ fontWeight: "bold" }}>
          4. User Conduct
        </h3>
        <p id="u-compliance">
          a.<b>Compliance:</b>You agree to comply with all applicable laws and
          regulations regarding your use of our website.
        </p>
        <p id="prohibited-activ">
          b.<b> Prohibited Activities:</b>You may not engage in any activity
          that interferes with or disrupts our website or the servers and
          networks connected to it.
        </p>
        <h3 id="intellectual-property" style={{ fontWeight: "bold" }}>
          5. Intellectual Property
        </h3>
        <p id="ownership">
          a.<b>Ownership:</b>All content, trademarks, logos, and intellectual
          property on our website are owned or licensed by us. You may not use,
          reproduce, or distribute any content without our prior written
          permission.
        </p>
        <h3 id="limit-liability" style={{ fontWeight: "bold" }}>
          6. Limitation of Liability
        </h3>
        <p id="limit-disclaimer">
          a.<b>Disclaimer:</b>To the extent permitted by law, we disclaim all
          warranties, whether express or implied, including but not limited to
          the implied warranties of merchantability, fitness for a particular
          purpose, and non-infringement.
        </p>
        <p id="limit-liability-2">
          b.<b>Limitation of Liability:</b>We shall not be liable for any
          direct, indirect, incidental, special, consequential, or exemplary
          damages, including but not limited to, damages for loss of profits,
          goodwill, use, data, or other intangible losses.
        </p>
        <h3 id="change-to-terms" style={{ fontWeight: "bold" }}>
          7. Changes to Terms
        </h3>
        <p id="right-to-update">
          We reserve the right to update or modify these Terms at any time
          without prior notice. The date of the last modification will be
          indicated at the top of these Terms.
        </p>
        <h3 id="governing-law" wstyle={{ fontWeight: "bold" }}>
          8. Governing Law
        </h3>
        <p id="terms-governed">
          These Terms are governed by and construed in accordance with the laws
          of United Kingdom, without regard to its conflict of law principles.
        </p>
        <h3 id="contact-us" style={{ fontWeight: "bold" }}>
          Contact Us:
        </h3>
        <p id="qa-terms">
          If you have any questions about these Terms, please contact us at
          [Your Contact Information].
        </p>
        <p id="thank-you">Thank you for using our Devops application!</p>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Terms title="Terms of Use" />);
