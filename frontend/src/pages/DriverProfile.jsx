import React, { useEffect, useState } from 'react';
import {
  Box, TextField, Button, Card, CardContent, Typography, CircularProgress
} from '@mui/material';

const DriverProfile = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ phone: '', vehicle: '', experience: '' });
  const [licenseFile, setLicenseFile] = useState(null);
  const [aadharFile, setAadharFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const user = await res.json();

        const detailsRes = await fetch(`/api/driver/dashboard/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const details = await detailsRes.json();

        setProfile({ ...user, ...details });
        setForm({
          phone: user.phoneno,
          vehicle: user.vehicle || '',
          experience: user.experience || ''
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`/api/driver/update-profile/${profile.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        alert('Profile updated');
      } else {
        alert('Failed to update profile');
      }
    } catch (err) {
      alert('Error updating profile');
    }
  };

  const handleDocumentUpload = async () => {
    if (!licenseFile || !aadharFile) {
      alert('Please select both License and Aadhar files');
      return;
    }

    const formData = new FormData();
    formData.append('license', licenseFile);
    formData.append('aadhar', aadharFile);

    try {
      const res = await fetch('/api/driver/upload-verification', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        alert('Documents uploaded successfully. Status set to Pending');
      } else {
        alert(data.message || 'Upload failed');
      }
    } catch (err) {
      alert('Error uploading documents');
    }
  };

  if (loading) {
    return (
      <Box minHeight="80vh" display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>Driver Profile</Typography>

          <TextField label="Name" value={profile?.name} fullWidth margin="normal" disabled />
          <TextField label="Email" value={profile?.email} fullWidth margin="normal" disabled />
          <TextField label="Phone" name="phone" value={form.phone} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Vehicle" name="vehicle" value={form.vehicle} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Experience (in years)" name="experience" value={form.experience} onChange={handleChange} fullWidth margin="normal" />

          <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
            Update Profile
          </Button>

          <Box mt={4}>
            <Typography variant="h6" gutterBottom>Re-upload Documents</Typography>
            <input type="file" onChange={e => setLicenseFile(e.target.files[0])} />
            <br />
            <input type="file" onChange={e => setAadharFile(e.target.files[0])} style={{ marginTop: '1rem' }} />
            <br />
            <Button variant="contained" color="secondary" onClick={handleDocumentUpload} sx={{ mt: 2 }}>
              Upload Documents
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DriverProfile;
