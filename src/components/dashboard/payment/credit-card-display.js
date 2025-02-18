/* eslint-disable camelcase */
import React from 'react';
import dashboardStyles from '@styles/dashboard.module.scss';
import Amex from 'payment-icons/min/flat/amex.svg';
import Default from 'payment-icons/min/flat/default.svg';
import Diners from 'payment-icons/min/flat/diners.svg';
import Discover from 'payment-icons/min/flat/discover.svg';
import JCB from 'payment-icons/min/flat/jcb.svg';
import Mastercard from 'payment-icons/min/flat/mastercard.svg';
import UnionPay from 'payment-icons/min/flat/unionpay.svg';
import Visa from 'payment-icons/min/flat/visa.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PinkButton from '@components/pink-button';

const CardIcon = ({ brand, width = '80px', height = '50px' }) => {
  const normalizedBrand = brand.trim().toLowerCase();
  switch (normalizedBrand) {
  case 'visa':
    return <Visa height={height} width={width} style={{ minHeight: height, minWidth: width }} />;
  case 'american express':
    return <Amex height={height} width={width} />;
  case 'discover':
    return <Discover height={height} width={width} />;
  case 'diners club':
    return <Diners height={height} width={width} />;
  case 'jcb':
    return <JCB height={height} width={width} />;
  case 'mastercard':
    return <Mastercard height={height} width={width} />;
  case 'unionpay':
    return <UnionPay height={height} width={width} />;
  default:
    return <Default height={height} width={width} />;
  }
};

const AddCard = ({ openAdd }) => {
  return (
    <div className={dashboardStyles.addCardPrompt}>
      <div>Add a credit card to get started with BobaMe.</div>
      <PinkButton style={{ fontSize: '16px', marginTop: '30px' }} onClick={openAdd}>
        <FontAwesomeIcon icon={faPlus} color="white" />
        <div style={{ marginLeft: '5px' }}>Add Card</div>
      </PinkButton>
    </div>
  );
};

const CreditCardDisplay = ({
  paymentInfo, openEdit, openDelete, openAdd,
}) => {
  if (!paymentInfo) return <AddCard openAdd={openAdd} />;

  const { card, address } = paymentInfo;
  const {
    brand, last4, exp_month, exp_year,
  } = card;
  const {
    city, state, line1, postal_code,
  } = address;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <button type="button" className="button-text" onClick={openEdit}>Edit</button>
        <button type="button" className="button-text" onClick={openDelete}>Delete</button>
      </div>

      <div className={dashboardStyles.creditCard}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <CardIcon brand={brand} />

          <div className={dashboardStyles.creditCardDetails}>
            <div>{`xxxxxxxxxxxx${last4}`}</div>
            <div>{`${exp_month}/${exp_year}`}</div>
          </div>
        </div>

        <div className={dashboardStyles.creditCardDetails}>
          <div>{line1}</div>
          <div>{`${city}, ${state} ${postal_code}`}</div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardDisplay;
