import React, {useEffect, useState} from 'react';
import {useApp} from '@realm/react';
import {AppSync} from './app/AppSync';
import {DefaultFunctionsFactory, DefaultUserProfileData, User} from 'realm';
import {API_KEY} from '@env';
import {SyncedRealmContext} from './app/context/SymplatorRealm/SyncedRealmContext';
import {UserSettingsProvider} from './app/components/Providers/UserSettingsProvider';

export const App: React.FC = () => {
  const app = useApp();
  const [user, setUser] = useState<User<
    DefaultFunctionsFactory,
    SimpleObject,
    DefaultUserProfileData
  > | null>(null);

  useEffect(() => {
    const loginWithApiKey = async () => {
      try {
        const credentials = Realm.Credentials.apiKey(API_KEY);
        const currentUser = await app.logIn(credentials);
        setUser(currentUser);
      } catch (error) {
        console.error('Error logging into Realm: ', error);
      }
    };
    loginWithApiKey();
  }, [app]);

  const {RealmProvider: SyncedRealmProvider} = SyncedRealmContext;

  return (
    <>
      {user && (
        <SyncedRealmProvider
          sync={{
            flexible: true,
            onError: console.error,
            user: user,
            initialSubscriptions: {
              update(subs, realm) {
                subs.add(realm.objects('Symptom'));
              },
            },
          }}>
          <UserSettingsProvider>
            <AppSync />
          </UserSettingsProvider>
        </SyncedRealmProvider>
      )}
    </>
  );
};

export default App;
