import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {useApp} from '@realm/react';
import {AppSync} from './app/AppSync';
import {SymplatorRealmContext} from './app/models';
import {DefaultFunctionsFactory, DefaultUserProfileData, User} from 'realm';
import {API_KEY} from '@env';

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

  const {RealmProvider} = SymplatorRealmContext;

  return (
    <SafeAreaView>
      {user && (
        <RealmProvider
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
          <AppSync />
        </RealmProvider>
      )}
    </SafeAreaView>
  );
};

export default App;
