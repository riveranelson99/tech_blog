// This script is responsible for removing a post
const removePostFormHandler = async (event) => {
    event.preventDefault();

    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/post/${postId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

document
    .querySelector('#delete-btn')
    .addEventListener('click', removePostFormHandler);