export type User = {
  id: string
  login: string
  createdAt: string
}

export type Leader = {
  id: string
  language: "en" | "ru" | "uz" | "uz-cyrl"
  fullName: string
  position: string
  phoneNumber: string
  email: string
  bio: string
  photo?: string
  createdAt: string
}

export type Tag = {
  id: string
  language: "en" | "ru" | "uz" | "uz-cyrl"
  name: string
  alias: string
  createdAt: string
}

export type Category = {
  id: string
  language: "en" | "ru" | "uz" | "uz-cyrl"
  name: string
  parent: string
  position: number
  createdAt: string
}

export type Article = {
  id: string
  language: "en" | "ru" | "uz" | "uz-cyrl"
  title: string
  category: string
  image: string
  author: string
  views: number
  createdAt: string
}

export type Department = {
  id: string
  language: "en" | "ru" | "uz" | "uz-cyrl"
  name: string
  type: "department" | "sector"
  head: string
  phoneNumber: string
  email: string
  createdAt: string
}

// Add new types
export type SubordinateOrganization = {
  id: string
  language: "en" | "ru" | "uz" | "uz-cyrl"
  name: string
  type: "organization" | "institution"
  head: string
  phoneNumber: string
  email: string
  address: string
  createdAt: string
}

export type RegionalCouncil = {
  id: string
  language: "en" | "ru" | "uz" | "uz-cyrl"
  name: string
  region: string
  head: string
  phoneNumber: string
  email: string
  address: string
  createdAt: string
}

export const mockUsers: User[] = [
  { id: "1", login: "diana", createdAt: "11.11.2024 15:58" },
  { id: "2", login: "nafisa_abduxalikova", createdAt: "28.05.2024 11:17" },
  { id: "3", login: "ibrohim", createdAt: "28.05.2024 11:16" },
  { id: "4", login: "administrator", createdAt: "13.02.2024 20:31" },
  { id: "5", login: "rahmon", createdAt: "02.03.2023 19:40" },
  { id: "6", login: "nafisa", createdAt: "10.02.2022 21:37" },
]

