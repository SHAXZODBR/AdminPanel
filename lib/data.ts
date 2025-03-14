export type User = {
  id: string
  login: string
  createdAt: string
}

export type Tag = {
  id: string
  language: "en" | "ru" | "uz"
  name: string
  alias: string
  createdAt: string
}

export type Category = {
  id: string
  language: "en" | "ru" | "uz"
  name: string
  parent: string
  position: number
  createdAt: string
}

export type Article = {
  id: string
  language: "en" | "ru" | "uz"
  title: string
  category: string
  image: string
  author: string
  views: number
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

export const mockTags: Tag[] = {
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

export const mockCategories: Category[] = {
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

export const mockArticles: Article[] = {
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

