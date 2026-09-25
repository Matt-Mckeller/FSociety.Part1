'use client';

import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Avatar,
  CircularProgress,
  Alert,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Person } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { ProtectedRoute } from '@/components/auth';
import { Navbar } from '@/components/layout';
import { useAuth, ME_QUERY } from '@expanse/auth';

const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($input: UpdateUserInput!) {
    updateProfile(input: $input) {
      id
      name
      avatarUrl
      preferredLanguage
      readingLevel
    }
  }
`;

interface UpdateProfileInput {
  name?: string;
  preferredLanguage?: string;
  readingLevel?: string;
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'it', name: 'Italian' },
  { code: 'ru', name: 'Russian' },
];

const readingLevels = [
  { value: 'CHILD', label: 'Child (Simple)' },
  { value: 'STANDARD', label: 'Standard' },
  { value: 'ACADEMIC', label: 'Academic' },
];

function ProfileContent() {
  const { user, refreshUser } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<UpdateProfileInput>({
    defaultValues: {
      name: user?.name || '',
      preferredLanguage: 'en',
      readingLevel: 'STANDARD',
    },
  });

  const preferredLanguage = watch('preferredLanguage');
  const readingLevel = watch('readingLevel');

  const [updateProfile, { loading }] = useMutation(UPDATE_PROFILE_MUTATION, {
    refetchQueries: [{ query: ME_QUERY }],
    onCompleted: () => {
      setSuccess('Profile updated successfully');
      refreshUser();
      setTimeout(() => setSuccess(null), 3000);
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const onSubmit = (data: UpdateProfileInput) => {
    setError(null);
    updateProfile({
      variables: {
        input: {
          name: data.name,
          preferredLanguage: data.preferredLanguage,
          readingLevel: data.readingLevel,
        },
      },
    });
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <Container maxWidth="tablet" sx={{ pt: 12, pb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{
          fontWeight: 600
        }}>
          Profile
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess(null)}>
            {success}
          </Alert>
        )}

        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Avatar
              src={user?.avatarUrl}
              sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}
            >
              {user?.name?.charAt(0) || <Person />}
            </Avatar>
            <Box>
              <Typography variant="h6">{user?.name}</Typography>
              <Typography sx={{
                color: "text.secondary"
              }}>{user?.email}</Typography>
              {user?.emailVerifiedAt && (
                <Typography variant="caption" sx={{
                  color: "success.main"
                }}>
                  Email verified
                </Typography>
              )}
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register('name', {
                required: 'Name is required',
                minLength: { value: 1, message: 'Name is required' },
                maxLength: { value: 100, message: 'Name is too long' },
              })}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Preferred Language</InputLabel>
              <Select
                value={preferredLanguage || 'en'}
                label="Preferred Language"
                onChange={(e) => setValue('preferredLanguage', e.target.value, { shouldDirty: true })}
              >
                {languages.map((lang) => (
                  <MenuItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Reading Level</InputLabel>
              <Select
                value={readingLevel || 'STANDARD'}
                label="Reading Level"
                onChange={(e) => setValue('readingLevel', e.target.value, { shouldDirty: true })}
              >
                {readingLevels.map((level) => (
                  <MenuItem key={level.value} value={level.value}>
                    {level.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={loading || !isDirty}
              >
                {loading ? <CircularProgress size={24} /> : 'Save Changes'}
              </Button>
            </Box>
          </Box>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Account Information
          </Typography>
          <Box sx={{ display: 'grid', gap: 2 }}>
            <Box>
              <Typography variant="caption" sx={{
                color: "text.secondary"
              }}>
                Member Since
              </Typography>
              <Typography>
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{
                color: "text.secondary"
              }}>
                Account Role
              </Typography>
              <Typography>{user?.role}</Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
