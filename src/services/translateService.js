import axios from 'axios'

const API_KEY = process.env.VUE_APP_GOOGLE_TRANSLATE_API_KEY
const API_URL = process.env.VUE_APP_GOOGLE_TRANSLATE_API_URL

export async function translateText(text, sourceLang, targetLang) {
  try {
    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      {
        q: text,
        source: sourceLang,
        target: targetLang,
        format: 'text'
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )

    if (response.data && response.data.data && response.data.data.translations) {
      return response.data.data.translations[0].translatedText
    }
    throw new Error('Invalid response format')
  } catch (error) {
    console.error('Translation API error:', error.response?.data || error.message)
    throw new Error(error.response?.data?.error?.message || 'Translation failed. Please try again.')
  }
} 