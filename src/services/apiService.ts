// Mock API service pour les données de pronostics
export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  date: string;
  time: string;
  odds: number;
  championship: string;
  prediction: string;
  confidence: 'high' | 'medium' | 'low';
  isVip: boolean;
  form: {
    home: ('W' | 'L' | 'D')[];
    away: ('W' | 'L' | 'D')[];
  };
}

export interface Coupon {
  id: string;
  title: string;
  matches: Match[];
  totalOdds: number;
  isValidated: boolean;
  result: 'win' | 'loss' | 'pending';
  date: string;
  image?: string;
}

export interface TeamStats {
  name: string;
  logo: string;
  wins: number;
  losses: number;
  draws: number;
}

// URLs d'images fiables via Wikipedia et sources officielles avec fallback
const teamLogos = {
  'PSG': 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg',
  'OM': 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Olympique_Marseille_logo.svg',
  'Real Madrid': 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
  'Barcelona': 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
  'Liverpool': 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg',
  'Manchester City': 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
  'Bayern Munich': 'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg',
  'Juventus': 'https://upload.wikimedia.org/wikipedia/commons/7/76/Juventus_FC_2017_logo.svg',
  'Chelsea': 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg',
  'Arsenal': 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
  'Inter Milan': 'https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg',
  'AC Milan': 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg',
  'Atletico Madrid': 'https://upload.wikimedia.org/wikipedia/en/c/c1/Atletico_Madrid_Logo_2017.svg',
  'Borussia Dortmund': 'https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg',
  'Tottenham': 'https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg',
  'Manchester United': 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg',
  'Leicester City': 'https://upload.wikimedia.org/wikipedia/en/2/2d/Leicester_City_crest.svg',
  'West Ham': 'https://upload.wikimedia.org/wikipedia/en/c/c2/West_Ham_United_FC_logo.svg',
  'Everton': 'https://upload.wikimedia.org/wikipedia/en/7/7c/Everton_FC_logo.svg',
  'Newcastle': 'https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg',
  'Aston Villa': 'https://upload.wikimedia.org/wikipedia/en/f/f9/Aston_Villa_FC_crest_%282016%29.svg',
  'Brighton': 'https://upload.wikimedia.org/wikipedia/en/f/fd/Brighton_%26_Hove_Albion_logo.svg',
  'Crystal Palace': 'https://upload.wikimedia.org/wikipedia/en/0/0c/Crystal_Palace_FC_logo.svg',
  'Wolves': 'https://upload.wikimedia.org/wikipedia/en/f/fc/Wolverhampton_Wanderers.svg',
  'Southampton': 'https://upload.wikimedia.org/wikipedia/en/c/c9/FC_Southampton.svg',
  'Napoli': 'https://upload.wikimedia.org/wikipedia/commons/2/2d/SSC_Napoli_2007.svg',
  'Roma': 'https://upload.wikimedia.org/wikipedia/en/f/f7/AS_Roma_logo_%282017%29.svg',
  'Lazio': 'https://upload.wikimedia.org/wikipedia/en/c/ce/S.S._Lazio_badge.svg',
  'Atalanta': 'https://upload.wikimedia.org/wikipedia/en/6/66/AtalantaBC.svg',
  'Fiorentina': 'https://upload.wikimedia.org/wikipedia/commons/b/b2/ACF_Fiorentina_Logo.svg',
  'Valencia': 'https://upload.wikimedia.org/wikipedia/en/c/ce/Valenciacf.svg',
  'Sevilla': 'https://upload.wikimedia.org/wikipedia/en/3/3b/Sevilla_FC_logo.svg',
  'Villarreal': 'https://upload.wikimedia.org/wikipedia/en/b/b9/Villarreal_CF_logo-en.svg',
  'Real Sociedad': 'https://upload.wikimedia.org/wikipedia/en/f/f1/Real_Sociedad_logo.svg',
  'Athletic Bilbao': 'https://upload.wikimedia.org/wikipedia/en/9/98/Club_Athletic_Bilbao_logo.svg',
  'RB Leipzig': 'https://upload.wikimedia.org/wikipedia/en/0/04/RB_Leipzig_2014_logo.svg',
  'Bayer Leverkusen': 'https://upload.wikimedia.org/wikipedia/en/5/59/Bayer_04_Leverkusen_logo.svg',
  'Eintracht Frankfurt': 'https://upload.wikimedia.org/wikipedia/commons/0/04/Eintracht_Frankfurt_Logo.svg',
  'VfB Stuttgart': 'https://upload.wikimedia.org/wikipedia/commons/e/eb/VfB_Stuttgart_1893_Logo.svg',
  'Borussia Monchengladbach': 'https://upload.wikimedia.org/wikipedia/commons/8/81/Borussia_M%C3%B6nchengladbach_logo.svg',
  'Lyon': 'https://upload.wikimedia.org/wikipedia/en/e/e2/Olympique_Lyonnais_logo.svg',
  'Monaco': 'https://upload.wikimedia.org/wikipedia/en/a/aa/AS_Monaco_FC.svg',
  'Nice': 'https://upload.wikimedia.org/wikipedia/en/a/a4/OGC_Nice_logo.svg',
  'Lille': 'https://upload.wikimedia.org/wikipedia/en/7/76/LOSC_Lille_logo.svg',
  'Rennes': 'https://upload.wikimedia.org/wikipedia/en/2/22/Stade_Rennais_FC.svg',
  'Montpellier': 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Montpellier_HSC_logo.svg',
  'Nantes': 'https://upload.wikimedia.org/wikipedia/en/c/c3/FC_Nantes_logo.svg',
  'Strasbourg': 'https://upload.wikimedia.org/wikipedia/commons/7/74/Racing_Club_de_Strasbourg_logo.svg',
  'Lens': 'https://upload.wikimedia.org/wikipedia/en/6/60/RC_Lens_logo.svg',
  'Reims': 'https://upload.wikimedia.org/wikipedia/en/b/b9/Stade_de_Reims_logo.svg',
  'Porto': 'https://upload.wikimedia.org/wikipedia/en/f/f1/FC_Porto.svg',
  'Benfica': 'https://upload.wikimedia.org/wikipedia/en/a/a2/SL_Benfica_logo.svg',
  'Sporting CP': 'https://upload.wikimedia.org/wikipedia/en/3/33/Sporting_Clube_de_Portugal_%28Logo%29.svg',
  'Ajax': 'https://upload.wikimedia.org/wikipedia/en/7/79/Ajax_Amsterdam.svg',
  'PSV': 'https://upload.wikimedia.org/wikipedia/en/0/05/PSV_Eindhoven.svg',
  'Feyenoord': 'https://upload.wikimedia.org/wikipedia/en/f/fe/Feyenoord_logo.svg'
};

