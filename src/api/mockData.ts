import { User, Story, Bus, DiscountPartner, ChatMessage, Event, Magazine, Bulletin, Reward, PointsHistory, NotificationItem } from '@/types';
import { Coffee, Utensils, Film } from 'lucide-react-native';

export const MOCK_USER: User = {
  name: 'Mert',
  avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  isVerified: false,
  dob: '2004',
  status: 'Öğrenci',
};

export const MOCK_STORIES: Story[] = [
  { id: '1', user: { name: 'Ali', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e' } },
  { id: '2', user: { name: 'Ayşe', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f' } },
  { id: '3', user: { name: 'Fatma', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704a' } },
  { id: '4', user: { name: 'Mehmet', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704b' } },
  { id: '5', user: { name: 'Zeynep', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704c' } },
];

export const MOCK_BUSES: Bus[] = [
    { id: '1', lineNumber: '90', destination: 'OSMANBEY KAMPÜS', arrivalTime: 3, lineColor: '#8b5cf6', stops: ['Abide', 'Valilik', 'Karaköprü', 'Osmanbey'] },
    { id: '2', lineNumber: '63', destination: 'KARAKÖPRÜ', arrivalTime: 5, lineColor: '#22c55e', stops: ['Toplama Merkezi', 'Müze', 'Piazza', 'Diyarbakır Yolu'] },
    { id: '3', lineNumber: '74', destination: 'ESENTEPE', arrivalTime: 8, lineColor: '#f97316', stops: ['Çevik Kuvvet', 'Belediye', 'Adliye', 'Esentepe'] },
    { id: '4', lineNumber: '24', destination: 'SIRA GECESİ', arrivalTime: 12, lineColor: '#3b82f6', stops: ['Haleplibahçe', 'Balıklıgöl', 'Haşimiye', 'Belediye Konuk Evi'] },
];

export const MOCK_PARTNERS: DiscountPartner[] = [
    { id: '1', name: 'Mırra Kahve Evi', offer: '%20 İndirim', description: 'Tüm kahve çeşitlerinde', icon: Coffee, url: '#', bgColor: '#ffedd5', iconColor: '#f97316' },
    { id: '2', name: 'Meşhur Ciğerci', offer: 'Ayran İkramı', description: 'Porsiyon ciğer siparişine', icon: Utensils, url: '#', bgColor: '#fee2e2', iconColor: '#ef4444' },
    { id: '3', name: 'Piazza AVM Sinema', offer: 'Genç Bileti', description: 'Hafta içi seanslarda', icon: Film, url: '#', bgColor: '#e0e7ff', iconColor: '#4f46e5' },
];

export const MOCK_MESSAGES: ChatMessage[] = [
    { id: '1', sender: 'bot', text: 'Merhaba! Ben ŞanlıAsistan. Sana nasıl yardımcı olabilirim?', timestamp: '10:00' },
    { id: '2', sender: 'user', text: 'Otobüs saatlerini öğrenebilir miyim?', timestamp: '10:01' },
];

export const MOCK_EVENTS: Event[] = [
  { id: '1', title: 'Sıra Gecesi', date: '15 Aralık', location: 'Balıklıgöl', category: 'Gezi', image: 'https://images.unsplash.com/photo-1593839238634-2b744a8677f5?q=80&w=2574&auto=format&fit=crop' },
  { id: '2', title: 'Yaz Konseri', date: '20 Aralık', location: 'Arkeoloji Müzesi', category: 'Konser', image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=2670&auto=format&fit=crop' },
  { id: '3', title: 'Maraton', date: '25 Aralık', location: 'GAP Vadisi', category: 'Spor', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2670&auto=format&fit=crop' },
];

export const MOCK_MAGAZINES: Magazine[] = [
    {
      id: '1',
      title: 'Göbeklitepe',
      image: require('@/assets/images/indir.jpeg'),
      category: 'historic',
      description:
        'Göbeklitepe, insanlık tarihinin bilinen en eski tapınak alanlarından biridir ve Şanlıurfa\'nın kuzeydoğusunda yer alır. ' +
        'MÖ 10. binyıla tarihlenen T biçimli devasa dikilitaşları, üzerlerindeki hayvan ve sembol kabartmalarıyla neolitik dönemin ' +
        'inanç dünyasına dair benzersiz ipuçları sunar. Bugün UNESCO Dünya Mirası listesinde yer alan Göbeklitepe, "tarihin sıfır noktası" olarak anılır.'
    },
    {
      id: '2',
      title: 'Balıklıgöl',
      image: require('@/assets/images/indir 3.jpeg'),
      category: 'historic',
      description:
        'Balıklıgöl, Şanlıurfa şehir merkezinde yer alan ve Hz. İbrahim\'in ateşe atıldığı yer olarak rivayet edilen kutsal bir mekândır. ' +
        'Efsaneye göre ateş suya, odunlar ise balığa dönüşür; bu yüzden göldeki sazan balıkları kutsal kabul edilir ve avlanmaz. ' +
        'Çevresindeki tarihi camiler, medreseler ve çarşılarla birlikte Balıklıgöl, hem manevi atmosferi hem de mimarisiyle kentin simgelerindendir.'
    },
    {
      id: '3',
      title: 'Şanlıurfa Kalesi',
      image: 'https://images.unsplash.com/photo-1526481280695-3c687fd543c0?q=80&w=2400&auto=format&fit=crop',
      category: 'historic',
      description:
        'Şehrin merkezindeki tepe üzerinde yer alan Şanlıurfa Kalesi, bölgenin savunma tarihine ışık tutan önemli bir yapıdır.',
    },
    {
      id: '4',
      title: 'Arkeoloji Müzesi',
      image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=2400&auto=format&fit=crop',
      category: 'museum',
      description:
        'Şanlıurfa Arkeoloji Müzesi, Göbeklitepe başta olmak üzere bölgenin binlerce yıllık arkeolojik mirasını sergiler.',
    },
    {
      id: '5',
      title: 'Mozaik Müzesi',
      image: 'https://images.unsplash.com/photo-1533659828870-3cf1f7c9fc02?q=80&w=2400&auto=format&fit=crop',
      category: 'museum',
      description:
        'Haleplibahçe Mozaik Müzesi, Roma dönemine ait benzersiz mozaikleri ile sanat ve tarih tutkunlarının uğrak noktasıdır.',
    },
    {
      id: '6',
      title: 'Karaali Parkı',
      image: 'https://images.unsplash.com/photo-1527708678327-8c04c1f9c3a9?q=80&w=2400&auto=format&fit=crop',
      category: 'nature',
      description:
        'Karaali Parkı, yeşil alanları ve yürüyüş yolları ile şehir merkezine çok yakın bir nefes alma noktasıdır.',
    },
    {
      id: '7',
      title: 'Fırat Nehri Kıyısı',
      image: 'https://images.unsplash.com/photo-1502904550040-7534597429ae?q=80&w=2400&auto=format&fit=crop',
      category: 'nature',
      description:
        'Fırat Nehri kıyısında gün batımını izlemek, Şanlıurfa’da doğayla baş başa kalmanın en keyifli yollarından biridir.',
    },
];

export const MOCK_BULLETINS: Bulletin[] = [
    { id: '1', title: 'Aralık Ayı E-Dergi', url: '#' },
    { id: '2', title: 'Gençlik Festivali Broşürü', url: '#' },
];

export const MOCK_REWARDS: Reward[] = [
    { id: '1', name: 'Bedava Kahve', points: 500, icon: 'coffee' },
    { id: '2', name: 'Otobüs Bileti', points: 200, icon: 'bus' },
    { id: '3', name: 'Sinema Bileti', points: 1000, icon: 'film' },
];

export const MOCK_POINTS_HISTORY: PointsHistory[] = [
    { id: '1', description: 'Otobüs Kullanımı', points: 50, date: '10 Aralık' },
    { id: '2', description: 'Bedava Kahve', points: -500, date: '9 Aralık' },
    { id: '3', description: 'Anket Doldurma', points: 100, date: '8 Aralık' },
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    title: 'Yeni İndirim: Mırra Kahve Evi',
    message: 'Tüm kahve çeşitlerinde bugün %20 indirim seni bekliyor.',
    type: 'discount',
    createdAt: 'Bugün, 10:15',
    isRead: false,
  },
  {
    id: '2',
    title: 'Bu Akşam Sıra Gecesi',
    message: 'Balıklıgöl’deki sıra gecesi etkinliği saat 20:00’de başlıyor. Katılmayı unutma!',
    type: 'event',
    createdAt: 'Dün, 18:00',
    isRead: false,
  },
  {
    id: '3',
    title: 'Genç Bileti Fırsatı',
    message: 'Piazza AVM sinemasında hafta içi seanslarında genç bileti kampanyası devam ediyor.',
    type: 'discount',
    createdAt: '2 gün önce',
    isRead: true,
  },
];
