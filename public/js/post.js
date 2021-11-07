const postFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('').value;
    const content = document.querySelector('').value;

    if (title && content) {
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

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

const editFormHandler = async (event) => {
    event.preventDefault();

    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const title = document.querySelector('').value;
    const content = document.querySelector('').value;

    const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

document
    .querySelector('.post-form')
    .addEventListener('submit', postFormHandler);

document
    .querySelector('.delete-form')
    .addEventListener('submit', removePostFormHandler);

document
    .querySelector('.edit-form')
    .addEventListener('submit', editFormHandler);