// Mock data avec de vraies équipes
const mockMatches: Match[] = [
  {
    id: '1',
    homeTeam: 'PSG',
    awayTeam: 'OM',
    homeTeamLogo: teamLogos['PSG'],
    awayTeamLogo: teamLogos['OM'],
    date: '2024-06-10',
    time: '21:00',
    odds: 1.65,
    championship: 'Ligue 1',
    prediction: '1',
    confidence: 'high',
    isVip: false,
    form: {
      home: ['W', 'W', 'D', 'W', 'L'],
      away: ['L', 'W', 'D', 'L', 'W']
    }
  },
  {
    id: '2',
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    homeTeamLogo: teamLogos['Real Madrid'],
    awayTeamLogo: teamLogos['Barcelona'],
    date: '2024-06-11',
    time: '16:00',
    odds: 1.80,
    championship: 'La Liga',
    prediction: 'X',
    confidence: 'medium',
    isVip: true,
    form: {
      home: ['W', 'W', 'W', 'D', 'W'],
      away: ['W', 'L', 'W', 'W', 'D']
    }
  },
  {
    id: '3',
    homeTeam: 'Liverpool',
    awayTeam: 'Manchester City',
    homeTeamLogo: teamLogos['Liverpool'],
    awayTeamLogo: teamLogos['Manchester City'],
    date: '2024-06-12',
    time: '18:30',
    odds: 2.10,
    championship: 'Premier League',
    prediction: '1',
    confidence: 'high',
    isVip: false,
    form: {
      home: ['W', 'D', 'W', 'W', 'L'],
      away: ['W', 'W', 'L', 'W', 'W']
    }
  },
  {
    id: '4',
    homeTeam: 'Bayern Munich',
    awayTeam: 'Borussia Dortmund',
    homeTeamLogo: teamLogos['Bayern Munich'],
    awayTeamLogo: teamLogos['Borussia Dortmund'],
    date: '2024-06-13',
    time: '15:30',
    odds: 1.45,
    championship: 'Bundesliga',
    prediction: '1',
    confidence: 'high',
    isVip: true,
    form: {
      home: ['W', 'W', 'W', 'W', 'D'],
      away: ['L', 'W', 'L', 'D', 'W']
    }
  },
  {
    id: '5',
    homeTeam: 'Juventus',
    awayTeam: 'Inter Milan',
    homeTeamLogo: teamLogos['Juventus'],
    awayTeamLogo: teamLogos['Inter Milan'],
    date: '2024-06-14',
    time: '20:45',
    odds: 1.95,
    championship: 'Serie A',
    prediction: '2',
    confidence: 'medium',
    isVip: false,
    form: {
      home: ['D', 'W', 'L', 'W', 'D'],
      away: ['W', 'W', 'W', 'L', 'W']
    }
  },
  {
    id: '6',
    homeTeam: 'Chelsea',
    awayTeam: 'Arsenal',
    homeTeamLogo: teamLogos['Chelsea'],
    awayTeamLogo: teamLogos['Arsenal'],
    date: '2024-06-15',
    time: '17:00',
    odds: 2.25,
    championship: 'Premier League',
    prediction: 'X',
    confidence: 'low',
    isVip: true,
    form: {
      home: ['L', 'D', 'W', 'L', 'W'],
      away: ['W', 'L', 'W', 'D', 'L']
    }
  },
  {
    id: '7',
    homeTeam: 'Manchester United',
    awayTeam: 'Tottenham',
    homeTeamLogo: teamLogos['Manchester United'],
    awayTeamLogo: teamLogos['Tottenham'],
    date: '2024-06-16',
    time: '14:30',
    odds: 1.75,
    championship: 'Premier League',
    prediction: '1',
    confidence: 'medium',
    isVip: false,
    form: {
      home: ['W', 'L', 'W', 'D', 'W'],
      away: ['L', 'L', 'W', 'L', 'D']
    }
  },
  {
    id: '8',
    homeTeam: 'Napoli',
    awayTeam: 'AC Milan',
    homeTeamLogo: teamLogos['Napoli'],
    awayTeamLogo: teamLogos['AC Milan'],
    date: '2024-06-17',
    time: '20:00',
    odds: 2.00,
    championship: 'Serie A',
    prediction: 'X',
    confidence: 'low',
    isVip: true,
    form: {
      home: ['W', 'W', 'D', 'L', 'W'],
      away: ['D', 'W', 'W', 'L', 'L']
    }
  }
];

