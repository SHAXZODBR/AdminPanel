"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "ru" | "uz"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    dashboard: "Dashboard",
    home: "Home",
    users: "Users",
    categories: "Categories",
    tags: "Tags",
    articles: "Articles",
    comments: "Comments",
    appeals: "Appeals",
    banners: "Banners",
    settings: "Settings",
    logout: "Logout",
    administrator: "Administrator",
    filters: "Filters",
    name: "Name",
    id: "ID",
    apply: "Apply",
    clear: "Clear",
    add: "Add",
    language: "Language",
    title: "Title",
    alias: "Alias",
    created: "Created",
    actions: "Actions",
    login: "Login",
    register: "Register",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    parent: "Parent",
    position: "Position",
    author: "Author",
    views: "Views",
    image: "Image",
    category: "Category",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    deleteConfirm: "Are you sure you want to delete this item?",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    save: "Save",
    addTag: "Add Tag",
    addCategory: "Add Category",
    addUser: "Add User",
    addArticle: "Add Article",
    nameTranslit: "Name Transliteration",
    descriptionTranslit: "Description Transliteration",
    description: "Description",
    selectLanguage: "Select Language",
    selectParentCategory: "Select Parent Category",
    selectCategory: "Select Category",
    parentCategory: "Parent Category",
    poster: "Poster",
    uploadPoster: "Upload Poster",
    uploadAudio: "Upload Audio",
    content: "Content",
    socialShare: "Share on Social Media",
    audio: "Audio",
    saving: "Saving...",
    roles: "Roles",
    editUser: "Edit User",
    changePassword: "Change Password",
    newPassword: "New Password",
    rowsPerPage: "Rows per page",
  },
  ru: {
    dashboard: "Панель управления",
    home: "Главная",
    users: "Пользователи",
    categories: "Категории",
    tags: "Теги",
    articles: "Статьи",
    comments: "Комментарии",
    appeals: "Обращения",
    banners: "Баннеры",
    settings: "Настройки",
    logout: "Выход",
    administrator: "Администратор",
    filters: "Фильтры",
    name: "Наименование",
    id: "ID",
    apply: "Применить",
    clear: "Очистить",
    add: "Добавить",
    language: "Язык",
    title: "Название",
    alias: "Алиас",
    created: "Создано",
    actions: "Actions",
    login: "Вход",
    register: "Регистрация",
    email: "Эл. почта",
    password: "Пароль",
    confirmPassword: "Подтвердите пароль",
    parent: "Родитель",
    position: "Позиция",
    author: "Автор",
    views: "Кол-во просмотров",
    image: "Изображение",
    category: "Категория",
    darkMode: "Темный режим",
    lightMode: "Светлый режим",
    deleteConfirm: "Вы уверены, что хотите удалить этот элемент?",
    cancel: "Отмена",
    delete: "Удалить",
    edit: "Редактировать",
    save: "Сохранить",
    addTag: "Добавить тег",
    addCategory: "Добавить категорию",
    addUser: "Добавить пользователя",
    addArticle: "Добавить статью",
    nameTranslit: "Транслитерация имени",
    descriptionTranslit: "Транслитерация описания",
    description: "Описание",
    selectLanguage: "Выберите язык",
    selectParentCategory: "Выберите родительскую категорию",
    selectCategory: "Выберите категорию",
    parentCategory: "Родительская категория",
    poster: "Постер",
    uploadPoster: "Загрузить постер",
    uploadAudio: "Загрузить аудио",
    content: "Содержание",
    socialShare: "Поделиться в социальных сетях",
    audio: "Аудио",
    saving: "Сохранение...",
    roles: "Роли",
    editUser: "Редактировать пользователя",
    changePassword: "Изменить пароль",
    newPassword: "Новый пароль",
    rowsPerPage: "Строк на странице",
  },
  uz: {
    dashboard: "Boshqaruv paneli",
    home: "Bosh sahifa",
    users: "Foydalanuvchilar",
    categories: "Kategoriyalar",
    tags: "Teglar",
    articles: "Maqolalar",
    comments: "Izohlar",
    appeals: "Murojaatlar",
    banners: "Bannerlar",
    settings: "Sozlamalar",
    logout: "Chiqish",
    administrator: "Administrator",
    filters: "Filtrlar",
    name: "Nomi",
    id: "ID",
    apply: "Qo'llash",
    clear: "Tozalash",
    add: "Qo'shish",
    language: "Til",
    title: "Sarlavha",
    alias: "Taxallus",
    created: "Yaratilgan",
    actions: "Amallar",
    login: "Kirish",
    register: "Ro'yxatdan o'tish",
    email: "Elektron pochta",
    password: "Parol",
    confirmPassword: "Parolni tasdiqlang",
    parent: "Ota-ona",
    position: "Pozitsiya",
    author: "Muallif",
    views: "Ko'rishlar soni",
    image: "Rasm",
    category: "Kategoriya",
    darkMode: "Qorong'u rejim",
    lightMode: "Yorug'lik rejimi",
    deleteConfirm: "Haqiqatan ham ushbu elementni o'chirishni xohlaysizmi?",
    cancel: "Bekor qilish",
    delete: "O'chirish",
    edit: "Tahrirlash",
    save: "Saqlash",
    addTag: "Teg qo'shish",
    addCategory: "Kategoriya qo'shish",
    addUser: "Foydalanuvchi qo'shish",
    addArticle: "Maqola qo'shish",
    nameTranslit: "Ism transliteratsiyasi",
    descriptionTranslit: "Tavsif transliteratsiyasi",
    description: "Tavsif",
    selectLanguage: "Tilni tanlang",
    selectParentCategory: "Ota-ona kategoriyasini tanlang",
    selectCategory: "Kategoriyani tanlang",
    parentCategory: "Ota-ona kategoriyasi",
    poster: "Plakat",
    uploadPoster: "Plakatni yuklash",
    uploadAudio: "Audio yuklash",
    content: "Kontent",
    socialShare: "Ijtimoiy tarmoqlarda ulashish",
    audio: "Audio",
    saving: "Saqlash...",
    roles: "Rollar",
    editUser: "Foydalanuvchini tahrirlash",
    changePassword: "Parolni o'zgartirish",
    newPassword: "Yangi parol",
    rowsPerPage: "Har bir sahifadagi qatorlar",
  },
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "ru", "uz"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string) => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)