// Add mock data for Uzbek Cyrillic language (uz-cyrl)
// Add this to the existing mockLeaders object
export const mockLeaders: Record<string, Leader[]> = {
  "uz-cyrl": [
    {
      id: "1",
      language: "uz-cyrl",
      fullName: "Абдуллоҳ Каримов",
      position: "Директор",
      phoneNumber: "+998 90 123 45 67",
      email: "abdulloh.karimov@example.com",
      bio: "Абдуллоҳ Каримов 2020 йилдан бери директор лавозимида ишлайди. У бошқарув ва раҳбарлик соҳасида катта тажрибага эга.",
      photo: "/placeholder.svg?height=100&width=100",
      createdAt: "13.03.2025 11:00",
    },
    {
      id: "2",
      language: "uz-cyrl",
      fullName: "Малика Раҳимова",
      position: "Директор ўринбосари",
      phoneNumber: "+998 90 987 65 43",
      email: "malika.rahimova@example.com",
      bio: "Малика Раҳимова кундалик операцияларни назорат қилади ва ташкилотда 10 йилдан ортиқ ишлайди.",
      photo: "/placeholder.svg?height=100&width=100",
      createdAt: "12.03.2025 11:14",
    },
    {
      id: "3",
      language: "uz-cyrl",
      fullName: "Рустам Алиев",
      position: "Молия бўлими бошлиғи",
      phoneNumber: "+998 90 456 78 90",
      email: "rustam.aliyev@example.com",
      bio: "Рустам Алиев ташкилотнинг барча молиявий жиҳатларини аниқлик ва тажриба билан бошқаради.",
      photo: "/placeholder.svg?height=100&width=100",
      createdAt: "11.03.2025 18:09",
    },
  ],
  en: [
    {
      id: "1",
      language: "en",
      fullName: "John Smith",
      position: "Director",
      phoneNumber: "+998 90 123 45 67",
      email: "john.smith@example.com",
      bio: "John Smith has been the director since 2020. He has extensive experience in management and leadership.",
      photo: "/placeholder.svg?height=100&width=100",
      createdAt: "13.03.2025 11:00",
    },
    {
      id: "2",
      language: "en",
      fullName: "Sarah Johnson",
      position: "Deputy Director",
      phoneNumber: "+998 90 987 65 43",
      email: "sarah.johnson@example.com",
      bio: "Sarah Johnson oversees the daily operations and has been with the organization for over 10 years.",
      photo: "/placeholder.svg?height=100&width=100",
      createdAt: "12.03.2025 11:14",
    },
    {
      id: "3",
      language: "en",
      fullName: "Michael Brown",
      position: "Head of Finance",
      phoneNumber: "+998 90 456 78 90",
      email: "michael.brown@example.com",
      bio: "Michael Brown manages all financial aspects of the organization with precision and expertise.",
      photo: "/placeholder.svg?height=100&width=100",
      createdAt: "11.03.2025 18:09",
    },
  ],
  ru: [
    {
      id: "1",
      language: "ru",
      fullName: "Иван Смирнов",
      position: "Директор",
      phoneNumber: "+998 90 123 45 67",
      email: "ivan.smirnov@example.com",
      bio: "Иван Смирнов является директором с 2020 года. Он имеет обширный опыт в управлении и руководстве.",
      photo: "/placeholder.svg?height=100&width=100",
      createdAt: "13.03.2025 11:00",
    },
    {
      id: "2",
      language: "ru",
      fullName: "Елена Петрова",
      position: "Заместитель директора",
      phoneNumber: "+998 90 987 65 43",
      email: "elena.petrova@example.com",
      bio: "Елена Петрова контролирует ежедневную работу и работает в организации более 10 лет.",
      photo: "/placeholder.svg?height=100&width=100",
      createdAt: "12.03.2025 11:14",
    },
    {
      id: "3",
      language: "ru",
      fullName: "Михаил Иванов",
      position: "Руководитель финансового отдела",
      phoneNumber: "+998 90 456 78 90",
      email: "mikhail.ivanov@example.com",
      bio: "Михаил Иванов управляет всеми финансовыми аспектами организации с точностью и опытом.",
      photo: "/placeholder.svg?height=100&width=100",
      createdAt: "11.03.2025 18:09",
    },
  ],
  uz: [
    {
      id: "1",
      language: "uz",
      fullName: "Abdulloh Karimov",
      position: "Direktor",
      phoneNumber: "+998 90 123 45 67",
      email: "abdulloh.karimov@example.com",
      bio: "Abdulloh Karimov 2020 yildan beri direktor lavozimida ishlaydi. U boshqaruv va rahbarlik sohasida katta tajribaga ega.",
      photo: "/placeholder.svg?height=100&width=100",
      createdAt: "13.03.2025 11:00",
    },
    {
      id: "2",
      language: "uz",
      fullName: "Malika Rahimova",
      position: "Direktor o'rinbosari",
      phoneNumber: "+998 90 987 65 43",
      email: "malika.rahimova@example.com",
      bio: "Malika Rahimova kundalik operatsiyalarni nazorat qiladi va tashkilotda 10 yildan ortiq ishlaydi.",
      photo: "/placeholder.svg?height=100&width=100",
      createdAt: "12.03.2025 11:14",
    },
    {
      id: "3",
      language: "uz",
      fullName: "Rustam Aliyev",
      position: "Moliya bo'limi boshlig'i",
      phoneNumber: "+998 90 456 78 90",
      email: "rustam.aliyev@example.com",
      bio: "Rustam Aliyev tashkilotning barcha moliyaviy jihatlarini aniqlik va tajriba bilan boshqaradi.",
      photo: "/placeholder.svg?height=100&width=100",
      createdAt: "11.03.2025 18:09",
    },
  ],
}

