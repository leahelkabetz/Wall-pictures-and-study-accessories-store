document.addEventListener('DOMContentLoaded', () => {
    
    const logTamplate = templates[0];
    const personLogContent = logTamplate.content.cloneNode(true);
    const nameInput = personLogContent.querySelector('#nameInput');
    const emailInput = personLogContent.querySelector('#emailInput');
    const notMember = personLogContent.querySelector('#notMember');
    const logInMassage = personLogContent.querySelector('#logInMassage');
   //חוות דעת
    const container = personLogContent.querySelector('#container');
    const details = personLogContent.querySelector('#details');
    pageContainer.appendChild(personLogContent);
    //מבצע התחברות
    const getUsers = () => {
        document.getElementById('notMember').style.display = 'none';

        const promise = fetch('http://localhost:3000/users');
        promise
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(users => {
                if (users.length == 0) {
                    logInMassage.textContent = 'אין עדיין משתמשים במערכת';
                }
                let emailaquar = false;

                if(emailInput.value == 'esttyk@gmail.com'){
                    document.getElementById('notMember').style.display = 'none';
                    let admain={
                        name: 'admain',
                        email:'esttyk@gmail.com'
                    }
                    const admainstring=JSON.stringify(admain);
                    localStorage.setItem("currentUser",admainstring);
                    changPage('admin');
                }
                else{
                     users.forEach(user => {
                    // const productDiv = createProductDiv(product);
                    // productsListDiv.append(productDiv);
                    if (user.email === emailInput.value) {
                        currentUser = user;
                        emailaquar = true;
                        
                    }
                });
                }
               
                if (!emailaquar) {
                    document.getElementById('notMember').style.display = 'block';
                }
                else {
                    // localStorage.setItem('currentUser', JSON.stringify(currentUser));
                   const userstring=JSON.stringify(currentUser);
                   localStorage.setItem("currentUser",userstring);
                    changPage('products');
                }
            })
            .catch(error => {
                logInMassage.textContent = 'מצטערים! אירעה שגיאה';
            })
            .finally(() => {
                // PasAnmation.classList.add('hide');

            })
    }
    
    //לחיצה על כפתור אישור בהתחברות
    const logInForm = document.getElementById("logInForm");
    logInForm.addEventListener('submit', (e) => {
        // PasAnmation.style.display='block';
        e.preventDefault();
        getUsers();
    })

     //חוות דעת 
     class EducationalInstitutions {
        constructor(name, city, feedback) {
            this.name = name;
            this.city = city;
            this.feedback = feedback;
            this._element = null; // שינוי: לא יוצרים דיב מראש
            this._imgSrc = '';
        }
    
        theFeedback() {
            return `שלום,
             ${this.feedback}
             !תודה רבה
              ${this.name}, ${this.city}`;
        }
    
        get element() {
            if (!this._element) { // אם האלמנט לא נוצר עדיין, יוצרים אותו
                this._element = document.createElement('div');
                const img = document.createElement('img');
                img.src = this._imgSrc;
                this._element.append(img);
                this._element.classList.add('feedback-item');
            }
            return this._element;
        }
    }
    
    class Gan extends EducationalInstitutions {
        constructor(city, feedback) {
            super('גן בית יעקב', city, feedback);
            this._imgSrc = 'https://naimleakir.co.il/wp-content/uploads/2022/11/%D7%91%D7%99%D7%AA-%D7%99%D7%A2%D7%A7%D7%91-300x172.jpg';
        }
    }
    
    class School extends EducationalInstitutions {
        constructor(name, city, feedback) {
            super(name, city, feedback);
            this._imgSrc = 'https://exceltime.co.il/wp-content/uploads/2021/06/file.jpg';
        }
    }
    
    class Talmud extends EducationalInstitutions {
        constructor(name, city, feedback, type) {
            super(name, city, feedback);
            this.type = type;
            this._imgSrc = 'https://upload.wikimedia.org/wikipedia/he/1/14/%D7%91%D7%A0%D7%99_%D7%99%D7%95%D7%A1%D7%A3_-_%D7%9E%D7%A2%D7%99%D7%99%D7%9F_%D7%94%D7%97%D7%99%D7%A0%D7%95%D7%9A_%D7%94%D7%AA%D7%95%D7%A8%D7%A0%D7%99.PNG';
        }
    }
    
    const my_1 = new Gan("אלעד", "קישוט מדהים. נהננו מאוד, כל יום- תענוג");
    const my_2 = new School("בנות חיל", "ירושלים", "מושלם! מסר חשוב שתלוי על הקיר כל השנה, נחקק בכולנו");
    const my_3 = new Talmud("בני תורה", "בני ברק", "קישוט מדהים ומעורר השראה", 'חסידי');
    const my_4 = new Gan("בית שמש", "ליגה אחרת , כל מי שנכנס לגן התלהב");
    const my_5 = new School("נאות רחל", "ביתר עילית", "שירות מדהים, תודה על המקצועיות וההתאמה המדויקת");
    const Feedback_ = [my_1, my_2, my_3, my_4, my_5];
    
   
    
    for (let feed of Feedback_) {
        const elem = feed.element;
        elem.classList.add('feedback-item');
        elem.addEventListener('click', () => {
            const str = feed.theFeedback();
            details.textContent = str;
            details.style.display = 'block';
            
        });
        container.append(elem);
    }
    // הוספת קוד לסגירת ה-details בלחיצה מחוץ לאזור
document.addEventListener('click', (event) => {
    if (!container.contains(event.target) && !details.contains(event.target)) {
        details.style.display = 'none';
    }
});

});

   