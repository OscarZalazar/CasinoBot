export default function ConnectionStatus({ status }) {
  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          color: 'green',
          icon: '✓',
          text: 'WhatsApp conectado'
        };
      case 'disconnected':
        return {
          color: 'red',
          icon: '✕',
          text: 'WhatsApp desconectado'
        };
      case 'pending':
        return {
          color: 'yellow',
          icon: '⟳',
          text: 'Conectando WhatsApp...'
        };
      default:
        return {
          color: 'gray',
          icon: '?',
          text: 'Estado desconocido'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`flex items-center space-x-2 p-2 rounded-full bg-${config.color}-100`}>
      <span className={`text-${config.color}-600`}>{config.icon}</span>
      <span className={`text-${config.color}-800 text-sm font-medium`}>
        {config.text}
      </span>
    </div>
  );
}