const generateUserNameFromUserModel = async (userId) => {
    const userReq = await fetch(`https://blogging-app-api-using-express-mongo-db-iwvr.vercel.app/api/v1/user/${userId}`);
    const user = await userReq.json();
    const userName = user.data.firstName + " " + user.data.lastName;
    return userName;
}

export default generateUserNameFromUserModel;