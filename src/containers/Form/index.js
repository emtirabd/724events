import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(), 1000);
  });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false); // Nouvel état pour gérer l'affichage du message de confirmation

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      // Nous essayons d'appeler mockContactApi
      try {
        await mockContactApi();
        setSending(false);
        setSent(true); // Définir l'état "sent" sur true après l'envoi réussi
        onSuccess(); // Appeler la fonction onSuccess fournie en tant que prop
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact}>
      {sent && <p>Votre message a été envoyé avec succès !</p>} {/* Afficher le message de confirmation si l'état "sent" est true */}
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personnel", "Entreprise"]}
            onChange={() => null}
            label="Personnel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
