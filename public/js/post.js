// This script is responsible for capturing user input in order for the data to be made into a new post
const postFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const content = document.querySelector('textarea[name="post-body"]').value;

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

document
    .querySelector('#post-form')
    .addEventListener('submit', postFormHandler);