<template>
  <div class="translation-form">
    <div class="form-group">
      <label for="sourceText">Text to Translate:</label>
      <textarea
        id="sourceText"
        v-model="sourceText"
        rows="4"
        placeholder="Enter text to translate..."
      ></textarea>
    </div>

    <div class="language-selectors">
      <div class="form-group">
        <label for="sourceLang">From:</label>
        <select id="sourceLang" v-model="sourceLang">
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="it">Italian</option>
          <option value="ja">Japanese</option>
          <option value="ko">Korean</option>
          <option value="zh">Chinese</option>
        </select>
      </div>

      <div class="form-group">
        <label for="targetLang">To:</label>
        <select id="targetLang" v-model="targetLang">
          <option value="hi">Hindi</option>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="it">Italian</option>
          <option value="ja">Japanese</option>
          <option value="ko">Korean</option>
          <option value="zh">Chinese</option>
        </select>
      </div>
    </div>

    <button @click="translate" :disabled="!sourceText || isLoading">
      {{ isLoading ? 'Translating...' : 'Translate' }}
    </button>

    <div v-if="error" class="error-message">
      <p>{{ error }}</p>
      <p v-if="error.includes('API key')" class="error-help">
        Please make sure you have:
        <ul>
          <li>Created a Google Cloud project</li>
          <li>Enabled the Cloud Translation API</li>
          <li>Created an API key with proper permissions</li>
          <li>Added the API key to your .env file</li>
        </ul>
      </p>
    </div>

    <div v-if="translatedText" class="result">
      <h3>Translation:</h3>
      <p>{{ translatedText }}</p>
    </div>
  </div>
</template>

<script>
import { translateText } from '../services/translateService'

export default {
  name: 'TranslationForm',
  data() {
    return {
      sourceText: '',
      sourceLang: 'en',
      targetLang: 'hi',
      translatedText: '',
      isLoading: false,
      error: null
    }
  },
  methods: {
    async translate() {
      if (!this.sourceText) return

      this.isLoading = true
      this.error = null
      this.translatedText = ''

      try {
        const result = await translateText(
          this.sourceText,
          this.sourceLang,
          this.targetLang
        )
        this.translatedText = result
        this.$emit('translation-complete', {
          sourceText: this.sourceText,
          translatedText: result,
          sourceLang: this.sourceLang,
          targetLang: this.targetLang,
          timestamp: new Date()
        })
      } catch (error) {
        console.error('Translation error:', error)
        this.error = error.message
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
.translation-form {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #2c3e50;
}

textarea, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.language-selectors {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

button {
  background: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
}

button:disabled {
  background: #a8d5c2;
  cursor: not-allowed;
}

.result {
  margin-top: 20px;
  padding: 15px;
  background: white;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.result h3 {
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.result p {
  margin: 0;
  line-height: 1.5;
}

.error-message {
  margin-top: 15px;
  padding: 15px;
  background-color: #ffebee;
  color: #c62828;
  border-radius: 4px;
  border: 1px solid #ffcdd2;
}

.error-help {
  margin-top: 10px;
  font-size: 0.9em;
  color: #666;
}

.error-help ul {
  margin: 5px 0;
  padding-left: 20px;
}

.error-help li {
  margin: 3px 0;
}
</style> 