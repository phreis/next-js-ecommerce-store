import React from 'react';
import { checkoutFormAction } from '../serverActions.js';
import styles from './CheckoutForm.module.scss';

function CheckoutForm() {
  return (
    <div>
      <form
        id="form"
        action={checkoutFormAction}
        className={styles.checkoutFormContainer}
      >
        <p>
          <label htmlFor="firstName">First name</label>
          <input
            data-test-id="checkout-first-name"
            id="firstName"
            name="firstName"
            required
          />
        </p>

        <p>
          <label htmlFor="lastName">Last name</label>
          <input
            data-test-id="checkout-last-name"
            id="lastName"
            name="lastName"
            required
          />
        </p>

        <p>
          <label htmlFor="email">EMail</label>
          <input
            data-test-id="checkout-email"
            id="email"
            name="email"
            type="email"
            required
          />
        </p>

        <p>
          <label htmlFor="address">Address</label>
          <input
            data-test-id="checkout-address"
            id="address"
            name="address"
            required
          />
        </p>
        <p>
          <label htmlFor="city">City</label>
          <input data-test-id="checkout-city" id="city" name="city" required />
        </p>
        <p>
          <label htmlFor="postalcode">Postalcode</label>
          <input
            data-test-id="checkout-postal-code"
            id="postalcode"
            name="postalcode"
            required
          />
        </p>
        <p>
          <label htmlFor="country">Country</label>
          <input
            data-test-id="checkout-country"
            id="country"
            name="country"
            required
          />
        </p>
        <p>
          <label htmlFor="creditcard">Creditcard</label>
          <input
            data-test-id="checkout-credit-card"
            id="creditcard"
            name="creditcard"
            required
            type="tel"
            inputMode="numeric"
            pattern="[0-9\s]{13,19}"
            autoComplete="cc-number"
            maxLength="19"
            placeholder="xxxx xxxx xxxx xxxx"
          />
        </p>
        <p>
          <label htmlFor="expirationdate">Expirationdate</label>
          <input
            data-test-id="checkout-expiration-date"
            id="expirationdate"
            name="expirationdate"
            required
            type="tel"
            placeholder="MM / YY"
            autoComplete="cc-exp"
          />
        </p>
        <p>
          <label htmlFor="securitycode">Securitycode</label>
          <input
            data-test-id="checkout-security-code"
            id="securitycode"
            name="securitcycode"
            placeholder="CVC"
            maxLength="3"
            required
          />
        </p>

        <button
          data-test-id="checkout-confirm-order"
          name="intent"
          value="checkout"
        >
          Checkout
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;