const mockCoupons: Coupon[] = [
  {
    id: '1',
    title: 'Coupon gratuit du jour',
    matches: [mockMatches[0], mockMatches[2]],
    totalOdds: 3.47,
    isValidated: true,
    result: 'win',
    date: '2024-06-09',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: '2',
    title: 'Coupon VIP validé',
    matches: [mockMatches[1], mockMatches[3], mockMatches[5]],
    totalOdds: 7.29,
    isValidated: true,
    result: 'win',
    date: '2024-06-08',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  }
];

// Logos d'équipes pour la grille hero
export const getTeamLogosGrid = (): string[] => {
  return [
    teamLogos['PSG'],
    teamLogos['Real Madrid'],
    teamLogos['Barcelona'],
    teamLogos['Liverpool'],
    teamLogos['Manchester City'],
    teamLogos['Bayern Munich'],
    teamLogos['Juventus'],
    teamLogos['Chelsea'],
    teamLogos['Arsenal'],
    teamLogos['Inter Milan'],
    teamLogos['Manchester United'],
    teamLogos['Tottenham'],
    teamLogos['AC Milan'], 
    teamLogos['Atletico Madrid'],
    teamLogos['Napoli'],
    teamLogos['Lyon'],
    teamLogos['Monaco'],
    teamLogos['Borussia Dortmund'],
    teamLogos['RB Leipzig'],
    teamLogos['Valencia'],
    teamLogos['Sevilla'],
    teamLogos['Ajax'],
    teamLogos['Porto'],
    teamLogos['Benfica'],
    teamLogos['Sporting CP']
  ];
};

// Mock API service pour les données de pronostics
export const apiService = {
  // Matches
  getMatches: async (filters?: { championship?: string; date?: string; isVip?: boolean }): Promise<Match[]> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    let filteredMatches = [...mockMatches];
    
    if (filters?.championship) {
      filteredMatches = filteredMatches.filter(match => match.championship === filters.championship);
    }
    
    if (filters?.date) {
      filteredMatches = filteredMatches.filter(match => match.date === filters.date);
    }
    
    if (filters?.isVip !== undefined) {
      filteredMatches = filteredMatches.filter(match => match.isVip === filters.isVip);
    }
    
    return filteredMatches;
  },

  getMatchById: async (id: string): Promise<Match | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockMatches.find(match => match.id === id) || null;
  },

  // Coupons
  getCoupons: async (): Promise<Coupon[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCoupons;
  },

  getTodayCoupon: async (): Promise<Coupon | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockCoupons[0] || null;
  },

  // Championships
  getChampionships: async (): Promise<string[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return ['Ligue 1', 'Premier League', 'La Liga', 'Serie A', 'Bundesliga'];
  },

  // Contact
  sendContactMessage: async (data: { name: string; email: string; message: string }): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Message envoyé:', data);
    return true;
  }
};
