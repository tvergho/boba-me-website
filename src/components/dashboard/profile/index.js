/* eslint-disable no-use-before-define */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { getStateValueFromCode } from '@components/state-selector';
import useAuth from '@utils/useAuth';
import axios from 'axios';
import { useApolloClient, gql } from '@apollo/client';
import useDelay from '@utils/useDelay';
import validateEmail from '@utils/validateEmail';
import DashboardScreen from '../dashboard-screen';
import LeftCol from './left-col';
import RightCol from './right-col';
import SaveButton from '../save-button';
import PasswordModal from './password-modal';

const GET_BUSINESS = gql`
query getBusiness ($businessId: ID!) {
  getBusiness(input: $businessId) {
    businessId
    city
    name
    email
    phone_number
    photos
    state
    street_address
    website
    zip
  }
}
`;

const ProfileScreen = ({
  data, save, isSaving, saveError, setSaving,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [zip, setZip] = useState('');
  const [photos, setPhotos] = useState([]);
  const [newPassword, setNewPassword] = useState('');

  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [filenames, setFilenames] = useState([]);
  const [modalShown, setModalShown, delayHide] = useDelay(false);
  const [modalPassword, setModalPassword] = useState('');
  const [modalLoading, setModalLoading] = useState(false);

  const { user, firebaseExport: firebase } = useAuth();
  const client = useApolloClient();
  const enabled = name?.length > 0 && validateEmail(email) && phone?.length > 0 && website?.length > 0 && address?.length > 0
  && city?.length > 0 && zip?.length > 0 && (newPassword?.length === 0 || newPassword?.length >= 8);

  useEffect(() => {
    setName(data?.name);
    setEmail(data?.email);
    setPhone(data?.phone_number);
    setWebsite(data?.website);
    setAddress(data?.street_address);
    setCity(data?.city);
    setStateCode(getStateValueFromCode(data?.state));
    setZip(data?.zip);
    setPhotos(data?.photos || []);
  }, [data]);

  useEffect(() => {
    if (!isUploading && user) {
      const business = {
        businessId: user.uid,
        photos: photos.concat(filenames.map((file) => `https://bobame-photos.s3.us-east-2.amazonaws.com/${file}`)),
      };

      setFilenames([]);
      save(business);
    }
  }, [isUploading]);

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
    case 'password':
      setNewPassword(val);
      break;
    default:
      break;
    }
  };

  const handleFirebaseError = (firebaseError) => {
    switch (firebaseError.code) {
    case 'auth/invalid-email':
      setError('Invalid email.');
      break;
    case 'auth/email-already-in-use':
      setError('Invalid email.');
      break;
    case 'auth/wrong-password':
      setError('Password is incorrect.');
      break;
    case 'auth/weak-password':
      setError('Password must be more than 8 characters.');
      break;
    default:
      setError('Error saving your account information.');
      break;
    }
  };

  const reauth = async () => {
    setModalLoading(true);
    setError('');
    const cred = firebase.auth.EmailAuthProvider.credential(data.email, modalPassword);

    if (user) {
      try {
        await user.reauthenticateWithCredential(cred);
        setModalShown(false);
        saveData(true);
        setModalLoading(false);
      } catch (e) {
        setError('There was an error authenticating with this password.');
        setModalLoading(false);
      }
    }
  };

  const saveData = async (forceSave) => {
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
    setError('');

    if (forceSave) {
      setSaving(true);
      save(business);

      try {
        if (email !== data.email) {
          await user.updateEmail(email);
        }
        if (newPassword.length > 0) {
          await user.updatePassword(newPassword);
        }
      } catch (e) {
        handleFirebaseError(e);
      }

      setSaving(false);
    } else if (email !== data.email || newPassword.length > 0) {
      setModalShown(true);
    } else {
      save(business);
    }
  };

  const setDefaultImage = (i) => {
    const newPhotos = [...photos];
    const temp = newPhotos[i];
    newPhotos[i] = newPhotos[0];
    newPhotos[0] = temp;

    setPhotos(newPhotos);

    const business = {
      businessId: user.uid,
      photos: newPhotos,
    };

    save(business, { __typename: 'Mutation', updateBusiness: { businessId: user.uid, photos: newPhotos } });
  };

  const deleteImage = async (i) => {
    if (user) {
      setSaving(true);

      const url = photos[i];
      const newPhotos = [...photos];
      newPhotos.splice(i, 1);
      setPhotos(newPhotos);

      const token = await user.getIdToken();

      client.writeQuery({
        query: GET_BUSINESS,
        data: {
          getBusiness: { ...data, photos: newPhotos },
        },
      });

      const params = {
        method: 'delete',
        url: encodeURI(`https://api.bobame.app/business/photo?url=${url}`),
        headers: {
          authorization: token,
        },
      };

      axios(params)
        .catch((e) => { setError(e.message); })
        .finally(() => {
          setSaving(false);
        });
    }
  };

  return (
    <>
      <DashboardScreen
        title="Profile"
        description="Edit your business information"
        leftCol={(
          <LeftCol onChange={onChange}
            values={{
              name, email, phone, website, password: newPassword,
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
            photos={photos}
            isUploading={isUploading}
            setDefaultImage={setDefaultImage}
            deleteImage={deleteImage}
          />
        )}
        topRight={<SaveButton save={saveData} isSaving={isSaving || isUploading} error={saveError || error} enabled={enabled} />}
        mainWidth={50}
      />

      {delayHide && (
        <PasswordModal
          error={error}
          modalShown={modalShown}
          password={modalPassword}
          setPassword={setModalPassword}
          close={() => { setModalShown(false); }}
          modalLoading={modalLoading}
          submit={reauth}
        />
      )}
    </>
  );
};

export default ProfileScreen;
