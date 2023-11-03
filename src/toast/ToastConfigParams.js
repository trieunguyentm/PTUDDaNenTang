import { BaseToast, ErrorToast } from "react-native-toast-message"

const ToastConfigParams = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "green",
        borderLeftWidth: 5,
        borderRightColor: "green",
        borderRightWidth: 5,
        paddingHorizontal: 15,
      }}
      text1Style={{
        color: "green",
        fontSize: 13,
        fontWeight: 600,
      }}
      text2Style={{
        fontSize: 11,
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: "red",
        borderLeftWidth: 5,
        borderRightColor: "red",
        borderRightWidth: 5,
        paddingHorizontal: 15,
      }}
      text1Style={{
        color: "red",
        fontSize: 13,
        fontWeight: 600,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
  info: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: "dodgerblue",
        borderLeftWidth: 5,
        borderRightColor: "dodgerblue",
        borderRightWidth: 5,
        paddingHorizontal: 15,
      }}
      text1Style={{
        color: "dodgerblue",
        fontSize: 13,
        fontWeight: 600,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
}

export default ToastConfigParams
