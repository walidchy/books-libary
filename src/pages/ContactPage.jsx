import ContactForm from '../components/ContactForm';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark py-8">
      <div className="container-custom">
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactPage;
