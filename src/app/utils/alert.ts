import Swal from "sweetalert2"

export const confirmAlert = (text : string, buttonText : string, callback : () => void) => {
    Swal.fire({
        title: 'Are you sure?',
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#22c55e',
        cancelButtonColor: '#d33',
        confirmButtonText: buttonText
      }).then((result) => {
        if (result.isConfirmed) {
            callback()
        }
      })
} 

export const successAlert = (text : string) => {
    Swal.fire({
        title: 'Success!',
        text: text,
        icon: 'success',
        confirmButtonColor: '#22c55e', // Tailwind's green-500 hex
        confirmButtonText: 'OK',
        customClass: {
            confirmButton: 'w-40' // Tailwind: width of 10rem
          }
      });
}

export const errorAlert = (text : string) => {
    Swal.fire({
        title: 'Error!',
        text: text,
        icon: 'error',
        confirmButtonColor: '#22c55e', // Tailwind's green-500 hex
        confirmButtonText: 'OK',
        customClass: {
            confirmButton: 'w-40' // Tailwind: width of 10rem
          }
      });
}




export const passwordPromptAlert = (dep : string, correctPassword: string, onSuccess: () => void
  ) => {
    Swal.fire({
      title:  dep,
      input: 'password',
      inputPlaceholder: 'enter password',
      inputAttributes: {
        autocapitalize: 'off',
        autocorrect: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: '#22c55e',
      cancelButtonColor: '#d33',
      preConfirm: (input) => {
        if (!input) {
          Swal.showValidationMessage('Password is required');
          return;
        }
        if (input !== correctPassword) {
          Swal.showValidationMessage('Incorrect password');
          return;
        }
        return input; // ✅ pass input forward to .then
      }
    }).then((result) => {
      if (result.isConfirmed && result.value === correctPassword) {
        onSuccess(); // ✅ now this will run correctly
      }
    });
  };