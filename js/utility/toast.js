import { toast } from 'react-toastify';

export function toastSuccess(message) {
  toast(message, {
    type: toast.TYPE.SUCCESS
  });
}

export function toastError(message) {
  toast(message, {
    type: toast.TYPE.ERROR
  });
}
