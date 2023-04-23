import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {useApp} from '@realm/react';
import {AppSync} from './app/AppSync';
import {SymplatorRealmContext} from './app/models';
import {DefaultFunctionsFactory, DefaultUserProfileData, User} from 'realm';
import {REALM_PASS} from '@env';

export const App: React.FC = () => {
  const app = useApp();
  const [user, setUser] = useState<User<
    DefaultFunctionsFactory,
    SimpleObject,
    DefaultUserProfileData
  > | null>(null);

  useEffect(() => {
    async function loginAnonymously() {
      const credentials = Realm.Credentials.apiKey(REALM_PASS);
      const currentUser = await app.logIn(credentials);
      setUser(currentUser);
    }
    loginAnonymously();
  }, [app]);

  const {RealmProvider} = SymplatorRealmContext;

  return (
    <SafeAreaView>
      {user && (
        <RealmProvider
          sync={{
            flexible: true,
            onError: console.error,
            user: user
          }}>
          <AppSync />
        </RealmProvider>
      )}
    </SafeAreaView>
  );
};

export default App;
