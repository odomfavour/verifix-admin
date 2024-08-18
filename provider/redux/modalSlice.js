import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  completedModalOpen: false,
  firModalOpen: false,
  cacModalOpen: false,
  changeBusinessNameOpen: false,
  changeBusinessNameFormOpen: false,
  successModalOpen: false,
  successContent: {
    title: '',
    subtitle: '',
    link: '',
    linkText: '',
    singleBtn: false,
  },
  confirmContent: { title: '', subtitle: '', btnText: '' },
  confirmModalOpen: false,
  queryModalOpen: false,
  proceed: false,
  forgotPassword: false,
  products: {},
  isSendEmailModalOpen: false,
  isOtpModalOpen: false,
  isShowDocModalOpen: false,
  isLoading: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleSendEmailModal: (state) => {
      state.isSendEmailModalOpen = !state.isSendEmailModalOpen;
    },
    toggleShowDocModal: (state, action) => {
      state.documentUrl = action.payload;
      state.isShowDocModalOpen = !state.isShowDocModalOpen;
    },
    toggleOtpModal: (state) => {
      state.isSendEmailModalOpen = false;
      state.isOtpModalOpen = !state.isOtpModalOpen;
    },
    toggleSuccessModal: (state, action) => {
      state.successModalOpen = !state.successModalOpen;
      if (state.successModalOpen) {
        state.successContent = action.payload; // Set success content when success modal is opened
      } else {
        state.successContent = {
          title: '',
          subtitle: '',
          link: '',
          linkText: '',
        };
      }
    },
    toggleLoading: (state, action) => {
      state.isLoading = action.payload; // Toggle modal state
      console.log('loadi', state.isLoading);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  toggleSendEmailModal,
  toggleOtpModal,
  toggleSuccessModal,
  toggleShowDocModal,
  toggleLoading,
} = modalSlice.actions;

export default modalSlice.reducer;
