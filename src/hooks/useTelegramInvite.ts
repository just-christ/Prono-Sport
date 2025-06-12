
export const useTelegramInvite = () => {
  const openTelegramInvite = (channelType: 'free' | 'vip' = 'free') => {
    const telegramLink = channelType === 'free' 
      ? import.meta.env.VITE_TELEGRAM_FREE_LINK || 'https://t.me/your_free_channel'
      : import.meta.env.VITE_TELEGRAM_VIP_LINK || 'https://t.me/your_vip_channel';
    
    window.open(telegramLink, '_blank');
  };

  return { openTelegramInvite };
};
