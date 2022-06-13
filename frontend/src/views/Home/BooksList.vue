<template>
  <div class="d-flex flex-wrap justify-center">
    <transition
      appear
      name="fade"
      mode="out-in"
      :key="book.id"
      v-for="book in books"
    >
      <v-hover v-slot="{ hover }">
        <div class="d-flex ma-1">
          <v-card
            width="360"
            height="220"
            outlined
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4">
                  {{ book.author }}
                </div>
                <v-list-item-title class="text-h6 mb-1">
                  {{ book.title }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  <!-- Status with name on book-status array -->
                  {{ bookStatus.find(x => book.status === x.id).name }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions class="d-block text-right">
              <div v-if="book.status === 3" class=" text-right">
                <v-rating
                  v-model="book.rate"
                  hover
                  length="5"
                  size="14"
                  readonly
                ></v-rating>
                <label class="text-caption">
                  {{ `Finalizado em: ${convertDate(book.finishDate)}` }}
                </label>
              </div>
              <label class="text-caption">
                {{ `Adicionado a Lista em: ${convertDate(book.createdAt)}` }}
              </label>
            </v-card-actions>
          </v-card>
          <div class="card-action" :class="{ 'open' : hover }">
            <!-- pencil and trashcan icons one above another -->
            <v-btn
              x-small
              depressed
              color="transparent"
              tile
              height="50%"
              width="100%"
              @click="$router.push({ name: 'book', params: { id: book.id } })"
            >
            <v-icon color="grey darken-1">
              fa-pencil
            </v-icon>
            </v-btn>
            <v-btn
              x-small
              depressed
              color="transparent"
              tile
              height="50%"
              width="100%"
              @click="deleteBook(book.id)"
            >
            <v-icon color="red accent-4">
              fa-trash
            </v-icon>
            </v-btn>
          </div>
        </div>
      </v-hover>
    </transition>
  </div>
</template>

<script>

import moment from 'moment'
import { remove } from '../../api/book'
export default {
  props: {
    books: Array,
    bookStatus: Array,
    loadData: Function
  },
  methods: {
    convertDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    deleteBook (id) {
      this.$store.dispatch('openDialog', {
        open: true,
        title: 'Excluir Livro',
        message: 'Deseja realmente excluir este livro?',
        type: 'warning',
        submit: async () => {
          this.$store.dispatch('closeDialog')
          await remove(id)
          await this.loadData()
        },
        cancel: async () => {
          await this.loadData()
          this.$store.dispatch('closeDialog')
        }
      })
    }
  }
}
</script>

<style>

</style>
<style lang="scss" scoped>
.v-card {
  position: relative;
  z-index: 1;
}
.card-action {
  background-color: #fff;
  transition: 0.3s;
  position: relative;
  z-index: 0;
  left: -41px;
  width: 40px;
  // top right and bottom right only with 5px radius
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 0 4px 4px 0;
  :first-child {
    border-top-right-radius: 4px;
  }
  :last-child {
    border-bottom-right-radius: 4px;
  }
  &.open {
    left: -3px;
  }
  .v-btn {
    width: 100%;
    height: 50%;

  }
}
</style>
