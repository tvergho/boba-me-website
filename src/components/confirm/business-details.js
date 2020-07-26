/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
import React, { useState, useEffect } from 'react';
import Geocode from 'react-geocode';
import { gql, useMutation } from '@apollo/client';
import FormBox from './form-box';
import confirmStyles from '../../styles/confirm.module.scss';
import LeftCol from './left-col';
import RightCol from './right-col';
import useAuth from '../../utils/useAuth';

const UPDATE_BUSINESS = gql`
mutation update ($business: UpdateBusinessInput!) {
    updateBusiness(input: $business) {
      businessId
      category
      commission
      city
      email
      likes
      location
      name
      phone_number
      photos
      state
      street_address
      website
      zip
    }
  }
`;

Geocode.setApiKey('AIzaSyDgbpn2Mnmxm_YmEnuuQKOJT5zMcD6XW90');

const BusinessDetails = ({ increment }) => {
  const [pushBusiness, { loading: isUpdatingBusiness, error: isUpdatingError, data }] = useMutation(UPDATE_BUSINESS);
  const [user] = useAuth();

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateCode, setStateCode] = useState({ value: 'CA', label: 'California' });
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [filenames, setFilenames] = useState([]);
  const [willUpdate, setWillUpdate] = useState(false);

  const enabled = name.trim().length > 0 && address.trim().length > 0 && city.trim().length > 0 && zip.trim().length > 0 && phone.trim().length > 0;

  // Attempt to retrieve the customer's info from URL params.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window?.location?.search);
      setName(urlParams.get('businessName'));
      setPhone(urlParams.get('phone').replace(' ', '+'));
      geocodeAddress(urlParams.get('address'));
    }
  }, []);

  // Lifecycle for the upload process. Move to the next page, start the GraphQL mutation, or set an error.
  useEffect(() => {
    if (data && !isUploading) {
      increment();
    }
    if (!isUploading && willUpdate) {
      updateBusiness(); // Updates the business if the upload process finishes.
    }
    if (isUpdatingError) {
      setError('Error updating business information.');
      setWillUpdate(false);
    }
  }, [isUploading, data, isUpdatingError, willUpdate]);

  async function geocodeAddress(addressToGeocode) {
    try {
      const res = await Geocode.fromAddress(addressToGeocode);

      if (res.results && res.results.length > 0) {
        if (res.results[0].address_components[0].types[0] === 'premise') res.results[0].address_components.shift();

        const [num, street, cityName, county, state, country, zipcode] = res.results[0].address_components;
        setAddress(`${num.long_name} ${street.long_name}`);
        setCity(cityName.long_name);
        setStateCode({ value: state.short_name, label: state.long_name });
        setZip(zipcode.long_name);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  async function updateBusiness() {
    setWillUpdate(true);

    try {
      if (!isUploading) {
        const business = {
          businessId: user.uid,
          city,
          name,
          phone_number: phone,
          state: stateCode.value,
          street_address: address,
          website,
          zip,
          photos: filenames.map((val) => `https://bobame-photos.s3.us-east-2.amazonaws.com/${val}`),
        };

        pushBusiness({ variables: { business } });
      }
    } catch (e) {
      setError('Error updating business information.');
      setWillUpdate(false);
    }
  }

  return (
    <>
      <FormBox title="Business Details" fullLoading={loading} enabled={enabled} error={error} loading={isUpdatingBusiness || (willUpdate && isUploading)} submit={updateBusiness}>
        <input placeholder="Café Name" name="name" id="name" value={name} onChange={(e) => { setName(e.target.value); }} />
        <div className={confirmStyles.columns}>
          <LeftCol
            address={address}
            setAddress={setAddress}
            city={city}
            setCity={setCity}
            zip={zip}
            setZip={setZip}
            stateCode={stateCode}
            setStateCode={setStateCode}
          />

          <RightCol
            phone={phone}
            setPhone={setPhone}
            setError={setError}
            setIsUploading={setIsUploading}
            filenames={filenames}
            setFilenames={setFilenames}
            website={website}
            setWebsite={setWebsite}
          />
        </div>
      </FormBox>
    </>

  );
};

export default BusinessDetails;
