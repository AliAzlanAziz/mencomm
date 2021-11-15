import validator from 'validator'

const minAge = 13;
const maxAge = 80;

const ageLimit = (birthday) => {
    const today = new Date().getFullYear()
    birthday = new Date(birthday).getFullYear()
    let age = 0
    if(birthday<2000){
        age = 2000 - birthday
        age = age + (today - 2000)
    }else{
        age = today - birthday
    }
    return (age>=minAge && age<=maxAge)
}

export { ageLimit }