// Add mock data for Uzbek Cyrillic language (uz-cyrl) for departments
export const mockDepartments: Record<string, Department[]> = {
  "uz-cyrl": [
    {
      id: "1",
      language: "uz-cyrl",
      name: "Кадрлар бўлими",
      type: "department",
      head: "Абдулла Қодиров",
      phoneNumber: "+998 90 123 45 67",
      email: "hr@example.com",
      createdAt: "13.03.2025 11:00",
    },
    {
      id: "2",
      language: "uz-cyrl",
      name: "ИТ қўллаб-қувватлаш",
      type: "sector",
      head: "Малика Раҳимова",
      phoneNumber: "+998 90 987 65 43",
      email: "it@example.com",
      createdAt: "12.03.2025 11:14",
    },
  ],
  en: [
    {
      id: "1",
      language: "en",
      name: "Human Resources",
      type: "department",
      head: "John Doe",
      phoneNumber: "+998 90 123 45 67",
      email: "hr@example.com",
      createdAt: "13.03.2025 11:00",
    },
    {
      id: "2",
      language: "en",
      name: "IT Support",
      type: "sector",
      head: "Jane Smith",
      phoneNumber: "+998 90 987 65 43",
      email: "it@example.com",
      createdAt: "12.03.2025 11:14",
    },
  ],
  ru: [
    {
      id: "1",
      language: "ru",
      name: "Отдел кадров",
      type: "department",
      head: "Иван Иванов",
      phoneNumber: "+998 90 123 45 67",
      email: "hr@example.com",
      createdAt: "13.03.2025 11:00",
    },
    {
      id: "2",
      language: "ru",
      name: "ИТ поддержка",
      type: "sector",
      head: "Елена Петрова",
      phoneNumber: "+998 90 987 65 43",
      email: "it@example.com",
      createdAt: "12.03.2025 11:14",
    },
  ],
  uz: [
    {
      id: "1",
      language: "uz",
      name: "Kadrlar bo'limi",
      type: "department",
      head: "Abdulla Qodirov",
      phoneNumber: "+998 90 123 45 67",
      email: "hr@example.com",
      createdAt: "13.03.2025 11:00",
    },
    {
      id: "2",
      language: "uz",
      name: "IT qo'llab-quvvatlash",
      type: "sector",
      head: "Malika Rahimova",
      phoneNumber: "+998 90 987 65 43",
      email: "it@example.com",
      createdAt: "12.03.2025 11:14",
    },
  ],
}

// Add mock data for Uzbek Cyrillic language (uz-cyrl) for tags
export const mockTags: Record<string, Tag[]> = {
  "uz-cyrl": [
    {
      id: "1",
      language: "uz-cyrl",
      name: "Фахрий легион ордени",
      alias: "фахрий-легион-ордени",
      createdAt: "13.03.2025 11:00",
    },
    { id: "2", language: "uz-cyrl", name: "Концерт", alias: "концерт", createdAt: "12.03.2025 11:14" },
    { id: "3", language: "uz-cyrl", name: "Ижро санъати", alias: "ижро-санъати", createdAt: "12.03.2025 11:14" },
    { id: "4", language: "uz-cyrl", name: "Фонограмма", alias: "фонограмма", createdAt: "12.03.2025 11:14" },
    { id: "5", language: "uz-cyrl", name: "Велоспорт", alias: "велоспорт", createdAt: "11.03.2025 18:09" },
  ],
  en: [
    {
      id: "1",
      language: "en",
      name: "Order of the Legion of Honor",
      alias: "legion-of-honor",
      createdAt: "13.03.2025 11:00",
    },
    { id: "2", language: "en", name: "Concert", alias: "concert", createdAt: "12.03.2025 11:14" },
    { id: "3", language: "en", name: "Performing arts", alias: "performing-arts", createdAt: "12.03.2025 11:14" },
    { id: "4", language: "en", name: "Phonogram", alias: "phonogram", createdAt: "12.03.2025 11:14" },
    { id: "5", language: "en", name: "Cycling", alias: "cycling", createdAt: "11.03.2025 18:09" },
  ],
  ru: [
    {
      id: "1",
      language: "ru",
      name: "Орден Почетного легиона",
      alias: "орден почетного легиона",
      createdAt: "13.03.2025 11:00",
    },
    { id: "2", language: "ru", name: "концерт", alias: "концерт", createdAt: "12.03.2025 11:14" },
    {
      id: "3",
      language: "ru",
      name: "исполнительское искусство",
      alias: "исполнительское искусство",
      createdAt: "12.03.2025 11:14",
    },
    { id: "4", language: "ru", name: "фонограмма", alias: "фонограмма", createdAt: "12.03.2025 11:14" },
    { id: "5", language: "ru", name: "велопробег", alias: "велопробег", createdAt: "11.03.2025 18:09" },
  ],
  uz: [
    {
      id: "1",
      language: "uz",
      name: "Faxriy legion ordeni",
      alias: "faxriy-legion-ordeni",
      createdAt: "13.03.2025 11:00",
    },
    { id: "2", language: "uz", name: "Konsert", alias: "konsert", createdAt: "12.03.2025 11:14" },
    { id: "3", language: "uz", name: "Ijro san'ati", alias: "ijro-sanati", createdAt: "12.03.2025 11:14" },
    { id: "4", language: "uz", name: "Fonogramma", alias: "fonogramma", createdAt: "12.03.2025 11:14" },
    { id: "5", language: "uz", name: "Velosport", alias: "velosport", createdAt: "11.03.2025 18:09" },
  ],
}

