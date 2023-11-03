/** Kiểm tra tính hợp lệ của một địa chỉ gmail */
export const checkValidGmail = (gmail) => {
  const gmailRegex = /^[\w\.-]+@[\w\.-]+\.\w+$/
  return gmailRegex.test(gmail)
}
