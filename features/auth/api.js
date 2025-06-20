// features/auth/api.js
import axiosClient from '../../api/axios';

export const loginUser = (credentials) => {
  return axiosClient.post('/loginUser', credentials);
};

export const signup = (formData) => {
  return axiosClient.post('/userRegister', formData);
};

export const getUserData = async () => {
  try {
    const res = await axiosClient.get('/profile/getProfile');
    if (res.data) {
      return res.data;
    }
    throw new Error('No profile data received');
  } catch (error) {
    if (error?.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

export const requestOtp = (payload) => {
  return axiosClient.post('/otp/createOtp', payload);
};

export const verifyOtp = (payload) => {
  return axiosClient.post('/otp/verifyOtp', payload);
};

export const resetPassword = ({ email, otp, password }) => {
  return axiosClient.post('/otp/resetPassword', { email, otp, password });
};

export const resendOtp = ({ email }) => {
  return axiosClient.post('/otp/resendOtp', { email });
};

export const updateProfile = async (profileData) => {
  const formData = new FormData();

  if (
    profileData.photoUrl &&
    typeof profileData.photoUrl === 'string' &&
    profileData.photoUrl.startsWith('file')
  ) {
    const filename = profileData.photoUrl.split('/').pop() || 'profile.jpg';
    const ext = filename.split('.').pop()?.toLowerCase() || 'jpg';

    formData.append('photo', {
      uri: profileData.photoUrl,
      type: `image/${ext}`,
      name: filename,
    });
  }

  if (profileData.name) formData.append('name', profileData.name);
  if (profileData.email) formData.append('email', profileData.email);

  const response = await axiosClient.patch('/profile/updateProfile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data?.profile;
};



//FamilyMember


export const getFamilyMembers = async () => {
  const res = await axiosClient.get('/profile/getFamilyMembers');
  return res.members || []; // must match backend response
};


export const addFamilyMember = (memberData) => {
 return axiosClient.post('/profile/addFamilyMember', memberData);
};

export const deleteFamilyMember = async (id) => {
  const res = await axiosClient.delete(`/profile/deleteFamilyMember/${id}`);
  return res.data;
};



//Notification


export const getNotifications = (params = {}) => {
  return axiosClient.get('/profile/notifications', { params });
};

export const markNotificationAsRead = (notificationId) => {
  return axiosClient.patch(`/profile/notifications/${notificationId}/read`);
};



//Questionaire Api
// Questionnaire API

export const submitQuestionnaire = (data) => {
  return axiosClient.post('/questionnaire/addQuestionnaire', data);
};

export const fetchQuestionnaire = () => {
  return axiosClient.get('/questionnaire/getQuestionnaire');
};
