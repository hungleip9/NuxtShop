import { notification } from 'ant-design-vue';
import { CheckCircleOutlined, InfoCircleOutlined, WarningOutlined, CloseCircleOutlined, CloseOutlined } from '@ant-design/icons-vue';
export function _showMsg (data: any) {
  if (!data) return
  const duration = hasData(data.life) ? data.life / 1000 : 4.5
  notification.open({
    key: data.key,
    message: data.summary,
    description: data.msg,
    class: `msg-${data.type}`,
    duration: duration,
    placement: data.placement,
    icon: () => h(getIcon(data.type)),
    closeIcon: () => h(getIconClose(data))
  });
};
export function _closeMsg(data: any) {
  if (!data || !data.key) return
  notification.close(data.key);
}
function getIcon(type: string) {
  if (!type) return InfoCircleOutlined
  if (type == 'success') return CheckCircleOutlined
  if (type == 'info') return InfoCircleOutlined
  if (type == 'warning') return WarningOutlined
  if (type == 'error') return CloseCircleOutlined
  return InfoCircleOutlined
}
function getIconClose(data: any) {
  if (data.hidenClose) return ''
  return CloseOutlined
}