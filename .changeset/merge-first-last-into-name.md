---
"@shopwell/api-client": major
"@shopwell/composables": major
"@shopwell/cms-base-layer": major
---

Customers, users, order customers, addresses and newsletter recipients now carry a single `name` instead of `firstName` and `lastName`.

`firstName` and `lastName` are gone from the Admin API and Store API schemas of `Customer`, `CustomerAddress`, `OrderCustomer`, `OrderAddress`, `User` and `NewsletterRecipient`. They expose `name` (the full name) instead. The same applies to the request bodies that used to send both fields — customer registration, profile update, contact form, newsletter subscription and the revocation request form — and to the `contactForm` shop settings, where `firstNameFieldRequired` and `lastNameFieldRequired` are merged into `nameFieldRequired`.

`useOrderDetails()` returns the customer's full name as `name` in the personal details.

The newsletter and contact form CMS elements render a single name input instead of separate first and last name inputs.
