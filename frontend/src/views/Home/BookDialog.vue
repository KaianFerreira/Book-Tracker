<template>
  <v-dialog
    persistent
    v-model="dialog"
    transition="dialog-bottom-transition"
    max-width="600"
  >
    <template>
      <v-card>
        <v-toolbar
          color="grey lighten-5"
        >
          Create Book
        </v-toolbar>
        <v-card-text>
          <v-form ref="bookForm" class="mt-5">
            <v-row>
              <v-col>
                <v-text-field
                  v-model="book.title"
                  label="Title"
                  required
                  :rules="[v => !!v || 'Title is required']"
                ></v-text-field>
                <v-text-field
                  v-model="book.author"
                  label="Author"
                  required
                  :rules="[v => !!v || 'Author is required']"
                ></v-text-field>
                <v-select
                  v-model="book.status"
                  :items="bookStatus.map(x => ({
                    text: x.name,
                    value: x.id
                  }))"
                  label="Status"
                  required
                  :rules="[v => !!v || 'Status is required']"
                ></v-select>
              </v-col>
            </v-row>
            <transition
              appear
              name="fade"
              mode="out-in"
            >
              <div v-if="book.status === 3">
                <VInputDatePicker
                  v-model="book.finishDate"
                  :value="book.finishDate"
                  label="End Date"
                />
                <label>Nota</label>
                <v-rating
                  v-model="book.rate"
                  hover
                  length="5"
                  size="14"
                ></v-rating>
              </div>
            </transition>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            text
            @click="closeDialog()"
          >
            Cancel
          </v-btn>
          <v-btn
            :loading="loading"
            color="primary"
            @click="save()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import moment from 'moment'
import { get, create, update } from '../../api/book'
export default {
  props: {
    id: {},
    value: {
      type: Boolean,
      default: false
    },
    bookStatus: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    loading: true,
    book: {
      cover: null,
      imageFile: null,
      title: '',
      author: '',
      rate: 0,
      finishDate: null,
      status: 1,
      createdAt: moment.utc(new Date()).format('DD-MM-YYYY')
    },
    dialog: false
  }),
  watch: {
    value (val) {
      if (val) {
        this.dialog = true
        this.$emit('input', val)
      }
    }
  },
  async mounted () {
    this.dialog = this.value
    if (this.id !== 'new') {
      const book = await get(this.id)
      this.book = book
    }
    this.loading = false
  },
  methods: {
    resetBook () {
      this.book = {
        title: '',
        author: '',
        rate: 0,
        finishDate: null,
        status: 1,
        createdAt: moment.utc(new Date()).format('DD-MM-YYYY')
      }
    },
    closeDialog () {
      this.dialog = false
      this.$emit('input', false)
      this.$router.push('/')
      this.resetBook()
    },
    async save () {
      this.loading = true
      const isValid = this.$refs.bookForm.validate()
      if (isValid) {
        if (this.id === 'new') await create(this.book)
        else await update(this.id, this.book)
        this.closeDialog()
      }
      this.loading = false
    }
  }
}
</script>
