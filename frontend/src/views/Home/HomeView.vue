<template>
  <transition
    appear
    name="fade"
    mode="out-in"
  >
    <VLoading v-if="loading"/>
    <div v-else class="content">
      <v-text-field
        label="Pesquisar livros"
        v-model="search"
        solo
        dense
        append-outer-icon="fa-plus"
        @click:append-outer="$router.push('/book/new')"
        clearable
      ></v-text-field>

      <BooksList
        :books="filteredBooks"
        :bookStatus="bookStatus"
        :loadData="loadData"
        :id="id"
      />
      <BookDialog
        v-if="id"
        :bookStatus="bookStatus"
        v-model="dialog"
        :id="id"
        :value="dialog"
      />
    </div>
  </transition>
</template>

<script>
import { getAll } from '../../api/book'
import { getAll as getAllBookStatus } from '../../api/book-status'
import BooksList from './BooksList.vue'
import BookDialog from './BookDialog.vue'
export default {
  props: {
    id: {}
  },
  components: {
    BooksList,
    BookDialog
  },
  name: 'HomePage',
  data: () => ({
    loading: true,
    dialog: false,
    books: [],
    bookStatus: [],
    search: ''
  }),
  async mounted () {
    await this.loadData()
  },
  computed: {
    filteredBooks () {
      return this.books.filter(x => Object.keys(x).some(key => String(x[key]).toUpperCase().includes(this.search.toUpperCase())))
    }
  },
  watch: {
    id (value) {
      if (value) this.dialog = true
    },
    async dialog (value) {
      await this.loadData()
    }
  },
  methods: {
    async loadData () {
      this.loading = true

      const [books, bookStatus] = await Promise.all([
        getAll(),
        getAllBookStatus()
      ])

      if (this.id) {
        this.dialog = true
      }

      this.books = books
      this.bookStatus = bookStatus

      this.loading = false
    }
  }
}
</script>