// Add mock data for Uzbek Cyrillic language (uz-cyrl) for categories
export const mockCategories: Record<string, Category[]> = {
  "uz-cyrl": [
    {
      id: "1",
      language: "uz-cyrl",
      name: "Дам олиш",
      parent: "Ҳаёт тафсилотлари",
      position: 40,
      createdAt: "05.07.2021 09:45",
    },
    {
      id: "2",
      language: "uz-cyrl",
      name: "Истеъмолчи",
      parent: "Ҳаёт тафсилотлари",
      position: 30,
      createdAt: "05.07.2021 09:45",
    },
    {
      id: "3",
      language: "uz-cyrl",
      name: "Уй ҳайвонларимиз",
      parent: "Ҳаёт тафсилотлари",
      position: 20,
      createdAt: "05.07.2021 09:45",
    },
    {
      id: "4",
      language: "uz-cyrl",
      name: "Воқеалар",
      parent: "Ҳаёт тафсилотлари",
      position: 10,
      createdAt: "05.07.2021 09:45",
    },
    {
      id: "5",
      language: "uz-cyrl",
      name: "Озиқ-овқат ва ичимликлар",
      parent: "Соғлиқ",
      position: 40,
      createdAt: "05.07.2021 09:44",
    },
  ],
  en: [
    { id: "1", language: "en", name: "Leisure", parent: "Life details", position: 40, createdAt: "05.07.2021 09:45" },
    { id: "2", language: "en", name: "Consumer", parent: "Life details", position: 30, createdAt: "05.07.2021 09:45" },
    { id: "3", language: "en", name: "Our pets", parent: "Life details", position: 20, createdAt: "05.07.2021 09:45" },
    { id: "4", language: "en", name: "Events", parent: "Life details", position: 10, createdAt: "05.07.2021 09:45" },
    { id: "5", language: "en", name: "Food and Drinks", parent: "Health", position: 40, createdAt: "05.07.2021 09:44" },
  ],
  ru: [
    { id: "1", language: "ru", name: "Досуг", parent: "Мелочи жизни", position: 40, createdAt: "05.07.2021 09:45" },
    {
      id: "2",
      language: "ru",
      name: "Потребитель",
      parent: "Мелочи жизни",
      position: 30,
      createdAt: "05.07.2021 09:45",
    },
    {
      id: "3",
      language: "ru",
      name: "Наши питомцы",
      parent: "Мелочи жизни",
      position: 20,
      createdAt: "05.07.2021 09:45",
    },
    {
      id: "4",
      language: "ru",
      name: "Происшествия",
      parent: "Мелочи жизни",
      position: 10,
      createdAt: "05.07.2021 09:45",
    },
    { id: "5", language: "ru", name: "Еда и Напитки", parent: "Здоровье", position: 40, createdAt: "05.07.2021 09:44" },
  ],
  uz: [
    {
      id: "1",
      language: "uz",
      name: "Dam olish",
      parent: "Hayot tafsilotlari",
      position: 40,
      createdAt: "05.07.2021 09:45",
    },
    {
      id: "2",
      language: "uz",
      name: "Iste'molchi",
      parent: "Hayot tafsilotlari",
      position: 30,
      createdAt: "05.07.2021 09:45",
    },
    {
      id: "3",
      language: "uz",
      name: "Uy hayvonlarimiz",
      parent: "Hayot tafsilotlari",
      position: 20,
      createdAt: "05.07.2021 09:45",
    },
    {
      id: "4",
      language: "uz",
      name: "Voqealar",
      parent: "Hayot tafsilotlari",
      position: 10,
      createdAt: "05.07.2021 09:45",
    },
    {
      id: "5",
      language: "uz",
      name: "Oziq-ovqat va ichimliklar",
      parent: "Sog'liq",
      position: 40,
      createdAt: "05.07.2021 09:44",
    },
  ],
}

