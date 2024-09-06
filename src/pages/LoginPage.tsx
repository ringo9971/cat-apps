import { Box, Typography, Button } from '@mui/material';
import AuthLogin from 'components/AuthLogin';
import { useUser } from 'hooks/firebase/useUser';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { user } = useUser();

  const navigate = useNavigate();

  return (
    <>
      {user ? (
        <Box>
          <Typography>ログイン済みです</Typography>
          <Button onClick={() => navigate('/')}>ドロップ記録はこちら</Button>
        </Box>
      ) : (
        <AuthLogin />
      )}
    </>
  );
};

export default LoginPage;
