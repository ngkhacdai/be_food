const userSchema = require('../modules/user')
const bcrypt = require('bcrypt');

exports.signup = async ({ username, email, password, address, phone }) => {
    const checkEmail = await userSchema.findOne({ email: email });
    if (checkEmail) return { status: 401, message: 'Tài khoản đã tồn tại' }
    console.log(checkEmail);
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await userSchema.create({
        username,
        email,
        password: passwordHash,
        address,
        phone
    })
    if (newUser) return {
        message: 'Đăng ký tài khoản thành công !!!',
        status: 200,
        newUser
    }
}
exports.login = async ({ email, password }) => {
    const checkEmail = await userSchema.findOne({ email: email });
    if (!checkEmail) return { status: 401, message: 'Tài khoản không tồn tại' }
    const match = await bcrypt.compare(password, checkEmail.password);
    if (!match) return { status: 401, message: 'Sai mật khẩu' }
    const token = await createToken(checkEmail._id, checkEmail.username, checkEmail.role)
    return {
        message: 'Đăng nhập thành công !!!',
        status: 200,
        token
    }
}