// This script is responsible for capturing user input from the comment box in order to have that data display on the web page
const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#comment-body').value;

    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ postId, comment }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('#comment-form')
    .addEventListener('submit', commentFormHandler);