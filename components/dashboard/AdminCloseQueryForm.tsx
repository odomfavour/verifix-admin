import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoading } from '@/provider/redux/modalSlice';

interface AdminCloseQueryFormProps {
  queryId: number;
  fetchData: () => void;
  handleClose: () => void;
}

const AdminCloseQueryForm: React.FC<AdminCloseQueryFormProps> = ({
  queryId,
  fetchData,
  handleClose,
}) => {
  const [reason, setReason] = useState('');
  const user = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();

  const closeQuery = async () => {
    dispatch(toggleLoading(true));
    try {
      const response = await axios.put(
        `${process.env.BASEURL}/admin/query/close`,
        { queryId, reason },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log('resp', response.data);
      toast.success('Query closed successfully');
      fetchData();
      handleClose();
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errors ||
        error?.message ||
        'Unknown error';
      toast.error(`${errorMessage}`);
    } finally {
      dispatch(toggleLoading(false));
    }
  };

  return (
    <div>
      <div className="p-3">
        <p className="text-center font-semibold text-lg">Resolve query</p>
        <p className="text-base text-center mb-5">Are you sure?</p>

        <label htmlFor="reason" className="block mb-2 text-xs">
          Reason
        </label>
        <textarea
          name="reason"
          id="reason"
          placeholder="reason"
          rows={3}
          onChange={(e) => setReason(e.target.value)}
          className="border border-gray-400 rounded-md w-full p-2"
        ></textarea>
        <div className="flex justify-center items-center">
          <div className="flex gap-3 my-5">
            <button
              className="border border-red-400 px-4 py-2 text-red-600 rounded-md"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className={`rounded-md px-4 py-2 ${
                reason
                  ? 'bg-veriGreen text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              onClick={closeQuery}
              disabled={!reason}
            >
              Close Query
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCloseQueryForm;
