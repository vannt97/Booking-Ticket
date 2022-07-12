import { notification } from "antd";
const openNotificationWithIcon = (type,content,description ='') => {
  notification[type]({
    message: content,
    description: description,
  });
};

export default openNotificationWithIcon;