// Add mock data for Uzbek Cyrillic language (uz-cyrl) for articles
export const mockArticles: Record<string, Article[]> = {
  "uz-cyrl": [
    {
      id: "1",
      language: "uz-cyrl",
      title: 'Ўзбекистонда "Жонгелди" конида уран қазиб олиш тезлаштирилади',
      category: "Иқтисодиёт",
      image: "/placeholder.svg?height=80&width=120",
      author: "Нафиса Абдухаликова",
      views: 58,
      createdAt: "13.03.2025 19:36",
    },
    {
      id: "2",
      language: "uz-cyrl",
      title: "Самарқанд вилоятида ёш экологлар боғи барпо этилмоқда",
      category: "Истеъмолчи",
      image: "/placeholder.svg?height=80&width=120",
      author: "Нафиса Абдухаликова",
      views: 73,
      createdAt: "13.03.2025 16:59",
    },
    {
      id: "3",
      language: "uz-cyrl",
      title: "Ўзбекистон Президенти Франсия Миллий Ассамблеяси раиси билан учрашди",
      category: "Сиёсат",
      image: "/placeholder.svg?height=80&width=120",
      author: "Нафиса Абдухаликова",
      views: 90,
      createdAt: "13.03.2025 16:05",
    },
    {
      id: "4",
      language: "uz-cyrl",
      title: "2025 йилда Ўзбекистон университетларига кириш учун мажбурий фанлар эълон қилинди",
      category: "Истеъмолчи",
      image: "/placeholder.svg?height=80&width=120",
      author: "Нафиса Абдухаликова",
      views: 87,
      createdAt: "13.03.2025 15:48",
    },
    {
      id: "5",
      language: "uz-cyrl",
      title: "Қирғизистон ва Тожикистон давлат чегараси бўйича келишувга эришди",
      category: "Дунё",
      image: "/placeholder.svg?height=80&width=120",
      author: "Нафиса Абдухаликова",
      views: 103,
      createdAt: "13.03.2025 14:15",
    },
  ],
  en: [
    {
      id: "1",
      language: "en",
      title: "Uzbekistan accelerates uranium mining at Dzhangeldy deposit",
      category: "Economy",
      image: "/placeholder.svg?height=80&width=120",
      author: "John Smith",
      views: 58,
      createdAt: "13.03.2025 19:36",
    },
    {
      id: "2",
      language: "en",
      title: "Young ecologists garden being created in Samarkand region",
      category: "Consumer",
      image: "/placeholder.svg?height=80&width=120",
      author: "Jane Doe",
      views: 73,
      createdAt: "13.03.2025 16:59",
    },
    {
      id: "3",
      language: "en",
      title: "President of Uzbekistan met with the Chairman of the National Assembly of France",
      category: "Politics",
      image: "/placeholder.svg?height=80&width=120",
      author: "John Smith",
      views: 90,
      createdAt: "13.03.2025 16:05",
    },
    {
      id: "4",
      language: "en",
      title: "Mandatory subjects for admission to universities of Uzbekistan in 2025 announced",
      category: "Consumer",
      image: "/placeholder.svg?height=80&width=120",
      author: "Jane Doe",
      views: 87,
      createdAt: "13.03.2025 15:48",
    },
    {
      id: "5",
      language: "en",
      title: "Kyrgyzstan and Tajikistan reached agreement on state border",
      category: "World",
      image: "/placeholder.svg?height=80&width=120",
      author: "John Smith",
      views: 103,
      createdAt: "13.03.2025 14:15",
    },
  ],
  ru: [
    {
      id: "1",
      language: "ru",
      title: "В Узбекистане ускорят добычу урана на месторождении «Джонгельды»",
      category: "Экономика",
      image: "/placeholder.svg?height=80&width=120",
      author: "Nafisa Abduxalikova",
      views: 58,
      createdAt: "13.03.2025 19:36",
    },
    {
      id: "2",
      language: "ru",
      title: "Сад юных экологов создается в Самаркандской области",
      category: "Потребитель",
      image: "/placeholder.svg?height=80&width=120",
      author: "Nafisa Abduxalikova",
      views: 73,
      createdAt: "13.03.2025 16:59",
    },
    {
      id: "3",
      language: "ru",
      title: "Президент Узбекистана провел встречу с председателем Национального собрания Франции",
      category: "Политика",
      image: "/placeholder.svg?height=80&width=120",
      author: "Nafisa Abduxalikova",
      views: 90,
      createdAt: "13.03.2025 16:05",
    },
    {
      id: "4",
      language: "ru",
      title: "Объявлены обязательные предметы для поступления в вузы Узбекистана в 2025 году",
      category: "Потребитель",
      image: "/placeholder.svg?height=80&width=120",
      author: "Nafisa Abduxalikova",
      views: 87,
      createdAt: "13.03.2025 15:48",
    },
    {
      id: "5",
      language: "ru",
      title: "Кыргызстан и Таджикистан достигли соглашения о государственной границе",
      category: "Мир",
      image: "/placeholder.svg?height=80&width=120",
      author: "Nafisa Abduxalikova",
      views: 103,
      createdAt: "13.03.2025 14:15",
    },
  ],
  uz: [
    {
      id: "1",
      language: "uz",
      title: 'O\'zbekistonda "Jongeldi" konida uran qazib olish tezlashtiriladi',
      category: "Iqtisodiyot",
      image: "/placeholder.svg?height=80&width=120",
      author: "Nafisa Abduxalikova",
      views: 58,
      createdAt: "13.03.2025 19:36",
    },
    {
      id: "2",
      language: "uz",
      title: "Samarqand viloyatida yosh ekologlar bog'i barpo etilmoqda",
      category: "Iste'molchi",
      image: "/placeholder.svg?height=80&width=120",
      author: "Nafisa Abduxalikova",
      views: 73,
      createdAt: "13.03.2025 16:59",
    },
    {
      id: "3",
      language: "uz",
      title: "O'zbekiston Prezidenti Fransiya Milliy Assambleyasi raisi bilan uchrashdi",
      category: "Siyosat",
      image: "/placeholder.svg?height=80&width=120",
      author: "Nafisa Abduxalikova",
      views: 90,
      createdAt: "13.03.2025 16:05",
    },
    {
      id: "4",
      language: "uz",
      title: "2025 yilda O'zbekiston universitetlariga kirish uchun majburiy fanlar e'lon qilindi",
      category: "Iste'molchi",
      image: "/placeholder.svg?height=80&width=120",
      author: "Nafisa Abduxalikova",
      views: 87,
      createdAt: "13.03.2025 15:48",
    },
    {
      id: "5",
      language: "uz",
      title: "Qirg'iziston va Tojikiston davlat chegarasi bo'yicha kelishuvga erishdi",
      category: "Dunyo",
      image: "/placeholder.svg?height=80&width=120",
      author: "Nafisa Abduxalikova",
      views: 103,
      createdAt: "13.03.2025 14:15",
    },
  ],
}

