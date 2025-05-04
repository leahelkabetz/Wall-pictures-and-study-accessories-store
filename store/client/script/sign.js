

// document.addEventListener('DOMContentLoaded', () => {
    {

const signTamplate = templates[1];
const personSignContent = signTamplate.content.cloneNode(true);
const signUpForm = personSignContent.querySelector('#signUpForm');
const errorDiv = personSignContent.querySelector('#errorDiv');
pageContainer.appendChild(personSignContent);


//שמירת המשתמש החדש
const setUsers = () => {
    document.getElementById('notMember').style.display = 'none';

    const body = {
        name: signUpForm.name.value,
        email: signUpForm.email.value,
        phone: signUpForm.phone.value
    }

    const promise = fetch('http://localhost:3000/users', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });

    promise
        .then(result => {
            if (result.ok) {
                return result
            }
        })
        .then(() => {
            changPage('logIn');
        })
        .catch((error) => {
            errorDiv.textContent = 'מצטערים, אירעה שגיאה והמידע לא נשמר בשרת';
            errorDiv.classList.remove('hide');
        })
        .finally(() => {
            PasAnmation.style.display='none';
        })
}




//לחיצה להרשמה
const signUpFormDocument = document.getElementById("signUpForm");
signUpFormDocument.addEventListener('submit', (e) => {
    PasAnmation.style.display='block';
    e.preventDefault();
    setUsers();
})


    }
// });