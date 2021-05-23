// firebase
// React App
// Todo app
// Deployed online
// Database


class Person {
    constructor(firstName, lastName, dob, gender) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.gender = gender;
    }

    age() {
        const currentYear = new Date().getFullYear();
        return currentYear - this.dob;
    }
}

const valid = (age) => {
    if(age >= 18)
        console.log("Valid");
    else
        console.log("Not Valid");
}

let user1 = new Person("Nirmal Jyoti", "Biswas", 1995, "male");
valid(user1.age());
