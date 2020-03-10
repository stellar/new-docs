import React, { useState } from "react";
import "whatwg-fetch";
import fetchJsonp from "fetch-jsonp";
import styled from "styled-components";

import { PALETTE, FONT_WEIGHT, CSS_TRANSITION_SPEED } from "constants/styles";
import { URL_ENDPOINTS } from "constants/endpoints";
import { Text } from "basics/Text";

import { CloseIcon } from "basics/Icons";
import MessageBlock from "components/Footer/MessageBlock";
import { BasicButton } from "basics/Buttons";

const FormContainerEl = styled.div``;
const Form = styled.form.attrs(() => ({
  action: URL_ENDPOINTS.mailchimp.developer,
  method: "post",
  id: "mc-embedded-subscribe-form",
  name: "mc-embedded-subscribe-form",
  target: "_blank",
  noValidate: true,
}))``;
const SubmitButtonEl = styled(BasicButton).attrs((props) => ({
  type: "submit",
  name: "subscribe",
  id: "mc-embedded-subscribe",
  "aria-label": `Subscribe`,
  disabled: props.formStatus === "error",
}))`
  background-color: ${PALETTE.purpleBlue};
  font-weight: ${FONT_WEIGHT.bold};
  cursor: pointer;
  color: ${PALETTE.white};
  padding: 0.5rem 1.5rem;
  border-radius: 0.125rem;
  margin-left: 0.5rem;
  line-height: 1.75;
  box-shadow: 0 8px 16px -8px rgba(62, 27, 219, 0.72);
  transition: all 0.2s ease-in-out;

  ${({ shouldApplyStatusColor, formStatus }) =>
    shouldApplyStatusColor &&
    `
    background-color: ${
      formStatus === "error" ? PALETTE.orange : PALETTE.green
    };
`};
  &:disabled {
    cursor: not-allowed;
  }
  &:hover {
    box-shadow: 0 8px 16px -4px rgba(62, 27, 219, 0.72);
    background-color: #3115af;
  }
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
`;
const EmailInput = styled.input.attrs({
  type: "email",
  id: "mce-EMAIL",
  required: true,
  name: "EMAIL",
  "aria-label": "mce-EMAIL",
})`
  width: 100%;
  max-width: 18.18rem;
  transition: border ${CSS_TRANSITION_SPEED.default} ease;
  color: ${PALETTE.black80};
  background: none;
  padding: 0.5rem 1rem;
  border: 1px solid ${PALETTE.white60};
  border-radius: 2px;
  line-height: 1.75;
  vertical-align: middle;
  box-shadow: 0 4px 8px -4px rgba(0, 0, 0, 0.16);

  ::placeholder {
    color: ${PALETTE.black80};
    font-size: 1rem;
  }

  :focus {
    outline-color: transparent;
    outline-style: none;
    border-color: ${PALETTE.purpleBlue};
  }
`;
const InputLabel = styled.label.attrs({
  htmlFor: "mce-EMAIL",
})`
  ${Text} {
    display: none;
  }
`;

/* Required by MailChimp To Prevent Spam */
const MailChimpHiddenBlock = styled.div.attrs({
  "aria-hidden": "true",
})`
  position: absolute;
  left: -5000px;
`;

const INITIAL_STATE = {
  status: "",
  message: "",
};
export const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [response, setForm] = useState(INITIAL_STATE);

  const handleSubmit = (e) => {
    e.preventDefault();

    const CONVERTED_TO_JSONP = URL_ENDPOINTS.mailchimp.foundation.replace(
      "post",
      "post-json",
    );
    const EMAIL_QUERY = `&EMAIL=${email}`;
    const HIDDEN_INPUT_QUERY = `&b_eb05e4f830c2a04be30171b01_8281a64779=""`;
    const JSONP_URL = CONVERTED_TO_JSONP + EMAIL_QUERY + HIDDEN_INPUT_QUERY;

    fetchJsonp(JSONP_URL, {
      jsonpCallback: "c",
    })
      .then((res) => res.json())
      .then((json) => {
        const { result, msg } = json;
        // PARSED JSON EXAMPLE
        // SUCCESS: { result: "success", msg: "Almost finished... We need to confirm your email a…ase click the link in the email we just sent you."}
        // EMAIL ERROR: { result: "error", msg: "0 - The domain portion of the email address is invalid (the portion after the @: sf)" }
        setForm({
          status: result,
          message: msg,
        });
      })
      .catch((err) => {
        setForm({
          status: "error",
          message: err,
        });
      });
  };

  const handleInput = (e) => {
    setEmail(e.target.value);
    setForm(INITIAL_STATE);
  };

  return (
    <FormContainerEl>
      <Form onSubmit={handleSubmit}>
        <div id="mc_embed_signup_scroll">
          <InputContainer>
            <InputLabel>
              <Text>Subscribe</Text>
              <EmailInput
                value={email}
                onChange={handleInput}
                placeholder="Email address"
              />
            </InputLabel>
            <MailChimpHiddenBlock>
              <input
                readOnly
                type="text"
                name="b_eb05e4f830c2a04be30171b01_8281a64779"
                tabIndex="-1"
                value=""
              />
            </MailChimpHiddenBlock>
            <SubmitButtonEl
              formStatus={response.status}
              shouldApplyStatusColor={!!response.status}
            >
              {response.status === "error" ? (
                <CloseIcon color={PALETTE.white} />
              ) : (
                "Subscribe"
              )}
            </SubmitButtonEl>
          </InputContainer>
        </div>
      </Form>
      {response.status && <MessageBlock email={email} response={response} />}
    </FormContainerEl>
  );
};
