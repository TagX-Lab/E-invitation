/**
 * Wedding Invitation Master Configuration
 * Central single source of truth for all client customizations.
 */
export const weddingConfig = {
  couple: {
    groom: 'Enbaraj',
    bride: 'Nimitha',
    monogramGroom: 'E',
    monogramBride: 'N',
    vow: 'Two Souls • One Eternal Promise 💍'
  },
  
  event: {
    dateDisplay: 'Sunday, 24 January 2027',
    targetTimestamp: '2027-01-24T06:00:00+05:30',
    muhurtham: {
      tamil: '🌺 சுப முகூர்த்தம் (Muhurtham)',
      time: '6:00 AM – 7:30 AM',
      note: 'Followed by Traditional South Indian Feast'
    },
    reception: {
      tamil: '✨ வரவேற்பு (Grand Reception)',
      time: '6:30 PM Onwards',
      note: 'Music, Celebrations & Royal Dinner'
    }
  },

  venue: {
    name: 'SSK Mahal',
    address: '2nd Avenue, Near Roundtana, Anna Nagar, Chennai, Tamil Nadu – 600040',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=SSK+Mahal+Anna+Nagar+Chennai'
  },

  audio: {
    src: 'assets/bgm.mp3',
    volume: 0.25, // 25% pleasant ambient sound
    loop: true
  },

  petals: {
    maxCount: 18,
    marigoldSrc: 'assets/real-marigold.jpg',
    rosePetalSrc: 'assets/real-rose-petal.jpg'
  },

  social: {
    whatsappMessage: "Dear Enbaraj & Nimitha, Heartiest Congratulations! We are thrilled to attend your wedding at SSK Mahal, Anna Nagar! Can't wait to bless you both! 🪷✨",
    calendarTitle: 'Enbaraj & Nimitha Wedding',
    calendarDates: '20270124T003000Z/20270124T160000Z',
    calendarDetails: 'Wedding Celebration of Enbaraj and Nimitha at SSK Mahal, Anna Nagar, Chennai'
  }
};