// Add mock data for Uzbek Cyrillic language (uz-cyrl) for subordinate organizations
export const mockSubordinateOrganizations: Record<string, SubordinateOrganization[]> = {
  "uz-cyrl": [
    {
      id: "1",
      language: "uz-cyrl",
      name: "Миллий тадқиқот институти",
      type: "organization",
      head: "Роберт Вилсон",
      phoneNumber: "+998 90 123 45 67",
      email: "research@example.com",
      address: "Фан кўчаси 123, Тошкент",
      createdAt: "13.03.2025 11:00",
    },
    {
      id: "2",
      language: "uz-cyrl",
      name: "Марказий ўқув маркази",
      type: "institution",
      head: "Эмили Браун",
      phoneNumber: "+998 90 987 65 43",
      email: "training@example.com",
      address: "Таълим шоҳ кўчаси 45, Тошкент",
      createdAt: "12.03.2025 11:14",
    },
  ],
  en: [
    {
      id: "1",
      language: "en",
      name: "National Research Institute",
      type: "organization",
      head: "Robert Wilson",
      phoneNumber: "+998 90 123 45 67",
      email: "research@example.com",
      address: "123 Science Street, Tashkent",
      createdAt: "13.03.2025 11:00",
    },
    {
      id: "2",
      language: "en",
      name: "Central Training Center",
      type: "institution",
      head: "Emily Brown",
      phoneNumber: "+998 90 987 65 43",
      email: "training@example.com",
      address: "45 Education Avenue, Tashkent",
      createdAt: "12.03.2025 11:14",
    },
  ],
  ru: [
    {
      id: "1",
      language: "ru",
      name: "Национальный исследовательский институт",
      type: "organization",
      head: "Роберт Вильсон",
      phoneNumber: "+998 90 123 45 67",
      email: "research@example.com",
      address: "ул. Науки 123, Ташкент",
      createdAt: "13.03.2025 11:00",
    },
    {
      id: "2",
      language: "ru",
      name: "Центральный учебный центр",
      type: "institution",
      head: "Эмили Браун",
      phoneNumber: "+998 90 987 65 43",
      email: "training@example.com",
      address: "пр. Образования 45, Ташкент",
      createdAt: "12.03.2025 11:14",
    },
  ],
  uz: [
    {
      id: "1",
      language: "uz",
      name: "Milliy tadqiqot instituti",
      type: "organization",
      head: "Robert Wilson",
      phoneNumber: "+998 90 123 45 67",
      email: "research@example.com",
      address: "Fan ko'chasi 123, Toshkent",
      createdAt: "13.03.2025 11:00",
    },
    {
      id: "2",
      language: "uz",
      name: "Markaziy o'quv markazi",
      type: "institution",
      head: "Emily Brown",
      phoneNumber: "+998 90 987 65 43",
      email: "training@example.com",
      address: "Ta'lim shoh ko'chasi 45, Toshkent",
      createdAt: "12.03.2025 11:14",
    },
  ],
}

