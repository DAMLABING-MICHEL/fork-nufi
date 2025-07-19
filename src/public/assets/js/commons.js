window.addEventListener('load', function() {
    try {
        if(!!serverMessage) {
            const message = JSON.parse(serverMessage);
            Swal.fire({
                toast: true,
                text: message.content,
                icon: message.type,
                timer: 5000,
                timerProgressBar: true,
                showConfirmButton: false,
                position: "top-end"
            });
        }   
    } catch (error) {
        // ignore error
    }
})