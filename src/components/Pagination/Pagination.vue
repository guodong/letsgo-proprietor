<template>
  <ul class="pagination">
    <li :class="{ hide: currentPage === 1 }">
      <router-link :to="createLink(currentPage - 1)">&laquo;</router-link>
     </li>
     <li v-for="page in pages" :class="{ active: page === currentPage }"><router-link :to="createLink(page)">{{ page }}</router-link></li>
     <li :class="{ hide: currentPage === lastPage }">
      <router-link v-if="currentPage !== lastPage" :to="createLink(currentPage + 1)">&raquo;</router-link>
     </li>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'Pagination',
    props: {
      lastPage: Number,
      currentPage: Number,
      path: String,
      query: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      pages () {
        let span = 6
        let pages = []
        let start = this.currentPage - span / 2
        start = start < 1 ? 1 : start
        // console.log('current page', this.currentPage, 'last page', this.lastPage)
        let end = this.currentPage + span / 2
        // console.log('end page number', end)
        end = end > this.lastPage ? this.lastPage : end
        // console.log('start', start, 'end', end)
  
        if (end - start < span) {
          let adjust = span - (end - start) - 1
          start === 1 ? end += adjust : start -= adjust
          start = start < 1 ? 1 : start
          end = end > this.lastPage ? this.lastPage : end
        }
        // console.log('start', start, 'end', end)
        for (let i = start; i <= end; i++) {
          pages.push(i)
        }
        // console.log(pages)
        return pages
      }
    },
    methods: {
      createLink (page) {
        return {
          path: this.path,
          query: { ...this.query, page }
        }
      }
    }
  }
</script>
