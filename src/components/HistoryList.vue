<template>
  <div class="history-list">
    <div class="history-header">
      <h2>Recent Translations</h2>
      <button 
        v-if="translations.length > 0" 
        @click="$emit('clear-history')" 
        class="clear-button"
      >
        Clear History
      </button>
    </div>
    <div v-if="translations.length === 0" class="empty-state">
      No translations yet
    </div>
    <div v-else class="translations">
      <div v-for="(translation, index) in translations" :key="index" class="translation-item">
        <div class="translation-header">
          <span class="languages">{{ translation.sourceLang }} → {{ translation.targetLang }}</span>
          <span class="timestamp">{{ formatDate(translation.timestamp) }}</span>
        </div>
        <div class="translation-content">
          <p class="source">{{ translation.sourceText }}</p>
          <p class="target">{{ translation.translatedText }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HistoryList',
  props: {
    translations: {
      type: Array,
      required: true
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString()
    }
  }
}
</script>

<style scoped>
.history-list {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h2 {
  color: #2c3e50;
  margin: 0;
}

.clear-button {
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.clear-button:hover {
  background: #c82333;
}

.empty-state {
  text-align: center;
  color: #666;
  padding: 20px;
}

.translations {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.translation-item {
  background: white;
  border-radius: 4px;
  padding: 15px;
  border: 1px solid #ddd;
}

.translation-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
}

.languages {
  color: #42b983;
  font-weight: bold;
}

.timestamp {
  color: #666;
}

.translation-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.source, .target {
  margin: 0;
  line-height: 1.5;
}

.source {
  color: #666;
}

.target {
  color: #2c3e50;
  font-weight: 500;
}
</style> 