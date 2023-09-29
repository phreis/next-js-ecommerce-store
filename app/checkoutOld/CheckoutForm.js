'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { clearCartItemServerAction } from '../serverActions.js';

function CheckoutForm() {
  const router = useRouter();

  const CustomerType = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalcode: '',
    country: '',
    creditcard: '',
    expirationdate: '',
    securitycode: '',
  };

  const [customer, setCustomer] = useState(CustomerType);
  return (
    <div>
      <form>
        <input
          value={customer.firstName}
          onChange={(event) =>
            setCustomer({ ...customer, firstName: event.target.value })
          }
        />
        <input
          value={customer.lastName}
          onChange={(event) =>
            setCustomer({ ...customer, lastName: event.target.value })
          }
        />
        <button
          onClick={() => console.log(customer)}
          formAction={async () => {
            await clearCartItemServerAction();
            router.push('./thankyou');
          }}
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;
