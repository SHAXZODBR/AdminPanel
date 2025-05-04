/**
 * Mock Maps Service
 *
 * This service provides mock data for maps when the real API is unavailable.
 */

// Mock region data
const mockRegions = [
  {
    id: "tashkent",
    name: {
      en: "Tashkent Region",
      ru: "Ташкентская область",
      uz: "Toshkent viloyati",
      "uz-cyrl": "Тошкент вилояти",
    },
    chairman: {
      en: "John Smith",
      ru: "Иванов Иван",
      uz: "Azimov Azim",
      "uz-cyrl": "Азимов Азим",
    },
  },
  {
    id: "andijan",
    name: {
      en: "Andijan Region",
      ru: "Андижанская область",
      uz: "Andijon viloyati",
      "uz-cyrl": "Андижон вилояти",
    },
    chairman: {
      en: "James Brown",
      ru: "Петров Петр",
      uz: "Karimov Karim",
      "uz-cyrl": "Каримов Карим",
    },
  },
  // Add more regions as needed
]

// Maps service
export const mapsService = {
  // Get all regions
  getAll: async (language = "uz") => {
    console.log(`[Mock] Getting all regions for language: ${language}`)

    // Filter regions by language
    const regionsData = mockRegions.map((region) => ({
      id: region.id,
      name: region.name[language] || region.name.en,
      chairman: region.chairman[language] || region.chairman.en,
      language,
    }))

    return {
      results: regionsData,
      count: regionsData.length,
      next: null,
      previous: null,
    }
  },

  // Get region by ID
  getById: async (id: string, language = "uz") => {
    console.log(`[Mock] Getting region by ID: ${id}, language: ${language}`)

    const region = mockRegions.find((r) => r.id === id)

    if (!region) {
      throw new Error(`Region with ID ${id} not found`)
    }

    return {
      id: region.id,
      name: region.name[language] || region.name.en,
      chairman: region.chairman[language] || region.chairman.en,
      language,
    }
  },

  // Update region chairman
  updateChairman: async (id: string, chairman: string, language = "uz") => {
    console.log(`[Mock] Updating region chairman ${id}, language: ${language}`, chairman)

    const region = mockRegions.find((r) => r.id === id)

    if (!region) {
      throw new Error(`Region with ID ${id} not found`)
    }

    // In a real implementation, this would update the database
    // Here we just return the updated data
    return {
      id: region.id,
      name: region.name[language] || region.name.en,
      chairman,
      language,
      updated_at: new Date().toISOString(),
    }
  },
}
