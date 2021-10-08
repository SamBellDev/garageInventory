let deleteButtons = document.querySelectorAll('.deleteToolButton')

deleteButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        let toolId = button.dataset.id
        fetch(`/tools/${toolId}`, {
            method: 'DELETE',
            body:{}
        })
        button.parentElement.hidden = true
    })
})