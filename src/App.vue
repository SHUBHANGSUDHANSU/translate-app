<template>
  <div class="app">
    <h1>Translation App</h1>
    <TranslationForm @translation-complete="addToHistory" />
    <HistoryList 
      :translations="translationHistory" 
      @clear-history="clearHistory"
    />
  </div>
</template>

<script>
import TranslationForm from './components/TranslationForm.vue'
import HistoryList from './components/HistoryList.vue'

export default {
  name: 'App',
  components: {
    TranslationForm,
    HistoryList
  },
  data() {
    return {
      translationHistory: [],
      maxHistoryItems: 10
    }
  },
  methods: {
    addToHistory(translation) {
      this.translationHistory.unshift(translation)
      if (this.translationHistory.length > this.maxHistoryItems) {
        this.translationHistory = this.translationHistory.slice(0, this.maxHistoryItems)
      }
    },
    clearHistory() {
      this.translationHistory = []
    }
  }
}
</script>

<style>
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
}
</style> 