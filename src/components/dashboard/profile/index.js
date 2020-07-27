/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { getStateValueFromCode } from '@components/state-selector';
import useAuth from '@utils/useAuth';
import DashboardScreen from '../dashboard-screen';
import LeftCol from './left-col';
import RightCol from './right-col';
import SaveButton from '../save-button';

const ProfileScreen = ({
  data, save, isSaving, saveError,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [zip, setZip] = useState('');

  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [filenames, setFilenames] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    setName(data?.name);
    setEmail(data?.email);
    setPhone(data?.phone_number);
    setWebsite(data?.website);
    setAddress(data?.street_address);
    setCity(data?.city);
    setStateCode(getStateValueFromCode(data?.state));
    setZip(data?.zip);
  }, [data]);

  const onChange = (val, id) => {
    switch (id) {
    case 'name':
      setName(val);
      break;
    case 'email':
      setEmail(val);
      break;
    case 'phone':
      setPhone(val);
      break;
    case 'website':
      setWebsite(val);
      break;
    case 'address':
      setAddress(val);
      break;
    case 'city':
      setCity(val);
      break;
    case 'state':
      setStateCode(val);
      break;
    case 'zip':
      setZip(val);
      break;
    default:
      break;
    }
  };

  const saveData = () => {
    console.log(user.uid);
    const business = {
      businessId: user.uid,
      name,
      email,
      phone_number: phone,
      website,
      street_address: address,
      city,
      state: stateCode.value,
      zip,
    };

    save(business);
  };

  return (
    <DashboardScreen
      title="Profile"
      description="Edit your business information"
      leftCol={(
        <LeftCol onChange={onChange}
          values={{
            name, email, phone, website,
          }}
        />
      )}
      rightCol={(
        <RightCol onChange={onChange}
          values={{
            address, city, state: stateCode, zip,
          }}
          setIsUploading={setIsUploading}
          setError={setError}
          filenames={filenames}
          setFilenames={setFilenames}
        />
      )}
      topRight={<SaveButton save={saveData} isSaving={isSaving || isUploading} error={saveError || error} />}
      mainWidth={50}
    />
  );
};

export default ProfileScreen;
