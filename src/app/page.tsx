import { 
  LoginButton, 
  LogoutButton, 
  RegisterButton, 
  ProfileButton,
  ServerProfileButton,
} from '@/components/button.components';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { User } from '@/components/user.component';

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <main 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
      }}
    >
      <div>
        <LoginButton />
        <RegisterButton />
        <LogoutButton />
        <ProfileButton />
        <ServerProfileButton />
        <h1>Server Session</h1>
        <pre>{JSON.stringify(session, null, 4)}</pre>
         <User />
      </div>
    </main>
  )
}
