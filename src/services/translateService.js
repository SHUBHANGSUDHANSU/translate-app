import axios from 'axios'

const API_KEY = process.env.VUE_APP_GOOGLE_TRANSLATE_API_KEY
const API_URL = process.env.VUE_APP_GOOGLE_TRANSLATE_API_URL

export async function translateText(text, sourceLang, targetLang) {
  try {
    if (!API_KEY) {
      throw new Error('API key is not configured. Please check your environment variables.')
    }

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
    throw new Error('Invalid response format from translation service')
  } catch (error) {
    console.error('Translation API error:', error.response?.data || error.message)
    if (error.response?.status === 403) {
      throw new Error('API key is invalid or has insufficient permissions')
    } else if (error.response?.status === 429) {
      throw new Error('Translation quota exceeded. Please try again later')
    } else if (error.response?.data?.error?.message) {
      throw new Error(error.response.data.error.message)
    } else {
      throw new Error('Translation failed. Please check your API key and try again')
    }
  }
} 