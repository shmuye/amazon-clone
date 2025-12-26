export const getUserName = (user) => {
        if(!user) return null
        const email = user.email
        return email.substring(0, email.indexOf('@'))
    }