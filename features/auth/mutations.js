// features/auth/mutations.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { setTokens, removeTokens } from '../../utils/auth';
import {
  loginUser,
  signup,
  requestOtp,
  verifyOtp,
  resetPassword,
  resendOtp,
  updateProfile,
  getFamilyMembers, addFamilyMember,  deleteFamilyMember,
  getNotifications, markNotificationAsRead,
 
} from './api';

import { useMessage } from '../../context/MessageContext'; // ✅ Custom message hook

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const { showMessage } = useMessage();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      await setTokens({ accessToken: data.accessToken });
      queryClient.setQueryData(['user'], data.user);
      await queryClient.invalidateQueries({ queryKey: ['authStatus'] });
      await queryClient.refetchQueries({ queryKey: ['authStatus'] });

      showMessage('success', 'Login successful');
    },
    onError: (error) => {
      showMessage('error', error?.response?.data?.message || 'Login failed');
    },
  });
};

export const useSignupMutation = () => {
  const { showMessage } = useMessage();

  return useMutation({
    mutationFn: signup,
    onSuccess: async (data) => {
      await setTokens({ accessToken: data.token });
      showMessage('success', 'Signup successful');
    },
    onError: (error) => {
      showMessage('error', error?.response?.data?.message || 'Signup failed');
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const { showMessage } = useMessage();

  return useMutation({
    mutationFn: async () => {
      await removeTokens();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['authStatus'] });
      queryClient.removeQueries(['user']);
      showMessage('success', 'Logged out successfully');
    },
    onError: (error) => {
      showMessage('error', error?.response?.data?.message || 'Logout failed');
    },
  });
};

// 1. Request OTP
export const useOtpRequestMutation = () => {
  const { showMessage } = useMessage();

  return useMutation({
    mutationFn: requestOtp,
    onSuccess: () => {
      showMessage('success', 'OTP sent successfully');
    },
    onError: (error) => {
      showMessage('error', error?.response?.data?.message || 'Failed to send OTP');
    },
  });
};

// 2. Verify OTP
export const useOtpVerifyMutation = () => {
  const { showMessage } = useMessage();

  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => {
      showMessage('success', 'OTP verified successfully');
    },
    onError: (error) => {
      showMessage('error', error?.response?.data?.message || 'OTP verification failed');
    },
  });
};

// 3. Reset Password
export const useResetPasswordMutation = (navigation) => {
  const { showMessage } = useMessage();

  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      showMessage('success', 'Password reset successful');
      navigation.navigate('Login');
    },
    onError: (error) => {
      showMessage('error', error?.response?.data?.message || 'Password reset failed');
    },
  });
};

export const useResendOtpMutation = () => {
  const { showMessage } = useMessage();

  return useMutation({
    mutationFn: resendOtp,
    onSuccess: () => {
      showMessage('success', 'OTP resent successfully');
    },
    onError: (error) => {
      showMessage('error', error?.response?.data?.message || 'Could not resend OTP');
    },
  });
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  const { showMessage } = useMessage();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(['me'], updatedProfile);
      showMessage('success', 'Profile updated successfully');
    },
    onError: (error) => {
      showMessage('error', error?.response?.data?.message || 'Profile update failed');
    },
  });
};




//FamilyMember

export const useFamilyMembersQuery = () => {
  return useQuery({
    queryKey: ['familyMembers'],
    queryFn: getFamilyMembers,
  });
};

export const useAddFamilyMemberMutation = () => {
  const queryClient = useQueryClient();
  const { showMessage } = useMessage();

  return useMutation({
    mutationFn: addFamilyMember,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['familyMembers']);
      showMessage(
        'success', 
        data.userExists 
          ? 'Member added! Notification sent.' 
          : 'Invitation email sent successfully.'
      );
    },
    onError: (error) => {
      showMessage('error', error?.response?.data?.message || 'Failed to add family member');
    },
  });
};

export const useDeleteFamilyMemberMutation = () => {
  const queryClient = useQueryClient();
  const { showMessage } = useMessage();

  return useMutation({
    mutationFn: deleteFamilyMember,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries(['familyMembers']);
      showMessage('success', 'Family member deleted');
    },
    onError: (error) => {
      showMessage('error', error?.response?.data?.message || 'Failed to delete family member');
    },
  });
};


//Notification

export const useNotificationsQuery = (type = 'all') => {
  return useQuery({
    queryKey: ['notifications', type],
    queryFn: () => getNotifications({ type }),
    select: (data) => data.notifications,
  });
};

export const useMarkNotificationAsReadMutation = () => {
  const queryClient = useQueryClient();
  const { showMessage } = useMessage();

  return useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
    },
    onError: (error) => {
      showMessage('error', error?.response?.data?.message || 'Failed to mark notification as read');
    },
  });
};