// Add mock data for Uzbek Cyrillic language (uz-cyrl) for regional councils
export const mockRegionalCouncils: Record<string, RegionalCouncil[]> = {
  "uz-cyrl": [
    {
      id: "1",
      language: "uz-cyrl",
      name: "Тошкент вилоят кенгаши",
      region: "Тошкент",
      head: "Жеймс Андерсон",
      phoneNumber: "+998 90 123 45 67",
      email: "tashkent@example.com",
      address: "Кенгаш кўчаси 789, Тошкент",
      createdAt: "13.03.2025 11:00",
    },
    {
      id: "2",
      language: "uz-cyrl",
      name: "Самарқанд вилоят кенгаши",
      region: "Самарқанд",
      head: "Сара Дэвис",
      phoneNumber: "+998 90 987 65 43",
      email: "samarkand@example.com",
      address: "Қадимий майдон 456, Самарқанд",
      createdAt: "12.03.2025 11:14",
    },
  ],
  en: [
    {
      id: "1",
      language: "en",
      name: "Tashkent Regional Council",
      region: "Tashkent",
      head: "James Anderson",
      phoneNumber: "+998 90 123 45 67",
      email: "tashkent@example.com",
      address: "789 Council Street, Tashkent",
      createdAt: "13.03.2025 11:00",
    },
    {
      id: "2",
      language: "en",
      name: "Samarkand Regional Council",
      region: "Samarkand",
      head: "Sarah Davis",
      phoneNumber: "+998 90 987 65 43",
      email: "samarkand@example.com",
      address: "456 Ancient Square, Samarkand",
      createdAt: "12.03.2025 11:14",
    },
  ],
  ru: [
    {
      id: "1",
      language: "ru",
      name: "Ташкентский областной совет",
      region: "Ташкент",
      head: "Джеймс Андерсон",
      phoneNumber: "+998 90 123 45 67",
      email: "tashkent@example.com",
      address: "ул. Совета 789, Ташкент",
      createdAt: "13.03.2025 11:00",
    },
    {
      id: "2",
      language: "ru",
      name: "Самаркандский областной совет",
      region: "Самарканд",
      head: "Сара Дэвис",
      phoneNumber: "+998 90 987 65 43",
      email: "samarkand@example.com",
      address: "пл. Древняя 456, Самарканд",
      createdAt: "12.03.2025 11:14",
    },
  ],
  uz: [
    {
      id: "1",
      language: "uz",
      name: "Toshkent viloyat kengashi",
      region: "Toshkent",
      head: "James Anderson",
      phoneNumber: "+998 90 123 45 67",
      email: "tashkent@example.com",
      address: "Kengash ko'chasi 789, Toshkent",
      createdAt: "13.03.2025 11:00",
    },
    {
      id: "2",
      language: "uz",
      name: "Samarqand viloyat kengashi",
      region: "Samarqand",
      head: "Sarah Davis",
      phoneNumber: "+998 90 987 65 43",
      email: "samarkand@example.com",
      address: "Qadimiy maydon 456, Samarqand",
      createdAt: "12.03.2025 11:14",
    },
  ],
}

