import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {useApp} from '@realm/react';
import {AppSync} from './app/AppSync';
import {SymplatorRealmContext} from './app/models';
import {DefaultFunctionsFactory, DefaultUserProfileData, User} from 'realm';

export const App: React.FC = () => {
  const app = useApp();
  const [user, setUser] = useState<User<
    DefaultFunctionsFactory,
    SimpleObject,
    DefaultUserProfileData
  > | null>(null);

  useEffect(() => {
    async function loginAnonymously() {
      const currentUser = await app.logIn(Realm.Credentials.anonymous());
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
            user: user || undefined,
            partitionValue: 'PUBLIC',
            onError: error => console.error(error),
          }}>
          <AppSync />
        </RealmProvider>
      )}
    </SafeAreaView>
  );
};

export default App;
